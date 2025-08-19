'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Globe } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const features = [
  {
    icon: Award,
    title: 'Academic Excellence',
    description: 'Consistently high performance in Cambridge IGCSE and A-Level examinations with 98% pass rate.'
  },
  {
    icon: Users,
    title: 'Expert Faculty',
    description: 'Highly qualified teachers with international experience and passion for education.'
  },
  {
    icon: BookOpen,
    title: 'Holistic Development',
    description: 'Comprehensive programs that develop academic, social, and emotional intelligence.'
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'International curriculum preparing students for universities worldwide.'
  }
];

export const WelcomeSection: React.FC = () => {
  return (
    <section className="py-16 bg-white md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-display font-bold text-3xl text-charcoal-black mb-6 md:text-5xl">
            Excellence in Education
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            For over 28 years, Westgate has been Kenya's leading Cambridge International School, 
            preparing students for global success.
          </p>
        </motion.div>

        {/* Features Grid - Clean & Minimal */}
        <div className="grid grid-cols-2 gap-6 mb-16 lg:grid-cols-4 md:gap-8 md:mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-primary-red/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-red/10 transition-colors duration-300">
                  <Icon className="h-8 w-8 text-primary-red" />
                </div>
                <h3 className="font-semibold text-charcoal-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Statistics - Clean Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-neutral-light rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="font-display font-bold text-2xl text-charcoal-black mb-3">
              Excellence in Numbers
            </h3>
            <p className="text-gray-600">
              Over two decades of academic excellence and character development
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: '28+', label: 'Years of Excellence' },
              { number: '1,200+', label: 'Students' },
              { number: '98%', label: 'Pass Rate' },
              { number: '150+', label: 'Awards' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-red mb-1 md:text-4xl">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WelcomeSection;
