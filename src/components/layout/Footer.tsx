'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Student Life', href: '/student-life' },
  { name: 'News & Events', href: '/news' },
  { name: 'Contact Us', href: '/contact' },
];

const programs = [
  { name: 'Early Years (Nursery)', href: '/academics#early-years' },
  { name: 'Primary School', href: '/academics#primary' },
  { name: 'Secondary School', href: '/academics#secondary' },
  { name: 'Cambridge IGCSE', href: '/academics#igcse' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-black text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary-red to-burgundy-deep py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
            <p className="text-lg mb-8">Get the latest news and updates from Westgate Group of Schools</p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-charcoal-black focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <Button variant="secondary" size="md">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* School Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-red rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">W</span>
                </div>
                <div>
                  <div className="font-display font-bold text-xl">Westgate</div>
                  <div className="text-gray-400">Group of Schools</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Nurturing tomorrow's leaders through excellence in education. 
                A premier institution committed to academic excellence and character development.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-red transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-gold transition-colors flex items-center group"
                    >
                      <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Our Programs</h4>
              <ul className="space-y-3">
                {programs.map((program) => (
                  <li key={program.name}>
                    <Link
                      href={program.href}
                      className="text-gray-300 hover:text-gold transition-colors flex items-center group"
                    >
                      <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {program.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Address</div>
                    <div className="text-gray-300">
                      Westgate Road, Nairobi<br />
                      P.O. Box 12345-00100<br />
                      Nairobi, Kenya
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <a href="tel:+254722000000" className="text-gray-300 hover:text-gold transition-colors">
                      +254 722 000 000
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <a href="mailto:info@westgateschool.ac.ke" className="text-gray-300 hover:text-gold transition-colors">
                      info@westgateschool.ac.ke
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Office Hours</div>
                    <div className="text-gray-300">
                      Mon - Fri: 7:00 AM - 5:00 PM<br />
                      Sat: 8:00 AM - 1:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Westgate Group of Schools. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gold transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-gold transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
