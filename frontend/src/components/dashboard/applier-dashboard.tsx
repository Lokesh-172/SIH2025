"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/lib/store";
import { logout } from "@/slice/user-slice";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  FileText,
  LogOut,
  Settings,
  BookOpen,
  Target,
  Briefcase,
  Clock,
  MapPin as LocationIcon,
  DollarSign,
  Star,
  ExternalLink,
  Heart,
  Bookmark,
  Search,
  Filter,
  Bell,
  TrendingUp,
  Award,
  Users,
  Building,
  Zap,
  IndianRupee,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Activity,
  Eye,
  Send,
  Plus,
} from "lucide-react";

const ApplierDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const [activeTab, setActiveTab] = useState("recommended");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>(["1"]);

  // Mock recommended jobs data
  const [recommendedJobs, setRecommendedJobs] = useState([
    {
      id: "1",
      title: "Frontend Developer Intern",
      company: "TechCorp Solutions",
      location: "Bangalore, India",
      type: "Remote",
      duration: "3 months",
      stipend: "15,000/month",
      skills: ["React", "JavaScript", "TypeScript"],
      rating: 4.8,
      applicants: 156,
      postedDays: 2,
      description:
        "Join our dynamic team to build cutting-edge web applications using React and modern JavaScript frameworks.",
      isHot: false,
      isApplied: true,
      applicationDate: "2025-09-08",
      matchScore: 92,
    },
    {
      id: "2",
      title: "Data Science Intern",
      company: "Analytics Pro",
      location: "Mumbai, India",
      type: "Hybrid",
      duration: "6 months",
      stipend: "20,000/month",
      skills: ["Python", "Machine Learning", "SQL"],
      rating: 4.6,
      applicants: 89,
      postedDays: 1,
      description:
        "Work on real-world data science projects and gain hands-on experience with ML algorithms.",
      isHot: true,
      isApplied: false,
      matchScore: 88,
    },
    {
      id: "3",
      title: "UI/UX Design Intern",
      company: "Creative Minds",
      location: "Delhi, India",
      type: "On-site",
      duration: "4 months",
      stipend: "12,000/month",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      rating: 4.4,
      applicants: 203,
      postedDays: 5,
      description:
        "Create beautiful and intuitive user interfaces for mobile and web applications.",
      isHot: false,
      isApplied: false,
      matchScore: 85,
    },
  ]);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleSaveJob = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleApplyJob = (jobId: string) => {
    if (appliedJobs.includes(jobId)) {
      alert(`You have already applied to this job!`);
    } else {
      setAppliedJobs((prev) => [...prev, jobId]);
      setRecommendedJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                isApplied: true,
                applicationDate: new Date().toISOString().split("T")[0],
              }
            : job
        )
      );
      alert(`Application submitted successfully!`);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-700 animate-pulse text-lg font-medium">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Briefcase className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    DISHA
                  </h1>
                  <span className="text-sm text-gray-600 font-medium">
                    Student Portal
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-3 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:bg-gray-100 rounded-xl">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-3 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:bg-gray-100 rounded-xl">
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-red-600 transition-all duration-200 hover:bg-red-50 rounded-xl group"
              >
                <LogOut className="h-4 w-4 mr-2 group-hover:text-red-600 transition-colors" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Profile Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-sm capitalize mb-4">
                  {user.role}
                </p>
                <div className="flex items-center justify-center">
                  {user.isVerified ? (
                    <span className="inline-flex items-center px-3 py-2 rounded-2xl text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                      <Award className="h-3 w-3 mr-2" />
                      Verified Student
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-2 rounded-2xl text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                      <Clock className="h-3 w-3 mr-2" />
                      Pending Verification
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors p-3 rounded-xl hover:bg-gray-50 group">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                    <Mail className="h-4 w-4 text-gray-600" />
                  </div>
                  <span className="truncate font-medium">{user.email}</span>
                </div>
                {user.profile?.phone && (
                  <div className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors p-3 rounded-xl hover:bg-gray-50 group">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                      <Phone className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="font-medium">{user.profile.phone}</span>
                  </div>
                )}
                {user.profile?.location && (
                  <div className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors p-3 rounded-xl hover:bg-gray-50 group">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                      <MapPin className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="font-medium">{user.profile.location}</span>
                  </div>
                )}
              </div>

              {/* Academic Information */}
              {user.profile?.college && (
                <div className="mt-8 pt-6 border-t border-gray-200/50">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center mr-2">
                      <GraduationCap className="h-3 w-3 text-gray-600" />
                    </div>
                    Academic Information
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                        <Building className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="font-medium">{user.profile.college}</span>
                    </div>
                    {user.profile.course && (
                      <div className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                          <BookOpen className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="font-medium">{user.profile.course}</span>
                      </div>
                    )}
                    {user.profile.graduationYear && (
                      <div className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                          <Calendar className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="font-medium">Class of {user.profile.graduationYear}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* About Section */}
            {user.profile?.bio && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  About Me
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {user.profile.bio}
                </p>
              </div>
            )}

            {/* Skills Section */}
            {user.profile?.skills && user.profile.skills.length > 0 && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <Zap className="h-4 w-4 text-gray-600" />
                  </div>
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {user.profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                  <Activity className="h-4 w-4 text-gray-600" />
                </div>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between px-4 py-4 bg-gray-900 text-white rounded-2xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl group">
                  <div className="flex items-center">
                    <Search className="h-4 w-4 mr-3" />
                    Browse All Jobs
                  </div>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-4 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-200 group">
                  <div className="flex items-center">
                    <Bookmark className="h-4 w-4 mr-3" />
                    Saved Jobs
                  </div>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-4 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-200 group">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-3" />
                    Application Status
                  </div>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Dashboard Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl shadow-lg p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-3 flex items-center">
                      Welcome back, {user.name.split(" ")[0]}!
                      <Sparkles className="ml-3 h-6 w-6 text-yellow-400" />
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Ready to discover exciting internship opportunities? Let's
                      get you matched with the perfect role.
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <Target className="h-20 w-20 text-white/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Applications",
                  value: appliedJobs.length,
                  icon: Target,
                  color: "bg-blue-500",
                  bgColor: "bg-blue-50",
                  textColor: "text-blue-700"
                },
                {
                  title: "Interviews",
                  value: 0,
                  icon: FileText,
                  color: "bg-green-500",
                  bgColor: "bg-green-50",
                  textColor: "text-green-700"
                },
                {
                  title: "Profile Views",
                  value: 24,
                  icon: Eye,
                  color: "bg-purple-500",
                  bgColor: "bg-purple-50",
                  textColor: "text-purple-700"
                },
                {
                  title: "Saved Jobs",
                  value: savedJobs.length,
                  icon: Bookmark,
                  color: "bg-yellow-500",
                  bgColor: "bg-yellow-50",
                  textColor: "text-yellow-700"
                }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className={`px-3 py-1 ${stat.bgColor} ${stat.textColor} rounded-full text-xs font-semibold`}>
                      +5%
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Job Recommendations Section */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 overflow-hidden">
              <div className="p-8 border-b border-gray-200/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <Zap className="h-5 w-5 text-gray-600" />
                      </div>
                      Recommended Jobs
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Personalized opportunities just for you
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-200 flex items-center font-medium">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-200 flex items-center font-medium">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-6">
                  {recommendedJobs
                    .filter((job) => !job.isApplied)
                    .map((job) => (
                      <div
                        key={job.id}
                        className="bg-gray-50 rounded-3xl border border-gray-200/50 p-8 hover:shadow-lg hover:bg-white transition-all duration-300 group relative overflow-hidden"
                      >
                        {job.isHot && (
                          <div className="absolute top-6 right-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                              🔥 Hot Job
                            </span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1 pr-8">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-xl font-bold text-gray-900">
                                {job.title}
                              </h4>
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center px-3 py-1 bg-white rounded-xl border border-gray-200">
                                  <Target className="h-3 w-3 text-green-500 mr-1" />
                                  <span className="text-xs font-semibold text-gray-700">{job.matchScore}% match</span>
                                </div>
                                <button
                                  onClick={() => handleSaveJob(job.id)}
                                  className={`p-2 rounded-xl transition-all duration-200 ${
                                    savedJobs.includes(job.id)
                                      ? "bg-red-100 text-red-600"
                                      : "bg-white text-gray-400 hover:bg-red-50 hover:text-red-500 border border-gray-200"
                                  }`}
                                >
                                  <Heart
                                    className={`h-4 w-4 ${
                                      savedJobs.includes(job.id) ? "fill-current" : ""
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>
                            <p className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                              <Building className="h-4 w-4 mr-2 text-gray-500" />
                              {job.company}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 mb-6">
                              <span className="flex items-center bg-white px-3 py-2 rounded-xl border border-gray-200">
                                <LocationIcon className="h-4 w-4 mr-2 text-gray-500" />
                                {job.location}
                              </span>
                              <span className="flex items-center bg-white px-3 py-2 rounded-xl border border-gray-200">
                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                {job.duration}
                              </span>
                              <span className="flex items-center bg-white px-3 py-2 rounded-xl border border-gray-200">
                                <IndianRupee className="h-4 w-4 mr-2 text-gray-500" />
                                {job.stipend}
                              </span>
                              <span className="flex items-center bg-white px-3 py-2 rounded-xl border border-gray-200">
                                <Users className="h-4 w-4 mr-2 text-gray-500" />
                                {job.applicants} applicants
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {job.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-2 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium text-gray-900 ml-1">
                                {job.rating}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              Posted {job.postedDays} days ago
                            </span>
                          </div>
                          <div className="flex space-x-3">
                            <button className="bg-white text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center border border-gray-200">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </button>
                            <button
                              onClick={() => handleApplyJob(job.id)}
                              className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-700 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {recommendedJobs.filter((job) => !job.isApplied).length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Target className="h-10 w-10 text-gray-400" />
                    </div>
                    <p className="text-xl font-semibold text-gray-900 mb-3">
                      No new recommendations
                    </p>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      You've applied to all available jobs. Check back later for
                      new opportunities!
                    </p>
                    <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                      Browse More Jobs
                    </button>
                  </div>
                ) : (
                  <div className="mt-8 text-center">
                    <button className="bg-gray-100 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200">
                      Load More Jobs
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Recent Activity */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="h-5 w-5 text-gray-600" />
                </div>
                Recent Activity
              </h3>
              {appliedJobs.length > 0 ? (
                <div className="space-y-6">
                  {recommendedJobs
                    .filter((job) => appliedJobs.includes(job.id))
                    .map((job) => (
                      <div
                        key={job.id}
                        className="bg-green-50 rounded-3xl border border-green-200/50 p-8 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1 pr-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <h4 className="text-xl font-bold text-gray-900">
                                {job.title}
                              </h4>
                              <span className="inline-flex items-center px-3 py-2 rounded-2xl text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                                <CheckCircle className="h-3 w-3 mr-2" />
                                Applied
                              </span>
                            </div>
                            <p className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                              <Building className="h-4 w-4 mr-2 text-gray-500" />
                              {job.company}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 mb-6">
                              <span className="flex items-center bg-white px-3 py-2 rounded-xl border border-gray-200">
                                <LocationIcon className="h-4 w-4 mr-2 text-gray-500" />
                                {job.location}
                              </span>
                              <span className="flex items-center bg-white px-3 py-2 rounded-xl border border-gray-200">
                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                {job.duration}
                              </span>
                              <span className="flex items-center bg-white px-3 py-2 rounded-xl border border-gray-200">
                                <IndianRupee className="h-4 w-4 mr-2 text-gray-500" />
                                {job.stipend}
                              </span>
                              {job.applicationDate && (
                                <span className="flex items-center bg-white px-3 py-2 rounded-xl border border-gray-200">
                                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                  Applied {new Date(job.applicationDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {job.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-2 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium text-gray-900 ml-1">
                                {job.rating}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              Posted {job.postedDays} days ago
                            </span>
                          </div>
                          <button className="bg-white text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center border border-gray-200">
                            <Eye className="h-4 w-4 mr-2" />
                            Track Status
                          </button>
                        </div>
                      </div>
                    ))}
                  <div className="text-center pt-6">
                    <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                      View All Applications
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Activity className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-xl font-semibold text-gray-900 mb-3">
                    No recent activity
                  </p>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Start applying to internships to see your activity here
                  </p>
                  <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Browse Jobs
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplierDashboard;
