'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader2, Briefcase, CheckCircle2 } from 'lucide-react';
import {
  contactFormSchema,
  type ContactFormValues,
  queryTypes,
} from '@/lib/schemas';
import { submitContactForm, type ContactFormResult } from '@/actions/contact';

interface ContactFormProps {
  initialJobName?: string;
  initialQueryType?: string;
}

export function ContactForm({
  initialJobName = '',
  initialQueryType = '',
}: ContactFormProps) {
  const [status, setStatus] = useState<ContactFormResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultJob = initialJobName || '';
  const defaultType =
    initialQueryType || (defaultJob ? 'Job Request' : 'Other');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
      queryType: defaultType,
      jobName: defaultJob,
      message: '',
    },
  });

  useEffect(() => {
    if (initialQueryType) {
      setValue('queryType', initialQueryType);
    }
    if (initialJobName) {
      setValue('jobName', initialJobName);
    }
  }, [initialQueryType, initialJobName, setValue]);

  const watchedJobName = watch('jobName');
  const watchedQueryType = watch('queryType');

  const onSubmit = async (data: ContactFormValues) => {
    console.log('Submitting contact form:', data);
    setIsSubmitting(true);
    setStatus(null);
    try {
      const result = await submitContactForm(data);
      console.log('Server action result:', result);
      setStatus(result);
      if (result.success) {
        reset({
          name: '',
          email: '',
          phone: '',
          city: '',
          queryType: defaultJob ? 'Job Request' : 'Other',
          jobName: defaultJob,
          message: '',
        });
      }
    } catch (err) {
      console.error('Client submit error:', err);
      setStatus({
        success: false,
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status?.success) {
    return (
      <div
        className="p-4 p-md-5 text-center"
        style={{
          background: '#f0fdf4',
          borderRadius: '16px',
          border: '1px solid #bbf7d0',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#dcfce7',
            color: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
          }}
        >
          <CheckCircle2 size={32} />
        </div>
        <h3 style={{ color: '#166534', marginBottom: '0.75rem', fontWeight: 700 }}>
          Inquiry Received Successfully!
        </h3>
        <p style={{ color: '#374151', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          {status.message}
        </p>
        <button
          type="button"
          onClick={() => setStatus(null)}
          className="btn btn-outline-primary"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      noValidate
      suppressHydrationWarning
    >
      {/* Role Banner if applying for a specific role */}
      {watchedJobName && (
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '12px',
            padding: '0.85rem 1.15rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            fontSize: '0.92rem',
            color: '#065f46',
          }}
        >
          <Briefcase size={20} style={{ color: '#059669', flexShrink: 0 }} />
          <div>
            Inquiring / Applying for role: <strong>{watchedJobName}</strong>
          </div>
        </div>
      )}

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="contact-name" className="form-label">
            Name *
          </label>
          <input
            id="contact-name"
            type="text"
            suppressHydrationWarning
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Your full name"
            {...register('name')}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="contact-email" className="form-label">
            Email <span className="text-muted fw-normal" style={{ fontSize: '0.85em' }}>(Optional)</span>
          </label>
          <input
            id="contact-email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="your@email.com"
            {...register('email')}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="contact-phone" className="form-label">
            Phone / WhatsApp *
          </label>
          <input
            id="contact-phone"
            type="tel"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="+91 98765 43210"
            {...register('phone')}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.message}</div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="contact-city" className="form-label">
            City *
          </label>
          <input
            id="contact-city"
            type="text"
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
            placeholder="e.g. Indore, Dewas, Pithampur"
            {...register('city')}
          />
          {errors.city && (
            <div className="invalid-feedback">{errors.city.message}</div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="contact-query-type" className="form-label">
            Query Type <span className="text-muted fw-normal" style={{ fontSize: '0.85em' }}>(Optional)</span>
          </label>
          <select
            id="contact-query-type"
            className={`form-select ${errors.queryType ? 'is-invalid' : ''}`}
            {...register('queryType')}
          >
            {queryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.queryType && (
            <div className="invalid-feedback">{errors.queryType.message}</div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="contact-job-name" className="form-label">
            Job Name <span className="text-muted fw-normal" style={{ fontSize: '0.85em' }}>(Optional)</span>
          </label>
          <input
            id="contact-job-name"
            type="text"
            className={`form-control ${errors.jobName ? 'is-invalid' : ''}`}
            placeholder="e.g. Machine Operator (leave blank if not applicable)"
            {...register('jobName')}
          />
          {errors.jobName && (
            <div className="invalid-feedback">{errors.jobName.message}</div>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="contact-message" className="form-label">
            Message *
          </label>
          <textarea
            id="contact-message"
            rows={5}
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
            placeholder={
              watchedJobName || watchedQueryType === 'Job Request'
                ? 'Share your experience, qualifications, joining availability, or any questions about this role…'
                : 'Tell us about your requirements — roles needed, headcount, shifts, timeline, or any questions…'
            }
            {...register('message')}
          />
          {errors.message && (
            <div className="invalid-feedback">{errors.message.message}</div>
          )}
        </div>

        {/* Honeypot */}
        <div className="hp-field" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('honeypot')}
          />
        </div>

        <div className="col-12 mt-4">
          <button
            type="button"
            onClick={handleSubmit(onSubmit, (errs) => {
              console.warn('Form validation failed:', errs);
            })}
            className="btn btn-primary btn-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="me-2 spin-loader" />
                Sending…
              </>
            ) : (
              <>
                <Send size={18} className="me-2" />
                {watchedJobName || watchedQueryType === 'Job Request'
                  ? 'Submit Job Application'
                  : 'Send Message / Inquiry'}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
