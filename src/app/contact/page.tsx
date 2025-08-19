import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Contact Us - Westgate Group of Schools',
  description: 'Get in touch with Westgate Group of Schools. Contact our admissions team, schedule a school tour, or ask questions about our programs.',
};

export default function ContactPage() {
  return (
    <div className="py-20 bg-neutral-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-charcoal-black mb-6">
            Contact <span className="text-primary-red">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're here to help you take the next step in your child's educational journey. 
            Reach out to us for admissions information, school tours, or any questions you may have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Contact Details */}
            <Card padding="lg">
              <h3 className="font-display font-semibold text-2xl text-charcoal-black mb-6">
                Get In Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-black mb-1">Address</h4>
                    <p className="text-gray-600">
                      Westgate Road, Nairobi<br />
                      P.O. Box 12345-00100<br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-black mb-1">Phone</h4>
                    <p className="text-gray-600">
                      <a href="tel:+254722000000" className="hover:text-primary-red transition-colors">
                        +254 722 000 000
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-black mb-1">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:info@westgateschool.ac.ke" className="hover:text-primary-red transition-colors">
                        info@westgateschool.ac.ke
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-black mb-1">Office Hours</h4>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 7:00 AM - 5:00 PM</p>
                      <p>Saturday: 8:00 AM - 1:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Links */}
            <Card padding="lg">
              <h3 className="font-display font-semibold text-xl text-charcoal-black mb-4">
                Quick Links
              </h3>
              
              <div className="space-y-3">
                <a 
                  href="/admissions" 
                  className="block text-gray-600 hover:text-primary-red transition-colors py-2 border-b border-gray-100 last:border-b-0"
                >
                  Admissions Process
                </a>
                <a 
                  href="/academics" 
                  className="block text-gray-600 hover:text-primary-red transition-colors py-2 border-b border-gray-100 last:border-b-0"
                >
                  Academic Programs
                </a>
                <a 
                  href="/about" 
                  className="block text-gray-600 hover:text-primary-red transition-colors py-2 border-b border-gray-100 last:border-b-0"
                >
                  About Our School
                </a>
                <a 
                  href="/student-life" 
                  className="block text-gray-600 hover:text-primary-red transition-colors py-2 border-b border-gray-100 last:border-b-0"
                >
                  Student Life
                </a>
                <a 
                  href="/news" 
                  className="block text-gray-600 hover:text-primary-red transition-colors py-2"
                >
                  Latest News
                </a>
              </div>
            </Card>

            {/* Map Placeholder */}
            <Card padding="none" className="overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-primary-red to-burgundy-deep flex items-center justify-center text-white">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-80" />
                  <h4 className="font-semibold mb-2">Interactive Map</h4>
                  <p className="text-sm opacity-80">Click to view directions</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
