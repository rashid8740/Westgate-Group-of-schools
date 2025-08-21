'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, FileText, Users, CheckCircle, Clock, Star, Phone, Mail, MapPin, Upload, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const admissionSteps = [
  {
    step: 1,
    title: 'Application Submission',
    description: 'Complete and submit the online application form with required documents.',
    icon: FileText
  },
  {
    step: 2,
    title: 'Assessment & Interview',
    description: 'Your child will take an age-appropriate assessment and interview.',
    icon: Users
  },
  {
    step: 3,
    title: 'Review & Decision',
    description: 'Our admissions committee reviews the application and makes a decision.',
    icon: CheckCircle
  },
  {
    step: 4,
    title: 'Enrollment',
    description: 'Upon acceptance, complete enrollment and payment procedures.',
    icon: Star
  }
];

const requirements = [
  'Completed application form',
  'Birth certificate (certified copy)',
  'Previous school transcripts/reports',
  'Two passport-size photographs',
  'Medical examination report',
  'Vaccination records',
  'Transfer letter (if applicable)',
  'Application fee payment'
];

export default function Admissions() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submissionData, setSubmissionData] = useState<{applicationNumber: string} | null>(null);
  const [formData, setFormData] = useState({
    // Student Information
    studentFirstName: '',
    studentLastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    program: '',
    currentGrade: '',
    
    // Parent/Guardian Information
    parentFirstName: '',
    parentLastName: '',
    relationship: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    
    // Previous School Information
    previousSchool: '',
    previousGrade: '',
    reasonForTransfer: '',
    
    // Additional Information
    medicalConditions: '',
    specialNeeds: '',
    extracurriculars: '',
    
    // Documents
    documents: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;

  const steps = [
    {
      title: 'Student Information',
      description: 'Basic details about the student'
    },
    {
      title: 'Parent/Guardian Information', 
      description: 'Contact and parent details'
    },
    {
      title: 'School History',
      description: 'Previous school information'
    },
    {
      title: 'Additional Information',
      description: 'Medical conditions and preferences'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent Enter key from submitting form unless on final step
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      
      if (currentStep < totalSteps) {
        nextStep();
      }
      // On final step, allow form submission by not calling nextStep
    }
  };

  // Validate current step
  const validateStep = (step: number) => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 1: // Student Information
        if (!formData.studentFirstName.trim()) errors.studentFirstName = 'First name is required';
        if (!formData.studentLastName.trim()) errors.studentLastName = 'Last name is required';
        if (!formData.dateOfBirth) {
          errors.dateOfBirth = 'Date of birth is required';
        } else {
          const selectedDate = new Date(formData.dateOfBirth);
          const today = new Date();
          if (selectedDate >= today) {
            errors.dateOfBirth = 'Date of birth must be in the past';
          }
        }
        if (!formData.gender) errors.gender = 'Gender is required';
        if (!formData.nationality.trim()) errors.nationality = 'Nationality is required';
        if (!formData.program) errors.program = 'Program is required';
        if (!formData.currentGrade.trim()) errors.currentGrade = 'Grade is required';
        break;
        
      case 2: // Parent Information
        if (!formData.parentFirstName.trim()) errors.parentFirstName = 'Parent first name is required';
        if (!formData.parentLastName.trim()) errors.parentLastName = 'Parent last name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        if (!formData.phone.trim()) errors.phone = 'Phone number is required';
        if (!formData.address.trim()) errors.address = 'Address is required';
        if (!formData.city.trim()) errors.city = 'City is required';
        // Email validation
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = 'Please enter a valid email address';
        }
        break;
        
      case 3: // School History (optional fields)
        // No required fields in this step
        break;
        
      case 4: // Additional Information (optional fields)
        // No required fields in this step
        break;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    console.log('nextStep called - currentStep:', currentStep);
    const isValid = validateStep(currentStep);
    console.log('Step validation result:', isValid);
    
    if (isValid) {
      console.log('Validation passed, moving to next step');
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      console.log('Validation failed for step:', currentStep);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    // Allow going to previous steps or same step, validate only when going forward
    if (step <= currentStep) {
      setCurrentStep(step);
    } else if (step === currentStep + 1 && validateStep(currentStep)) {
      setCurrentStep(step);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('handleSubmit called - currentStep:', currentStep, 'totalSteps:', totalSteps);
    
    // If not on final step, prevent submission completely
    if (currentStep < totalSteps) {
      console.log('Not on final step, preventing submission');
      e.stopPropagation();
      return false;
    }
    
    console.log('On final step, proceeding with submission');
    // Only submit on final step
    setIsSubmitting(true);
    
    try {
      // Import API at the top level instead
      const { applicationsApi } = await import('@/lib/api');
      
      // Prepare data for API
      console.log('Preparing API data, dateOfBirth value:', formData.dateOfBirth);
      
      const applicationData = {
        // Student Information
        studentFirstName: formData.studentFirstName,
        studentLastName: formData.studentLastName,
        dateOfBirth: formData.dateOfBirth, // Date is already in YYYY-MM-DD format from date input
        gender: formData.gender,
        nationality: formData.nationality || 'Kenyan',
        program: formData.program,
        currentGrade: formData.currentGrade,
        
        // Parent/Guardian Information  
        parentFirstName: formData.parentFirstName,
        parentLastName: formData.parentLastName,
        relationship: formData.relationship || 'parent',
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        
        // Previous School Information
        previousSchool: formData.previousSchool,
        previousGrade: formData.previousGrade,
        reasonForTransfer: formData.reasonForTransfer,
        
        // Additional Information
        medicalConditions: formData.medicalConditions || 'None',
        specialNeeds: formData.specialNeeds || 'None',
        extracurriculars: formData.extracurriculars,
      };

      const response = await applicationsApi.create(applicationData);
      
      if (response.success) {
        const appNumber = response.data.application.applicationNumber;
        setSubmissionData({ applicationNumber: appNumber });
        setShowSuccessModal(true);
        
        // Reset form
        setFormData({
          studentFirstName: '',
          studentLastName: '',
          dateOfBirth: '',
          gender: '',
          nationality: '',
          program: '',
          currentGrade: '',
          parentFirstName: '',
          parentLastName: '',
          relationship: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          previousSchool: '',
          previousGrade: '',
          reasonForTransfer: '',
          medicalConditions: '',
          specialNeeds: '',
          extracurriculars: '',
          documents: []
        });
        
        // Reset to first step
        setCurrentStep(1);
        setFormErrors({});
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit application. Please try again.';
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Admission Process Hero */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary-red via-burgundy-deep to-charcoal-black overflow-hidden pt-10 pb-16 md:pt-24 md:pb-20">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/10 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 h-full flex flex-col">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16 pt-8 md:pt-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gold font-medium text-sm md:text-lg tracking-wide uppercase mb-4"
            >
              Admissions Process
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            >
              Begin Your Child's
              <span className="block text-gold">Educational Journey</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/90 text-base md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Join our community of excellence where every student is valued, challenged, and prepared for global success. Follow our simple admission process to get started.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16"
            >
              <Button 
                size="lg" 
                className="bg-gold hover:bg-yellow-600 text-charcoal-black font-semibold px-8"
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Apply Now
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-charcoal-black font-semibold px-8">
                  Schedule Visit
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex-1"
          >
            {/* Mobile: Vertical Layout */}
            <div className="block md:hidden space-y-8">
              {admissionSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                  >
                    <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-charcoal-black" />
                    </div>
                    <div className="flex-1">
                      <div className="text-gold font-semibold text-sm tracking-wide uppercase mb-2">
                        Step {step.step}
                      </div>
                      <h3 className="font-display font-bold text-lg text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {admissionSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
                    className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Icon className="h-8 w-8 text-charcoal-black" />
                    </div>
                    <div className="w-8 h-1 bg-gold rounded-full mx-auto mb-4" />
                    <div className="text-gold font-semibold text-sm tracking-wide uppercase mb-3">
                      Step {step.step}
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-center pb-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-white/60"
            >
              <span className="text-sm font-medium mb-2 hidden md:block">Scroll to apply</span>
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-white/60 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white md:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl text-charcoal-black mb-6 md:text-4xl">
              Application Form
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Complete the form below to begin your child's admission process
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-xl border-0">
              <div className="p-4 md:p-8 lg:p-12">
                {/* Step Progress Indicator */}
                <div className="mb-8 md:mb-12">
                {/* Desktop Progress Indicator */}
                <div className="hidden md:flex items-center justify-between">
                  {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = currentStep === stepNumber;
                    const isCompleted = currentStep > stepNumber;
                    const isClickable = stepNumber <= currentStep;

                    return (
                      <div key={stepNumber} className="flex-1">
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => isClickable ? goToStep(stepNumber) : null}
                            disabled={!isClickable}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                              isCompleted
                                ? 'bg-green-500 text-white'
                                : isActive
                                ? 'bg-primary-red text-white'
                                : isClickable
                                ? 'bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              stepNumber
                            )}
                          </button>
                          
                          {index < steps.length - 1 && (
                            <div 
                              className={`flex-1 h-0.5 mx-4 transition-all duration-200 ${
                                isCompleted ? 'bg-green-500' : 'bg-gray-200'
                              }`} 
                            />
                          )}
                        </div>
                        
                        <div className="mt-2 text-center">
                          <p className={`text-xs font-medium ${
                            isActive ? 'text-primary-red' : isCompleted ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {step.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1 hidden sm:block">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Progress Indicator */}
                <div className="md:hidden">
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center space-x-2">
                      {steps.map((step, index) => {
                        const stepNumber = index + 1;
                        const isActive = currentStep === stepNumber;
                        const isCompleted = currentStep > stepNumber;
                        
                        return (
                          <div key={stepNumber} className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                                isCompleted
                                  ? 'bg-green-500 text-white'
                                  : isActive
                                  ? 'bg-primary-red text-white'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                stepNumber
                              )}
                            </div>
                            {index < steps.length - 1 && (
                              <div 
                                className={`w-6 h-0.5 mx-1 transition-all duration-200 ${
                                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                }`} 
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Current Step Info for Mobile */}
                  <div className="text-center mb-8">
                    <p className="text-sm font-medium text-primary-red mb-1">
                      Step {currentStep} of {totalSteps}
                    </p>
                    <h3 className="text-xl font-bold text-charcoal-black">
                      {steps[currentStep - 1].title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {steps[currentStep - 1].description}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6 md:space-y-8">
                {/* Step 1: Student Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6 md:mb-8 md:block hidden">
                      <h3 className="font-display font-bold text-2xl text-charcoal-black mb-3">
                        Student Information
                      </h3>
                      <p className="text-gray-600 text-lg">
                        Tell us about the student applying for admission
                      </p>
                    </div>
                    
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:gap-6 lg:gap-8 max-w-4xl mx-auto">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="studentFirstName"
                          value={formData.studentFirstName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-md md:rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-red focus:border-transparent focus:outline-none transition-all duration-200 ${
                            formErrors.studentFirstName ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-primary-red'
                          }`}
                        />
                        {formErrors.studentFirstName && (
                          <p className="text-red-500 text-xs md:text-sm mt-1">{formErrors.studentFirstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="studentLastName"
                          value={formData.studentLastName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-md md:rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-red focus:border-transparent focus:outline-none transition-all duration-200 ${
                            formErrors.studentLastName ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-primary-red'
                          }`}
                        />
                        {formErrors.studentLastName && (
                          <p className="text-red-500 text-xs md:text-sm mt-1">{formErrors.studentLastName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={(e) => {
                            console.log('Date input changed:', e.target.value);
                            handleInputChange(e);
                          }}
                          max={new Date().toISOString().split('T')[0]}
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-md md:rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-red focus:border-transparent focus:outline-none transition-all duration-200 ${
                            formErrors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-primary-red'
                          }`}
                        />
                        {formErrors.dateOfBirth && (
                          <p className="text-red-500 text-xs md:text-sm mt-1">{formErrors.dateOfBirth}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Gender *
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-md md:rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-red focus:border-transparent focus:outline-none transition-all duration-200 ${
                            formErrors.gender ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-primary-red'
                          }`}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        {formErrors.gender && (
                          <p className="text-red-500 text-xs md:text-sm mt-1">{formErrors.gender}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Program *
                        </label>
                        <select
                          name="program"
                          value={formData.program}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-md md:rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-red focus:border-transparent focus:outline-none transition-all duration-200 ${
                            formErrors.program ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-primary-red'
                          }`}
                        >
                          <option value="">Select Program</option>
                          <option value="playgroup">Playgroup</option>
                          <option value="nursery">Nursery</option>
                          <option value="pre-primary">Pre-Primary</option>
                          <option value="primary">Primary (Grade 1-6)</option>
                        </select>
                        {formErrors.program && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.program}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Nationality *
                        </label>
                        <input
                          type="text"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          placeholder="e.g., Kenyan, British"
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-md md:rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-red focus:border-transparent focus:outline-none transition-all duration-200 ${
                            formErrors.nationality ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-primary-red'
                          }`}
                        />
                        {formErrors.nationality && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.nationality}</p>
                        )}
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Grade/Class Applying For *
                        </label>
                        <select
                          name="currentGrade"
                          value={formData.currentGrade}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-md md:rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-red focus:border-transparent focus:outline-none transition-all duration-200 ${
                            formErrors.currentGrade ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-primary-red'
                          }`}
                        >
                          <option value="">Select Grade/Class</option>
                          <option value="playgroup">Playgroup</option>
                          <option value="nursery">Nursery</option>
                          <option value="pre-primary">Pre-Primary</option>
                          <option value="grade-1">Grade 1</option>
                          <option value="grade-2">Grade 2</option>
                          <option value="grade-3">Grade 3</option>
                          <option value="grade-4">Grade 4</option>
                          <option value="grade-5">Grade 5</option>
                          <option value="grade-6">Grade 6</option>
                        </select>
                        {formErrors.currentGrade && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.currentGrade}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Parent/Guardian Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6 md:mb-8 md:block hidden">
                      <h3 className="font-display font-bold text-2xl text-charcoal-black mb-3">
                        Parent/Guardian Information
                      </h3>
                      <p className="text-gray-600 text-lg">
                        Provide your contact details and information
                      </p>
                    </div>
                    
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:gap-6 lg:gap-8 max-w-4xl mx-auto">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="parentFirstName"
                          value={formData.parentFirstName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-md md:rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-red focus:border-transparent focus:outline-none transition-all duration-200 ${
                            formErrors.parentFirstName ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-primary-red'
                          }`}
                        />
                        {formErrors.parentFirstName && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.parentFirstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="parentLastName"
                          value={formData.parentLastName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-md md:rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-red focus:border-transparent focus:outline-none transition-all duration-200 ${
                            formErrors.parentLastName ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-primary-red'
                          }`}
                        />
                        {formErrors.parentLastName && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.parentLastName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Relationship to Student
                        </label>
                        <select
                          name="relationship"
                          value={formData.relationship}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 border border-gray-300 rounded-xl text-base focus:ring-0 focus:outline-none focus:border-primary-red transition-all duration-200"
                        >
                          <option value="">Select Relationship</option>
                          <option value="parent">Parent</option>
                          <option value="guardian">Guardian</option>
                          <option value="aunt">Aunt</option>
                          <option value="uncle">Uncle</option>
                          <option value="grandparent">Grandparent</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-md md:rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-red focus:border-transparent focus:outline-none transition-all duration-200 ${
                            formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-primary-red'
                          }`}
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+254 7XX XXX XXX"
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-md md:rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-red focus:border-transparent focus:outline-none transition-all duration-200 ${
                            formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-primary-red'
                          }`}
                        />
                        {formErrors.phone && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="e.g., Nairobi, Mombasa"
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-md md:rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-red focus:border-transparent focus:outline-none transition-all duration-200 ${
                            formErrors.city ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-primary-red'
                          }`}
                        />
                        {formErrors.city && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                        )}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Home Address *
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Enter your full home address"
                          className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-md md:rounded-lg text-sm md:text-base focus:ring-2 focus:ring-primary-red focus:border-transparent focus:outline-none transition-all duration-200 ${
                            formErrors.address ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-primary-red'
                          }`}
                        />
                        {formErrors.address && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: School History */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6 md:mb-8 md:block hidden">
                      <h3 className="font-display font-bold text-2xl text-charcoal-black mb-3">
                        School History
                      </h3>
                      <p className="text-gray-600 text-lg">
                        Tell us about the student's previous school experience (optional)
                      </p>
                    </div>
                    
                    <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Previous School Name
                        </label>
                        <input
                          type="text"
                          name="previousSchool"
                          value={formData.previousSchool}
                          onChange={handleInputChange}
                          placeholder="Enter the name of the previous school"
                          className="w-full px-5 py-4 border border-gray-300 rounded-xl text-base focus:ring-0 focus:outline-none focus:border-primary-red transition-all duration-200"
                        />
                      </div>
                      
                      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                            Previous Grade/Class
                          </label>
                          <input
                            type="text"
                            name="previousGrade"
                            value={formData.previousGrade}
                            onChange={handleInputChange}
                            placeholder="e.g., Grade 3, Form 2"
                            className="w-full px-5 py-4 border border-gray-300 rounded-xl text-base focus:ring-0 focus:outline-none focus:border-primary-red transition-all duration-200"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                            Reason for Transfer
                          </label>
                          <select
                            name="reasonForTransfer"
                            value={formData.reasonForTransfer}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 border border-gray-300 rounded-xl text-base focus:ring-0 focus:outline-none focus:border-primary-red transition-all duration-200"
                          >
                            <option value="">Select Reason</option>
                            <option value="relocation">Family Relocation</option>
                            <option value="academic">Better Academic Program</option>
                            <option value="facilities">Better Facilities</option>
                            <option value="distance">Distance from Home</option>
                            <option value="fees">Fee Structure</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Additional Information */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6 md:mb-8 md:block hidden">
                      <h3 className="font-display font-bold text-2xl text-charcoal-black mb-3">
                        Additional Information
                      </h3>
                      <p className="text-gray-600 text-lg">
                        Help us provide the best care for your child (optional)
                      </p>
                    </div>
                    
                    <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Medical Conditions or Special Needs
                        </label>
                        <textarea
                          name="medicalConditions"
                          value={formData.medicalConditions}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Please describe any medical conditions, allergies, or special needs we should be aware of"
                          className="w-full px-5 py-4 border border-gray-300 rounded-xl text-base focus:ring-0 focus:outline-none focus:border-primary-red transition-all duration-200"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          This information will be kept confidential and used only to provide appropriate care
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Learning Support Needs
                        </label>
                        <textarea
                          name="specialNeeds"
                          value={formData.specialNeeds}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Does your child require any additional learning support or accommodations?"
                          className="w-full px-5 py-4 border border-gray-300 rounded-xl text-base focus:ring-0 focus:outline-none focus:border-primary-red transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Extracurricular Interests
                        </label>
                        <textarea
                          name="extracurriculars"
                          value={formData.extracurriculars}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="What sports, hobbies, or activities is your child interested in?"
                          className="w-full px-5 py-4 border border-gray-300 rounded-xl text-base focus:ring-0 focus:outline-none focus:border-primary-red transition-all duration-200"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="pt-12 mt-12 border-t border-gray-200">
                  {/* Desktop Navigation */}
                  <div className="hidden md:flex justify-between items-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        prevStep();
                      }}
                      disabled={currentStep === 1}
                      className={`px-6 ${currentStep === 1 ? 'invisible' : ''}`}
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>Step {currentStep} of {totalSteps}</span>
                    </div>
                    
                    {currentStep < totalSteps ? (
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          nextStep();
                        }}
                        className="px-6"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 bg-green-600 hover:bg-green-700"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Submitting...
                          </div>
                        ) : (
                          'Submit Application'
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Mobile Navigation */}
                  <div className="md:hidden space-y-4">
                    {currentStep < totalSteps ? (
                      <div className="space-y-3">
                        <Button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            nextStep();
                          }}
                          className="w-full py-4 text-base font-semibold"
                          size="lg"
                        >
                          Continue to Next Step
                        </Button>
                        {currentStep > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              prevStep();
                            }}
                            className="w-full py-3 text-base"
                          >
                            Back to Previous Step
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 text-base font-semibold bg-green-600 hover:bg-green-700"
                          size="lg"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                              Submitting Application...
                            </div>
                          ) : (
                            'Submit Application'
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            prevStep();
                          }}
                          className="w-full py-3 text-base"
                        >
                          Back to Previous Step
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Progress Footer */}
                <div className="text-center pt-8">
                  <p className="text-sm text-gray-500">
                    * Required fields. Application fee of KES 5,000 will be required upon submission.
                  </p>
                </div>
              </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Requirements & Contact */}
      <section className="py-16 bg-neutral-light md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display font-bold text-2xl text-charcoal-black mb-6">
                Required Documents
              </h3>
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display font-bold text-2xl text-charcoal-black mb-6">
                Admissions Office
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary-red" />
                  <span className="text-gray-700">+254 20 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary-red" />
                  <span className="text-gray-700">admissions@westgate.ac.ke</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary-red mt-0.5" />
                  <span className="text-gray-700">
                    Westgate School<br />
                    P.O. Box 123-00100<br />
                    Nairobi, Kenya
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary-red" />
                  <span className="text-gray-700">
                    Mon - Fri: 8:00 AM - 5:00 PM<br />
                    Sat: 9:00 AM - 1:00 PM
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && submissionData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white relative">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", damping: 15 }}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="h-8 w-8 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
                  <p className="text-green-100">Your application has been successfully submitted</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-center space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Application Number</p>
                    <p className="text-2xl font-bold text-charcoal-black font-mono tracking-wider">
                      {submissionData.applicationNumber}
                    </p>
                  </div>
                  
                  <div className="text-left space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        We will contact you within <strong>3-5 business days</strong> to discuss the next steps.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        Please keep your application number for reference.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        Check your email for a confirmation message.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(submissionData.applicationNumber);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Copy Number
                  </Button>
                  <Button
                    onClick={() => setShowSuccessModal(false)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Got It
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}