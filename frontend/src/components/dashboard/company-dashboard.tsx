"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/lib/store";
import { logout } from "@/slice/user-slice";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Users,
  Briefcase,
  FileText,
  LogOut,
  Settings,
  Plus,
  BarChart3,
  Eye,
  Edit2,
  Trash2,
  Clock,
  Calendar,
  MapPin as LocationIcon,
  TrendingUp,
  Star,
  Award,
  Zap,
  Bell,
  Target,
  IndianRupee,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";

const CompanyDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const [activeTab, setActiveTab] = useState("active");

  // Mock job data
  const mockJobs = [
    {
      id: "1",
      title: "Frontend Developer Intern",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Remote",
      duration: "3 months",
      stipend: "15,000/month",
      skills: ["React", "JavaScript", "TypeScript"],
      applicationsCount: 156,
      status: "active",
      postedDate: "2025-09-07",
      deadline: "2025-09-20",
      description:
        "Join our dynamic team to build cutting-edge web applications using React and modern JavaScript frameworks.",
      requirements: [
        "Strong knowledge of React",
        "Experience with TypeScript",
        "Understanding of modern web development",
      ],
    },
    {
      id: "2",
      title: "Data Science Intern",
      department: "Analytics",
      location: "Mumbai, India",
      type: "Hybrid",
      duration: "6 months",
      stipend: "20,000/month",
      skills: ["Python", "Machine Learning", "SQL"],
      applicationsCount: 89,
      status: "active",
      postedDate: "2025-09-06",
      deadline: "2025-09-25",
      description:
        "Work on real-world data science projects and gain hands-on experience with ML algorithms.",
      requirements: ["Python programming", "Basic ML knowledge", "SQL skills"],
    },
    {
      id: "3",
      title: "UI/UX Design Intern",
      department: "Design",
      location: "Delhi, India",
      type: "On-site",
      duration: "4 months",
      stipend: "12,000/month",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      applicationsCount: 203,
      status: "draft",
      postedDate: "2025-09-05",
      deadline: "2025-09-30",
      description:
        "Create beautiful and intuitive user interfaces for mobile and web applications.",
      requirements: [
        "Design portfolio",
        "Figma proficiency",
        "Creative thinking",
      ],
    },
    {
      id: "4",
      title: "Backend Developer Intern",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Remote",
      duration: "4 months",
      stipend: "18,000/month",
      skills: ["Node.js", "Express", "MongoDB"],
      applicationsCount: 67,
      status: "closed",
      postedDate: "2025-08-25",
      deadline: "2025-09-15",
      description:
        "Develop robust backend services and APIs for our growing platform.",
      requirements: [
        "Node.js experience",
        "Database knowledge",
        "API development",
      ],
    },
  ];

  const handleEditJob = (jobId: string) => {
    // Mock edit functionality
    alert(`Editing job ${jobId}! This would open the job edit form.`);
  };

  const handleDeleteJob = (jobId: string) => {
    // Mock delete functionality
    if (confirm("Are you sure you want to delete this job posting?")) {
      alert(`Job ${jobId} deleted successfully!`);
    }
  };

  const handleViewApplications = (jobId: string) => {
    // Mock view applications functionality
    alert(
      `Viewing applications for job ${jobId}! This would open the applications list.`
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "closed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3" />;
      case "draft":
        return <AlertCircle className="h-3 w-3" />;
      case "closed":
        return <XCircle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const filteredJobs =
    activeTab === "all"
      ? mockJobs
      : mockJobs.filter((job) => job.status === activeTab);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-peach border-t-melon mx-auto mb-4"></div>
          <p className="text-charcoal animate-pulse">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-peach rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-charcoal" />
                </div>
                <h1 className="text-2xl font-bold text-charcoal">
                  InternMatch
                </h1>
              </div>
              <span className="ml-4 px-4 py-2 bg-peach text-charcoal text-sm font-medium rounded-full border border-charcoal/20">
                Company Portal
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-6 py-2 bg-peach text-charcoal rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:bg-melon hover:text-white group">
                <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                Post New Job
              </button>
              <button className="relative p-2 text-gray-500 hover:text-charcoal transition-all duration-200 hover:bg-peach/30 rounded-lg">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-melon rounded-full animate-ping"></span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-melon rounded-full"></span>
              </button>
              <button className="p-2 text-gray-500 hover:text-charcoal transition-all duration-200 hover:bg-peach/30 rounded-lg">
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-charcoal hover:text-melon transition-all duration-200 hover:bg-red-50 rounded-lg group"
              >
                <LogOut className="h-4 w-4 mr-2 group-hover:text-melon transition-colors" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Company Profile Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-24 h-24 bg-peach rounded-full flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-charcoal" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <h2 className="text-xl font-bold text-charcoal mb-1">
                  {user.profile?.companyName || user.name}
                </h2>
                <p className="text-gray-600 text-sm capitalize mb-3">
                  {user.profile?.designation || user.role}
                </p>
                <div className="flex items-center justify-center">
                  {user.isVerified ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      <Award className="h-3 w-3 mr-1" />✓ Verified Company
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                      <Clock className="h-3 w-3 mr-1" />⚠ Pending Verification
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-charcoal hover:text-melon transition-colors p-2 rounded-lg hover:bg-peach/20">
                  <Mail className="h-4 w-4 mr-3 text-melon" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.profile?.phone && (
                  <div className="flex items-center text-sm text-charcoal hover:text-melon transition-colors p-2 rounded-lg hover:bg-peach/20">
                    <Phone className="h-4 w-4 mr-3 text-melon" />
                    {user.profile.phone}
                  </div>
                )}
                {user.profile?.location && (
                  <div className="flex items-center text-sm text-charcoal hover:text-melon transition-colors p-2 rounded-lg hover:bg-peach/20">
                    <MapPin className="h-4 w-4 mr-3 text-melon" />
                    {user.profile.location}
                  </div>
                )}
                {user.profile?.companySize && (
                  <div className="flex items-center text-sm text-charcoal hover:text-melon transition-colors p-2 rounded-lg hover:bg-peach/20">
                    <Users className="h-4 w-4 mr-3 text-melon" />
                    {user.profile.companySize} employees
                  </div>
                )}
              </div>
            </div>

            {/* Company Bio */}
            {user.profile?.bio && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-melon" />
                  About Company
                </h3>
                <p className="text-charcoal leading-relaxed">
                  {user.profile.bio}
                </p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-melon" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-peach text-charcoal rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:bg-melon hover:text-white group">
                  <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                  Create New Job
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-charcoal rounded-xl font-medium hover:bg-peach/50 transition-all duration-200">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Applications
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-charcoal rounded-xl font-medium hover:bg-peach/50 transition-all duration-200">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics Dashboard
                </button>
              </div>
            </div>
          </div>
          {/* Enhanced Dashboard Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <div className="bg-peach rounded-2xl shadow-lg p-8 text-charcoal">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    Welcome back, {user.name.split(" ")[0]}!
                    <span className="ml-2 animate-bounce">🏢</span>
                  </h1>
                  <p className="text-charcoal/80 text-lg">
                    Ready to find top talent? Manage your internship postings
                    and connect with the best candidates.
                  </p>
                </div>
                <div className="hidden md:block">
                  <Building2 className="h-16 w-16 text-charcoal/30" />
                </div>
              </div>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      Active Jobs
                    </p>
                    <p className="text-3xl font-bold text-charcoal mt-1">
                      {mockJobs.filter((job) => job.status === "active").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-peach rounded-xl flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-charcoal" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      Total Applications
                    </p>
                    <p className="text-3xl font-bold text-charcoal mt-1">
                      {mockJobs.reduce(
                        (acc, job) => acc + job.applicationsCount,
                        0
                      )}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-peach rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-charcoal" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      Draft Jobs
                    </p>
                    <p className="text-3xl font-bold text-charcoal mt-1">
                      {mockJobs.filter((job) => job.status === "draft").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-peach rounded-xl flex items-center justify-center">
                    <Edit2 className="h-6 w-6 text-charcoal" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-charcoal">Hired</p>
                    <p className="text-3xl font-bold text-charcoal mt-1">5</p>
                  </div>
                  <div className="w-12 h-12 bg-peach rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-charcoal" />
                  </div>
                </div>
              </div>
            </div>

            {/* Job Postings Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal flex items-center">
                      <Briefcase className="h-6 w-6 mr-2 text-melon" />
                      Job Postings
                    </h3>
                    <p className="text-charcoal/70 mt-1">
                      Manage your internship opportunities
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-peach text-charcoal rounded-xl hover:shadow-lg transition-all duration-200 flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-charcoal rounded-xl hover:bg-peach/50 transition-all duration-200 flex items-center">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </button>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-1 mt-4 bg-gray-100 p-1 rounded-lg">
                  {[
                    {
                      key: "active",
                      label: "Active",
                      count: mockJobs.filter((job) => job.status === "active")
                        .length,
                    },
                    {
                      key: "draft",
                      label: "Draft",
                      count: mockJobs.filter((job) => job.status === "draft")
                        .length,
                    },
                    {
                      key: "closed",
                      label: "Closed",
                      count: mockJobs.filter((job) => job.status === "closed")
                        .length,
                    },
                    { key: "all", label: "All", count: mockJobs.length },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                        activeTab === tab.key
                          ? "bg-white text-charcoal shadow-sm"
                          : "text-charcoal/60 hover:text-charcoal hover:bg-white/50"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          activeTab === tab.key
                            ? "bg-peach text-charcoal"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {filteredJobs.length > 0 ? (
                  <div className="space-y-6">
                    {filteredJobs.map((job) => (
                      <div
                        key={job.id}
                        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-xl font-bold text-charcoal">
                                {job.title}
                              </h4>
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  job.status
                                )} border`}
                              >
                                {getStatusIcon(job.status)}
                                <span className="ml-1 capitalize">
                                  {job.status}
                                </span>
                              </span>
                            </div>
                            <p className="text-lg font-semibold text-charcoal mb-2 flex items-center">
                              <Building2 className="h-4 w-4 mr-2 text-melon" />
                              {job.department} Department
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal mb-3">
                              <span className="flex items-center">
                                <LocationIcon className="h-4 w-4 mr-1 text-melon" />
                                {job.location}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-melon" />
                                {job.duration}
                              </span>
                              <span className="flex items-center">
                                <IndianRupee className="h-4 w-4 mr-1 text-melon" />
                                {job.stipend}
                              </span>
                              <span className="flex items-center">
                                <Users className="h-4 w-4 mr-1 text-melon" />
                                {job.applicationsCount} applications
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-melon" />
                                Deadline:{" "}
                                {new Date(job.deadline).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-charcoal/70 mb-4 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-peach text-charcoal text-xs font-medium rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-charcoal/60">
                            Posted on{" "}
                            {new Date(job.postedDate).toLocaleDateString()}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewApplications(job.id)}
                              className="bg-gray-100 text-charcoal px-4 py-2 rounded-xl font-medium hover:bg-peach/50 transition-all duration-200 flex items-center group"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Applications
                            </button>
                            <button
                              onClick={() => handleEditJob(job.id)}
                              className="bg-peach text-charcoal px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center group"
                            >
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-200 transition-all duration-200 flex items-center group"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-peach rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="h-8 w-8 text-charcoal" />
                    </div>
                    <p className="text-charcoal font-medium mb-2">
                      No {activeTab === "all" ? "" : activeTab} jobs found
                    </p>
                    <p className="text-sm text-charcoal/60 mb-4">
                      {activeTab === "all"
                        ? "Create your first internship posting to start receiving applications"
                        : `You don't have any ${activeTab} jobs at the moment`}
                    </p>
                    <button className="bg-peach text-charcoal px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:bg-melon hover:text-white">
                      Create New Job
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Analytics Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-charcoal flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-melon" />
                  Analytics Overview
                </h3>
                <button className="px-4 py-2 bg-peach text-charcoal rounded-xl hover:shadow-lg transition-all duration-200 flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Detailed Report
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-xl bg-peach/20">
                  <div className="w-12 h-12 bg-peach rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6 text-charcoal" />
                  </div>
                  <p className="text-2xl font-bold text-charcoal">87%</p>
                  <p className="text-sm text-charcoal/70">
                    Application Success Rate
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-green-50">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-charcoal">4.8</p>
                  <p className="text-sm text-charcoal/70">
                    Average Company Rating
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-blue-50">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-charcoal">3.2 days</p>
                  <p className="text-sm text-charcoal/70">
                    Average Response Time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;
