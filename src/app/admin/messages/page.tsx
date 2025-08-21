'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  Filter,
  Eye,
  Check,
  X,
  Clock,
  User,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Reply,
  MoreHorizontal,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  UserCheck,
  UserX
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { contactApi } from '@/lib/api';

const statusOptions = ['all', 'new', 'contacted', 'follow-up', 'resolved', 'accepted', 'rejected'];
const inquiryTypeOptions = ['all', 'general', 'tour', 'admissions', 'academic', 'facilities'];

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  inquiryType: string;
  childAge?: string;
  preferredProgram?: string;
  preferredContactTime: string;
  createdAt: string;
  status: string;
  notes?: string;
  assignedTo?: string;
  responseDate?: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function AdminMessages() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNext: false,
    hasPrev: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedInquiryType, setSelectedInquiryType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [responding, setResponding] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch contacts with pagination
  const fetchContacts = async (page = 1, limit = itemsPerPage) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });

      if (selectedStatus !== 'all') {
        params.set('status', selectedStatus);
      }
      if (selectedInquiryType !== 'all') {
        params.set('inquiryType', selectedInquiryType);
      }
      if (searchTerm) {
        params.set('search', searchTerm);
      }

      const response = await contactApi.getAll(params);
      setContacts(response.data.contacts);
      setPagination(response.data.pagination);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      setError('Failed to load contact submissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    fetchContacts(1, itemsPerPage);
  }, [selectedStatus, selectedInquiryType, searchTerm, itemsPerPage]);

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Format inquiry type display name
  const formatInquiryType = (type: string) => {
    switch (type) {
      case 'general': return 'General';
      case 'tour': return 'School Tour';
      case 'admissions': return 'Admissions';
      case 'academic': return 'Academic';
      case 'facilities': return 'Facilities';
      default: return type;
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesStatus = selectedStatus === 'all' || contact.status === selectedStatus;
    const matchesInquiryType = selectedInquiryType === 'all' || contact.inquiryType === selectedInquiryType;
    const matchesSearch = searchTerm === '' || 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesInquiryType && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      new: 'bg-red-100 text-red-800',
      contacted: 'bg-blue-100 text-blue-800',
      'follow-up': 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };

    const statusIcons = {
      new: Mail,
      contacted: MessageSquare,
      'follow-up': Clock,
      resolved: CheckCircle,
      accepted: UserCheck,
      rejected: UserX
    };

    const Icon = statusIcons[status as keyof typeof statusIcons] || Mail;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
      }`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleStatusUpdate = async (contactId: string, newStatus: string) => {
    try {
      setUpdating(contactId);
      await contactApi.updateStatus(contactId, newStatus);
      
      // Update local state
      setContacts(prev => 
        prev.map(contact => 
          contact._id === contactId 
            ? { ...contact, status: newStatus }
            : contact
        )
      );
      
      // Update selected contact if it's the one being updated
      if (selectedContact && selectedContact._id === contactId) {
        setSelectedContact(prev => prev ? { ...prev, status: newStatus } : null);
      }
      
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update contact status. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDetailsModal(true);
    if (contact.status === 'new') {
      handleStatusUpdate(contact._id, 'contacted');
    }
  };

  const handleReply = (contact: Contact) => {
    setSelectedContact(contact);
    setShowReplyModal(true);
  };

  const handleSendReply = async () => {
    if (selectedContact && replyText.trim()) {
      try {
        setResponding(true);
        await contactApi.updateStatus(selectedContact._id, 'contacted', replyText);
        
        // Update local state
        setContacts(prev => 
          prev.map(contact => 
            contact._id === selectedContact._id 
              ? { ...contact, status: 'contacted', notes: replyText }
              : contact
          )
        );
        
        setReplyText('');
        setShowReplyModal(false);
        setSelectedContact(null);
        
      } catch (error) {
        console.error('Failed to update contact:', error);
        alert('Failed to update contact. Please try again.');
      } finally {
        setResponding(false);
      }
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchContacts(page, itemsPerPage);
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
            onClick={() => fetchContacts(currentPage, itemsPerPage)}
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
            <p className="text-gray-600">Loading contacts...</p>
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
            <Button onClick={() => fetchContacts(currentPage, itemsPerPage)}>
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
                    placeholder="Search contacts..."
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

              {/* Inquiry Type Filter */}
          <div>
            <select
                  value={selectedInquiryType}
                  onChange={(e) => setSelectedInquiryType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            >
                  <option value="all">All Types</option>
                  <option value="general">General</option>
                  <option value="tour">School Tour</option>
                  <option value="admissions">Admissions</option>
                  <option value="academic">Academic</option>
                  <option value="facilities">Facilities</option>
            </select>
          </div>

              {/* Items per page */}
              <div>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                >
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
              { label: 'Total Messages', value: filteredContacts.length, color: 'blue' },
              { label: 'New Messages', value: filteredContacts.filter(contact => contact.status === 'new').length, color: 'red' },
              { label: 'Follow-up', value: filteredContacts.filter(contact => contact.status === 'follow-up').length, color: 'yellow' },
              { label: 'Resolved', value: filteredContacts.filter(contact => contact.status === 'resolved').length, color: 'green' }
        ].map((stat, index) => (
              <div key={stat.label}>
            <Card padding="lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </Card>
              </div>
        ))}
      </div>

          {/* Messages Table */}
          <Card padding="none">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inquiry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Received
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact, index) => (
                    <tr
                      key={contact._id}
                      className={`hover:bg-gray-50 ${contact.status === 'new' ? 'bg-red-50/30' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-primary-red/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-red" />
                        </div>
                      </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {contact.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {contact.email}
                            </div>
                            <div className="text-xs text-gray-400 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {contact.phone}
                      </div>
                    </div>
                    </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">
                          {formatInquiryType(contact.inquiryType)}
                  </div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {contact.message}
                  </div>
                        {contact.childAge && (
                          <div className="text-xs text-gray-400 mt-1">
                            Child age: {contact.childAge}
                      </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(contact.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(contact.createdAt)}
                      </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(contact)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                      <button
                            onClick={() => handleReply(contact)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Add Notes"
                      >
                        <Reply className="h-4 w-4" />
                      </button>
                          {contact.status === 'new' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(contact._id, 'contacted')}
                                disabled={updating === contact._id}
                                className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                title="Mark as Contacted"
                              >
                                {updating === contact._id ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                                ) : (
                                  <Check className="h-4 w-4" />
                                )}
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(contact._id, 'follow-up')}
                                disabled={updating === contact._id}
                                className="text-yellow-600 hover:text-yellow-900 disabled:opacity-50"
                                title="Mark for Follow-up"
                              >
                                <Clock className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          {(contact.status === 'contacted' || contact.status === 'follow-up') && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(contact._id, 'accepted')}
                                disabled={updating === contact._id}
                                className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                title="Accept"
                              >
                                {updating === contact._id ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                                ) : (
                                  <UserCheck className="h-4 w-4" />
                                )}
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(contact._id, 'rejected')}
                                disabled={updating === contact._id}
                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                title="Reject"
                              >
                                <UserX className="h-4 w-4" />
                      </button>
                              <button
                                onClick={() => handleStatusUpdate(contact._id, 'resolved')}
                                disabled={updating === contact._id}
                                className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                title="Mark as Resolved"
                              >
                                {updating === contact._id ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                                ) : (
                                  <CheckCircle className="h-4 w-4" />
                                )}
                      </button>
                            </>
                          )}
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                      </td>
                    </tr>
          ))
        ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg font-medium mb-2">No Messages Found</p>
                          <p>
                            {searchTerm || selectedStatus !== 'all' || selectedInquiryType !== 'all'
                  ? 'No messages match your current filters.'
                  : 'No messages have been received yet.'}
              </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Card padding="lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>
                    Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of {pagination.totalItems} results
                  </span>
      </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(1)}
                    disabled={!pagination.hasPrev}
                    className="hidden md:inline-flex"
                  >
                    First
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrev}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <span className="px-4 py-2 text-sm text-gray-700">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNext}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.totalPages)}
                    disabled={!pagination.hasNext}
                    className="hidden md:inline-flex"
                  >
                    Last
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Contact Details Modal */}
          {showDetailsModal && selectedContact && (
            <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetailsModal(false)}
          >
              <div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Contact Details</h3>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                    {/* Contact Information */}
                <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedContact.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedContact.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedContact.phone}</p>
                    </div>
                    <div>
                          <label className="block text-sm font-medium text-gray-700">Inquiry Type</label>
                          <p className="mt-1 text-sm text-gray-900">{formatInquiryType(selectedContact.inquiryType)}</p>
                        </div>
                        {selectedContact.childAge && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Child Age</label>
                            <p className="mt-1 text-sm text-gray-900">{selectedContact.childAge}</p>
                          </div>
                        )}
                        {selectedContact.preferredProgram && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Preferred Program</label>
                            <p className="mt-1 text-sm text-gray-900">{selectedContact.preferredProgram}</p>
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Preferred Contact Time</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedContact.preferredContactTime}</p>
                    </div>
                  </div>
                </div>

                    {/* Message */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Message</h4>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                      </div>
                    </div>

                    {/* Status and Notes */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Status & Notes</h4>
                      <div className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700">Current Status</label>
                          <div className="mt-1">{getStatusBadge(selectedContact.status)}</div>
                      </div>
                        {selectedContact.notes && (
                      <div>
                            <label className="block text-sm font-medium text-gray-700">Notes</label>
                            <div className="mt-1 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-900 whitespace-pre-wrap">{selectedContact.notes}</p>
                            </div>
                      </div>
                        )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Received</label>
                          <p className="mt-1 text-sm text-gray-900">{formatDate(selectedContact.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                    <div className="flex space-x-3 pt-6 border-t border-gray-200">
                    <Button
                      onClick={() => {
                        setShowDetailsModal(false);
                          handleReply(selectedContact);
                      }}
                        className="flex-1"
                    >
                      <Reply className="h-4 w-4 mr-2" />
                        Add Notes
                    </Button>
                      
                      {(selectedContact.status === 'contacted' || selectedContact.status === 'follow-up') && (
                        <>
                    <Button
                      onClick={() => {
                              handleStatusUpdate(selectedContact._id, 'accepted');
                        setShowDetailsModal(false);
                      }}
                            disabled={updating === selectedContact._id}
                            className="bg-green-600 hover:bg-green-700"
                    >
                            <UserCheck className="h-4 w-4 mr-2" />
                            Accept
                    </Button>
                    <Button
                      onClick={() => {
                              handleStatusUpdate(selectedContact._id, 'rejected');
                        setShowDetailsModal(false);
                      }}
                            disabled={updating === selectedContact._id}
                      variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-50"
                    >
                            <UserX className="h-4 w-4 mr-2" />
                            Reject
                    </Button>
                        </>
                      )}
                      
                      <select
                        value={selectedContact.status}
                        onChange={(e) => {
                          handleStatusUpdate(selectedContact._id, e.target.value);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                      >
                        {statusOptions.filter(s => s !== 'all').map(status => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
        )}

      {/* Reply Modal */}
          {showReplyModal && selectedContact && (
            <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowReplyModal(false)}
          >
              <div
              className="bg-white rounded-lg max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Add Notes for {selectedContact.name}</h3>
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
                        <strong>Type:</strong> {formatInquiryType(selectedContact.inquiryType)}
                  </p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {selectedContact.message}
                  </p>
                </div>

                    {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Notes
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                        rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                        placeholder="Add notes about this contact inquiry..."
                  />
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleSendReply}
                    disabled={!replyText.trim() || responding}
                  >
                    {responding ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                      </div>
                    ) : (
                      <>
                            <Reply className="h-4 w-4 mr-2" />
                            Save Notes
                      </>
                    )}
                  </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowReplyModal(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
        )}
      </>
      )}
    </div>
  );
}