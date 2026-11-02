import { z } from 'zod';

export const queryTypes = [
  'Job Request',
  'Staffing / Manpower Inquiry',
  'Q/A',
  'Other',
] as const;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long'),
  city: z
    .string()
    .min(2, 'Please enter your city')
    .max(100, 'City name is too long'),
  queryType: z
    .string()
    .optional(),
  jobName: z
    .string()
    .max(200, 'Job name is too long')
    .optional(),
  // Kept for backward compatibility
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z
    .string()
    .min(1, 'Please enter a message')
    .max(2000, 'Message must be under 2000 characters'),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Alias / Legacy exports for backward compatibility
export const projectTypes = queryTypes;
export const budgetRanges = [] as const;
