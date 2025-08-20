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
  GraduationCap,
  Download,
  MoreHorizontal,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { applicationsApi } from '@/lib/api';

const statusOptions = ['all', 'pending', 'review', 'approved', 'rejected'];
const programOptions = ['all', 'early-years', 'primary', 'secondary'];

interface Application {
  _id: string;
  studentFirstName: string;
  studentLastName: string;
  parentFirstName: string;
  parentLastName: string;
  email: string;
  phone: string;
  program: string;
  currentGrade: string;
  dateOfBirth: string;
  nationality: string;
  previousSchool: string;
  status: string;
  createdAt: string;
  applicationNumber: string;
  medicalConditions: string;
  specialNeeds: string;
  address: string;
  city: string;
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  // Fetch applications
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await applicationsApi.getAll();
      setApplications(response.data.applications);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      setError('Failed to load applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format program display name
  const formatProgram = (program: string) => {
    switch (program) {
      case 'early-years': return 'Early Years';
      case 'primary': return 'Primary School';
      case 'secondary': return 'Secondary School';
      default: return program;
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

  const filteredApplications = applications.filter(app => {
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesProgram = selectedProgram === 'all' || app.program === selectedProgram;
    const studentName = `${app.studentFirstName} ${app.studentLastName}`.toLowerCase();
    const parentName = `${app.parentFirstName} ${app.parentLastName}`.toLowerCase();
    const matchesSearch = studentName.includes(searchTerm.toLowerCase()) ||
                         parentName.includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesProgram && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      review: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800'
    };

    const statusIcons = {
      pending: Clock,
      approved: Check,
      review: Eye,
      rejected: X
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

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      setUpdating(applicationId);
      await applicationsApi.updateStatus(applicationId, newStatus);
      
      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app._id === applicationId 
            ? { ...app, status: newStatus }
            : app
        )
      );
      
      // Update selected application if it's the one being updated
      if (selectedApplication && selectedApplication._id === applicationId) {
        setSelectedApplication(prev => prev ? { ...prev, status: newStatus } : null);
      }
      
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update application status. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications Management</h1>
          <p className="text-gray-600 mt-2">
            Review and manage student admission applications.
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            onClick={fetchApplications}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <Card padding="lg">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading applications...</p>
          </div>
        </Card>
      )}

      {/* Error State */}
      {error && !loading && (
        <Card padding="lg">
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Applications</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchApplications}>
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
                placeholder="Search applications..."
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

          {/* Program Filter */}
          <div>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
            >
              <option value="all">All Programs</option>
              <option value="early-years">Early Years</option>
              <option value="primary">Primary School</option>
              <option value="secondary">Secondary School</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Applications', value: applications.length, color: 'blue' },
          { label: 'Pending Review', value: applications.filter(app => app.status === 'pending').length, color: 'yellow' },
          { label: 'Approved', value: applications.filter(app => app.status === 'approved').length, color: 'green' },
          { label: 'Under Review', value: applications.filter(app => app.status === 'review').length, color: 'purple' }
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

      {/* Applications Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent/Guardian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((application, index) => (
                <tr
                  key={application._id}
                  className="hover:bg-gray-50"
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
                          {application.studentFirstName} {application.studentLastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.currentGrade}
                        </div>
                        <div className="text-xs text-gray-400">
                          #{application.applicationNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {application.parentFirstName} {application.parentLastName}
                    </div>
                    <div className="text-sm text-gray-500">{application.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{formatProgram(application.program)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(application.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(application.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(application)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {application.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'approved')}
                            disabled={updating === application._id}
                            className="text-green-600 hover:text-green-900 disabled:opacity-50"
                            title="Approve"
                          >
                            {updating === application._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'rejected')}
                            disabled={updating === application._id}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            title="Reject"
                          >
                            <X className="h-4 w-4" />
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
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No Applications Found</p>
                      <p>No applications match your current filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
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
                  <h3 className="text-lg font-semibold">Application Details</h3>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Student Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedApplication.studentFirstName} {selectedApplication.studentLastName}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Application Number</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono">
                        #{selectedApplication.applicationNumber}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(selectedApplication.dateOfBirth)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nationality</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.nationality}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Program</label>
                      <p className="mt-1 text-sm text-gray-900">{formatProgram(selectedApplication.program)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Grade Applying For</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.currentGrade}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Previous School</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.previousSchool || 'None'}</p>
                    </div>
                  </div>
                </div>

                {/* Parent Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Parent/Guardian Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedApplication.parentFirstName} {selectedApplication.parentLastName}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.city}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.address}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Medical Conditions</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.medicalConditions}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Special Needs</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.specialNeeds}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Application Status</label>
                      <div className="mt-1">{getStatusBadge(selectedApplication.status)}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Submitted Date</label>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(selectedApplication.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {selectedApplication.status === 'pending' && (
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Actions</h4>
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => {
                          handleStatusUpdate(selectedApplication._id, 'approved');
                          setShowDetailsModal(false);
                        }}
                        disabled={updating === selectedApplication._id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => {
                          handleStatusUpdate(selectedApplication._id, 'review');
                          setShowDetailsModal(false);
                        }}
                        disabled={updating === selectedApplication._id}
                        variant="outline"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Mark for Review
                      </Button>
                      <Button
                        onClick={() => {
                          handleStatusUpdate(selectedApplication._id, 'rejected');
                          setShowDetailsModal(false);
                        }}
                        disabled={updating === selectedApplication._id}
                        variant="outline"
                        className="border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      
      </>
      )} {/* End conditional wrapper */}
    </div>
  );
}