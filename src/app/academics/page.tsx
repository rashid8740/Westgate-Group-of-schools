'use client';

import React from 'react';
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
    title: 'Cambridge Primary',
    ageRange: '5-11 years',
    description: 'Foundation years that build essential skills in core subjects while nurturing creativity and curiosity.',
    subjects: ['English', 'Mathematics', 'Science', 'ICT', 'Art & Design', 'Physical Education'],
    highlights: [
      'Child-centered learning approach',
      'Development of critical thinking',
      'Strong foundation in literacy and numeracy',
      'Introduction to scientific concepts'
    ],
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/academics/cambridge-primary.jpg'
  },
  {
    title: 'Cambridge IGCSE',
    ageRange: '14-16 years',
    description: 'Internationally recognized qualification that prepares students for further study and develops practical skills.',
    subjects: ['Core Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Business Studies'],
    highlights: [
      'Internationally recognized qualification',
      'Develops independent learning skills',
      'Flexible subject combinations',
      'Excellent preparation for A-Levels'
    ],
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/academics/cambridge-igcse.jpg'
  },
  {
    title: 'Cambridge A-Levels',
    ageRange: '16-18 years',
    description: 'Advanced level qualification that provides excellent preparation for university and develops deep subject knowledge.',
    subjects: ['Mathematics', 'Further Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Business', 'Psychology'],
    highlights: [
      'Gold standard for university admission',
      'Develops analytical and critical thinking',
      'In-depth subject specialization',
      'Recognized by universities worldwide'
    ],
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/academics/cambridge-alevels.jpg'
  }
];

const departments = [
  {
    name: 'Sciences',
    icon: Microscope,
    subjects: ['Physics', 'Chemistry', 'Biology', 'Computer Science'],
    description: 'State-of-the-art laboratories and expert faculty foster scientific inquiry and innovation.',
    facilities: ['Modern physics lab', 'Chemistry laboratory', 'Biology lab with specimens', 'Computer lab with latest software']
  },
  {
    name: 'Mathematics',
    icon: Calculator,
    subjects: ['Core Mathematics', 'Further Mathematics', 'Statistics'],
    description: 'Developing logical thinking and problem-solving skills through comprehensive mathematics education.',
    facilities: ['Interactive whiteboards', 'Mathematical software', 'Graphing calculators', 'Problem-solving workshops']
  },
  {
    name: 'Languages & Literature',
    icon: Languages,
    subjects: ['English Language', 'English Literature', 'Kiswahili', 'French'],
    description: 'Building communication skills and cultural awareness through language and literature study.',
    facilities: ['Language laboratory', 'Library with extensive collection', 'Drama studio', 'Debate society']
  },
  {
    name: 'Humanities',
    icon: Globe,
    subjects: ['History', 'Geography', 'Business Studies', 'Economics'],
    description: 'Understanding human society, culture, and global perspectives through comprehensive humanities education.',
    facilities: ['Resource center', 'Map room', 'Mock trading floor', 'Historical artifacts collection']
  },
  {
    name: 'Creative Arts',
    icon: Palette,
    subjects: ['Art & Design', 'Music', 'Drama', 'Creative Writing'],
    description: 'Nurturing creativity and artistic expression through diverse creative arts programs.',
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
              <Button size="lg" variant="secondary" className="font-semibold">
                Schedule Academic Tour
              </Button>
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