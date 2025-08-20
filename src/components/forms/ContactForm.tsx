'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  phone: z.string()
    .regex(/^(\+254|0)[17]\d{8}$/, 'Please enter a valid Kenyan phone number'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters'),
  inquiryType: z.enum(['general', 'tour', 'admissions', 'academic', 'facilities']),
  childAge: z.string().optional(),
  preferredProgram: z.string().optional(),
  preferredContactTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
}

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'tour', label: 'School Tour Request' },
  { value: 'admissions', label: 'Admissions Information' },
  { value: 'academic', label: 'Academic Programs' },
  { value: 'facilities', label: 'Facilities & Services' }
];

const programs = [
  { value: '', label: 'Not specified' },
  { value: 'early-years', label: 'Early Years (Nursery)' },
  { value: 'primary', label: 'Primary School' },
  { value: 'secondary', label: 'Secondary School' },
  { value: 'igcse', label: 'Cambridge IGCSE' },
  { value: 'a-level', label: 'Cambridge A-Level' }
];

const contactTimes = [
  { value: 'anytime', label: 'Anytime' },
  { value: 'morning', label: 'Morning (8AM - 12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
  { value: 'evening', label: 'Evening (5PM - 8PM)' }
];

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, className }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      preferredContactTime: 'anytime'
    }
  });

  const watchedInquiryType = watch('inquiryType');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message');
      }

      setSubmitStatus('success');
      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={className} padding="lg">
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal-black mb-4">
          Get In Touch
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Ready to give your child the best education? Fill out the form below and our admissions team 
          will get back to you within 24 hours.
        </p>
      </div>

      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-success-green/10 border border-success-green/20 rounded-lg flex items-start space-x-3"
        >
          <CheckCircle className="h-5 w-5 text-success-green mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-success-green mb-1">Message Sent Successfully!</h4>
            <p className="text-sm text-success-green/80">
              Thank you for your inquiry. We'll get back to you within 24 hours.
            </p>
          </div>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3"
        >
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-red-500 mb-1">Error Sending Message</h4>
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-charcoal-black mb-2">
              Full Name *
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:border-primary-red transition-colors"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal-black mb-2">
              Email Address *
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:border-primary-red transition-colors"
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-charcoal-black mb-2">
              Phone Number *
            </label>
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:border-primary-red transition-colors"
              placeholder="+254 722 000 000"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="inquiryType" className="block text-sm font-medium text-charcoal-black mb-2">
              Inquiry Type *
            </label>
            <select
              {...register('inquiryType')}
              id="inquiryType"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:border-primary-red transition-colors"
            >
              <option value="">Select inquiry type</option>
              {inquiryTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.inquiryType && (
              <p className="mt-1 text-sm text-red-600">{errors.inquiryType.message}</p>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="childAge" className="block text-sm font-medium text-charcoal-black mb-2">
              Child's Age (if applicable)
            </label>
            <input
              {...register('childAge')}
              type="text"
              id="childAge"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:border-primary-red transition-colors"
              placeholder="e.g., 5 years old"
            />
            {errors.childAge && (
              <p className="mt-1 text-sm text-red-600">{errors.childAge.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="preferredProgram" className="block text-sm font-medium text-charcoal-black mb-2">
              Preferred Program
            </label>
            <select
              {...register('preferredProgram')}
              id="preferredProgram"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:border-primary-red transition-colors"
            >
              {programs.map((program) => (
                <option key={program.value} value={program.value}>
                  {program.label}
                </option>
              ))}
            </select>
            {errors.preferredProgram && (
              <p className="mt-1 text-sm text-red-600">{errors.preferredProgram.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="preferredContactTime" className="block text-sm font-medium text-charcoal-black mb-2">
            Preferred Contact Time
          </label>
          <select
            {...register('preferredContactTime')}
            id="preferredContactTime"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:border-primary-red transition-colors"
          >
            {contactTimes.map((time) => (
              <option key={time.value} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
          {errors.preferredContactTime && (
            <p className="mt-1 text-sm text-red-600">{errors.preferredContactTime.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-charcoal-black mb-2">
            Message *
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:border-primary-red transition-colors resize-vertical"
            placeholder={
              watchedInquiryType === 'tour' 
                ? "Please let us know your preferred dates and times for the school tour, number of visitors, and any specific areas you'd like to see."
                : "Tell us about your inquiry, questions, or how we can help you..."
            }
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            icon={isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </Button>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
        <p>
          By submitting this form, you agree to our privacy policy and consent to being contacted by 
          Westgate Group of Schools regarding your inquiry.
        </p>
      </div>
    </Card>
  );
};

export default ContactForm;
