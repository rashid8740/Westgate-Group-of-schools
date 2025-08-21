'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Globe, Heart, Target, Eye, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const values = [
  {
    icon: Award,
    title: 'Academic Excellence',
    description: 'Striving for high standards in education with proven KCPE performance.'
  },
  {
    icon: Heart,
    title: 'Christian Values',
    description: 'Building strong moral foundations through Christian principles and ethics.'
  },
  {
    icon: Users,
    title: 'Holistic Development',
    description: 'Developing the whole child through academics, sports, music, and drama.'
  },
  {
    icon: Target,
    title: 'Discipline & Patriotism',
    description: 'Instilling discipline, respect, and love for country in every student.'
  }
];

const leadership = [
  {
    name: 'Mrs. Josephine Gathii',
    role: 'Founder & Director',
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/team/founder.jpg',
    bio: 'Founded Westgate Shield Primary School in the early 1990s, building from humble beginnings to create a center of educational excellence.'
  },
  {
    name: 'Mr. Peter Gathii',
    role: 'Co-Founder & Director',
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/team/co-founder.jpg',
    bio: 'Partnered in establishing the school, contributing to its growth and development over three decades.'
  }
];

const milestones = [
  { year: 'Early 1990s', event: 'School Founded', description: 'Westgate Shield Primary School established by Josephine and Peter Gathii' },
  { year: '1990s', event: 'Humble Beginnings', description: 'Started with classrooms built from garage, pupil recruitment by word of mouth' },
  { year: '2010-2020', event: 'Academic Excellence', description: 'Consistently ranked among top 3 schools in Kabete Sub-county' },
  { year: '2020', event: 'KCPE Achievement', description: 'Remarkable mean score of 355.8, top student scored 416 marks' },
  { year: '2020', event: 'Subject Excellence', description: 'Excellent results in English (75.1), Social Studies (72.3), Kiswahili (71.4)' },
  { year: 'Present', event: '30+ Years of Excellence', description: 'Continuing to nurture future leaders with Christian values and holistic education' }
];

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-primary-red/5 via-white to-gold/5">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-primary-red font-medium text-sm md:text-base tracking-wide uppercase mb-3">
              About Westgate Shield Primary School
            </div>
            <h1 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl text-charcoal-black mb-4">
              Shaping Future Leaders
              <span className="block text-primary-red">Since Early 1990s</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Founded by Josephine and Peter Gathii, we've grown from humble beginnings to become 
              one of the top-performing primary schools in Kabete Sub-county.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision & Values - Compact Grid */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Combined Mission, Vision & Values in Grid */}
          <div className="grid gap-6 lg:gap-8">
            
            {/* Mission & Vision Row */}
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card padding="lg" className="h-full bg-primary-red/5 border-primary-red/10">
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-primary-red mr-3" />
                    <h2 className="font-display font-bold text-xl md:text-2xl text-charcoal-black">
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    To provide quality Christian-based education that develops academic excellence, 
                    strong character, and holistic growth, preparing students for success in secondary school and beyond.
                  </p>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card padding="lg" className="h-full bg-gold/5 border-gold/20">
                  <div className="flex items-center mb-4">
                    <Eye className="h-6 w-6 text-primary-red mr-3" />
                    <h2 className="font-display font-bold text-xl md:text-2xl text-charcoal-black">
                      Our Vision
                    </h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    To be the leading primary school in Kabete Sub-county, recognized for KCPE excellence, 
                    character development, and nurturing future leaders with Christian values.
                  </p>
                </Card>
              </motion.div>
            </div>

            {/* Core Values Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4"
            >
              <div className="text-center mb-6">
                <h2 className="font-display font-bold text-xl md:text-2xl text-charcoal-black mb-2">
                  Our Core Values
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  The principles that guide everything we do
                </p>
              </div>

              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <Card padding="md" className="h-full text-center hover:shadow-lg transition-all duration-300 bg-white border-gray-100">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary-red" />
                        </div>
                        <h3 className="font-display font-semibold text-sm md:text-base text-charcoal-black mb-2">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership & Journey Combined */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Leadership Team - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <div className="text-center mb-6">
              <h2 className="font-display font-bold text-xl md:text-2xl text-charcoal-black mb-2">
                Our Founders
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                The visionary leaders who established our school
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {leadership.map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card padding="lg" className="text-center h-full bg-white">
                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-red/10 to-gold/10 flex items-center justify-center">
                      <Users className="h-10 w-10 md:h-12 md:w-12 text-primary-red" />
                    </div>
                    <h3 className="font-display font-bold text-lg md:text-xl text-charcoal-black mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-primary-red font-semibold text-sm md:text-base mb-3">
                      {leader.role}
                    </p>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {leader.bio}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Journey - Compact Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center mb-6">
              <h2 className="font-display font-bold text-xl md:text-2xl text-charcoal-black mb-2">
                Our Journey
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Key milestones in our educational excellence
              </p>
            </div>

            {/* Mobile: Vertical Cards */}
            <div className="block md:hidden space-y-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`${milestone.year}-${milestone.event}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card padding="md" className="bg-white border-l-4 border-primary-red">
                    <div className="text-primary-red font-bold text-sm mb-1">
                      {milestone.year}
                    </div>
                    <h3 className="font-display font-semibold text-base text-charcoal-black mb-2">
                      {milestone.event}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`${milestone.year}-${milestone.event}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card padding="lg" className="h-full bg-white hover:shadow-lg transition-shadow duration-300 border-t-4 border-primary-red">
                    <div className="text-primary-red font-bold text-base mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="font-display font-semibold text-lg text-charcoal-black mb-3">
                      {milestone.event}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="py-6 md:py-8 bg-gradient-to-r from-primary-red to-burgundy-deep">
        <div className="max-w-4xl mx-auto text-center px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-xl md:text-2xl text-white mb-3 md:mb-4">
              Join the Westgate Family
            </h2>
            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6">
              Discover how we can help your child reach their full potential in our nurturing, Christian-based environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm sm:max-w-none mx-auto">
              <Link href="/contact">
                <Button size="md" variant="secondary" className="font-semibold w-full sm:w-auto">
                  Schedule a Tour
                </Button>
              </Link>
              <Link href="/admissions">
                <Button size="md" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-charcoal-black font-semibold w-full sm:w-auto">
                  Apply Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}