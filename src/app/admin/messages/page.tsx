'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  Filter,
  Mail,
  MailOpen,
  Reply,
  Trash2,
  Star,
  Archive,
  Clock,
  User,
  Phone,
  Calendar,
  X,
  Send,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { messagesApi } from '@/lib/api';


const statusOptions = ['all', 'unread', 'read', 'replied'];
const priorityOptions = ['all', 'high', 'normal', 'low'];

interface Message {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: string;
  priority: string;
  response?: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [responding, setResponding] = useState(false);

  // Fetch messages
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await messagesApi.getAll();
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setError('Failed to load messages. Please try again.');
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredMessages = messages.filter(msg => {
    const matchesStatus = selectedStatus === 'all' || msg.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || msg.priority === selectedPriority;
    const fullName = `${msg.firstName} ${msg.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      unread: 'bg-red-100 text-red-800',
      read: 'bg-gray-100 text-gray-800',
      replied: 'bg-green-100 text-green-800'
    };

    const statusIcons = {
      unread: Mail,
      read: MailOpen,
      replied: Reply
    };

    const Icon = statusIcons[status as keyof typeof statusIcons];

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
      }`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      high: 'bg-red-100 text-red-800',
      normal: 'bg-blue-100 text-blue-800',
      low: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        priorityClasses[priority as keyof typeof priorityClasses] || 'bg-gray-100 text-gray-800'
      }`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const handleStatusUpdate = async (messageId: string, newStatus: string) => {
    try {
      await messagesApi.updateStatus(messageId, newStatus);
      
      // Update local state
      setMessages(prev => 
        prev.map(msg => 
          msg._id === messageId 
            ? { ...msg, status: newStatus }
            : msg
        )
      );
      
      // Update selected message if it's the one being updated
      if (selectedMessage && selectedMessage._id === messageId) {
        setSelectedMessage(prev => prev ? { ...prev, status: newStatus } : null);
      }
      
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update message status. Please try again.');
    }
  };

  const handleViewDetails = (message: Message) => {
    setSelectedMessage(message);
    setShowDetailsModal(true);
    if (message.status === 'unread') {
      handleStatusUpdate(message._id, 'read');
    }
  };

  const handleReply = (message: Message) => {
    setSelectedMessage(message);
    setShowReplyModal(true);
  };

  const handleSendReply = async () => {
    if (selectedMessage && replyText.trim()) {
      try {
        setResponding(true);
        await messagesApi.respond(selectedMessage._id, replyText);
        
        // Update local state
        setMessages(prev => 
          prev.map(msg => 
            msg._id === selectedMessage._id 
              ? { ...msg, status: 'replied', response: replyText }
              : msg
          )
        );
        
        setReplyText('');
        setShowReplyModal(false);
        setSelectedMessage(null);
        
      } catch (error) {
        console.error('Failed to send reply:', error);
        alert('Failed to send reply. Please try again.');
      } finally {
        setResponding(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages Management</h1>
          <p className="text-gray-600 mt-2">
            View and respond to contact form submissions and inquiries.
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            onClick={fetchMessages}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <Card padding="lg">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading messages...</p>
          </div>
        </Card>
      )}

      {/* Error State */}
      {error && !loading && (
        <Card padding="lg">
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Messages</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchMessages}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </Card>
      )}

      {/* Content - Only show when not loading and no error */}
      {!loading && !error && (
        <>

      {/* Filters */}
      <Card padding="lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            >
              {priorityOptions.map(priority => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                </option>
              ))}
            </select>
          </div>

        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Messages', value: messages.length, color: 'blue' },
          { label: 'Unread', value: messages.filter(msg => msg.status === 'unread').length, color: 'red' },
          { label: 'Replied', value: messages.filter(msg => msg.status === 'replied').length, color: 'green' },
          { label: 'High Priority', value: messages.filter(msg => msg.priority === 'high').length, color: 'orange' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card padding="lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message, index) => (
          <motion.div
            key={message._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card 
              padding="lg" 
              className={`hover:shadow-md transition-all duration-200 cursor-pointer ${
                message.status === 'unread' ? 'border-l-4 border-primary-red bg-red-50/30' : ''
              }`}
              onClick={() => handleViewDetails(message)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-red/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-red" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {message.firstName} {message.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{message.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(message.priority)}
                      {getStatusBadge(message.status)}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      {message.subject}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {message.message}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(message.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {message.phone}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReply(message);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Reply className="h-4 w-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800">
                        <Star className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Archive className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          ))
        ) : (
          <Card padding="lg">
            <div className="text-center py-12">
              <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Messages Found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedStatus !== 'all' || selectedPriority !== 'all'
                  ? 'No messages match your current filters.'
                  : 'No messages have been received yet.'}
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Message Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Message Details</h3>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Sender Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Sender Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedMessage.firstName} {selectedMessage.lastName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedMessage.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedMessage.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date Received</label>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(selectedMessage.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Message</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subject</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedMessage.subject}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Message</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <div className="mt-1">{getStatusBadge(selectedMessage.status)}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Priority</label>
                        <div className="mt-1">{getPriorityBadge(selectedMessage.priority)}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Received</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedMessage.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleReply(selectedMessage);
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    <Button
                      onClick={() => {
                        handleStatusUpdate(selectedMessage._id, 'read');
                        setShowDetailsModal(false);
                      }}
                      variant="outline"
                    >
                      <MailOpen className="h-4 w-4 mr-2" />
                      Mark as Read
                    </Button>
                    <Button
                      onClick={() => {
                        // Handle archive logic
                        setShowDetailsModal(false);
                      }}
                      variant="outline"
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reply Modal */}
      <AnimatePresence>
        {showReplyModal && selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowReplyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Reply to {selectedMessage.firstName} {selectedMessage.lastName}</h3>
                  <button
                    onClick={() => setShowReplyModal(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Original Message */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Original Message:</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Subject:</strong> {selectedMessage.subject}
                  </p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Reply Form */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Reply
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                    placeholder="Type your reply here..."
                  />
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={() => setShowReplyModal(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSendReply}
                    className="flex-1"
                    disabled={!replyText.trim() || responding}
                  >
                    {responding ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Reply
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      </>
      )} {/* End conditional wrapper */}
    </div>
  );
}