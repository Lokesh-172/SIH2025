'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  FileText,
  Star,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Search,
  Filter,
  Clock
} from 'lucide-react';

interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'hired';
  appliedOn: string;
  resumeLink: string;
  rating: number;
  experience: string;
  college: string;
  course: string;
}

interface ApplicationsListProps {
  jobId: string;
  jobTitle?: string;
  onBack?: () => void;
}

const mockApplications: Application[] = [
  {
    id: '1',
    applicantName: 'Aman Sharma',
    email: 'aman.sharma@example.com',
    phone: '+91 9876543210',
    status: 'pending',
    appliedOn: '2025-09-08',
    resumeLink: '#',
    rating: 4.2,
    experience: 'Fresher',
    college: 'Delhi Technological University',
    course: 'B.Tech Computer Science'
  },
  {
    id: '2',
    applicantName: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+91 8765432109',
    status: 'shortlisted',
    appliedOn: '2025-09-07',
    resumeLink: '#',
    rating: 4.8,
    experience: '6 months',
    college: 'IIT Delhi',
    course: 'B.Tech Information Technology'
  },
  {
    id: '3',
    applicantName: 'Rahul Kumar',
    email: 'rahul.kumar@example.com',
    phone: '+91 7654321098',
    status: 'rejected',
    appliedOn: '2025-09-06',
    resumeLink: '#',
    rating: 3.5,
    experience: 'Fresher',
    college: 'NSIT Delhi',
    course: 'B.Tech Electronics'
  },
  {
    id: '4',
    applicantName: 'Sneha Gupta',
    email: 'sneha.gupta@example.com',
    phone: '+91 6543210987',
    status: 'hired',
    appliedOn: '2025-09-05',
    resumeLink: '#',
    rating: 4.9,
    experience: '1 year',
    college: 'DTU Delhi',
    course: 'B.Tech Software Engineering'
  },
  {
    id: '5',
    applicantName: 'Arjun Singh',
    email: 'arjun.singh@example.com',
    phone: '+91 5432109876',
    status: 'pending',
    appliedOn: '2025-09-04',
    resumeLink: '#',
    rating: 4.1,
    experience: 'Fresher',
    college: 'Jamia Millia Islamia',
    course: 'B.Tech Computer Engineering'
  }
];

const ApplicationsList: React.FC<ApplicationsListProps> = ({ 
  jobId, 
  jobTitle = "Frontend Developer Intern", 
  onBack 
}) => {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shortlisted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'hired':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'shortlisted':
        return <CheckCircle className="h-3 w-3" />;
      case 'rejected':
        return <XCircle className="h-3 w-3" />;
      case 'hired':
        return <CheckCircle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const updateApplicationStatus = (applicationId: string, newStatus: 'shortlisted' | 'rejected' | 'hired') => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId
          ? { ...app, status: newStatus }
          : app
      )
    );
    
    // Show success message
    alert(`Application ${newStatus} successfully!`);
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    shortlisted: applications.filter(app => app.status === 'shortlisted').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    hired: applications.filter(app => app.status === 'hired').length,
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-peach p-6 text-charcoal">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-charcoal/10 rounded-lg transition-colors"
                  title="Back to Dashboard"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold flex items-center">
                    <FileText className="h-6 w-6 mr-2" />
                    Job Applications
                  </h1>
                  <p className="text-charcoal/80 mt-1">
                    {jobTitle} - Job ID: #{jobId}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  {filteredApplications.length} Applications
                </p>
                <p className="text-sm text-charcoal/70">
                  {statusCounts.shortlisted} Shortlisted | {statusCounts.hired} Hired
                </p>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-6 border-b border-gray-200 space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or college..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peach focus:border-peach"
                />
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Applications', count: statusCounts.all },
                { key: 'pending', label: 'Pending', count: statusCounts.pending },
                { key: 'shortlisted', label: 'Shortlisted', count: statusCounts.shortlisted },
                { key: 'hired', label: 'Hired', count: statusCounts.hired },
                { key: 'rejected', label: 'Rejected', count: statusCounts.rejected },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                    statusFilter === tab.key
                      ? 'bg-charcoal text-white'
                      : 'text-charcoal/70 hover:bg-charcoal/10 hover:text-charcoal'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    statusFilter === tab.key
                      ? 'bg-white text-charcoal'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Applications Table */}
          <div className="overflow-x-auto">
            {filteredApplications.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Education
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resume
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {app.applicantName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {app.experience}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{app.email}</div>
                        <div className="text-sm text-gray-500">{app.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{app.college}</div>
                        <div className="text-sm text-gray-500">{app.course}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span className="ml-1 capitalize">
                            {app.status}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-900">{app.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <a
                          href={app.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-melon hover:text-melon/80 font-medium transition-colors"
                        >
                          View Resume
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          {app.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                                className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-xs font-medium"
                              >
                                Shortlist
                              </button>
                              <button
                                onClick={() => updateApplicationStatus(app.id, 'rejected')}
                                className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-xs font-medium"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {app.status === 'shortlisted' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'hired')}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-xs font-medium"
                            >
                              Hire
                            </button>
                          )}
                          {(app.status === 'rejected' || app.status === 'hired') && (
                            <span className="text-xs text-gray-500 px-3 py-1">
                              No actions
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No applications found</p>
                <p className="text-gray-400 text-sm">
                  {searchTerm ? 'Try adjusting your search criteria' : 'No applications received yet'}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {filteredApplications.length} of {applications.length} applications
              </div>
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-charcoal/90 transition-colors font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsList;
