'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ZoomIn,
  Play,
  Pause,
  Maximize2,
  Filter
} from 'lucide-react';

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

interface BentoGalleryProps {
  images: GalleryImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showFilters?: boolean;
  maxItems?: number;
}

const BentoGallery: React.FC<BentoGalleryProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
  showFilters = true,
  maxItems = 20
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Filter images
  const filteredImages = filter === 'all' 
    ? images.slice(0, maxItems)
    : images.filter(img => img.category === filter).slice(0, maxItems);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && filteredImages.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % filteredImages.length);
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, filteredImages.length, autoPlayInterval]);

  // Reset current index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  // Bento grid layout patterns (responsive)
  const getBentoClass = (index: number) => {
    // Mobile patterns (simpler)
    const mobilePatterns = [
      'col-span-2 row-span-2', // Large
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-1', // Small
      'col-span-2 row-span-1', // Wide
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-1', // Small
    ];
    
    // Desktop patterns (more complex)
    const desktopPatterns = [
      'col-span-2 row-span-2', // Large
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-2', // Tall
      'col-span-2 row-span-1', // Wide
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-1', // Small
    ];
    
    // Use mobile patterns for smaller screens in responsive way
    const mobileClass = mobilePatterns[index % mobilePatterns.length];
    const desktopClass = desktopPatterns[index % desktopPatterns.length];
    
    return `${mobileClass} md:${desktopClass}`;
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsPlaying(false);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setIsPlaying(autoPlay);
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

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatCategory = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="w-full">
      {/* Filters */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 md:mb-12 space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-primary-red text-white shadow-lg transform scale-105'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                }`}
              >
                {formatCategory(category)}
              </motion.button>
            ))}
          </div>
          
          {/* Auto-play controls */}
          <div className="flex items-center gap-2 justify-center sm:justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAutoPlay}
              className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full transition-all duration-300 text-sm sm:text-base font-medium border border-gray-200 hover:shadow-md"
            >
              {isPlaying ? <Pause className="h-4 w-4 sm:h-5 sm:w-5" /> : <Play className="h-4 w-4 sm:h-5 sm:w-5" />}
              <span className="hidden sm:inline">{isPlaying ? 'Pause Gallery' : 'Play Gallery'}</span>
              <span className="sm:hidden">{isPlaying ? 'Pause' : 'Play'}</span>
            </motion.button>
          </div>
        </div>
      )}

      {/* Bento Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6 auto-rows-[150px] sm:auto-rows-[180px] md:auto-rows-[200px] lg:auto-rows-[280px]">
        {filteredImages.map((image, index) => (
          <motion.div
            key={`${image._id}-${filter}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group cursor-pointer relative overflow-hidden rounded-xl ${getBentoClass(index)} ${
              index === currentIndex && isPlaying ? 'ring-2 ring-primary-red ring-offset-2' : ''
            }`}
            onClick={() => openLightbox(index)}
          >
            {/* Image */}
            <img
              src={image.urls.medium || image.urls.thumbnail}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading={index < 6 ? 'eager' : 'lazy'}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="text-white font-semibold text-sm md:text-base mb-2 line-clamp-2"
                >
                  {image.title}
                </motion.h3>
                {image.description && (
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-white/90 text-xs md:text-sm line-clamp-2 mb-2"
                  >
                    {image.description}
                  </motion.p>
                )}
                <div className="flex items-center justify-between">
                  <motion.span 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/70 text-xs font-medium"
                  >
                    {formatCategory(image.category)}
                  </motion.span>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <ZoomIn className="h-4 w-4 text-white" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Featured badge */}
            {image.isFeatured && (
              <div className="absolute top-2 right-2 bg-gold text-charcoal-black text-xs font-bold px-2 py-1 rounded-full">
                Featured
              </div>
            )}

            {/* Auto-play indicator */}
            {index === currentIndex && isPlaying && (
              <div className="absolute top-2 left-2">
                <div className="w-2 h-2 bg-primary-red rounded-full animate-pulse"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* No images message */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
          <p className="text-gray-600">No images match the current filter.</p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && filteredImages[selectedImage] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Image */}
              <img
                src={filteredImages[selectedImage].urls.large || filteredImages[selectedImage].urls.original}
                alt={filteredImages[selectedImage].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-bold mb-2">
                  {filteredImages[selectedImage].title}
                </h3>
                {filteredImages[selectedImage].description && (
                  <p className="text-white/90 mb-3">
                    {filteredImages[selectedImage].description}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>{formatCategory(filteredImages[selectedImage].category)}</span>
                  {filteredImages[selectedImage].location && (
                    <span>{filteredImages[selectedImage].location}</span>
                  )}
                  {filteredImages[selectedImage].eventDate && (
                    <span>{new Date(filteredImages[selectedImage].eventDate).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={() => {
                  const img = document.querySelector('.lightbox-image') as HTMLImageElement;
                  if (img) {
                    if (document.fullscreenElement) {
                      document.exitFullscreen();
                    } else {
                      img.requestFullscreen();
                    }
                  }
                }}
                className="absolute top-4 left-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <Maximize2 className="h-6 w-6" />
              </button>
              
              {/* Navigation Buttons */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm">
                {selectedImage + 1} of {filteredImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BentoGallery;
