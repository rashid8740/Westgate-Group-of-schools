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
    title: '98% Pass Rate',
    description: 'Consistent high performance in Cambridge examinations',
    icon: Star
  },
  {
    title: 'A* - C Rate: 85%',
    description: 'Majority of students achieve top grades',
    icon: Award
  },
  {
    title: 'University Acceptance',
    description: '95% of graduates accepted to universities of choice',
    icon: GraduationCap
  },
  {
    title: 'International Recognition',
    description: 'Students admitted to top universities globally',
    icon: Globe
  }
];

const supportServices = [
  {
    title: 'Academic Support',
    description: 'Extra lessons, tutorial sessions, and individualized learning plans',
    icon: BookOpen
  },
  {
    title: 'University Guidance',
    description: 'Comprehensive counseling for university applications and career planning',
    icon: Target
  },
  {
    title: 'Small Class Sizes',
    description: 'Maximum 20 students per class ensures personalized attention',
    icon: Users
  },
  {
    title: 'Extended Learning',
    description: 'After-school programs, study groups, and enrichment activities',
    icon: Clock
  }
];

export default function Academics() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://res.cloudinary.com/westgate-school/image/upload/v1/academics/hero-academics.jpg" 
            alt="Academics"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-gold font-medium text-sm tracking-wide uppercase mb-4 md:text-lg"
          >
            Academics
          </motion.div>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white font-display font-bold text-3xl leading-tight mb-6 md:text-6xl"
          >
            Excellence in
            <span className="block text-gold">Academic Achievement</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto mb-8 md:text-xl"
          >
            Our rigorous Cambridge curriculum, combined with innovative teaching methods and 
            world-class facilities, prepares students for success in higher education and beyond.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" className="bg-gold hover:bg-yellow-600 text-charcoal-black font-semibold">
              Explore Our Programs
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Cambridge Curricula */}
      <section className="py-16 bg-white md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="font-display font-bold text-3xl text-charcoal-black mb-6 md:text-4xl">
              Cambridge International Curricula
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              World-class education programs designed to develop critical thinking, 
              creativity, and global awareness
            </p>
          </motion.div>

          <div className="space-y-16 md:space-y-24">
            {curricula.map((curriculum, index) => (
              <motion.div
                key={curriculum.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid gap-8 lg:grid-cols-2 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="text-primary-red font-semibold mb-2">
                    {curriculum.ageRange}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-charcoal-black mb-4 md:text-3xl">
                    {curriculum.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {curriculum.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-charcoal-black mb-3">Key Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {curriculum.subjects.map((subject) => (
                        <span 
                          key={subject}
                          className="bg-primary-red/10 text-primary-red px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-charcoal-black mb-3">Program Highlights:</h4>
                    <ul className="space-y-2">
                      {curriculum.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <img 
                    src={curriculum.image} 
                    alt={curriculum.title}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Departments */}
      <section className="py-16 bg-neutral-light md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="font-display font-bold text-3xl text-charcoal-black mb-6 md:text-4xl">
              Academic Departments
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Specialized departments with expert faculty and modern facilities
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card padding="lg" className="h-full hover:shadow-xl transition-all duration-300">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-primary-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary-red" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-charcoal-black">
                        {dept.name}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {dept.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-charcoal-black mb-3">Subjects:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dept.subjects.map((subject) => (
                          <span 
                            key={subject}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-charcoal-black mb-3">Facilities:</h4>
                      <ul className="space-y-1">
                        {dept.facilities.map((facility, idx) => (
                          <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                            <div className="w-1 h-1 bg-primary-red rounded-full mt-2 flex-shrink-0" />
                            {facility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academic Achievements */}
      <section className="py-16 bg-white md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="font-display font-bold text-3xl text-charcoal-black mb-6 md:text-4xl">
              Academic Excellence
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our commitment to excellence is reflected in outstanding academic results
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-primary-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-charcoal-black mb-3">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {achievement.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-16 bg-neutral-light md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="font-display font-bold text-3xl text-charcoal-black mb-6 md:text-4xl">
              Academic Support Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive support to ensure every student reaches their full potential
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {supportServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card padding="lg" className="h-full text-center hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-primary-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-red" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-charcoal-black mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-red to-burgundy-deep md:py-24">
        <div className="max-w-4xl mx-auto text-center px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-bold text-3xl text-white mb-6 md:text-4xl">
              Discover Academic Excellence
            </h2>
            <p className="text-white/90 text-lg leading-relaxed mb-8 md:text-xl">
              Experience our world-class academic programs firsthand. Schedule a visit 
              to see our facilities and meet our expert faculty.
            </p>
            <div className="flex flex-col gap-4 max-w-md mx-auto md:flex-row md:max-w-none md:justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Schedule Academic Tour
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-charcoal-black font-semibold">
                Download Curriculum Guide
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}