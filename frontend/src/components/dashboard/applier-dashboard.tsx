"use client";

import React from "react";
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
} from "lucide-react";

const ApplierDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
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
              <span className="ml-4 px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                Student Portal
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
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
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-sm capitalize">{user.role}</p>
                <div className="mt-4 flex items-center justify-center">
                  {user.isVerified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Verified
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
              </div>

              {/* Academic Information */}
              {user.profile?.college && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Academic Information
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-3 text-gray-400" />
                      {user.profile.college}
                    </div>
                    {user.profile.course && (
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-3 text-gray-400" />
                        {user.profile.course}
                      </div>
                    )}
                    {user.profile.graduationYear && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                        Class of {user.profile.graduationYear}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-sm p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {user.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-orange-100">
                Ready to discover exciting internship opportunities? Let's get
                you matched with the perfect role.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-blue-600" />
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
                  <FileText className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Interviews
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">0</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Matches</p>
                    <p className="text-2xl font-semibold text-gray-900">0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Bio */}
            {user.profile?.bio && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  About
                </h3>
                <p className="text-gray-600">{user.profile.bio}</p>
              </div>
            )}

            {/* Skills */}
            {user.profile?.skills && user.profile.skills.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity Placeholder */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Recent Activity
              </h3>
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No recent activity</p>
                <p className="text-sm text-gray-400 mt-1">
                  Start applying to internships to see your activity here
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplierDashboard;
