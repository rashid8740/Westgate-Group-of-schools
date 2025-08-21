'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users,
  FileText,
  MessageSquare,
  Images,
  TrendingUp,
  Calendar,
  Clock,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { applicationsApi, messagesApi, galleryApi } from '@/lib/api';

interface DashboardStats {
  applications: {
    total: number;
    pending: number;
    review: number;
    approved: number;
    rejected: number;
  };
  messages: {
    total: number;
    unread: number;
    read: number;
    replied: number;
    resolved: number;
    highPriority: number;
  };
  gallery: {
    total: number;
    active: number;
    featured: number;
  };
}

interface Application {
  _id: string;
  studentFirstName: string;
  studentLastName: string;
  program: string;
  status: string;
  createdAt: string;
  applicationNumber: string;
  email: string;
}

interface Message {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  status: string;
  priority: string;
  createdAt: string;
}

const getStatusBadge = (status: string) => {
  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    review: 'bg-blue-100 text-blue-800',
    rejected: 'bg-red-100 text-red-800',
    unread: 'bg-red-100 text-red-800',
    read: 'bg-gray-100 text-gray-800',
    replied: 'bg-green-100 text-green-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'
    }`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInHours < 48) return '1 day ago';
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
    return date.toLocaleDateString();
  };

  // Format program helper
  const formatProgram = (program: string) => {
    switch (program) {
      case 'early-years': return 'Early Years';
      case 'primary': return 'Primary School';
      case 'secondary': return 'Secondary School';
      default: return program;
    }
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [appsStats, msgsStats, galleryStats, recentApps, recentMsgs] = await Promise.all([
        applicationsApi.getStats(),
        messagesApi.getStats(),
        galleryApi.getStats(),
        applicationsApi.getAll(new URLSearchParams({ limit: '4', sortBy: 'createdAt', sortOrder: 'desc' })),
        messagesApi.getAll(new URLSearchParams({ limit: '5', sortBy: 'createdAt', sortOrder: 'desc' }))
      ]);

      // Set stats
      setStats({
        applications: appsStats.data.overview,
        messages: msgsStats.data.overview,
        gallery: galleryStats.data.overview
      });

      // Set recent data
      setRecentApplications(recentApps.data.applications);
      setRecentMessages(recentMsgs.data.messages);

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Loading your dashboard...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="lg">
              <div className="animate-pulse">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  <div className="ml-5 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your admin dashboard.</p>
        </div>
        <Card padding="lg">
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Dashboard</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="inline-flex items-center px-4 py-2 bg-primary-red text-white rounded-lg hover:bg-primary-red/90"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
          </div>
        </Card>
      </div>
    );
  }

  const dashboardStats = [
    {
      name: 'Total Applications',
      value: stats?.applications.total.toString() || '0',
      pending: stats?.applications.pending || 0,
      icon: FileText,
      color: 'primary-red'
    },
    {
      name: 'Unread Messages',
      value: stats?.messages.unread.toString() || '0',
      total: stats?.messages.total || 0,
      icon: MessageSquare,
      color: 'green-500'
    },
    {
      name: 'Gallery Images',
      value: stats?.gallery.active.toString() || '0',
      featured: stats?.gallery.featured || 0,
      icon: Images,
      color: 'blue-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to your admin dashboard. Here's what's happening today.
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card padding="lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 bg-${stat.color}/10 rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 text-${stat.color}`} />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        {stat.pending && (
                          <div className="ml-2 text-sm text-yellow-600">
                            ({stat.pending} pending)
                          </div>
                        )}
                        {stat.total && (
                          <div className="ml-2 text-sm text-gray-500">
                            / {stat.total} total
                          </div>
                        )}
                        {stat.featured && (
                          <div className="ml-2 text-sm text-blue-600">
                            ({stat.featured} featured)
                          </div>
                        )}
                      </dd>
                    </dl>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Applications & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div>
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
              <a href="/admin/applications" className="text-primary-red hover:text-primary-red/80 text-sm font-medium">
                View all
              </a>
            </div>
            
            <div className="space-y-4">
              {recentApplications.length > 0 ? (
                recentApplications.map((application) => (
                  <div key={application._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          {application.studentFirstName} {application.studentLastName}
                        </h4>
                        {getStatusBadge(application.status)}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatProgram(application.program)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        App #: {application.applicationNumber}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(application.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent applications</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Recent Messages */}
        <div>
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
              <a href="/admin/messages" className="text-primary-red hover:text-primary-red/80 text-sm font-medium">
                View all
              </a>
            </div>
            
            <div className="space-y-4">
              {recentMessages.length > 0 ? (
                recentMessages.map((message) => (
                  <div key={message._id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary-red/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-red">
                          {message.firstName.charAt(0)}{message.lastName.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {message.firstName} {message.lastName}
                        </p>
                        {getStatusBadge(message.status)}
                      </div>
                      {message.priority === 'high' || message.priority === 'urgent' ? (
                        <div className="flex items-center mb-1">
                          <AlertCircle className="h-3 w-3 text-red-500 mr-1" />
                          <span className="text-xs text-red-600 font-medium uppercase">
                            {message.priority}
                          </span>
                        </div>
                      ) : null}
                      <p className="text-sm text-gray-600 truncate">
                        {message.subject}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(message.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent messages</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="/admin/applications"
              className="flex items-center justify-center p-4 bg-primary-red/5 border border-primary-red/10 rounded-lg hover:bg-primary-red/10 transition-colors"
            >
              <FileText className="h-5 w-5 text-primary-red mr-3" />
              <span className="text-sm font-medium text-primary-red">Manage Applications</span>
            </a>
            <a 
              href="/admin/messages"
              className="flex items-center justify-center p-4 bg-green-50 border border-green-100 rounded-lg hover:bg-green-100 transition-colors"
            >
              <MessageSquare className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-sm font-medium text-green-600">View Messages</span>
            </a>
            <a 
              href="/admin/gallery"
              className="flex items-center justify-center p-4 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Images className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-blue-600">Manage Gallery</span>
            </a>
          </div>
        </Card>
      </div>

      {/* System Alerts */}
      <div>
        <Card padding="lg">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
          </div>
          <div className="space-y-3">
            {(stats?.applications?.pending || 0) > 0 && (
              <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-yellow-800">
                    {stats?.applications?.pending || 0} application{(stats?.applications?.pending || 0) > 1 ? 's' : ''} require review
                  </p>
                </div>
                <a 
                  href="/admin/applications?status=pending"
                  className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                >
                  Review
                </a>
              </div>
            )}
            
            {(stats?.messages?.unread || 0) > 0 && (
              <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-red-800">
                    {stats?.messages?.unread || 0} unread message{(stats?.messages?.unread || 0) > 1 ? 's' : ''} waiting for response
                  </p>
                </div>
                <a 
                  href="/admin/messages?status=unread"
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  View
                </a>
              </div>
            )}

            {(stats?.messages?.highPriority || 0) > 0 && (
              <div className="flex items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-orange-800">
                    {stats?.messages?.highPriority || 0} high priority message{(stats?.messages?.highPriority || 0) > 1 ? 's' : ''} need attention
                  </p>
                </div>
                <a 
                  href="/admin/messages?priority=high"
                  className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                >
                  Respond
                </a>
              </div>
            )}

            {/* Show success message if no alerts */}
            {(!(stats?.applications?.pending || 0) && !(stats?.messages?.unread || 0) && !(stats?.messages?.highPriority || 0)) && (
              <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-green-800">
                    ✅ All systems running smoothly - no pending actions required
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}