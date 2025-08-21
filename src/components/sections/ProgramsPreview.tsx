'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Baby, GraduationCap, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const programs = [
  {
    icon: Baby,
    title: 'Playgroup & Nursery',
    subtitle: 'Early Childhood',
    description: 'A nurturing environment where young minds begin their educational journey through play-based learning and creative exploration.',
    features: ['Play-based Learning', 'Creative Arts', 'Social Development', 'Early Literacy'],
    ageRange: '2-4 years',
    color: 'from-pink-500 to-purple-600'
  },
  {
    icon: GraduationCap,
    title: 'Pre-Primary',
    subtitle: 'Foundation Education',
    description: 'Preparation for primary education with emphasis on reading, writing, and mathematical foundations.',
    features: ['Structured Learning', 'Christian Values', 'Holistic Development', 'School Readiness'],
    ageRange: '4-6 years',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Trophy,
    title: 'Primary School (CBC)',
    subtitle: 'Competency Based Curriculum',
    description: 'Primary education from Grade 1 to 6, preparing students for KCPE excellence with Christian values.',
    features: ['CBC Curriculum', 'KCPE Preparation', 'Co-curricular Activities', 'Christian Values'],
    ageRange: '6-12 years',
    color: 'from-primary-red to-burgundy-deep'
  }
];

export const ProgramsPreview: React.FC = () => {
  return (
    <section className="py-8 bg-white md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-16"
        >
          <div className="text-primary-red font-medium text-sm mb-3 md:text-lg md:mb-4">
            Our Academic Programs
          </div>
          
          <h2 className="font-display font-bold text-xl text-charcoal-black mb-3 md:text-4xl lg:text-5xl md:mb-6">
            Excellence at Every 
            <span className="text-primary-red"> Stage</span>
          </h2>
          
          <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed md:text-xl md:max-w-3xl">
            From playgroup to Grade 6, our comprehensive programs are designed 
            to nurture academic excellence, creativity, and character development at every stage 
            of your child's educational journey, following the Competency Based Curriculum.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 gap-4 mb-6 lg:grid-cols-3 md:gap-6 md:mb-16">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover padding="none" className="h-full overflow-hidden group">
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-br ${program.color} p-4 text-white relative overflow-hidden md:p-8`}>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full transform translate-x-4 -translate-y-4 md:w-32 md:h-32 md:translate-x-8 md:-translate-y-8" />
                    <div className="relative z-10">
                      <Icon className="h-6 w-6 mb-2 md:h-12 md:w-12 md:mb-4" />
                      <div className="text-xs font-medium opacity-90 mb-1 md:text-sm md:mb-2">
                        {program.subtitle}
                      </div>
                      <h3 className="font-display font-bold text-lg mb-2 md:text-2xl">
                        {program.title}
                      </h3>
                      <div className="text-xs bg-white/20 px-2 py-1 rounded-full inline-block md:text-sm md:px-3">
                        {program.ageRange}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-8">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 md:text-base md:mb-6">
                      {program.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-4 md:space-y-3 md:mb-8">
                      {program.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 md:gap-3">
                          <div className="w-1 h-1 bg-primary-red rounded-full flex-shrink-0 md:w-2 md:h-2" />
                          <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>


                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-red to-burgundy-deep rounded-xl p-6 text-white md:rounded-2xl md:p-12">
            <h3 className="font-display font-bold text-lg mb-3 md:text-3xl md:mb-4">
              Ready to Begin Your Child's Journey?
            </h3>
            <p className="text-sm mb-6 opacity-90 max-w-md mx-auto md:text-xl md:mb-8 md:max-w-none">
              Schedule a school tour and discover how Westgate can unlock your child's potential.
            </p>
            <div className="flex flex-col gap-3 max-w-xs mx-auto md:flex-row md:gap-4 md:justify-center md:max-w-none">
              <Link href="/contact">
                <Button size="md" variant="secondary" className="text-sm font-medium md:size-lg">
                  Schedule School Tour
                </Button>
              </Link>
              <Button size="md" variant="outline" className="text-sm font-medium bg-white/10 border-white text-white hover:bg-white hover:text-charcoal-black md:size-lg">
                Download Prospectus
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsPreview;
