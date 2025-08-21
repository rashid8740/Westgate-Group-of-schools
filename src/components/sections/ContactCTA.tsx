'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Calendar, Download, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const contactMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our admissions team',
    action: '+254 722 000 000',
    href: 'tel:+254722000000',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us your questions and inquiries',
    action: 'info@westgateschool.ac.ke',
    href: 'mailto:info@westgateschool.ac.ke',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Schedule a campus tour and see our facilities',
    action: 'Book School Tour',
    href: '/contact',
    color: 'from-purple-500 to-purple-600'
  }
];

const quickActions = [
  {
    icon: Calendar,
    title: 'Schedule Tour',
    description: 'Book a personalized campus visit',
    buttonText: 'Book Now',
    variant: 'primary' as const,
    href: '/contact'
  },
  {
    icon: Download,
    title: 'Download Prospectus',
    description: 'Get detailed information about our programs',
    buttonText: 'Download PDF',
    variant: 'outline' as const,
    href: '/about'
  }
];

export const ContactCTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-neutral-light via-white to-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-primary-red font-medium text-lg mb-4">
            Ready to Begin?
          </div>
          
          <h2 className="font-display font-bold text-4xl md:text-5xl text-charcoal-black mb-6">
            Take the Next 
            <span className="text-primary-red"> Step</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join the Westgate family and give your child the foundation for a bright future. 
            Our admissions team is here to guide you through the process.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover padding="lg" className="text-center h-full group cursor-pointer">
                  <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="font-display font-semibold text-xl text-charcoal-black mb-3">
                    {method.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {method.description}
                  </p>
                  
                  <a
                    href={method.href}
                    className="text-primary-red font-semibold hover:text-burgundy-deep transition-colors inline-flex items-center"
                  >
                    {method.action}
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card padding="lg" className="h-full">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary-red" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-xl text-charcoal-black mb-2">
                        {action.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {action.description}
                      </p>
                      
                      <Link href={action.href}>
                        <Button variant={action.variant} size="lg" className="w-full sm:w-auto">
                          {action.buttonText}
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Office Hours & Location */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-primary-red to-burgundy-deep rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Content */}
            <div>
              <h3 className="font-display font-bold text-3xl mb-6">
                Visit Our Campus
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Address</div>
                    <div className="opacity-90">
                      Muthiga, Kikuyu<br />
                      Off Nairobi-Nakuru Highway<br />
                      Opposite Tulia Gardens<br />
                      P.O. Box 849, Kikuyu 00902
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Office Hours</div>
                    <div className="opacity-90">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 8:00 AM - 1:00 PM<br />
                      Sunday: 9:00 AM - 1:00 PM
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="secondary" size="lg">
                Get Directions
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white/10 rounded-xl p-8 text-center backdrop-blur-sm">
              <div className="w-full h-64 bg-white/20 rounded-lg flex items-center justify-center">
                <div className="text-white/80">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <div className="font-semibold">Interactive Map</div>
                  <div className="text-sm opacity-75">Click to view in Google Maps</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="font-display font-bold text-3xl text-charcoal-black mb-4">
            Ready to Shape Your Child's Future?
          </h3>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Don't wait - exceptional education opportunities are limited. 
            Contact us today to begin your child's journey at Westgate.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissions">
              <Button size="xl" className="text-lg">
                Apply Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="xl" className="text-lg">
                Schedule Consultation
              </Button>
            </Link>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            Application deadline: March 31st, 2024
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
