'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload,
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  Plus,
  X,
  Image as ImageIcon,
  Calendar,
  Tag,
  RefreshCw,
  AlertCircle,
  FolderPlus,
  Images,
  CheckCircle2,
  FileImage,
  Star,
  Grid3X3,
  List,
  Download,
  Share2
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { galleryApi, tokenManager } from '@/lib/api';

const categories = [
  { value: 'academics', label: 'Academics', icon: '📚' },
  { value: 'sports', label: 'Sports', icon: '⚽' },
  { value: 'arts-culture', label: 'Arts & Culture', icon: '🎨' },
  { value: 'science-technology', label: 'Science & Technology', icon: '🔬' },
  { value: 'events', label: 'Events', icon: '🎉' },
  { value: 'facilities', label: 'Facilities', icon: '🏫' },
  { value: 'student-life', label: 'Student Life', icon: '👥' },
  { value: 'staff', label: 'Staff', icon: '👨‍🏫' },
  { value: 'achievements', label: 'Achievements', icon: '🏆' },
  { value: 'community', label: 'Community', icon: '🤝' },
  { value: 'other', label: 'Other', icon: '📁' }
];

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  alt: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  url: string;
  urls?: {
    thumbnail: string;
    medium: string;
    large: string;
    original: string;
  };
  width: number;
  height: number;
  size: number;
  format: string;
  createdAt: string;
  updatedAt: string;
}

interface UploadFile {
  file: File;
  id: string;
  preview: string;
  title: string;
  category: string;
  description: string;
  tags: string;
  alt: string;
  isFeatured: boolean;
  uploading: boolean;
  uploaded: boolean;
  error?: string;
}

export default function AdminGallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Multiple upload states
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch gallery items
  useEffect(() => {
    fetchGalleryItems();
  }, [selectedCategory]);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.set('category', selectedCategory);
      }
      params.set('sortBy', 'createdAt');
      params.set('sortOrder', 'desc');
      
      const response = await galleryApi.getAll(params);
      setGalleryItems(response.data.images);
    } catch (error) {
      console.error('Failed to fetch gallery items:', error);
      setError('Failed to load gallery images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Filter images
  const filteredImages = galleryItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Handle file selection
  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    const newFiles: UploadFile[] = [];
    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const id = Date.now() + index;
        const preview = URL.createObjectURL(file);
        const fileName = file.name.replace(/\.[^/.]+$/, '');
        newFiles.push({
          file,
          id: id.toString(),
          preview,
          title: fileName.length >= 2 ? fileName : `Image ${Date.now()}`,
          category: 'student-life',
          description: '',
          tags: '',
          alt: fileName.length >= 2 ? fileName : `Image uploaded on ${new Date().toLocaleDateString()}`,
          isFeatured: false,
          uploading: false,
          uploaded: false
        });
      }
    });

    setUploadFiles(prev => [...prev, ...newFiles]);
  };

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, []);

  // Update upload file data
  const updateUploadFile = (id: string, updates: Partial<UploadFile>) => {
    setUploadFiles(prev => prev.map(file => 
      file.id === id ? { ...file, ...updates } : file
    ));
  };

  // Remove upload file
  const removeUploadFile = (id: string) => {
    setUploadFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  // Upload all files
  const handleUploadAll = async () => {
    if (uploadFiles.length === 0) return;

    // Check authentication first
    const token = tokenManager.getToken();
    if (!token) {
      alert('Please log in again. Your session has expired.');
      window.location.href = '/admin/login';
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const totalFiles = uploadFiles.length;
    let completedFiles = 0;

    for (const uploadFile of uploadFiles) {
      if (uploadFile.uploaded) {
        completedFiles++;
        continue;
      }

      // Validate required fields before upload
      if (!uploadFile.title || uploadFile.title.trim().length < 2) {
        updateUploadFile(uploadFile.id, { 
          error: 'Title must be at least 2 characters long' 
        });
        continue;
      }

      if (!uploadFile.alt || uploadFile.alt.trim().length < 2) {
        updateUploadFile(uploadFile.id, { 
          error: 'Alt text must be at least 2 characters long' 
        });
        continue;
    }

    try {
        updateUploadFile(uploadFile.id, { uploading: true, error: undefined });

        const formData = new FormData();
        formData.append('image', uploadFile.file);
        formData.append('title', uploadFile.title.trim());
        formData.append('description', uploadFile.description.trim());
        formData.append('alt', uploadFile.alt.trim());
        formData.append('category', uploadFile.category);
        
        // Convert tags string to array
        const tagsArray = uploadFile.tags 
          ? uploadFile.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
          : [];
        formData.append('tags', JSON.stringify(tagsArray));
        
        formData.append('isFeatured', uploadFile.isFeatured.toString());



        await galleryApi.upload(formData);
        
        updateUploadFile(uploadFile.id, { 
          uploading: false, 
          uploaded: true 
        });
        
        completedFiles++;
        setUploadProgress((completedFiles / totalFiles) * 100);
      
    } catch (error) {
        console.error(`Failed to upload ${uploadFile.title}:`, error);
        
        // Check for authentication error
        if (error instanceof Error && error.message.includes('No token provided')) {
          alert('Please log in again. Your session has expired.');
          window.location.href = '/admin/login';
          return;
        }
        
        updateUploadFile(uploadFile.id, { 
          uploading: false, 
          error: error instanceof Error ? error.message : 'Upload failed' 
        });
      }
    }

    setUploading(false);
    
    // Refresh gallery after upload
    fetchGalleryItems();
    
    // Clear uploaded files after a delay
    setTimeout(() => {
      setUploadFiles(prev => prev.filter(f => !f.uploaded));
    }, 2000);
  };

  // Delete image
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

      try {
        await galleryApi.delete(id);
        setGalleryItems(prev => prev.filter(item => item._id !== id));
      } catch (error) {
        console.error('Failed to delete image:', error);
        alert('Failed to delete image. Please try again.');
      }
  };

  // Toggle featured status
  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      await galleryApi.update(id, { isFeatured: !currentStatus });
      setGalleryItems(prev => prev.map(item => 
        item._id === id ? { ...item, isFeatured: !currentStatus } : item
      ));
    } catch (error) {
      console.error('Failed to update featured status:', error);
      alert('Failed to update featured status. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600 mt-2">
            Upload and manage school gallery images by category for better organization.
          </p>
        </div>
        <div className="flex space-x-2 mt-4 lg:mt-0">
          <Button
            variant="outline"
            onClick={fetchGalleryItems}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setShowUploadModal(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Images
          </Button>
        </div>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* All Images Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card 
            className={`p-4 cursor-pointer transition-all duration-200 ${
              selectedCategory === 'all' 
                ? 'ring-2 ring-primary-red bg-red-50 shadow-lg' 
                : 'hover:shadow-md hover:bg-gray-50'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            <div className="text-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                selectedCategory === 'all' ? 'bg-primary-red text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <Images className="h-5 w-5" />
              </div>
              <p className="text-xs font-medium text-gray-600 mb-1">All Images</p>
              <p className={`text-xl font-bold ${selectedCategory === 'all' ? 'text-primary-red' : 'text-gray-900'}`}>
                {galleryItems.length}
              </p>
          </div>
        </Card>
        </motion.div>

        {/* Category Cards */}
        {categories.slice(1).map((category, index) => {
          const count = galleryItems.filter(item => item.category === category.value).length;
          const isSelected = selectedCategory === category.value;
          return (
            <motion.div
              key={category.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (index + 1) * 0.1 }}
            >
              <Card 
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'ring-2 ring-primary-red bg-red-50 shadow-lg' 
                    : 'hover:shadow-md hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategory(isSelected ? 'all' : category.value)}
              >
                <div className="text-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                    isSelected ? 'bg-primary-red text-white' : 'bg-gray-100'
                  }`}>
                    <span className="text-lg">{category.icon}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-600 mb-1">{category.label}</p>
                  <p className={`text-xl font-bold ${isSelected ? 'text-primary-red' : 'text-gray-900'}`}>
                    {count}
                  </p>
          </div>
        </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters and Controls */}
      <Card padding="lg">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search images by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Results Summary & Quick Actions */}
      {!loading && !error && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg border border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-4 mb-3 sm:mb-0">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredImages.length}</span> of{' '}
              <span className="font-medium">{galleryItems.length}</span> images
              {selectedCategory !== 'all' && (
                <span className="text-primary-red">
                  {' '}in {categories.find(c => c.value === selectedCategory)?.label}
                </span>
              )}
            </p>
            {filteredImages.length !== galleryItems.length && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="text-xs text-primary-red hover:text-primary-red/80 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {filteredImages.length > 0 && (
              <>
                <select
                  className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-primary-red focus:border-transparent"
                  onChange={(e) => {
                    if (e.target.value === 'feature') {
                      // Bulk feature action
                      console.log('Bulk feature selected images');
                    } else if (e.target.value === 'category') {
                      // Bulk category change
                      console.log('Bulk category change');
                    }
                    e.target.value = '';
                  }}
                  defaultValue=""
                >
                  <option value="">Bulk Actions</option>
                  <option value="feature">Mark as Featured</option>
                  <option value="category">Change Category</option>
                  <option value="activate">Set Active</option>
                  <option value="deactivate">Set Inactive</option>
                </select>
                
                <div className="text-xs text-gray-500 border-l border-gray-300 pl-2">
                  {categories.find(c => c.value === selectedCategory)?.icon || '📁'} {' '}
                  {selectedCategory === 'all' ? 'All Categories' : categories.find(c => c.value === selectedCategory)?.label}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <Card padding="lg">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        </Card>
      ) : error ? (
        <Card padding="lg">
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Gallery</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchGalleryItems}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </Card>
      ) : filteredImages.length > 0 ? (
        <Card padding="lg">
          {viewMode === 'grid' ? (
            /* Grid View */
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={item.urls?.thumbnail || item.url}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                      <button
                        onClick={() => setSelectedImage(item)}
                          className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                          <Eye className="h-4 w-4" />
                      </button>
                      <button
                          onClick={() => toggleFeatured(item._id, item.isFeatured)}
                          className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      >
                          <Star className={`h-4 w-4 ${item.isFeatured ? 'text-yellow-500 fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                          className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors text-red-500"
                      >
                          <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                    {/* Featured Badge */}
                  {item.isFeatured && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        ⭐ Featured
                    </div>
                  )}

                    {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-red/90 text-white backdrop-blur-sm">
                        <span className="mr-1">{categories.find(c => c.value === item.category)?.icon}</span>
                        {categories.find(c => c.value === item.category)?.label}
                    </span>
                    </div>
                  </div>
                  
                  {/* Info */}
                <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatFileSize(item.size)}</span>
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                    {item.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            {tag}
                      </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="text-gray-400 text-xs">+{item.tags.length - 2}</span>
                        )}
                    </div>
                  )}
                </div>
                </motion.div>
              ))}
                </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredImages.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.urls?.thumbnail || item.url}
                    alt={item.alt}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                      {item.isFeatured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">{item.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{categories.find(c => c.value === item.category)?.label}</span>
                      <span>{formatFileSize(item.size)}</span>
                      <span>{item.width} × {item.height}</span>
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedImage(item)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleFeatured(item._id, item.isFeatured)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Star className={`h-4 w-4 ${item.isFeatured ? 'text-yellow-500 fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </motion.div>
              ))}
            </div>
          )}
        </Card>
        ) : (
            <Card padding="lg">
              <div className="text-center py-12">
                <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Images Found</h3>
            <p className="text-gray-600 mb-4">
                  {searchTerm || selectedCategory !== 'all'
                    ? 'No images match your current filters.'
                : 'Start by uploading some images to your gallery.'}
                </p>
            <Button onClick={() => setShowUploadModal(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
              </div>
            </Card>
        )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Upload Images</h3>
                    <p className="text-sm text-gray-600">Upload multiple images with metadata</p>
                  </div>
                <button
                    onClick={() => setShowUploadModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => {
                    const input = document.getElementById('file-input-upload') as HTMLInputElement;
                    input?.click();
                  }}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer hover:border-primary-red hover:bg-red-50 ${
                    dragOver ? 'border-primary-red bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <FileImage className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drop images here or click to browse
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Support for JPG, PNG, WebP files up to 10MB each
                    </p>
                    <input 
                      type="file" 
                    multiple
                      accept="image/*"
                    onChange={(e) => {
                      console.log('File input changed, files:', e.target.files?.length);
                      handleFileSelect(e.target.files);
                      // Reset the input
                      e.target.value = '';
                    }}
                    style={{ display: 'none' }}
                    id="file-input-upload"
                  />
                  <label
                    htmlFor="file-input-upload"
                    className="inline-flex items-center px-4 py-2 bg-primary-red text-white font-medium rounded-lg hover:bg-primary-red/90 transition-colors cursor-pointer"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Select Images
                  </label>
                </div>

                {/* Upload Files List */}
                {uploadFiles.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium">Selected Images ({uploadFiles.length})</h4>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setUploadFiles([])}
                          disabled={uploading}
                        >
                          Clear All
                        </Button>
                        <Button
                          onClick={handleUploadAll}
                          disabled={uploading || uploadFiles.every(f => f.uploaded)}
                        >
                          {uploading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Uploading... {Math.round(uploadProgress)}%
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload All
                            </>
                          )}
                        </Button>
                  </div>
                </div>

                    {/* Progress Bar */}
                    {uploading && (
                      <div className="mb-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-red h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {uploadFiles.map((uploadFile) => (
                        <div key={uploadFile.id} className="border rounded-lg p-4">
                          <div className="flex items-start space-x-4">
                            {/* Preview */}
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <img
                                src={uploadFile.preview}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                              {uploadFile.uploaded && (
                                <div className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center">
                                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                                </div>
                              )}
                              {uploadFile.uploading && (
                                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                </div>
                              )}
                            </div>

                            {/* Form */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Title *
                  </label>
                  <input
                    type="text"
                                  value={uploadFile.title}
                                  onChange={(e) => updateUploadFile(uploadFile.id, { title: e.target.value })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent text-sm"
                                  disabled={uploadFile.uploading || uploadFile.uploaded}
                  />
                </div>

                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Category * <span className="text-red-500">(Important!)</span>
                  </label>
                  <select
                                  value={uploadFile.category}
                                  onChange={(e) => updateUploadFile(uploadFile.id, { category: e.target.value })}
                                  className="w-full px-3 py-2 border-2 border-primary-red rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent text-sm bg-red-50"
                                  disabled={uploadFile.uploading || uploadFile.uploaded}
                                >
                                  {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>
                                      {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                                <p className="text-xs text-gray-600 mt-1">
                                  ⚠️ Please select the correct category before uploading
                                </p>
                </div>

                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                                  value={uploadFile.description}
                                  onChange={(e) => updateUploadFile(uploadFile.id, { description: e.target.value })}
                                  rows={2}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent text-sm"
                                  disabled={uploadFile.uploading || uploadFile.uploaded}
                  />
                </div>

                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Alt Text *
                  </label>
                  <input
                    type="text"
                                  value={uploadFile.alt}
                                  onChange={(e) => updateUploadFile(uploadFile.id, { alt: e.target.value })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent text-sm"
                                  disabled={uploadFile.uploading || uploadFile.uploaded}
                  />
                </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Tags (comma separated)
                                </label>
                                <input
                                  type="text"
                                  value={uploadFile.tags}
                                  onChange={(e) => updateUploadFile(uploadFile.id, { tags: e.target.value })}
                                  placeholder="school, students, classroom"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent text-sm"
                                  disabled={uploadFile.uploading || uploadFile.uploaded}
                                />
                              </div>

                              <div className="md:col-span-2 flex items-center justify-between">
                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={uploadFile.isFeatured}
                                    onChange={(e) => updateUploadFile(uploadFile.id, { isFeatured: e.target.checked })}
                                    className="rounded border-gray-300 text-primary-red focus:ring-primary-red"
                                    disabled={uploadFile.uploading || uploadFile.uploaded}
                                  />
                                  <span className="ml-2 text-sm text-gray-700">Featured Image</span>
                                </label>

                                <button
                                  onClick={() => removeUploadFile(uploadFile.id)}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                  disabled={uploadFile.uploading}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                      </div>

                              {uploadFile.error && (
                                <div className="md:col-span-2 text-sm text-red-600">
                                  Error: {uploadFile.error}
                                </div>
                              )}
                </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Details Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                <button
                    onClick={() => setSelectedImage(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image */}
                  <div>
                    <img
                      src={selectedImage.urls?.large || selectedImage.url}
                      alt={selectedImage.alt}
                      className="w-full rounded-lg"
                />
              </div>

                  {/* Details */}
              <div className="space-y-4">
                <div>
                      <h4 className="font-medium text-gray-900 mb-2">Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span>{categories.find(c => c.value === selectedImage.category)?.label}</span>
                </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dimensions:</span>
                          <span>{selectedImage.width} × {selectedImage.height}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">File Size:</span>
                          <span>{formatFileSize(selectedImage.size)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Format:</span>
                          <span>{selectedImage.format.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Uploaded:</span>
                          <span>{formatDate(selectedImage.createdAt)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Featured:</span>
                          <span>{selectedImage.isFeatured ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                </div>

                    {selectedImage.description && (
                <div>
                        <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                        <p className="text-sm text-gray-600">{selectedImage.description}</p>
                </div>
                    )}

                    {selectedImage.tags.length > 0 && (
                <div>
                        <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedImage.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                </div>
                      </div>
                    )}

                {/* Actions */}
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                      <div className="flex space-x-2">
                  <Button
                    variant="outline"
                          onClick={() => toggleFeatured(selectedImage._id, selectedImage.isFeatured)}
                  >
                          <Star className={`h-4 w-4 mr-2 ${selectedImage.isFeatured ? 'text-yellow-500 fill-current' : ''}`} />
                          {selectedImage.isFeatured ? 'Remove Featured' : 'Make Featured'}
                  </Button>
                  <Button
                          variant="outline"
                          onClick={() => window.open(selectedImage.urls?.original || selectedImage.url, '_blank')}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleDelete(selectedImage._id)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                  </Button>
                </div>
              </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}