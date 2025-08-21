'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Award, 
  Users, 
  Clock, 
  Target, 
  Star, 
  GraduationCap,
  Microscope,
  Calculator,
  Globe,
  Palette,
  Music,
  Dumbbell,
  Languages
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const curricula = [
  {
    title: 'Playgroup & Nursery',
    ageRange: '2-4 years',
    description: 'Early childhood development focusing on foundational skills, creativity, and social interaction.',
    subjects: ['Basic Literacy', 'Numeracy', 'Art & Craft', 'Music & Movement', 'Physical Development', 'Social Skills'],
    highlights: [
      'Play-based learning approach',
      'Development of motor skills',
      'Introduction to basic concepts',
      'Safe and nurturing environment'
    ],
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/academics/playgroup-nursery.jpg'
  },
  {
    title: 'Pre-Primary',
    ageRange: '4-6 years',
    description: 'Preparation for primary education with emphasis on reading, writing, and mathematical foundations.',
    subjects: ['Reading & Writing', 'Mathematics', 'Environmental Activities', 'Creative Arts', 'Physical Education', 'Religious Education'],
    highlights: [
      'Structured learning environment',
      'Strong foundation for primary school',
      'Christian values integration',
      'Holistic development focus'
    ],
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/academics/pre-primary.jpg'
  },
  {
    title: 'Primary School (CBC)',
    ageRange: '6-12 years',
    description: 'Competency Based Curriculum from Grade 1 to 6, preparing students for KCPE excellence.',
    subjects: ['English', 'Kiswahili', 'Mathematics', 'Science & Technology', 'Social Studies', 'Creative Arts', 'Physical Education', 'Religious Education'],
    highlights: [
      'Competency Based Curriculum (CBC)',
      'Strong KCPE performance',
      'Christian values and patriotism',
      'Co-curricular activities integration'
    ],
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/academics/primary-cbc.jpg'
  }
];

const departments = [
  {
    name: 'Languages',
    icon: Languages,
    subjects: ['English', 'Kiswahili', 'French'],
    description: 'Building strong communication skills and cultural awareness through comprehensive language education.',
    facilities: ['Language laboratory', 'Library with extensive collection', 'Drama studio', 'Debate society']
  },
  {
    name: 'Mathematics',
    icon: Calculator,
    subjects: ['Mathematics', 'Numeracy', 'Problem Solving'],
    description: 'Developing logical thinking and problem-solving skills through comprehensive mathematics education.',
    facilities: ['Interactive whiteboards', 'Mathematical software', 'Problem-solving workshops', 'Individual tutoring']
  },
  {
    name: 'Sciences',
    icon: Microscope,
    subjects: ['Science & Technology', 'Environmental Activities', 'Basic Sciences'],
    description: 'Fostering scientific inquiry and innovation through hands-on learning experiences.',
    facilities: ['Science laboratory', 'Computer lab', 'Environmental garden', 'Science equipment']
  },
  {
    name: 'Social Studies',
    icon: Globe,
    subjects: ['Social Studies', 'Religious Education', 'Citizenship'],
    description: 'Understanding society, culture, and Christian values through comprehensive social education.',
    facilities: ['Resource center', 'Religious education room', 'Cultural materials', 'Community service projects']
  },
  {
    name: 'Creative Arts',
    icon: Palette,
    subjects: ['Art & Craft', 'Music', 'Drama', 'Physical Education'],
    description: 'Nurturing creativity and artistic expression through diverse co-curricular activities.',
    facilities: ['Art studios', 'Music rooms', 'Drama theater', 'Digital design lab']
  },
  {
    name: 'Physical Education',
    icon: Dumbbell,
    subjects: ['Physical Education', 'Sports Science', 'Health Education'],
    description: 'Promoting physical fitness, teamwork, and healthy lifestyle choices.',
    facilities: ['Sports fields', 'Swimming pool', 'Gymnasium', 'Fitness center']
  }
];

const achievements = [
  {
    title: 'KCPE Mean Score 355.8',
    description: '2020 exceptional performance with top student scoring 416',
    icon: Star
  },
  {
    title: 'Top 3 in Sub-county',
    description: 'Consistently ranked among best schools in Kabete',
    icon: Award
  },
  {
    title: 'Strong Subject Performance',
    description: 'English 75.1, Social Studies 72.3, Kiswahili 71.4',
    icon: BookOpen
  },
  {
    title: 'Secondary School Transition',
    description: 'Excellent placement rates in top secondary schools',
    icon: GraduationCap
  }
];

const supportServices = [
  {
    title: 'Individual Attention',
    description: 'Small class sizes ensure every child receives personalized support',
    icon: Users
  },
  {
    title: 'Academic Excellence',
    description: 'Dedicated teachers focused on KCPE preparation and success',
    icon: Target
  },
  {
    title: 'Co-curricular Activities',
    description: 'Drama, music, swimming, French, and computer classes',
    icon: Music
  },
  {
    title: 'Character Development',
    description: 'Christian values, discipline, and patriotism integrated daily',
    icon: Award
  }
];

export default function Academics() {
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
              Academic Excellence
            </div>
            <h1 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl text-charcoal-black mb-4">
              Quality Education for
              <span className="block text-primary-red">Future Leaders</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Our Competency Based Curriculum (CBC) from Playgroup to Grade 6 ensures academic excellence, 
              character development, and holistic growth in a Christian environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Academic Programs - Compact */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-display font-bold text-xl md:text-2xl text-charcoal-black mb-2">
              Our Academic Programmes
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Comprehensive CBC education from early childhood to Grade 6
            </p>
          </motion.div>

          <div className="grid gap-6 lg:gap-8">
            {curricula.map((curriculum, index) => (
              <motion.div
                key={curriculum.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card padding="lg" className="bg-white border-l-4 border-primary-red hover:shadow-lg transition-shadow duration-300">
                  <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                    {/* Content */}
                    <div className="lg:col-span-2">
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-primary-red font-semibold text-sm bg-primary-red/10 px-3 py-1 rounded-full">
                            {curriculum.ageRange}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-lg md:text-xl text-charcoal-black mb-2">
                          {curriculum.title}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                          {curriculum.description}
                        </p>
                      </div>

                      {/* Mobile: Highlights only */}
                      <div className="block lg:hidden">
                        <h4 className="font-semibold text-charcoal-black text-sm mb-2">Key Features:</h4>
                        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                          {curriculum.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-primary-red rounded-full mt-2 mr-2 flex-shrink-0" />
                              <span className="text-gray-600 text-xs">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Desktop: Full details */}
                      <div className="hidden lg:block space-y-4">
                        {/* Subjects */}
                        <div>
                          <h4 className="font-semibold text-charcoal-black text-sm mb-2">Key Subjects:</h4>
                          <div className="flex flex-wrap gap-2">
                            {curriculum.subjects.slice(0, 4).map((subject) => (
                              <span 
                                key={subject}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                              >
                                {subject}
                              </span>
                            ))}
                            {curriculum.subjects.length > 4 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                                +{curriculum.subjects.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h4 className="font-semibold text-charcoal-black text-sm mb-2">Programme Highlights:</h4>
                          <div className="grid gap-2 grid-cols-2">
                            {curriculum.highlights.map((highlight, i) => (
                              <div key={i} className="flex items-start">
                                <div className="w-1.5 h-1.5 bg-primary-red rounded-full mt-2 mr-2 flex-shrink-0" />
                                <span className="text-gray-600 text-sm">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Icon/Visual */}
                    <div className="flex items-center justify-center lg:justify-end">
                      <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-primary-red/10 to-gold/10 rounded-2xl flex items-center justify-center">
                        <BookOpen className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 text-primary-red" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Departments & Achievements Combined */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Departments - Compact Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <div className="text-center mb-6">
              <h2 className="font-display font-bold text-xl md:text-2xl text-charcoal-black mb-2">
                Academic Departments
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Specialized teaching areas with dedicated facilities
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {departments.slice(0, 5).map((dept, index) => {
                const Icon = dept.icon;
                return (
                  <motion.div
                    key={dept.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card padding="md" className="h-full bg-white hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary-red" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-base text-charcoal-black mb-1">
                            {dept.name}
                          </h3>
                          <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-2">
                            {dept.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {dept.subjects.slice(0, 2).map((subject) => (
                              <span 
                                key={subject}
                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                              >
                                {subject}
                              </span>
                            ))}
                            {dept.subjects.length > 2 && (
                              <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                                +{dept.subjects.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Achievements - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center mb-6">
              <h2 className="font-display font-bold text-xl md:text-2xl text-charcoal-black mb-2">
                Academic Excellence
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Outstanding performance and achievements
              </p>
            </div>

            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <Card padding="md" className="text-center bg-white hover:shadow-lg transition-shadow duration-300 h-full">
                      <Icon className="h-8 w-8 md:h-10 md:w-10 text-primary-red mx-auto mb-3" />
                      <h3 className="font-display font-bold text-sm md:text-base text-charcoal-black mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Services - Compact */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="font-display font-bold text-xl md:text-2xl text-charcoal-black mb-2">
              Why Choose Westgate Shield
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Comprehensive support for every child's success
            </p>
          </motion.div>

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {supportServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card padding="md" className="h-full text-center bg-white hover:shadow-lg transition-shadow duration-300 border-t-4 border-primary-red">
                    <Icon className="h-8 w-8 md:h-10 md:w-10 text-primary-red mx-auto mb-3" />
                    <h3 className="font-display font-semibold text-sm md:text-base text-charcoal-black mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
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
              Experience Academic Excellence
            </h2>
            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6">
              Discover our comprehensive CBC curriculum and see why we're a top choice for primary education in Kabete Sub-county.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm sm:max-w-none mx-auto">
              <Link href="/contact">
                <Button size="md" variant="secondary" className="font-semibold w-full sm:w-auto">
                  Schedule Academic Tour
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