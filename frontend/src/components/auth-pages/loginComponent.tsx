"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store";
import { loginUser, clearError } from "@/slice/user-slice";
import { demoCredentials } from "@/data/mockLoginCredentials";

// Enhanced GridPattern to match the homepage subtle background
const GridPattern = () => (
  <div className="absolute inset-0 opacity-10">
    <div
      className="h-full w-full"
      style={{
        backgroundImage: `
          linear-gradient(rgba(107,114,128,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(107,114,128,0.1) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
      }}
    />
  </div>
);

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loginLoading, error, isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [userType, setUserType] = useState<"student" | "company">("student");
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  // Redirect user after successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath =
        user.role === "company" ? "/company/dashboard" : "/user/dashboard";
      router.push(redirectPath);
    }
  }, [isAuthenticated, user, router]);

  // Clear error when component unmounts or form changes
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Clear error when switching user types or typing
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [userType, formData.email, formData.password, dispatch, error]);

  // Fix 1: Correct type for input change event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fix 2: Correct type for form submit event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    try {
      await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();
      // Navigation is handled by useEffect after successful login
    } catch (error) {
      // Error is handled by Redux state
      console.error("Login failed:", error);
    }
  };

  // Helper function to fill demo credentials
  const fillDemoCredentials = (type: "student" | "company" | "admin") => {
    const credentials = demoCredentials[type];
    setFormData({
      email: credentials.email,
      password: credentials.password,
    });
    setUserType(type === "admin" ? "company" : type);
    setShowDemoCredentials(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center pt-20 bg-white">
      <div className="absolute inset-0">
        <GridPattern />
      </div>

      {/* Header with logo */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">DISHA</div>
          <div className="text-sm text-gray-600">
            Back to{" "}
            <button className="text-gray-800 hover:text-gray-600 font-medium">
              Homepage
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative px-4 sm:px-6 lg:px-8 w-full mt-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sign in to continue your internship journey with AI-powered
              matching
            </p>

            {/* Demo Credentials Section */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                🎯 Use Demo Credentials
              </button>

              {showDemoCredentials && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 mb-3 font-medium">
                    Quick Demo Access:
                  </p>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials("student")}
                      className="w-full text-left px-3 py-2 text-sm bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                    >
                      <span className="font-medium">Student:</span>{" "}
                      john.student@gmail.com
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials("company")}
                      className="w-full text-left px-3 py-2 text-sm bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                    >
                      <span className="font-medium">Company:</span>{" "}
                      hr@techcorp.com
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials("admin")}
                      className="w-full text-left px-3 py-2 text-sm bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                    >
                      <span className="font-medium">Admin:</span>{" "}
                      admin@DISHA.com
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Type Selection - Enhanced to match homepage style */}
          <div className="mb-8 bg-white rounded-2xl p-2 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setUserType("student")}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  userType === "student"
                    ? "bg-gray-900 text-white shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                For Students
              </button>
              <button
                onClick={() => setUserType("company")}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  userType === "company"
                    ? "bg-blue-600 text-white shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                For Companies
              </button>
            </div>
          </div>

          {/* Login Form - Enhanced with better styling */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Fix 3: Add proper form element with onSubmit */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Fix 4: Change onClick to type="submit" for proper form submission */}
              <button
                type="submit"
                disabled={loginLoading || !formData.email || !formData.password}
                className={`w-full flex items-center justify-center px-6 py-4 rounded-lg text-lg font-semibold shadow-lg transition-colors hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  userType === "student"
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loginLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-3"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    {userType === "student"
                      ? "Build Your Profile & Find Internships"
                      : "Post Internship Opportunities"}
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            {/* Signup Link */}
            <div className="mt-8 text-center border-t border-gray-100 pt-6">
              <p className="text-gray-600">
                Don't have an account yet?{" "}
                <button
                  onClick={() => router.push("/sign-up")}
                  className="text-gray-900 font-semibold hover:text-gray-700 transition-colors"
                >
                  Create your account
                </button>
              </p>
            </div>
          </div>

          {/* Benefits - Enhanced to match homepage features */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <CheckCircle className="h-6 w-6 text-gray-400 mr-4 flex-shrink-0" />
              <div>
                <span className="text-gray-800 font-medium text-sm">
                  Smart AI Matching
                </span>
                <p className="text-gray-600 text-xs mt-1">
                  Personalized recommendations tailored for PM roles
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <CheckCircle className="h-6 w-6 text-gray-400 mr-4 flex-shrink-0" />
              <div>
                <span className="text-gray-800 font-medium text-sm">
                  Secure & Private
                </span>
                <p className="text-gray-600 text-xs mt-1">
                  Your data is protected with enterprise-grade security
                </p>
              </div>
            </div>
          </div>

          {/* Footer testimonial hint */}
          <div className="mt-12 text-center">
            <div className="flex justify-center items-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Trusted by thousands of students and top companies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
