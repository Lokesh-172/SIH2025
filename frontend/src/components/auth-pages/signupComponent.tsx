"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  GraduationCap,
  Building2,
  ArrowRight,
  FileText,
  Upload,
  X,
} from "lucide-react";

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

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    // Student specific fields
    college: "",
    course: "",
    graduationYear: "",
    resume: null as File | null,
    // Company specific fields
    companyName: "",
    designation: "",
    companySize: "",
  });
  const [userType, setUserType] = useState<"student" | "company">("student");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (only PDF)
      if (file.type !== "application/pdf") {
        alert(
          "Please upload a PDF file only. Other formats are not supported."
        );
        e.target.value = ""; // Clear the input
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(
          "File size should be less than 5MB. Please compress your PDF or choose a smaller file."
        );
        e.target.value = ""; // Clear the input
        return;
      }
      // Validate file name length
      if (file.name.length > 100) {
        alert(
          "File name is too long. Please rename your file to be under 100 characters."
        );
        e.target.value = ""; // Clear the input
        return;
      }

      setFormData({
        ...formData,
        resume: file,
      });

      // Success message
      console.log("Resume uploaded successfully:", file.name);
    }
  };

  const removeResume = () => {
    setFormData({
      ...formData,
      resume: null,
    });
    // Clear the file input
    const fileInput = document.getElementById("resume") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    // For students, check if resume is uploaded (optional but recommended)
    if (userType === "student" && !formData.resume) {
      const shouldContinue = window.confirm(
        "No resume uploaded. While not required, uploading a resume helps employers learn about your skills. Continue without resume?"
      );
      if (!shouldContinue) {
        return;
      }
    }

    // Create FormData object to handle file upload
    const submitData = new FormData();

    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "resume" && value instanceof File) {
        submitData.append(key, value);
      } else if (typeof value === "string") {
        submitData.append(key, value);
      }
    });

    submitData.append("userType", userType);

    console.log("Registration attempt:", {
      ...formData,
      userType,
      resumeUploaded: !!formData.resume,
      resumeName: formData.resume?.name || "No resume",
    });

    alert(
      `Registration successful! Welcome to InternMatch!${
        formData.resume ? " Your resume has been uploaded successfully." : ""
      }`
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12">
      <div className="absolute inset-0">
        <GridPattern />
      </div>

      {/* Header with logo */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">InternMatch</div>
          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <button className="text-gray-800 hover:text-gray-600 font-medium">
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative px-4 sm:px-6 lg:px-8 w-full mt-16">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Join InternMatch
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Create your account and start your journey to the perfect
              internship
            </p>
          </div>

          {/* User Type Selection */}
          <div className="mb-8 bg-white rounded-2xl p-2 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setUserType("student")}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  userType === "student"
                    ? "bg-orange-200 text-gray-800 shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                For Students
              </button>
              <button
                onClick={() => setUserType("company")}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  userType === "company"
                    ? "bg-gray-700 text-white shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                For Companies
              </button>
            </div>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Basic Information
                  </h3>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {userType === "student"
                      ? "Full Name"
                      : "Contact Person Name"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                      placeholder={
                        userType === "student"
                          ? "Enter your full name"
                          : "Enter contact person name"
                      }
                      required
                    />
                  </div>
                </div>

                {/* Email */}
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
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                      placeholder="Enter your city/state"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Student Specific Fields */}
              {userType === "student" && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Academic Information
                    </h3>
                  </div>

                  {/* College */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      College/University
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                        placeholder="Enter your college/university name"
                        required
                      />
                    </div>
                  </div>

                  {/* Course */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Course/Degree
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                      required
                    >
                      <option value="">Select your course</option>
                      <option value="btech">B.Tech/BE</option>
                      <option value="mtech">M.Tech/ME</option>
                      <option value="bca">BCA</option>
                      <option value="mca">MCA</option>
                      <option value="bba">BBA</option>
                      <option value="mba">MBA</option>
                      <option value="bcom">B.Com</option>
                      <option value="mcom">M.Com</option>
                      <option value="ba">BA</option>
                      <option value="ma">MA</option>
                      <option value="bsc">B.Sc</option>
                      <option value="msc">M.Sc</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Graduation Year */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Expected Graduation Year
                    </label>
                    <select
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                      required
                    >
                      <option value="">Select graduation year</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                    </select>
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Resume/CV (PDF only)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {formData.resume ? (
                        // Show uploaded file
                        <div className="w-full flex items-center justify-between px-4 py-4 bg-green-50 border-2 border-green-200 rounded-xl">
                          <div className="flex items-center">
                            <FileText className="h-8 w-8 text-green-600 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {formData.resume.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                {(formData.resume.size / (1024 * 1024)).toFixed(
                                  2
                                )}{" "}
                                MB
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <label
                              htmlFor="resume"
                              className="px-3 py-1.5 text-xs font-medium text-orange-600 bg-orange-100 rounded-lg hover:bg-orange-200 cursor-pointer transition-colors"
                            >
                              Change
                            </label>
                            <button
                              type="button"
                              onClick={removeResume}
                              className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              title="Remove resume"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Show upload area
                        <label
                          htmlFor="resume"
                          className="w-full flex items-center justify-center px-4 py-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 cursor-pointer group"
                        >
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-gray-400 group-hover:text-orange-500 mb-2 transition-colors" />
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              Upload your resume
                            </p>
                            <p className="text-xs text-gray-500">
                              PDF only, max 5MB
                            </p>
                            <p className="text-xs text-orange-600 mt-2">
                              Click to browse files
                            </p>
                          </div>
                        </label>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Upload your latest resume in PDF format. This will help
                      employers learn more about your skills and experience.
                    </p>
                  </div>
                </div>
              )}

              {/* Company Specific Fields */}
              {userType === "company" && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Company Information
                    </h3>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Your Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                      placeholder="Enter your job title/designation"
                      required
                    />
                  </div>

                  {/* Company Size */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Company Size
                    </label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                      required
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Password Section */}
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Security
                  </h3>
                </div>

                {/* Password */}
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
                      className="w-full pl-12 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                      placeholder="Create a strong password"
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

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start space-x-3 py-4">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 h-5 w-5 text-orange-200 border-gray-300 rounded focus:ring-orange-200"
                  required
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-gray-800 font-semibold hover:text-gray-600 transition-colors"
                  >
                    Terms & Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-gray-800 font-semibold hover:text-gray-600 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className={`w-full flex items-center justify-center px-6 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 hover:transform hover:scale-105 ${
                  userType === "student"
                    ? "text-gray-800 bg-orange-200 hover:bg-orange-300 shadow-orange-200/50"
                    : "text-white bg-gray-700 hover:bg-gray-800 shadow-gray-400/30"
                }`}
              >
                Create Your Account
                <ArrowRight className="ml-3 h-5 w-5" />
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center border-t border-gray-100 pt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button className="text-gray-800 font-semibold hover:text-gray-600 transition-colors">
                  Sign in here
                </button>
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <CheckCircle className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-800 font-medium text-sm">
                  Free to Join
                </span>
                <p className="text-gray-600 text-xs mt-1">No hidden charges</p>
              </div>
            </div>
            <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <CheckCircle className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-800 font-medium text-sm">
                  Instant Matching
                </span>
                <p className="text-gray-600 text-xs mt-1">
                  AI-powered recommendations
                </p>
              </div>
            </div>
            <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <CheckCircle className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-800 font-medium text-sm">
                  Secure Platform
                </span>
                <p className="text-gray-600 text-xs mt-1">
                  Your data is protected
                </p>
              </div>
            </div>
            <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <CheckCircle className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-800 font-medium text-sm">
                  24/7 Support
                </span>
                <p className="text-gray-600 text-xs mt-1">
                  Help when you need it
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
