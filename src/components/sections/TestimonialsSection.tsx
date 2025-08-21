'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Grace Kimani',
    role: 'Parent of Sarah (Grade 4)',
    content:
      "The CBC approach at Westgate Shield has been wonderful for Sarah. She's more confident, creative, and engaged. The teachers give individual attention and communicate with us regularly.",
    achievement: 'CBC Success & Individual Attention'
  },
  {
    id: 2,
    name: 'Dr. Faith Njeri',
    role: 'Parent of Michael (Grade 6)',
    content:
      'Michael improved significantly in Mathematics and English through the structured CBC learning and revision clinics. We are proud of the KCPE-ready foundation the school provides.',
    achievement: 'KCPE Preparation (Mean 355.8)'
  },
  {
    id: 3,
    name: 'John Mwangi',
    role: 'Parent of David & Diana (Pre-Primary & Grade 2)',
    content:
      'Both our children love school. From early reading and numeracy to music, sports, and drama, the holistic program truly develops the whole child in a caring, Christian environment.',
    achievement: 'Holistic Growth (Sports, Music, Drama)'
  },
  {
    id: 4,
    name: 'Catherine Wanjiku',
    role: 'Parent of Emmanuel (Grade 5)',
    content:
      'Discipline, strong Christian values, and consistent academic follow-up make a real difference here. Emmanuel has become more responsible and focused while still enjoying school.',
    achievement: 'Discipline & Christian Values'
  },
  {
    id: 5,
    name: 'James Mutua',
    role: 'Parent of Patricia (Grade 3)',
    content:
      'We chose Westgate Shield for its track record and it has delivered—small class sizes, caring teachers, and top performance in Kabete Sub-county. We highly recommend it to other parents.',
    achievement: 'Top 3 in Kabete Sub-county'
  }
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  // Responsive slides per view
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, slidesPerView]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => {
      const maxIndex = testimonials.length - slidesPerView;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => {
      const maxIndex = testimonials.length - slidesPerView;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < slidesPerView; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-16 bg-white md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-display font-bold text-3xl text-charcoal-black mb-6 md:text-5xl">
            What Parents Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real feedback from families experiencing our CBC curriculum, Christian values, and holistic education—from Playgroup to Grade 6.
          </p>
        </motion.div>

        {/* Interactive Carousel Container */}
        <div className="relative mb-16 md:mb-20">
          
          {/* Carousel Controls - Top Right */}
          <div className="absolute top-0 right-0 z-20 flex items-center gap-2 mb-8">
            {/* Auto-play Toggle */}
            <button
              onClick={toggleAutoPlay}
              className="p-2 rounded-full bg-neutral-light hover:bg-gray-200 text-charcoal-black transition-colors duration-200"
              aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
            >
              {isAutoPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
            
            {/* Navigation Buttons */}
            <button
              onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg text-charcoal-black hover:text-primary-red transition-all duration-200 disabled:opacity-50"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg text-charcoal-black hover:text-primary-red transition-all duration-200 disabled:opacity-50"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Testimonials Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ 
                  x: direction > 0 ? 100 : -100,
                  opacity: 0
                }}
                animate={{ 
                  x: 0,
                  opacity: 1
                }}
                exit={{ 
                  x: direction > 0 ? -100 : 100,
                  opacity: 0
                }}
                transition={{
                  type: "tween",
                  ease: [0.25, 0.46, 0.45, 0.94],
                  duration: 0.4
                }}
                className={`grid gap-6 ${
                  slidesPerView === 1 
                    ? 'grid-cols-1' 
                    : slidesPerView === 2 
                    ? 'grid-cols-2' 
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                } md:gap-8`}
              >
                {getVisibleTestimonials().map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-neutral-light rounded-2xl p-6 relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 text-primary-red/10 group-hover:text-primary-red/20 transition-colors duration-300">
                      <Quote className="h-6 w-6" />
                    </div>

                    {/* Achievement Badge */}
                    <div className="inline-block bg-primary-red/10 text-primary-red text-xs font-medium px-3 py-1 rounded-full mb-4">
                      {testimonial.achievement}
                    </div>

                    {/* Content */}
                    <blockquote className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-red to-primary-red/80 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-charcoal-black">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center items-center mt-8 gap-1">
            {Array.from({ length: testimonials.length - slidesPerView + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="p-1"
                aria-label={`Go to testimonial set ${index + 1}`}
              >
                <motion.div
                  className="rounded-full transition-colors duration-300"
                  animate={{
                    width: index === currentIndex ? "20px" : "6px",
                    height: "6px",
                    backgroundColor: index === currentIndex ? "#DC2626" : "#D1D5DB"
                  }}
                  transition={{
                    type: "tween",
                    ease: [0.25, 0.46, 0.45, 0.94],
                    duration: 0.3
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Trust Statistics - Clean Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-neutral-light rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="font-display font-bold text-2xl text-charcoal-black mb-3">
              Trusted by Families
            </h3>
            <p className="text-gray-600">
              Building lasting relationships with parents and students across Kenya
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: '99%', label: 'Parent Satisfaction' },
              { number: '4.9/5', label: 'Google Reviews' },
              { number: '500+', label: 'Happy Families' },
              { number: '95%', label: 'Would Recommend' }
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

export default TestimonialsSection;
