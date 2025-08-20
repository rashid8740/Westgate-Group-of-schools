'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Trophy,
  Music,
  Palette,
  Heart,
  Zap,
  Calendar,
  Clock,
  MapPin,
  Star
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Gallery images - using Cloudinary URLs
const galleryImages = [
  {
    id: 1,
    src: 'https://res.cloudinary.com/westgate-school/image/upload/v1/gallery/students-in-classroom.jpg',
    alt: 'Students engaged in classroom learning',
    category: 'academics'
  },
  {
    id: 2,
    src: 'https://res.cloudinary.com/westgate-school/image/upload/v1/gallery/science-lab-experiment.jpg',
    alt: 'Students conducting science experiments',
    category: 'academics'
  },
  {
    id: 3,
    src: 'https://res.cloudinary.com/westgate-school/image/upload/v1/gallery/sports-football-match.jpg',
    alt: 'Football match in progress',
    category: 'sports'
  },
  {
    id: 4,
    src: 'https://res.cloudinary.com/westgate-school/image/upload/v1/gallery/art-class-painting.jpg',
    alt: 'Students in art class painting',
    category: 'arts'
  },
  {
    id: 5,
    src: 'https://res.cloudinary.com/westgate-school/image/upload/v1/gallery/music-orchestra-performance.jpg',
    alt: 'School orchestra performance',
    category: 'arts'
  },
  {
    id: 6,
    src: 'https://res.cloudinary.com/westgate-school/image/upload/v1/gallery/swimming-pool-competition.jpg',
    alt: 'Swimming competition at school pool',
    category: 'sports'
  },
  {
    id: 7,
    src: 'https://res.cloudinary.com/westgate-school/image/upload/v1/gallery/library-students-studying.jpg',
    alt: 'Students studying in the library',
    category: 'academics'
  },
  {
    id: 8,
    src: 'https://res.cloudinary.com/westgate-school/image/upload/v1/gallery/drama-performance.jpg',
    alt: 'School drama performance',
    category: 'arts'
  },
  {
    id: 9,
    src: 'https://res.cloudinary.com/westgate-school/image/upload/v1/gallery/robotics-club.jpg',
    alt: 'Students working on robotics project',
    category: 'clubs'
  },
  {
    id: 10,
    src: 'https://res.cloudinary.com/westgate-school/image/upload/v1/gallery/graduation-ceremony.jpg',
    alt: 'Graduation ceremony celebration',
    category: 'events'
  },
  {
    id: 11,
    src: 'https://res.cloudinary.com/westgate-school/image/upload/v1/gallery/debate-competition.jpg',
    alt: 'Inter-school debate competition',
    category: 'clubs'
  },
  {
    id: 12,
    src: 'https://res.cloudinary.com/westgate-school/image/upload/v1/gallery/cultural-day-celebration.jpg',
    alt: 'Cultural day celebration',
    category: 'events'
  }
];

const clubs = [
  {
    name: 'Debate Society',
    description: 'Developing critical thinking and public speaking skills through competitive debates.',
    icon: Users,
    meeting: 'Wednesdays 4:00 PM',
    location: 'Conference Hall'
  },
  {
    name: 'Robotics Club',
    description: 'Building and programming robots while learning STEM concepts.',
    icon: Zap,
    meeting: 'Fridays 3:30 PM',
    location: 'Computer Lab'
  },
  {
    name: 'Environmental Club',
    description: 'Promoting sustainability and environmental conservation awareness.',
    icon: Heart,
    meeting: 'Tuesdays 4:00 PM',
    location: 'Science Lab'
  },
  {
    name: 'Drama Club',
    description: 'Exploring creativity through theatrical performances and productions.',
    icon: Palette,
    meeting: 'Thursdays 4:00 PM',
    location: 'Drama Studio'
  },
  {
    name: 'Music Ensemble',
    description: 'Developing musical talents through choir, orchestra, and band performances.',
    icon: Music,
    meeting: 'Mondays 3:30 PM',
    location: 'Music Room'
  },
  {
    name: 'Student Leadership',
    description: 'Building leadership skills and representing student interests.',
    icon: Star,
    meeting: 'Fridays 2:00 PM',
    location: 'Student Center'
  }
];

const sports = [
  { name: 'Football', season: 'Year Round', level: 'All Levels' },
  { name: 'Basketball', season: 'September - March', level: 'All Levels' },
  { name: 'Swimming', season: 'Year Round', level: 'All Levels' },
  { name: 'Tennis', season: 'February - November', level: 'All Levels' },
  { name: 'Athletics', season: 'Year Round', level: 'All Levels' },
  { name: 'Volleyball', season: 'January - October', level: 'All Levels' },
  { name: 'Rugby', season: 'March - September', level: 'Secondary Only' },
  { name: 'Netball', season: 'Year Round', level: 'All Levels' }
];

const events = [
  {
    title: 'Annual Sports Day',
    date: 'March 15, 2024',
    description: 'Inter-house sports competition featuring track and field events.',
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/events/sports-day.jpg'
  },
  {
    title: 'Cultural Festival',
    date: 'May 20, 2024',
    description: 'Celebration of diverse cultures with performances and exhibitions.',
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/events/cultural-festival.jpg'
  },
  {
    title: 'Science Fair',
    date: 'July 10, 2024',
    description: 'Student showcase of innovative science and technology projects.',
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/events/science-fair.jpg'
  },
  {
    title: 'Drama Production',
    date: 'September 5, 2024',
    description: 'Annual school play featuring talented student performers.',
    image: 'https://res.cloudinary.com/westgate-school/image/upload/v1/events/drama-production.jpg'
  }
];

export default function StudentLife() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'academics', 'sports', 'arts', 'clubs', 'events'];

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://res.cloudinary.com/westgate-school/image/upload/v1/student-life/hero-student-life.jpg" 
            alt="Student Life"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-gold font-medium text-sm tracking-wide uppercase mb-4 md:text-lg"
          >
            Student Life
          </motion.div>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white font-display font-bold text-3xl leading-tight mb-6 md:text-6xl"
          >
            Where Memories
            <span className="block text-gold">Are Made</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto mb-8 md:text-xl"
          >
            Experience the vibrant community life at Westgate, where students grow, learn, 
            and create lasting friendships through diverse activities and experiences.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" className="bg-gold hover:bg-yellow-600 text-charcoal-black font-semibold">
              Explore Our Gallery
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Breathtaking Gallery */}
      <section className="py-16 bg-white md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl text-charcoal-black mb-6 md:text-4xl">
              Life at Westgate
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Discover the vibrant moments that make Westgate special through our gallery
            </p>

            {/* Gallery Filters */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-primary-red text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer relative overflow-hidden rounded-xl aspect-square"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm">
                {selectedImage + 1} of {filteredImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clubs & Activities */}
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
              Clubs & Activities
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover your passion and develop new skills through our diverse range of clubs and activities
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {clubs.map((club, index) => {
              const Icon = club.icon;
              return (
                <motion.div
                  key={club.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card padding="lg" className="h-full hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary-red/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary-red" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-charcoal-black mb-2">
                          {club.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {club.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4 text-primary-red" />
                        {club.meeting}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 text-primary-red" />
                        {club.location}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sports Programs */}
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
              Sports Programs
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Building character, teamwork, and physical fitness through competitive sports
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {sports.map((sport, index) => (
              <motion.div
                key={sport.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card padding="lg" className="text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-charcoal-black mb-3">
                    {sport.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Season:</strong> {sport.season}</p>
                    <p><strong>Level:</strong> {sport.level}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
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
              Upcoming Events
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join us for exciting events that bring our community together
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card padding="none" className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-primary-red text-sm font-medium mb-3">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </div>
                    <h3 className="font-display font-bold text-xl text-charcoal-black mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </Card>
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
              Be Part of Our Community
            </h2>
            <p className="text-white/90 text-lg leading-relaxed mb-8 md:text-xl">
              Experience the vibrant student life at Westgate firsthand. Schedule a visit 
              to see our facilities and meet our amazing community.
            </p>
            <div className="flex flex-col gap-4 max-w-md mx-auto md:flex-row md:max-w-none md:justify-center">
              <Button size="lg" variant="secondary" className="font-semibold">
                Schedule Campus Visit
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-charcoal-black font-semibold">
                Join Our Community
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}