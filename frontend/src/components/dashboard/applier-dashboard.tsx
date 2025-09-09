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
} from "lucide-react";

const ApplierDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const [activeTab, setActiveTab] = useState("recommended");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>(["1"]); // Mock applied jobs

  // Mock recommended jobs data - now as state for dynamic updates
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
      isHot: false,
      isApplied: false,
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
    },
  ]);

  // Redirect if not authenticated
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
    // Simple apply functionality
    if (appliedJobs.includes(jobId)) {
      alert(`You have already applied to this job!`);
    } else {
      setAppliedJobs((prev) => [...prev, jobId]);
      // Update the job's applied status dynamically
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
                  <Briefcase className="h-6 w-6 text-charcoal" />
                </div>
                <h1 className="text-2xl font-bold text-charcoal">
                  InternMatch
                </h1>
              </div>
              <span className="ml-4 px-4 py-2 bg-peach text-charcoal text-sm font-medium rounded-full border border-charcoal/20">
                Student Portal
              </span>
            </div>
            <div className="flex items-center space-x-4">
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
          {/* Enhanced Profile Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-24 h-24 bg-peach rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-charcoal" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <h2 className="text-xl font-bold text-charcoal mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-sm capitalize mb-3">
                  {user.role}
                </p>
                <div className="flex items-center justify-center">
                  {user.isVerified ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      <Award className="h-3 w-3 mr-1" />✓ Verified
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
              </div>

              {/* Academic Information */}
              {user.profile?.college && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-charcoal mb-3 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-melon" />
                    Academic Information
                  </h3>
                  <div className="space-y-3 text-sm text-charcoal">
                    <div className="flex items-center p-2 rounded-lg hover:bg-peach/20 transition-colors">
                      <Building className="h-4 w-4 mr-3 text-melon" />
                      <span className="font-medium">
                        {user.profile.college}
                      </span>
                    </div>
                    {user.profile.course && (
                      <div className="flex items-center p-2 rounded-lg hover:bg-peach/20 transition-colors">
                        <BookOpen className="h-4 w-4 mr-3 text-melon" />
                        <span>{user.profile.course}</span>
                      </div>
                    )}
                    {user.profile.graduationYear && (
                      <div className="flex items-center p-2 rounded-lg hover:bg-peach/20 transition-colors">
                        <Calendar className="h-4 w-4 mr-3 text-melon" />
                        <span>Class of {user.profile.graduationYear}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* About Section */}
            {user.profile?.bio && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-melon" />
                  About Me
                </h3>
                <p className="text-charcoal leading-relaxed">
                  {user.profile.bio}
                </p>
              </div>
            )}

            {/* Skills Section */}
            {user.profile?.skills && user.profile.skills.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-melon" />
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {user.profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-peach text-charcoal hover:shadow-md transition-all duration-200 hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Dashboard Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <div className="bg-peach rounded-2xl shadow-lg p-8 text-charcoal">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    Welcome back, {user.name.split(" ")[0]}!
                    <span className="ml-2 animate-bounce">👋</span>
                  </h1>
                  <p className="text-charcoal/80 text-lg">
                    Ready to discover exciting internship opportunities? Let's
                    get you matched with the perfect role.
                  </p>
                </div>
                <div className="hidden md:block">
                  <Zap className="h-16 w-16 text-charcoal/30" />
                </div>
              </div>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      Applications
                    </p>
                    <p className="text-3xl font-bold text-charcoal mt-1">
                      {appliedJobs.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-peach rounded-xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-charcoal" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      Interviews
                    </p>
                    <p className="text-3xl font-bold text-charcoal mt-1">0</p>
                  </div>
                  <div className="w-12 h-12 bg-peach rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-charcoal" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-charcoal">Matches</p>
                    <p className="text-3xl font-bold text-charcoal mt-1">0</p>
                  </div>
                  <div className="w-12 h-12 bg-peach rounded-xl flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-charcoal" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      Saved Jobs
                    </p>
                    <p className="text-3xl font-bold text-charcoal mt-1">
                      {savedJobs.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-peach rounded-xl flex items-center justify-center">
                    <Bookmark className="h-6 w-6 text-charcoal" />
                  </div>
                </div>
              </div>
            </div>

            {/* Job Recommendations Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal flex items-center">
                      <Zap className="h-6 w-6 mr-2 text-melon" />
                      Recommended Jobs
                    </h3>
                    <p className="text-charcoal/70 mt-1">
                      Personalized opportunities just for you
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
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                  {recommendedJobs
                    .filter((job) => !job.isApplied) // Only show non-applied jobs
                    .map((job) => (
                      <div
                        key={job.id}
                        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1 pr-4">
                            <h4 className="text-xl font-bold text-charcoal mb-1">
                              {job.title}
                            </h4>
                            <p className="text-lg font-semibold text-charcoal mb-2 flex items-center">
                              <Building className="h-4 w-4 mr-2 text-melon" />
                              {job.company}
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
                                {job.applicants} applicants
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleSaveJob(job.id)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              savedJobs.includes(job.id)
                                ? "bg-peach text-melon"
                                : "bg-gray-100 text-gray-500 hover:bg-peach hover:text-melon"
                            }`}
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                savedJobs.includes(job.id) ? "fill-current" : ""
                              }`}
                            />
                          </button>
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
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium text-charcoal ml-1">
                                {job.rating}
                              </span>
                            </div>
                            <span className="text-xs text-charcoal/60">
                              Posted {job.postedDays} days ago
                            </span>
                          </div>
                          <button
                            onClick={() => handleApplyJob(job.id)}
                            className="bg-peach text-charcoal px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center group hover:bg-melon hover:text-white"
                          >
                            Apply Now
                            <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {recommendedJobs.filter((job) => !job.isApplied).length ===
                0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-peach rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-charcoal" />
                    </div>
                    <p className="text-charcoal font-medium mb-2">
                      No new recommendations
                    </p>
                    <p className="text-sm text-charcoal/60 mb-4">
                      You've applied to all available jobs. Check back later for
                      new opportunities!
                    </p>
                    <button className="bg-peach text-charcoal px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:bg-melon hover:text-white">
                      Browse More Jobs
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 text-center">
                    <button className="bg-peach text-charcoal px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:bg-melon hover:text-white">
                      Load More Jobs
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-melon" />
                Recent Activity
              </h3>
              {appliedJobs.length > 0 ? (
                <div className="space-y-6">
                  {recommendedJobs
                    .filter((job) => appliedJobs.includes(job.id))
                    .map((job) => (
                      <div
                        key={job.id}
                        className="rounded-xl shadow-lg border border-green-200 p-6 bg-green-50/30 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1 pr-4">
                            <h4 className="text-xl font-bold text-charcoal mb-1">
                              {job.title}
                            </h4>
                            <p className="text-lg font-semibold text-charcoal mb-2 flex items-center">
                              <Building className="h-4 w-4 mr-2 text-melon" />
                              {job.company}
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
                                {job.applicants} applicants
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleSaveJob(job.id)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              savedJobs.includes(job.id)
                                ? "bg-peach text-melon"
                                : "bg-gray-100 text-gray-500 hover:bg-peach hover:text-melon"
                            }`}
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                savedJobs.includes(job.id) ? "fill-current" : ""
                              }`}
                            />
                          </button>
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
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium text-charcoal ml-1">
                                {job.rating}
                              </span>
                            </div>
                            <span className="text-xs text-charcoal/60">
                              Posted {job.postedDays} days ago
                            </span>
                            {job.applicationDate && (
                              <span className="text-xs text-green-600 font-medium">
                                Applied on{" "}
                                {new Date(
                                  job.applicationDate
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <button
                            className="bg-green-100 text-green-700 px-6 py-2 rounded-xl font-medium transition-all duration-200 flex items-center hover:bg-green-200"
                            title="Application Status"
                          >
                            <Target className="h-4 w-4 mr-2" />
                            Applied
                          </button>
                        </div>
                      </div>
                    ))}
                  <div className="text-center pt-4">
                    <button className="bg-peach text-charcoal px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:bg-melon hover:text-white">
                      View All Applications
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-peach rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-charcoal" />
                  </div>
                  <p className="text-charcoal font-medium mb-2">
                    No recent activity
                  </p>
                  <p className="text-sm text-charcoal/60 mb-4">
                    Start applying to internships to see your activity here
                  </p>
                  <button className="bg-peach text-charcoal px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:bg-melon hover:text-white">
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
