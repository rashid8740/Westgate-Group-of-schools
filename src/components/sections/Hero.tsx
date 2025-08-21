'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Award, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const heroSlides = [
  {
    id: 1,
    title: 'Nurturing Tomorrow\'s Leaders',
    subtitle: 'Excellence in Education Since Early 1990s',
    description: 'A premier Christian-based educational institution committed to academic excellence, character development, and holistic education through co-curricular activities.',
    image: '/images/hero/hero1.jpg',
    cta: 'Schedule School Tour',
    ctaLink: '/contact'
  },
  {
    id: 2,
    title: 'KCPE Excellence',
    subtitle: 'Proven Academic Performance',
    description: 'Consistently ranked among top three schools in Kabete Sub-county with remarkable KCPE results and strong transition rates to secondary school.',
    image: '/images/hero/hero2.jpg',
    cta: 'View Results',
    ctaLink: '/academics'
  },
  {
    id: 3,
    title: 'Holistic Development',
    subtitle: 'Beyond Academics',
    description: 'Comprehensive education including drama, music, swimming, French, and computer classes to develop well-rounded individuals.',
    image: '/images/hero/hero3.jpg',
    cta: 'Learn About Programs',
    ctaLink: '/academics'
  }
];

const stats = [
  { icon: Users, label: 'Students', value: '1,200+' },
  { icon: Award, label: 'Awards Won', value: '150+' },
  { icon: Calendar, label: 'Years of Excellence', value: '28+' },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Carousel */}
      <AnimatePresence mode="wait">
        {heroSlides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              
              {/* Content - Responsive Design */}
              <div className="relative z-10 h-full flex items-center justify-center">
                {/* Mobile Layout */}
                <div className="w-full px-6 py-12 max-w-sm mx-auto text-center md:hidden">
                  {/* Mobile Headlines */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-gold font-medium text-sm tracking-wide uppercase mb-3"
                  >
                    {slide.subtitle}
                  </motion.div>
                  
                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-white font-display font-bold text-2xl leading-tight mb-4"
                  >
                    {slide.title}
                  </motion.h1>
                  
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-white/90 text-sm mb-6 leading-relaxed"
                  >
                    {slide.description}
                  </motion.p>
                  
                  {/* Mobile CTAs */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="space-y-3 mb-8"
                  >
                    <Link href={slide.ctaLink}>
                      <Button className="w-full bg-gold hover:bg-yellow-600 text-charcoal-black font-semibold py-3 text-sm">
                        {slide.cta}
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full border-white text-white py-3 text-sm hover:bg-white hover:text-charcoal-black">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Video
                    </Button>
                  </motion.div>
                  
                  {/* Trust Indicators */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="text-xs text-white/80 space-y-1"
                  >
                    <p>✓ 30+ Years of Excellence</p>
                    <p>✓ Top 3 in Kabete Sub-county</p>
                    <p>✓ KCPE Mean Score 355.8</p>
                  </motion.div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block w-full max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="max-w-4xl">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-gold font-semibold text-lg tracking-wide uppercase mb-6 md:text-xl"
                    >
                      {slide.subtitle}
                    </motion.div>
                    
                    <motion.h1
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-white font-display font-bold text-5xl leading-tight mb-8 lg:text-7xl"
                    >
                      {slide.title}
                    </motion.h1>
                    
                    <motion.p
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-white/90 text-xl leading-relaxed mb-12 max-w-3xl lg:text-2xl"
                    >
                      {slide.description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="flex flex-col sm:flex-row gap-6 justify-start"
                    >
                      <Link href={slide.ctaLink}>
                        <Button size="xl" className="text-lg font-semibold px-12 bg-gold hover:bg-yellow-600 text-charcoal-black">
                          {slide.cta}
                        </Button>
                      </Link>
                      <Button variant="outline" size="xl" className="text-lg font-semibold px-12 bg-white/10 border-white text-white hover:bg-white hover:text-charcoal-black">
                        <Play className="h-6 w-6 mr-3" />
                        Watch Video
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white transition-all duration-200 active:scale-95 md:left-8 md:w-14 md:h-14 md:bg-white/15 md:hover:bg-white/25"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 mx-auto md:h-6 md:w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white transition-all duration-200 active:scale-95 md:right-8 md:w-14 md:h-14 md:bg-white/15 md:hover:bg-white/25"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 mx-auto md:h-6 md:w-6" />
      </button>

      {/* Fluid Slide Indicators */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-1 md:bottom-20 md:gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
            className="relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <motion.div
              className="bg-white/40 rounded-full transition-colors duration-300"
              animate={{
                width: index === currentSlide ? "24px" : "8px",
                height: "8px",
                backgroundColor: index === currentSlide ? "#F59E0B" : "rgba(255, 255, 255, 0.4)"
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 40,
                duration: 0.6
              }}
            />
          </button>
        ))}
      </div>

      {/* Scroll Indicator - Better Positioned */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-1 text-white/70">
          <span className="text-xs font-medium tracking-wide">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-3 bg-white/50 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
