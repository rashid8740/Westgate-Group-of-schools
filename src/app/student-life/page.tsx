'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users,
  Trophy,
  Music,
  Palette,
  Heart,
  Zap,
  Clock,
  MapPin,
  Star,
  AlertCircle,
  RefreshCw,
  Shirt,
  CircleDot,
  Waves,
  Target,
  Footprints,
  Circle,
  Shield,
  Network
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import BentoGallery from '@/components/gallery/BentoGallery';
import { galleryApi } from '@/lib/api';

interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  alt: string;
  urls: {
    thumbnail: string;
    medium: string;
    large: string;
    original: string;
  };
  category: string;
  tags: string[];
  width: number;
  height: number;
  isFeatured: boolean;
  eventDate?: string;
  location?: string;
  createdAt: string;
}

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
  { name: 'Football', season: 'Year Round', level: 'All Levels', icon: Shirt },
  { name: 'Basketball', season: 'September - March', level: 'All Levels', icon: CircleDot },
  { name: 'Swimming', season: 'Year Round', level: 'All Levels', icon: Waves },
  { name: 'Tennis', season: 'February - November', level: 'All Levels', icon: Target },
  { name: 'Athletics', season: 'Year Round', level: 'All Levels', icon: Footprints },
  { name: 'Volleyball', season: 'January - October', level: 'All Levels', icon: Circle },
  { name: 'Rugby', season: 'March - September', level: 'Secondary Only', icon: Shield },
  { name: 'Netball', season: 'Year Round', level: 'All Levels', icon: Network }
];



export default function StudentLife() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch gallery images
  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch only active images, sorted by featured first, then by date
      const params = new URLSearchParams({
        isActive: 'true',
        sortBy: 'displayOrder',
        sortOrder: 'asc',
        limit: '50'
      });
      
      const response = await galleryApi.getAll(params);
      setGalleryImages(response.data.images);
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
      setError('Failed to load gallery images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Gallery Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-neutral-light to-white pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex flex-col">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-charcoal-black mb-6"
          >
              Life at <span className="text-primary-red">Westgate</span>
          </motion.h1>
          <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-8"
          >
              Experience the vibrant community, endless opportunities, and unforgettable moments that define the Westgate experience
          </motion.p>
          </motion.div>
          
          {/* Gallery Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex-1"
          >
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red mx-auto mb-6"></div>
                <p className="text-gray-600 text-lg">Loading our amazing gallery...</p>
              </div>
            ) : error ? (
              <Card padding="lg" className="max-w-md mx-auto">
                <div className="text-center py-8">
                  <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Error Loading Gallery</h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <Button onClick={fetchGalleryImages} className="bg-primary-red hover:bg-primary-red/90">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
            </Button>
        </div>
              </Card>
            ) : galleryImages.length > 0 ? (
              <BentoGallery 
                images={galleryImages}
                autoPlay={true}
                autoPlayInterval={6000}
                showFilters={true}
                maxItems={30}
              />
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📸</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Gallery Coming Soon</h3>
                <p className="text-gray-600 max-w-md mx-auto">Our amazing student life gallery will appear here once images are uploaded.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400"
          >
            <span className="text-sm font-medium mb-2 hidden md:block">Scroll to explore more</span>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              />
              </div>
            </motion.div>
          </motion.div>
      </section>

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

          {/* Mobile: Balanced card design */}
          <div className="block md:hidden space-y-3">
            {clubs.map((club, index) => {
              const Icon = club.icon;
              return (
                <motion.div
                  key={club.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="group"
                >
                  <div className="relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
                    {/* Subtle background pattern */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-red/3 to-transparent rounded-bl-2xl"></div>
                    
                    <div className="relative">
                      {/* Content-first layout */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg text-charcoal-black group-hover:text-primary-red transition-colors duration-300 flex-1">
                          {club.name}
                        </h3>
                        <div className="w-8 h-8 bg-primary-red/10 rounded-lg flex items-center justify-center flex-shrink-0 ml-3 group-hover:bg-primary-red/15 transition-colors duration-300">
                          <Icon className="h-4 w-4 text-primary-red opacity-70" />
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                        {club.description}
                      </p>
                      
                      {/* Subtle indicator */}
                      <div className="w-6 h-0.5 bg-gradient-to-r from-primary-red/40 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop: Balanced grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, index) => {
              const Icon = club.icon;
              return (
                <motion.div
                  key={club.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group h-full"
                >
                  <div className="relative bg-white rounded-2xl p-6 h-full shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {/* Subtle background elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-red/4 to-transparent rounded-bl-full transform translate-x-6 -translate-y-6"></div>
                    
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Header with balanced icon placement */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-display font-bold text-xl text-charcoal-black group-hover:text-primary-red transition-colors duration-300 leading-tight mb-2">
                            {club.name}
                          </h3>
                          <div className="w-8 h-0.5 bg-primary-red/30 rounded-full"></div>
                        </div>
                        
                        <div className="w-10 h-10 bg-primary-red/8 rounded-xl flex items-center justify-center flex-shrink-0 ml-4 group-hover:bg-primary-red/12 transition-colors duration-300">
                          <Icon className="h-5 w-5 text-primary-red opacity-60" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <p className="text-gray-600 leading-relaxed text-base">
                          {club.description}
                        </p>
                      </div>
                      
                      {/* Subtle footer element */}
                      <div className="mt-6 pt-4 border-t border-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-1 bg-gradient-to-r from-primary-red/40 to-transparent rounded-full"></div>
                          <div className="text-xs text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Explore
                    </div>
                      </div>
                      </div>
                    </div>
                  </div>
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

          {/* Mobile: Balanced horizontal scroll */}
          <div className="block md:hidden">
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory">
              {sports.map((sport, index) => {
                const Icon = sport.icon;
                return (
                  <motion.div
                    key={sport.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex-none w-44 snap-start group"
                  >
                    <div className="relative bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full overflow-hidden">
                      {/* Subtle background pattern */}
                      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-primary-red/4 to-transparent rounded-bl-2xl"></div>
                      
                      <div className="relative h-full flex flex-col">
                        {/* Header with icon */}
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-base text-charcoal-black group-hover:text-primary-red transition-colors duration-300 flex-1 leading-tight">
                            {sport.name}
                          </h3>
                          <div className="w-7 h-7 bg-primary-red/10 rounded-lg flex items-center justify-center flex-shrink-0 ml-2 group-hover:bg-primary-red/15 transition-colors duration-300">
                            <Icon className="h-3.5 w-3.5 text-primary-red opacity-70" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 space-y-2">
                          <div className="text-xs text-gray-600">
                            <p><span className="font-medium text-gray-700">Season:</span> {sport.season}</p>
                            <p><span className="font-medium text-gray-700">Level:</span> {sport.level}</p>
                          </div>
                        </div>
                        
                        {/* Footer indicator */}
                        <div className="mt-3 pt-2">
                          <div className="w-5 h-0.5 bg-gradient-to-r from-primary-red/40 to-transparent rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex justify-center mt-4">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <span>👈</span> Swipe to see more sports
              </p>
            </div>
          </div>

          {/* Desktop: Balanced grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sports.map((sport, index) => {
              const Icon = sport.icon;
              return (
              <motion.div
                key={sport.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group h-full"
                >
                  <div className="relative bg-white rounded-2xl p-5 h-full shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {/* Subtle background elements */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-red/4 to-transparent rounded-bl-full transform translate-x-4 -translate-y-4"></div>
                    
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Header with balanced layout */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-display font-bold text-lg text-charcoal-black group-hover:text-primary-red transition-colors duration-300 leading-tight mb-2">
                    {sport.name}
                  </h3>
                          <div className="w-6 h-0.5 bg-primary-red/30 rounded-full"></div>
                  </div>
                        
                        <div className="w-9 h-9 bg-primary-red/8 rounded-xl flex items-center justify-center flex-shrink-0 ml-3 group-hover:bg-primary-red/12 transition-colors duration-300">
                          <Icon className="h-4 w-4 text-primary-red opacity-60" />
          </div>
        </div>
                      
                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div className="space-y-2 text-sm text-gray-600">
                          <p><span className="font-medium text-gray-700">Season:</span> {sport.season}</p>
                          <p><span className="font-medium text-gray-700">Level:</span> {sport.level}</p>
                        </div>
                      </div>
                      
                      {/* Subtle footer element */}
                      <div className="mt-4 pt-3 border-t border-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-1 bg-gradient-to-r from-primary-red/40 to-transparent rounded-full"></div>
                          <div className="text-xs text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Join
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      
    </div>
  );
}