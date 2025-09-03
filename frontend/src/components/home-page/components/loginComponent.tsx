import React, { useState } from "react";
import { CheckCircle, Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

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

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [userType, setUserType] = useState<'student' | 'company'>('student');

  // Fix 1: Correct type for input change event
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Fix 2: Correct type for form submit event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login attempt:', { ...formData, userType });
    alert('Login attempt logged to console');
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="absolute inset-0">
        <GridPattern />
      </div>

      {/* Header with logo */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">InternMatch</div>
          <div className="text-sm text-gray-600">
            Back to <button className="text-gray-800 hover:text-gray-600 font-medium">Homepage</button>
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
              Sign in to continue your internship journey with AI-powered matching
            </p>
          </div>

          {/* User Type Selection - Enhanced to match homepage style */}
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

          {/* Login Form - Enhanced with better styling */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
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
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
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
                    className="w-full pl-12 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all text-gray-800"
                    placeholder="Enter your password"
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
                className={`w-full flex items-center justify-center px-6 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 hover:transform hover:scale-105 ${
                  userType === 'student'
                    ? 'text-gray-800 bg-orange-200 hover:bg-orange-300 shadow-orange-200/50'
                    : 'text-white bg-gray-700 hover:bg-gray-800 shadow-gray-400/30'
                }`}
              >
                {userType === 'student' ? 'Build Your Profile & Find Internships' : 'Post Internship Opportunities'}
                <ArrowRight className="ml-3 h-5 w-5" />
              </button>
            </form>

            {/* Signup Link */}
            <div className="mt-8 text-center border-t border-gray-100 pt-6">
              <p className="text-gray-600">
                Don't have an account yet?{' '}
                <button 
                  className="text-gray-800 font-semibold hover:text-gray-600 transition-colors"
                >
                  Create your account
                </button>
              </p>
            </div>
          </div>

          {/* Benefits - Enhanced to match homepage features */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <CheckCircle className="h-6 w-6 text-orange-400 mr-4 flex-shrink-0" />
              <div>
                <span className="text-gray-800 font-medium text-sm">Smart AI Matching</span>
                <p className="text-gray-600 text-xs mt-1">Personalized recommendations tailored for PM roles</p>
              </div>
            </div>
            <div className="flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <CheckCircle className="h-6 w-6 text-orange-400 mr-4 flex-shrink-0" />
              <div>
                <span className="text-gray-800 font-medium text-sm">Secure & Private</span>
                <p className="text-gray-600 text-xs mt-1">Your data is protected with enterprise-grade security</p>
              </div>
            </div>
          </div>

          {/* Footer testimonial hint */}
          <div className="mt-12 text-center">
            <div className="flex justify-center items-center space-x-1 mb-2">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
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
