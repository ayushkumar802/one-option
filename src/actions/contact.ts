'use server';

import { after } from 'next/server';
import { contactFormSchema, type ContactFormValues } from '@/lib/schemas';
import { sendContactEmail } from '@/lib/mailer';
import { SHEET_FETCH_URL, PROJECTS_SHEET_ID } from '@/config/constant';

export interface ContactFormResult {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  data: ContactFormValues
): Promise<ContactFormResult> {
  try {
    // Server-side validation
    const result = contactFormSchema.safeParse(data);
    if (!result.success) {
      return {
        success: false,
        message: 'Please check the form for errors and try again.',
      };
    }

    // Honeypot check
    if (data.honeypot && data.honeypot.length > 0) {
      return { success: true, message: 'Thank you for your inquiry.' };
    }

    // Sanitize input
    const queryType = sanitizeString(result.data.queryType || result.data.projectType || 'General Inquiry');
    const jobName = sanitizeString(result.data.jobName || '');

    const sanitized = {
      name: sanitizeString(result.data.name),
      email: sanitizeString(result.data.email || ''),
      phone: sanitizeString(result.data.phone),
      city: sanitizeString(result.data.city),
      queryType,
      jobName,
      // For backwards compatibility with any existing Google Sheet columns
      projectType: queryType,
      budget: jobName || 'N/A',
      message: sanitizeString(result.data.message),
    };

    console.log('📨 Server received contact form for:', sanitized.name);

    // Run email delivery and Google Sheet logging in the background (non-blocking)
    // This allows the response to return instantly to the browser without waiting or pausing
    const runBackgroundTasks = async () => {
      // 1. Send email via Nodemailer
      try {
        console.log('📨 [Background] Sending notification email...');
        await sendContactEmail(sanitized);
        console.log('✅ [Background] Notification email sent successfully!');
      } catch (mailErr) {
        console.error('❌ [Background] Email delivery error:', mailErr);
      }

      // 2. Append to Google Sheet tab ("Recent Mails")
      if (SHEET_FETCH_URL) {
        try {
          console.log('📊 [Background] Logging entry to Google Sheet ("Recent Mails")...');
          const sheetRes = await fetch(`${SHEET_FETCH_URL}?id=${PROJECTS_SHEET_ID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...sanitized,
              tabName: 'Recent Mails',
              timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            }),
          });
          const sheetJson = await sheetRes.json().catch(() => null);
          console.log('✅ [Background] Google Sheet response:', sheetJson || sheetRes.status);
        } catch (sheetErr) {
          console.error('❌ [Background] Google Sheet logging error:', sheetErr);
        }
      }
    };

    if (typeof after === 'function') {
      after(runBackgroundTasks);
    } else {
      runBackgroundTasks().catch((err) => {
        console.error('❌ [Background] Task error:', err);
      });
    }

    return {
      success: true,
      message:
        'Thank you for your inquiry. We will get back to you within 24 hours.',
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again or contact us directly.',
    };
  }
}

function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}
