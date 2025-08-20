'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Globe, Heart, Target, Eye, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const values = [
  {
    icon: Award,
    title: 'Academic Excellence',
    description: 'We strive for the highest standards in education, ensuring every student reaches their full potential.'
  },
  {
    icon: Heart,
    title: 'Character Development',
    description: 'Building strong moral foundations and ethical leadership qualities in our students.'
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'Preparing students to be confident global citizens in an interconnected world.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Embracing creative thinking and innovative approaches to learning and problem-solving.'
  }
];

const leadership = [
  {
    name: 'Dr. Sarah Mwangi',
    role: 'Principal',
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/team/principal.jpg',
    bio: 'Leading Westgate for over 15 years with a vision for educational excellence.'
  },
  {
    name: 'Prof. Michael Kimani',
    role: 'Deputy Principal (Academics)',
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/team/deputy-academics.jpg',
    bio: 'Expert in curriculum development with 20+ years in international education.'
  },
  {
    name: 'Mrs. Grace Wanjiku',
    role: 'Deputy Principal (Student Affairs)',
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/team/deputy-student-affairs.jpg',
    bio: 'Passionate advocate for student welfare and holistic development.'
  }
];

const milestones = [
  { year: '1995', event: 'Westgate School founded', description: 'Established with a vision for excellence' },
  { year: '2001', event: 'Cambridge International Status', description: 'Became an authorized Cambridge school' },
  { year: '2010', event: 'Secondary School Launch', description: 'Expanded to offer IGCSE and A-Levels' },
  { year: '2015', event: 'Award of Excellence', description: 'Recognized as top performing school nationally' },
  { year: '2020', event: 'Digital Learning Initiative', description: 'Pioneered online learning during pandemic' },
  { year: '2023', event: '28 Years of Excellence', description: 'Celebrating nearly three decades of success' }
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://res.cloudinary.com/westgate-school/image/upload/v1/about/hero-about.jpg" 
            alt="About Westgate"
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
            About Westgate
          </motion.div>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white font-display font-bold text-3xl leading-tight mb-6 md:text-6xl"
          >
            Shaping Future Leaders
            <span className="block text-gold">Since 1995</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto mb-8 md:text-xl"
          >
            For nearly three decades, Westgate has been at the forefront of educational innovation, 
            nurturing young minds and building character that lasts a lifetime.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" className="bg-gold hover:bg-yellow-600 text-charcoal-black font-semibold">
              Discover Our Story
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-16 bg-white md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          {/* Mission & Vision */}
          <div className="grid gap-8 mb-16 md:grid-cols-2 md:gap-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start mb-6">
                <Target className="h-8 w-8 text-primary-red mr-3" />
                <h2 className="font-display font-bold text-2xl text-charcoal-black md:text-3xl">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide world-class education that develops academic excellence, strong character, 
                and global citizenship, empowering students to make a positive impact in their communities 
                and the world at large.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start mb-6">
                <Eye className="h-8 w-8 text-primary-red mr-3" />
                <h2 className="font-display font-bold text-2xl text-charcoal-black md:text-3xl">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be the leading educational institution in East Africa, recognized for excellence 
                in academic achievement, character development, and preparing students for success 
                in a rapidly changing global landscape.
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl text-charcoal-black mb-6 md:text-4xl">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do at Westgate School
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card padding="lg" className="h-full text-center group hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-primary-red/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-red/20 transition-colors duration-300">
                      <Icon className="h-8 w-8 text-primary-red" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-charcoal-black mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
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
              Leadership Team
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Meet the dedicated leaders who guide our school's vision and ensure 
              excellence in every aspect of education.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="font-display font-bold text-xl text-charcoal-black mb-2">
                  {leader.name}
                </h3>
                <p className="text-primary-red font-semibold mb-4">
                  {leader.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {leader.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History & Milestones */}
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
              Our Journey
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Key milestones that have shaped Westgate into the institution it is today
            </p>
          </motion.div>

          <div className="space-y-8 md:space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 text-center md:text-left">
                  <div className="text-primary-red font-bold text-xl mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-charcoal-black mb-4">
                    {milestone.event}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
                <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
              </motion.div>
            ))}
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
              Join the Westgate Family
            </h2>
            <p className="text-white/90 text-lg leading-relaxed mb-8 md:text-xl">
              Discover how we can help your child reach their full potential in a 
              nurturing, academically rigorous environment.
            </p>
            <div className="flex flex-col gap-4 max-w-md mx-auto md:flex-row md:max-w-none md:justify-center">
              <Button size="lg" variant="secondary" className="font-semibold">
                Schedule a Tour
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-charcoal-black font-semibold">
                Download Prospectus
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}