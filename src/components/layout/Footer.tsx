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
  { name: 'Contact Us', href: '/contact' },
];

const programs = [
  { name: 'Playgroup & Nursery', href: '/academics' },
  { name: 'Pre-Primary', href: '/academics' },
  { name: 'Primary School (CBC)', href: '/academics' },
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
      {/* Newsletter Section - Mobile Optimized */}
      <div className="bg-gradient-to-r from-primary-red to-burgundy-deep py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Stay Connected</h3>
            <p className="text-sm md:text-lg mb-4 md:mb-8 text-white/90">Get updates from Westgate Shield Primary School</p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 md:px-4 md:py-3 rounded-lg text-charcoal-black focus:outline-none focus:ring-2 focus:ring-gold text-sm md:text-base"
              />
              <Button variant="secondary" size="sm" className="md:size-md whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer - Mobile Optimized */}
      <div className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile: Compact Layout */}
          <div className="block md:hidden space-y-8">
            {/* School Info - Condensed */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src="/images/logo/footer.png" 
                    alt="Westgate Shield Primary School Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-lg">Westgate Shield</div>
                  <div className="text-gray-400 text-sm">Primary School</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4 max-w-xs mx-auto">
                Excellence in primary education and character development.
              </p>
              <div className="flex justify-center space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-red transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Contact Info - Essential Only */}
            <div className="text-center">
              <h4 className="text-base font-semibold mb-4 text-gold">Contact Us</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4 text-gold" />
                  <a href="tel:+254722826428" className="text-gray-300 hover:text-gold transition-colors">
                    +254 722 826 428
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4 text-gold" />
                  <a href="mailto:josphinewothaya@gmail.com" className="text-gray-300 hover:text-gold transition-colors">
                    josphinewothaya@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-4 w-4 text-gold" />
                  <span className="text-gray-300">Muthiga, Kikuyu</span>
                </div>
              </div>
            </div>

            {/* Quick Links - Horizontal */}
            <div className="text-center">
              <h4 className="text-base font-semibold mb-4 text-gold">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2 text-sm max-w-xs mx-auto">
                {quickLinks.slice(0, 4).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-300 hover:text-gold transition-colors py-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Full Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* School Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img 
                    src="/images/logo/footer.png" 
                    alt="Westgate Shield Primary School Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-xl">Westgate Shield</div>
                  <div className="text-gray-400">Primary School</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Nurturing tomorrow's leaders through excellence in primary education. 
                A premier Christian-based institution committed to academic excellence, character development, and holistic growth.
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
                      Muthiga, Kikuyu<br />
                      Off Nairobi-Nakuru Highway<br />
                      Opposite Tulia Gardens<br />
                      P.O. Box 849, Kikuyu 00902
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <a href="tel:+254722826428" className="text-gray-300 hover:text-gold transition-colors">
                      +254 722 826 428
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <a href="mailto:josphinewothaya@gmail.com" className="text-gray-300 hover:text-gold transition-colors">
                      josphinewothaya@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Office Hours</div>
                    <div className="text-gray-300">
                      Mon - Fri: 8:00 AM - 5:00 PM<br />
                      Sat: 8:00 AM - 1:00 PM<br />
                      Sun: 9:00 AM - 1:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Mobile Optimized */}
      <div className="border-t border-gray-800 py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              © {currentYear} Westgate Shield Primary School. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 text-xs md:text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-gold transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gold transition-colors">
                Terms
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
