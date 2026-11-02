import nodemailer, { type Transporter } from 'nodemailer';
import { EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, ADMIN_EMAIL } from '@/config/constant';

interface ContactEmailData {
    name: string;
    email?: string;
    phone: string;
    city: string;
    queryType?: string;
    jobName?: string;
    projectType?: string;
    budget?: string;
    message: string;
}

let transporterInstance: Transporter | null = null;

function getTransporter(user: string, pass: string) {
    if (!transporterInstance) {
        transporterInstance = nodemailer.createTransport({
            service: 'gmail',
            pool: true,
            maxConnections: 3,
            maxMessages: 100,
            auth: {
                user,
                pass,
            },
        });
    }
    return transporterInstance;
}

export async function sendContactEmail(data: ContactEmailData) {
    const user = process.env.EMAIL_HOST_USER || EMAIL_HOST_USER;
    const pass = process.env.EMAIL_HOST_PASSWORD || EMAIL_HOST_PASSWORD;
    const admin = process.env.ADMIN_EMAIL || ADMIN_EMAIL || user;

    if (!user || !pass) {
        console.warn('⚠️ Nodemailer: Missing EMAIL_HOST_USER or EMAIL_HOST_PASSWORD credentials in environment.');
        return;
    }

    console.log('Sending email via Nodemailer from:', user, 'to:', admin);

    const transporter = getTransporter(user, pass);

    const displayType = data.queryType || data.projectType || 'General Inquiry';
    const displayJob = data.jobName ? ` [${data.jobName}]` : '';

    const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); color: #ffffff; padding: 22px 28px;">
                <h2 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">New Inquiry — One Option</h2>
                <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">Placement & Manpower Solutions</p>
            </div>
            <div style="padding: 24px 28px;">
                <table style="border-collapse: collapse; width: 100%; font-size: 14px; color: #1e293b;">
                    <tr>
                        <td style="padding: 11px 0; font-weight: 600; width: 32%; border-bottom: 1px solid #f1f5f9; color: #64748b;">Full Name</td>
                        <td style="padding: 11px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${data.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 11px 0; font-weight: 600; border-bottom: 1px solid #f1f5f9; color: #64748b;">Phone / WhatsApp</td>
                        <td style="padding: 11px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">
                            <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">${data.phone}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 11px 0; font-weight: 600; border-bottom: 1px solid #f1f5f9; color: #64748b;">Email Address</td>
                        <td style="padding: 11px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">
                            ${data.email ? `<a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>` : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 11px 0; font-weight: 600; border-bottom: 1px solid #f1f5f9; color: #64748b;">City / Location</td>
                        <td style="padding: 11px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${data.city}</td>
                    </tr>
                    <tr>
                        <td style="padding: 11px 0; font-weight: 600; border-bottom: 1px solid #f1f5f9; color: #64748b;">Inquiry Type</td>
                        <td style="padding: 11px 0; border-bottom: 1px solid #f1f5f9;">
                            <span style="display: inline-block; padding: 4px 10px; border-radius: 9999px; background-color: #dbeafe; color: #1e40af; font-weight: 600; font-size: 13px;">${displayType}</span>
                        </td>
                    </tr>
                    ${data.jobName ? `
                    <tr>
                        <td style="padding: 11px 0; font-weight: 600; border-bottom: 1px solid #f1f5f9; color: #64748b;">Applied Job / Role</td>
                        <td style="padding: 11px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #059669;">${data.jobName}</td>
                    </tr>` : ''}
                    <tr>
                        <td style="padding: 14px 0 6px; font-weight: 600; vertical-align: top; color: #64748b;">Message / Details</td>
                        <td style="padding: 14px 0 6px; white-space: pre-wrap; line-height: 1.6; color: #1e293b;">${data.message}</td>
                    </tr>
                </table>
            </div>
            <div style="background-color: #f8fafc; padding: 14px 28px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
                Sent directly via One Option Placement & Manpower Website contact form
            </div>
        </div>
    `;

    await transporter.sendMail({
        from: `"One Option Website" <${user}>`,
        to: admin,
        replyTo: data.email || undefined,
        subject: `New ${displayType}${displayJob} from ${data.name} — One Option`,
        html: htmlBody,
    });
}
