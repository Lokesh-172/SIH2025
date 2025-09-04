"use client"

import React, { useState } from "react";
import { CheckCircle, Eye, EyeOff, Mail, Lock, User, Phone, MapPin, GraduationCap, Building2, ArrowRight } from "lucide-react";

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
        backgroundSize: '24px 24px'
      }}
    />
  </div>
);

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    // Student specific fields
    college: '',
    course: '',
    graduationYear: '',
    // Company specific fields
    companyName: '',
    designation: '',
    companySize: ''
  });
  const [userType, setUserType] = useState<'student' | 'company'>('student');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    console.log('Registration attempt:', { ...formData, userType });
    alert('Registration successful! Welcome to InternMatch!');
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
            Already have an account?{' '}
            <button className="text-gray-800 hover:text-gray-600 font-medium">Sign In</button>
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
              Create your account and start your journey to the perfect internship
            </p>
          </div>

          {/* User Type Selection */}
          <div className="mb-8 bg-white rounded-2xl p-2 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setUserType('student')}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  userType === 'student'
                    ? 'bg-orange-200 text-gray-800 shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                For Students
              </button>
              <button
                onClick={() => setUserType('company')}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  userType === 'company'
                    ? 'bg-gray-700 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {userType === 'student' ? 'Full Name' : 'Contact Person Name'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                      placeholder={userType === 'student' ? 'Enter your full name' : 'Enter contact person name'}
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
              {userType === 'student' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
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
                </div>
              )}

              {/* Company Specific Fields */}
              {userType === 'company' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Company Information</h3>
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
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
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                  I agree to the{' '}
                  <button type="button" className="text-gray-800 font-semibold hover:text-gray-600 transition-colors">
                    Terms & Conditions
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-gray-800 font-semibold hover:text-gray-600 transition-colors">
                    Privacy Policy
                  </button>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className={`w-full flex items-center justify-center px-6 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 hover:transform hover:scale-105 ${
                  userType === 'student'
                    ? 'text-gray-800 bg-orange-200 hover:bg-orange-300 shadow-orange-200/50'
                    : 'text-white bg-gray-700 hover:bg-gray-800 shadow-gray-400/30'
                }`}
              >
                Create Your Account
                <ArrowRight className="ml-3 h-5 w-5" />
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center border-t border-gray-100 pt-6">
              <p className="text-gray-600">
                Already have an account?{' '}
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
                <span className="text-gray-800 font-medium text-sm">Free to Join</span>
                <p className="text-gray-600 text-xs mt-1">No hidden charges</p>
              </div>
            </div>
            <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <CheckCircle className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-800 font-medium text-sm">Instant Matching</span>
                <p className="text-gray-600 text-xs mt-1">AI-powered recommendations</p>
              </div>
            </div>
            <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <CheckCircle className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-800 font-medium text-sm">Secure Platform</span>
                <p className="text-gray-600 text-xs mt-1">Your data is protected</p>
              </div>
            </div>
            <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <CheckCircle className="h-6 w-6 text-orange-400 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-800 font-medium text-sm">24/7 Support</span>
                <p className="text-gray-600 text-xs mt-1">Help when you need it</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
