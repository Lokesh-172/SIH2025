import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authenticateUser } from "@/data/mockLoginCredentials";

export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
}

export interface ResumeAnalysis {
  score: number;
  overall_feedback: string;
  detailed_feedback: Array<{
    section: string;
    feedback: string;
    suggestions: string[];
  }>;
  quiz_questions_with_answers: QuizQuestion[];
  analyzedAt: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number; // in seconds
  completedAt: string;
  quizType: "skills" | "resume";
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "student" | "company" | "admin";
  createdAt: string;
  updatedAt?: string;
  isVerified: boolean;
  profile?: {
    phone?: string;
    location?: string;
    bio?: string;
    skills?: string[];
    experience?: string;
    education?: string;
    resume?: string;
    resumeAnalysis?: ResumeAnalysis;
    quizResults?: QuizResult[];
    // Student specific fields
    college?: string;
    course?: string;
    graduationYear?: string;
    // Company specific fields
    companyName?: string;
    designation?: string;
    companySize?: string;
  };
}

export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  location: string;
  avatar: File | null;
  userType: "student" | "company";
  // Student specific fields
  college?: string;
  course?: string;
  graduationYear?: string;
  resume?: File | null;
  // Company specific fields
  companyName?: string;
  designation?: string;
  companySize?: string;
}

// Serializable version for Redux state (without File objects)
export interface SerializableRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  location: string;
  avatarName?: string; // Just store the filename
  userType: "student" | "company";
  // Student specific fields
  college?: string;
  course?: string;
  graduationYear?: string;
  resumeName?: string; // Just store the filename
  // Company specific fields
  companyName?: string;
  designation?: string;
  companySize?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  registrationData: Partial<SerializableRegistrationData>;
  currentUserType: "student" | "company";
  loginLoading: boolean;
  resumeAnalysis: {
    isAnalyzing: boolean;
    error: string | null;
    tempAnalysisData: ResumeAnalysis | null; // Store analysis during signup
  };
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  registrationData: {},
  currentUserType: "student",
  loginLoading: false,
  resumeAnalysis: {
    isAnalyzing: false,
    error: null,
    tempAnalysisData: null,
  },
};

// Async action for user login
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    loginData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const credential = authenticateUser(loginData.email, loginData.password);

      if (!credential) {
        return rejectWithValue("Invalid email or password");
      }

      // Simulate token generation
      const token = `auth_token_${credential.user.id}_${Date.now()}`;

      return { user: credential.user, token };
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Async action for resume analysis
export const analyzeResume = createAsyncThunk(
  "user/analyzeResume",
  async (resumeFile: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Resume analysis failed");
      }

      const analysisResult = await response.json();

      return analysisResult as ResumeAnalysis;
    } catch (error: any) {
      return rejectWithValue(error.message || "Resume analysis failed");
    }
  }
);

// Async action for user registration
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: RegistrationData, { rejectWithValue }) => {
    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Add all form fields
      Object.entries(userData).forEach(([key, value]) => {
        if ((key === "resume" || key === "avatar") && value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === "string") {
          formData.append(key, value);
        }
      });

      // In a real app, this would be an API call
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   body: formData,
      // });

      // For now, simulate registration
      const mockUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.fullName,
        avatar: userData.avatar?.name,
        role: userData.userType,
        createdAt: new Date().toISOString(),
        isVerified: false,
        profile: {
          phone: userData.phone,
          location: userData.location,
          college: userData.college,
          course: userData.course,
          graduationYear: userData.graduationYear,
          resume: userData.resume?.name,
          companyName: userData.companyName,
          designation: userData.designation,
          companySize: userData.companySize,
        },
      };

      // Simulate token
      const token = `mock_token_${Date.now()}`;

      return { user: mockUser, token };
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user type and clear registration data when switching
    setUserType: (state, action: PayloadAction<"student" | "company">) => {
      if (state.currentUserType !== action.payload) {
        // Clear registration data when switching user types
        state.registrationData = {};
        state.currentUserType = action.payload;
        state.error = null;
      }
    },

    // Update registration data (converts File objects to serializable data)
    updateRegistrationData: (
      state,
      action: PayloadAction<Partial<RegistrationData>>
    ) => {
      const { avatar, resume, ...otherData } = action.payload;
      const serializableData: Partial<SerializableRegistrationData> = {
        ...otherData,
        ...(avatar && { avatarName: avatar.name }),
        ...(resume && { resumeName: resume.name }),
      };

      state.registrationData = {
        ...state.registrationData,
        ...serializableData,
      };
    },

    // Clear all registration data
    clearRegistrationData: (state) => {
      state.registrationData = {};
      state.error = null;
    },

    // Set authentication state
    setAuthenticated: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      // Clear registration data after successful authentication
      state.registrationData = {};

      // Store token in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
    },

    // Logout user
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      state.registrationData = {};
      state.currentUserType = "student";
      state.resumeAnalysis.tempAnalysisData = null; // Clear temp analysis data

      // Remove token from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set resume analysis
    setResumeAnalysis: (state, action: PayloadAction<ResumeAnalysis>) => {
      if (state.user) {
        // Initialize profile if it doesn't exist
        if (!state.user.profile) {
          state.user.profile = {};
        }
        state.user.profile.resumeAnalysis = action.payload;
      }
    },

    // Clear resume analysis error
    clearResumeAnalysisError: (state) => {
      state.resumeAnalysis.error = null;
    },

    // Clear temporary resume analysis data
    clearTempAnalysisData: (state) => {
      state.resumeAnalysis.tempAnalysisData = null;
    },

    // Save quiz result
    saveQuizResult: (state, action: PayloadAction<QuizResult>) => {
      if (state.user) {
        // Initialize profile if it doesn't exist
        if (!state.user.profile) {
          state.user.profile = {};
        }
        // Initialize quizResults array if it doesn't exist
        if (!state.user.profile.quizResults) {
          state.user.profile.quizResults = [];
        }
        // Add the new quiz result
        state.user.profile.quizResults.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user cases
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        state.currentUserType =
          action.payload.user.role === "student" ? "student" : "company";

        // Store token in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.payload as string;
      })
      // Register user cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.registrationData = {};
        state.error = null;
        state.currentUserType =
          action.payload.user.role === "student" ? "student" : "company";

        // Transfer temporary resume analysis data to user profile
        if (state.resumeAnalysis.tempAnalysisData) {
          if (!state.user.profile) {
            state.user.profile = {};
          }
          state.user.profile.resumeAnalysis =
            state.resumeAnalysis.tempAnalysisData;
          // Clear temporary data
          state.resumeAnalysis.tempAnalysisData = null;
        }

        // Store token in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Analyze resume cases
      .addCase(analyzeResume.pending, (state) => {
        state.resumeAnalysis.isAnalyzing = true;
        state.resumeAnalysis.error = null;
      })
      .addCase(analyzeResume.fulfilled, (state, action) => {
        state.resumeAnalysis.isAnalyzing = false;
        if (state.user) {
          // Initialize profile if it doesn't exist
          if (!state.user.profile) {
            state.user.profile = {};
          }
          state.user.profile.resumeAnalysis = action.payload;
        } else {
          // Store in temporary location during signup
          state.resumeAnalysis.tempAnalysisData = action.payload;
        }
      })
      .addCase(analyzeResume.rejected, (state, action) => {
        state.resumeAnalysis.isAnalyzing = false;
        state.resumeAnalysis.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  setUserType,
  updateRegistrationData,
  clearRegistrationData,
  setAuthenticated,
  logout,
  setLoading,
  setError,
  clearError,
  setResumeAnalysis,
  clearResumeAnalysisError,
  clearTempAnalysisData,
  saveQuizResult,
} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
