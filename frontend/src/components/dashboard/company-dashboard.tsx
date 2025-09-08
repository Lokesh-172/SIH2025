"use client";

import React from "react";
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
} from "lucide-react";

const CompanyDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">InternMatch</h1>
              <span className="ml-4 px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                Company Portal
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-peach text-charcoal rounded-lg cursor-pointer hover:bg-dark-peach transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Post Job
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-10 w-10 text-gray-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.profile?.companyName || user.name}
                </h2>
                <p className="text-gray-600 text-sm capitalize">
                  {user.profile?.designation || user.role}
                </p>
                <div className="mt-4 flex items-center justify-center">
                  {user.isVerified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Verified Company
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      ⚠ Pending Verification
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-3 text-gray-400" />
                  {user.email}
                </div>
                {user.profile?.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-3 text-gray-400" />
                    {user.profile.phone}
                  </div>
                )}
                {user.profile?.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                    {user.profile.location}
                  </div>
                )}
                {user.profile?.companySize && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-3 text-gray-400" />
                    {user.profile.companySize} employees
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-sm p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {user.name.split(" ")[0]}! 🏢
              </h1>
              <p className="text-gray-300">
                Ready to find top talent? Manage your internship postings and
                connect with the best candidates.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Active Jobs
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">0</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Applications
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">0</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Hired</p>
                    <p className="text-2xl font-semibold text-gray-900">0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Bio */}
            {user.profile?.bio && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  About Company
                </h3>
                <p className="text-gray-600">{user.profile.bio}</p>
              </div>
            )}

            {/* Recent Activity / Job Postings */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Job Postings
                </h3>
                <button className="flex items-center px-4 py-2 text-sm bg-peach text-charcoal rounded-lg cursor-pointer hover:bg-dark-peach transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </button>
              </div>
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No job postings yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Create your first internship posting to start receiving
                  applications
                </p>
              </div>
            </div>

            {/* Analytics Placeholder */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
                <BarChart3 className="h-5 w-5 text-gray-400" />
              </div>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Analytics will appear here</p>
                <p className="text-sm text-gray-400 mt-1">
                  Track your hiring performance and application metrics
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;
