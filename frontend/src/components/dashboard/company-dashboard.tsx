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
  ChevronRight,
  Sparkles,
  Activity,
  PieChart,
} from "lucide-react";

// Import the components
import JobCreationForm from "./dashboardComponents/jobCreate";
import ApplicationsList from "./dashboardComponents/ApplicationList";

const CompanyDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const [activeTab, setActiveTab] = useState("active");

  // Add modal states
  const [showJobModal, setShowJobModal] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [selectedJobForApplications, setSelectedJobForApplications] =
    useState<any>(null);
  const [createdJobs, setCreatedJobs] = useState<any[]>([]);

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

  // Combine mock jobs with created jobs
  const allJobs = [...mockJobs, ...createdJobs];

  // Add handlers for the new functionality
  const handleCreateJobClick = () => {
    setShowJobModal(true);
  };

  const handleJobCreated = (newJob: any) => {
    setCreatedJobs((prev) => [...prev, newJob]);
    setShowJobModal(false);
    alert("Job posted successfully!");
  };

  const handleEditJob = (jobId: string) => {
    alert(`Editing job ${jobId}! This would open the job edit form.`);
  };

  const handleDeleteJob = (jobId: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      setCreatedJobs((prev) => prev.filter((job) => job.id !== jobId));
      alert(`Job ${jobId} deleted successfully!`);
    }
  };

  const handleViewApplications = (jobId: string) => {
    const job = allJobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJobForApplications(job);
      setShowApplicationsModal(true);
    }
  };

  const handleViewAllApplications = () => {
    if (allJobs.length > 0) {
      setSelectedJobForApplications(allJobs[0]);
      setShowApplicationsModal(true);
    } else {
      alert("No jobs found to view applications!");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-300";
      case "draft":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "closed":
        return "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
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
      ? allJobs
      : allJobs.filter((job) => job.status === activeTab);

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
      {/* Job Creation Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl">
            <JobCreationForm
              onSubmit={handleJobCreated}
              onCancel={() => setShowJobModal(false)}
              isModal={true}
            />
          </div>
        </div>
      )}

      {/* Applications Modal */}
      {showApplicationsModal && selectedJobForApplications && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl">
            <ApplicationsList
              jobId={selectedJobForApplications.id}
              jobTitle={selectedJobForApplications.title}
              onBack={() => setShowApplicationsModal(false)}
            />
          </div>
        </div>
      )}

      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    InternMatch
                  </h1>
                  <span className="text-sm text-gray-600 font-medium">
                    Company Portal
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCreateJobClick}
                className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-2xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                Post New Job
              </button>
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
          {/* Enhanced Company Profile Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Profile Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-8 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                    <Building2 className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {user.profile?.companyName || user.name}
                </h2>
                <p className="text-gray-600 text-sm capitalize mb-4">
                  {user.profile?.designation || user.role}
                </p>
                <div className="flex items-center justify-center">
                  {user.isVerified ? (
                    <span className="inline-flex items-center px-3 py-2 rounded-2xl text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                      <Award className="h-3 w-3 mr-2" />
                      Verified Company
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
                {user.profile?.companySize && (
                  <div className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors p-3 rounded-xl hover:bg-gray-50 group">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                      <Users className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="font-medium">
                      {user.profile.companySize} employees
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Company Bio */}
            {user.profile?.bio && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <Building2 className="h-4 w-4 text-gray-600" />
                  </div>
                  About Company
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {user.profile.bio}
                </p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                  <Zap className="h-4 w-4 text-gray-600" />
                </div>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleCreateJobClick}
                  className="w-full flex items-center justify-between px-4 py-4 bg-gray-900 text-white rounded-2xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 mr-3 group-hover:rotate-90 transition-transform duration-200" />
                    Create New Job
                  </div>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={handleViewAllApplications}
                  className="w-full flex items-center justify-between px-4 py-4 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-200 group"
                >
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-3" />
                    View All Applications
                  </div>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-4 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-200 group">
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-3" />
                    Analytics Dashboard
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
                      Ready to find top talent? Manage your internship postings
                      and connect with the best candidates.
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <Building2 className="h-20 w-20 text-white/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Active Jobs",
                  value: allJobs.filter((job) => job.status === "active")
                    .length,
                  icon: Briefcase,
                  color: "bg-blue-500",
                  bgColor: "bg-blue-50",
                  textColor: "text-blue-700",
                },
                {
                  title: "Total Applications",
                  value: allJobs.reduce(
                    (acc, job) => acc + (job.applicationsCount || 0),
                    0
                  ),
                  icon: FileText,
                  color: "bg-green-500",
                  bgColor: "bg-green-50",
                  textColor: "text-green-700",
                },
                {
                  title: "Draft Jobs",
                  value: allJobs.filter((job) => job.status === "draft").length,
                  icon: Edit2,
                  color: "bg-yellow-500",
                  bgColor: "bg-yellow-50",
                  textColor: "text-yellow-700",
                },
                {
                  title: "Hired",
                  value: 5,
                  icon: Users,
                  color: "bg-purple-500",
                  bgColor: "bg-purple-50",
                  textColor: "text-purple-700",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div
                      className={`px-3 py-1 ${stat.bgColor} ${stat.textColor} rounded-full text-xs font-semibold`}
                    >
                      +12%
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

            {/* Job Postings Section */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 overflow-hidden">
              <div className="p-8 border-b border-gray-200/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <Briefcase className="h-5 w-5 text-gray-600" />
                      </div>
                      Job Postings
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Manage your internship opportunities
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

                {/* Tab Navigation */}
                <div className="flex space-x-2 bg-gray-100 p-2 rounded-2xl">
                  {[
                    {
                      key: "active",
                      label: "Active",
                      count: allJobs.filter((job) => job.status === "active")
                        .length,
                    },
                    {
                      key: "draft",
                      label: "Draft",
                      count: allJobs.filter((job) => job.status === "draft")
                        .length,
                    },
                    {
                      key: "closed",
                      label: "Closed",
                      count: allJobs.filter((job) => job.status === "closed")
                        .length,
                    },
                    { key: "all", label: "All", count: allJobs.length },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-3 ${
                        activeTab === tab.key
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          activeTab === tab.key
                            ? "bg-gray-100 text-gray-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8">
                {filteredJobs.length > 0 ? (
                  <div className="space-y-6">
                    {filteredJobs.map((job) => (
                      <div
                        key={job.id}
                        className="bg-gray-50 rounded-3xl border border-gray-200/50 p-8 hover:shadow-lg hover:bg-white transition-all duration-300 group"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <h4 className="text-xl font-bold text-gray-900">
                                {job.title}
                              </h4>
                              <span
                                className={`inline-flex items-center px-3 py-2 rounded-2xl text-xs font-semibold ${getStatusColor(
                                  job.status
                                )} border`}
                              >
                                {getStatusIcon(job.status)}
                                <span className="ml-2 capitalize">
                                  {job.status}
                                </span>
                              </span>
                            </div>
                            <p className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                              <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                              {job.department} Department
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-6">
                              <span className="flex items-center bg-white px-3 py-2 rounded-xl">
                                <LocationIcon className="h-4 w-4 mr-2 text-gray-500" />
                                {job.location}
                              </span>
                              <span className="flex items-center bg-white px-3 py-2 rounded-xl">
                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                {job.duration}
                              </span>
                              <span className="flex items-center bg-white px-3 py-2 rounded-xl">
                                <IndianRupee className="h-4 w-4 mr-2 text-gray-500" />
                                {job.stipend}
                              </span>
                              <span className="flex items-center bg-white px-3 py-2 rounded-xl">
                                <Users className="h-4 w-4 mr-2 text-gray-500" />
                                {job.applicationsCount || 0} applications
                              </span>
                              <span className="flex items-center bg-white px-3 py-2 rounded-xl col-span-2">
                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                Deadline:{" "}
                                {new Date(job.deadline).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {job.skills.map((skill: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-2 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Posted on{" "}
                            {new Date(job.postedDate).toLocaleDateString()}
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleViewApplications(job.id)}
                              className="bg-white text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-900 hover:text-white transition-all duration-200 flex items-center border border-gray-200 group"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Applications
                            </button>
                            <button
                              onClick={() => handleEditJob(job.id)}
                              className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-gray-700 transition-all duration-200 flex items-center"
                            >
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="bg-red-100 text-red-700 px-6 py-3 rounded-2xl font-semibold hover:bg-red-200 transition-all duration-200 flex items-center border border-red-200"
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
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Briefcase className="h-10 w-10 text-gray-400" />
                    </div>
                    <p className="text-xl font-semibold text-gray-900 mb-3">
                      No {activeTab === "all" ? "" : activeTab} jobs found
                    </p>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      {activeTab === "all"
                        ? "Create your first internship posting to start receiving applications"
                        : `You don't have any ${activeTab} jobs at the moment`}
                    </p>
                    <button
                      onClick={handleCreateJobClick}
                      className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Create New Job
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Analytics Section */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <TrendingUp className="h-5 w-5 text-gray-600" />
                  </div>
                  Analytics Overview
                </h3>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-200 flex items-center font-semibold">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Detailed Report
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Application Success Rate",
                    value: "87%",
                    icon: Target,
                    color: "bg-blue-500",
                    bgColor: "bg-blue-50",
                  },
                  {
                    title: "Average Company Rating",
                    value: "4.8",
                    icon: Star,
                    color: "bg-green-500",
                    bgColor: "bg-green-50",
                  },
                  {
                    title: "Average Response Time",
                    value: "3.2 days",
                    icon: Clock,
                    color: "bg-purple-500",
                    bgColor: "bg-purple-50",
                  },
                ].map((analytic, index) => (
                  <div
                    key={index}
                    className={`text-center p-6 rounded-3xl ${analytic.bgColor} border border-gray-200/50`}
                  >
                    <div
                      className={`w-14 h-14 ${analytic.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <analytic.icon className="h-7 w-7 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      {analytic.value}
                    </p>
                    <p className="text-sm font-semibold text-gray-600">
                      {analytic.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;
