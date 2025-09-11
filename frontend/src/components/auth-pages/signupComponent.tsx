"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { RootState, AppDispatch } from "../../lib/store";
import {
  setUserType,
  updateRegistrationData,
  clearRegistrationData,
  registerUser,
  clearError,
  analyzeResume,
  RegistrationData,
} from "../../slice/user-slice";
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
  Camera,
  Plus,
} from "lucide-react";
import ResumeBuilder from "../resume/ResumeBuilder";

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
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    registrationData,
    currentUserType,
    isLoading,
    error,
    isAuthenticated,
    user,
    resumeAnalysis,
  } = useSelector((state: RootState) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showResumeBuilder, setShowResumeBuilder] = useState(false); // NEW STATE
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    avatar: null,
    userType: currentUserType,
    // Student specific fields
    college: "",
    course: "",
    graduationYear: "",
    resume: null,
    // Company specific fields
    companyName: "",
    designation: "",
    companySize: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Redirect user after successful registration
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath =
        user.role === "company" ? "/company/dashboard" : "/user/dashboard";
      router.push(redirectPath);
    }
  }, [isAuthenticated, user, router]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Update form data when Redux state changes
  useEffect(() => {
    if (registrationData && Object.keys(registrationData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...registrationData,
        userType: currentUserType,
      }));
    }
  }, [registrationData, currentUserType]);

  // Handle user type switching with data clearing
  const handleUserTypeChange = (newUserType: "student" | "company") => {
    if (newUserType !== currentUserType) {
      // Clear form data
      const clearedFormData: RegistrationData = {
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        location: "",
        avatar: null,
        userType: newUserType,
        // Reset user-type specific fields
        college: "",
        course: "",
        graduationYear: "",
        resume: null,
        companyName: "",
        designation: "",
        companySize: "",
      };

      setFormData(clearedFormData);
      setAgreeTerms(false);

      // Clear file inputs
      const avatarInput = document.getElementById("avatar") as HTMLInputElement;
      const resumeInput = document.getElementById("resume") as HTMLInputElement;
      if (avatarInput) avatarInput.value = "";
      if (resumeInput) resumeInput.value = "";

      // Update Redux state
      dispatch(setUserType(newUserType));
      dispatch(clearError());
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(updatedFormData);

    // Update Redux state
    dispatch(updateRegistrationData(updatedFormData));
  };

  // NEW FUNCTION: Handle resume creation from Resume Builder
  const handleResumeCreated = async (resumeData: any) => {
    // Convert resume data to PDF file
    const resumeContent = generateResumeContent(resumeData);
    const blob = new Blob([resumeContent], { type: "application/pdf" });
    const fileName = `${
      resumeData.personalInfo?.fullName?.replace(/\s+/g, "_") || "resume"
    }.pdf`;
    const file = new File([blob], fileName, { type: "application/pdf" });

    // Update form data with created resume
    const updatedFormData = {
      ...formData,
      resume: file,
    };

    setFormData(updatedFormData);
    dispatch(updateRegistrationData(updatedFormData));

    // Close resume builder
    setShowResumeBuilder(false);

    // Analyze the created resume
    try {
      console.log("Analyzing created resume...");
      toast.loading("Analyzing your resume...", { id: "resume-analysis" });
      await dispatch(analyzeResume(file)).unwrap();
      console.log("Resume analysis completed successfully!");
      toast.success(
        `Resume created and analyzed successfully! "${fileName}" has been added to your profile.`,
        {
          id: "resume-analysis",
          duration: 4000,
          icon: "✅",
        }
      );
    } catch (error: any) {
      console.error("Resume analysis failed:", error);
      toast.error(
        `Resume created successfully! However, analysis failed: ${error}`,
        {
          id: "resume-analysis",
          duration: 5000,
          icon: "⚠️",
        }
      );
    }
  };

  // NEW FUNCTION: Generate resume content from resume data
  const generateResumeContent = (resumeData: any) => {
    const {
      personalInfo,
      careerObjective,
      education,
      workExperience,
      skills,
      projects,
    } = resumeData;

    return `
RESUME - ${personalInfo?.fullName || "Your Name"}

CONTACT INFORMATION
Email: ${personalInfo?.email || ""}
Phone: ${personalInfo?.phone || ""}
Address: ${personalInfo?.address || ""}
${personalInfo?.linkedIn ? `LinkedIn: ${personalInfo.linkedIn}` : ""}
${personalInfo?.github ? `GitHub: ${personalInfo.github}` : ""}
${personalInfo?.portfolio ? `Portfolio: ${personalInfo.portfolio}` : ""}

${
  careerObjective
    ? `CAREER OBJECTIVE
${careerObjective}

`
    : ""
}${
      education?.length > 0
        ? `EDUCATION
${education
  .map(
    (edu: any) => `
${edu.degree} ${edu.specialization ? `in ${edu.specialization}` : ""}
${edu.institution} ${edu.location ? `- ${edu.location}` : ""}
${edu.startYear} - ${edu.endYear}
${edu.cgpa ? `CGPA: ${edu.cgpa}` : ""}${
      edu.percentage ? ` | Percentage: ${edu.percentage}%` : ""
    }
${
  edu.achievements?.length > 0
    ? `Achievements: ${edu.achievements.join("; ")}`
    : ""
}
`
  )
  .join("")}

`
        : ""
    }${
      workExperience?.length > 0
        ? `WORK EXPERIENCE
${workExperience
  .map(
    (work: any) => `
${work.position} - ${work.company} (${work.type?.toUpperCase()})
${work.location || ""} | ${work.startDate} - ${
      work.isCurrentlyWorking ? "Present" : work.endDate
    }
${work.description?.length > 0 ? `• ${work.description.join("\n• ")}` : ""}
${
  work.technologies?.length > 0
    ? `Technologies: ${work.technologies.join(", ")}`
    : ""
}
`
  )
  .join("")}

`
        : ""
    }${
      skills?.length > 0
        ? `SKILLS
${skills
  .map(
    (skillGroup: any) => `
${skillGroup.category} (${skillGroup.proficiencyLevel || "Intermediate"}):
${skillGroup.skills?.join(", ") || ""}
`
  )
  .join("")}

`
        : ""
    }${
      projects?.length > 0
        ? `PROJECTS
${projects
  .map(
    (project: any) => `
${project.title} (${
      project.type?.charAt(0)?.toUpperCase() + project.type?.slice(1)
    } Project)
${project.description}
${
  project.technologies?.length > 0
    ? `Technologies: ${project.technologies.join(", ")}`
    : ""
}
${project.githubLink ? `GitHub: ${project.githubLink}` : ""}
${project.liveLink ? `Live Demo: ${project.liveLink}` : ""}
${
  project.achievements?.length > 0
    ? `Key Achievements: ${project.achievements.join("; ")}`
    : ""
}
`
  )
  .join("")}

`
        : ""
    }Generated via DISHA Resume Builder
    `.trim();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (only PDF)
      if (file.type !== "application/pdf") {
        toast.error(
          "Please upload a PDF file only. Other formats are not supported.",
          { icon: "📄" }
        );
        e.target.value = ""; // Clear the input
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(
          "File size should be less than 5MB. Please compress your PDF or choose a smaller file.",
          { icon: "⚖️" }
        );
        e.target.value = ""; // Clear the input
        return;
      }
      // Validate file name length
      if (file.name.length > 100) {
        toast.error(
          "File name is too long. Please rename your file to be under 100 characters.",
          { icon: "📝" }
        );
        e.target.value = ""; // Clear the input
        return;
      }

      const updatedFormData = {
        ...formData,
        resume: file,
      };

      setFormData(updatedFormData);
      // Only update Redux with serializable data, File object will be converted
      dispatch(updateRegistrationData(updatedFormData));

      // Analyze the resume
      try {
        console.log("Analyzing resume...");
        toast.loading("Analyzing your resume...", { id: "resume-analysis" });
        await dispatch(analyzeResume(file)).unwrap();
        console.log("Resume analysis completed successfully!");
        toast.success(
          "Resume uploaded and analyzed successfully! Your ATS score and feedback are now available.",
          {
            id: "resume-analysis",
            duration: 4000,
            icon: "✅",
          }
        );
      } catch (error: any) {
        console.error("Resume analysis failed:", error);
        toast.error(
          `Resume uploaded but analysis failed: ${error}. You can still continue with registration.`,
          {
            id: "resume-analysis",
            duration: 5000,
            icon: "⚠️",
          }
        );
      }

      // Success message
      console.log("Resume uploaded successfully:", file.name);
    }
  };

  const removeResume = () => {
    const updatedFormData = {
      ...formData,
      resume: null,
    };

    setFormData(updatedFormData);
    dispatch(updateRegistrationData(updatedFormData));

    // Clear the file input
    const fileInput = document.getElementById("resume") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (only images)
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file only (JPG, PNG, GIF, etc.)", {
          icon: "🖼️",
        });
        e.target.value = "";
        return;
      }
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error(
          "Image size should be less than 2MB. Please choose a smaller file.",
          { icon: "📸" }
        );
        e.target.value = "";
        return;
      }

      const updatedFormData = {
        ...formData,
        avatar: file,
      };

      setFormData(updatedFormData);
      dispatch(updateRegistrationData(updatedFormData));
    }
  };

  const removeAvatar = () => {
    const updatedFormData = {
      ...formData,
      avatar: null,
    };

    setFormData(updatedFormData);
    dispatch(updateRegistrationData(updatedFormData));

    // Clear the file input
    const avatarInput = document.getElementById("avatar") as HTMLInputElement;
    if (avatarInput) {
      avatarInput.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", {
        icon: "🔒",
      });
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions", {
        icon: "📋",
      });
      return;
    }

    // For students, check resume analysis status
    if (currentUserType === "student") {
      // If resume is uploaded but analysis is still in progress
      if (formData.resume && resumeAnalysis.isAnalyzing) {
        toast.error(
          "Please wait for your resume analysis to complete before signing up. This ensures your profile is fully optimized!",
          {
            icon: "⏳",
            duration: 4000,
          }
        );
        return;
      }

      // If no resume is uploaded, show informative message
      if (!formData.resume) {
        toast(
          "📄 Continuing without resume. You can upload it later from your dashboard for personalized recommendations!",
          {
            icon: "ℹ️",
            duration: 4000,
          }
        );
      }

      // If resume analysis failed, show warning message
      if (formData.resume && resumeAnalysis.error) {
        toast.error(
          `Resume analysis failed: ${resumeAnalysis.error}. Continuing with registration - you can re-upload your resume later for personalized recommendations.`,
          {
            icon: "⚠️",
            duration: 5000,
          }
        );
      }
    }

    try {
      // Dispatch the registration action
      await dispatch(registerUser(formData)).unwrap();

      // Success message
      toast.success(
        `Registration successful! Welcome to DISHA!${
          formData.resume ? " Your resume has been uploaded successfully." : ""
        }${formData.avatar ? " Your profile picture has been uploaded." : ""}`,
        {
          icon: "🎉",
          duration: 4000,
        }
      );

      // Clear form data after successful registration
      dispatch(clearRegistrationData());
      setAgreeTerms(false);

      // Navigation is handled by useEffect after successful registration
    } catch (error: any) {
      // Error is handled by Redux state
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-white py-12">
      <div className="absolute inset-0">
        <GridPattern />
      </div>

      {/* Header with logo */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">DISHA</div>
          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-gray-800 hover:text-gray-600 font-medium"
            >
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
              Join DISHA
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
                type="button"
                onClick={() => handleUserTypeChange("student")}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentUserType === "student"
                    ? "bg-gray-900 text-white shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                For Students
              </button>
              <button
                type="button"
                onClick={() => handleUserTypeChange("company")}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentUserType === "company"
                    ? "bg-blue-600 text-white shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                For Companies
              </button>
            </div>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Upload Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />

                  {formData.avatar ? (
                    // Show uploaded avatar
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                        <img
                          src={URL.createObjectURL(formData.avatar)}
                          alt="Avatar preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeAvatar}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors group-hover:scale-110"
                        title="Remove avatar"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <label
                        htmlFor="avatar"
                        className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Camera className="h-6 w-6 text-white" />
                      </label>
                    </div>
                  ) : (
                    // Show upload placeholder
                    <label
                      htmlFor="avatar"
                      className="w-24 h-24 rounded-full bg-gray-100 border-4 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-all duration-200 group"
                    >
                      <div className="text-center">
                        <Plus className="h-8 w-8 text-gray-400 group-hover:text-gray-600 transition-colors mx-auto" />
                      </div>
                    </label>
                  )}
                </div>

                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </p>
                  <p className="text-xs text-gray-500">
                    {formData.avatar ? "Click to change" : "Click to upload"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Max 2MB • JPG, PNG, GIF
                  </p>
                </div>
              </div>

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
                    {currentUserType === "student"
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
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
                      placeholder={
                        currentUserType === "student"
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
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
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
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
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
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
                      placeholder="Enter your city/state"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Student Specific Fields */}
              {currentUserType === "student" && (
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
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
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
                      className="w-full pl-4 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
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
                      className="w-full pl-4 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
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

                  {/* ENHANCED Resume Upload Section */}
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
                              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
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
                        // Show upload/create options
                        <div className="space-y-3">
                          {/* Upload existing resume option */}
                          <label
                            htmlFor="resume"
                            className="w-full flex items-center justify-center px-4 py-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-100 transition-all duration-200 cursor-pointer group"
                          >
                            <div className="text-center">
                              <Upload className="mx-auto h-8 w-8 text-gray-400 group-hover:text-gray-600 mb-2 transition-colors" />
                              <p className="text-sm font-medium text-gray-700 mb-1">
                                Upload your resume
                              </p>
                              <p className="text-xs text-gray-500">
                                PDF only, max 5MB
                              </p>
                            </div>
                          </label>

                          {/* OR divider */}
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="px-4 bg-white text-gray-500">
                                or
                              </span>
                            </div>
                          </div>

                          {/* CREATE RESUME BUTTON - NEW ADDITION */}
                          <button
                            type="button"
                            onClick={() => setShowResumeBuilder(true)}
                            className="w-full flex items-center justify-center px-4 py-6 bg-gray-50 border-2 border-gray-200 rounded-xl hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 group"
                          >
                            <div className="text-center">
                              <Plus className="mx-auto h-8 w-8 text-gray-600 group-hover:text-gray-700 mb-2 transition-colors" />
                              <p className="text-sm font-medium text-gray-800 mb-1">
                                Create Resume Now
                              </p>
                              <p className="text-xs text-gray-600">
                                Build a professional resume in minutes
                              </p>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Upload your latest resume in PDF format. This will help
                      employers learn more about your skills and experience.
                    </p>

                    {/* Resume Analysis Status Indicator */}
                    {formData.resume && (
                      <div className="mt-3">
                        {resumeAnalysis.isAnalyzing ? (
                          <div className="flex items-center px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
                            <span className="text-sm text-blue-700 font-medium">
                              Analyzing your resume for ATS optimization...
                            </span>
                          </div>
                        ) : resumeAnalysis.error ? (
                          <div className="flex items-center px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
                            <X className="h-4 w-4 text-red-600 mr-3" />
                            <span className="text-sm text-red-700 font-medium">
                              Analysis failed: {resumeAnalysis.error}
                            </span>
                          </div>
                        ) : user?.profile?.resumeAnalysis ? (
                          <div className="flex items-center px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                            <span className="text-sm text-green-700 font-medium">
                              Analysis complete! ATS Score:{" "}
                              {user.profile.resumeAnalysis.score}/100
                            </span>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Company Specific Fields */}
              {currentUserType === "company" && (
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
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
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
                      className="w-full pl-4 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
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
                      className="w-full pl-4 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
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
                      className="w-full pl-12 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
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
                      className="w-full pl-12 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition-all text-gray-800"
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
                  className="mt-1 h-5 w-5 text-gray-200 border-gray-300 rounded focus:ring-gray-200"
                  required
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-gray-900 font-semibold hover:text-gray-700 transition-colors"
                  >
                    Terms & Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-gray-900 font-semibold hover:text-gray-700 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              {/* Resume Analysis Notice */}
              {currentUserType === "student" &&
                formData.resume &&
                resumeAnalysis.isAnalyzing && (
                  <div className="flex items-center px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600 mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-amber-800">
                        Please wait while we analyze your resume
                      </p>
                      <p className="text-xs text-amber-700 mt-1">
                        This helps us create the best profile for you and
                        provide personalized recommendations.
                      </p>
                    </div>
                  </div>
                )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={
                  isLoading ||
                  (currentUserType === "student" &&
                    !!formData.resume &&
                    resumeAnalysis.isAnalyzing)
                }
                className={`w-full flex items-center justify-center px-6 py-4 rounded-lg text-lg font-semibold shadow-lg transition-colors hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  currentUserType === "student"
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-purple-500 text-white hover:bg-purple-600"
                }`}
              >
                {isLoading ? (
                  "Creating Account..."
                ) : currentUserType === "student" &&
                  formData.resume &&
                  resumeAnalysis.isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-3"></div>
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    Create Your Account
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center border-t border-gray-100 pt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => router.push("/login")}
                  className="text-gray-900 font-semibold hover:text-gray-700 transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <CheckCircle className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
              <div>
                <span className="text-gray-800 font-medium text-sm">
                  Free to Join
                </span>
                <p className="text-gray-600 text-xs mt-1">No hidden charges</p>
              </div>
            </div>
            <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
              <CheckCircle className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
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
              <CheckCircle className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
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
              <CheckCircle className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
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

      {/* RESUME BUILDER MODAL - NEW ADDITION */}
      {showResumeBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Create Your Resume
              </h2>
              <button
                onClick={() => setShowResumeBuilder(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 80px)" }}
            >
              <ResumeBuilder
                onResumeComplete={handleResumeCreated}
                onCancel={() => setShowResumeBuilder(false)}
                isModal={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
