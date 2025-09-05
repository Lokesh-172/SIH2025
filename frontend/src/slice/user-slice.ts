import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

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

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
  registrationData: Partial<RegistrationData>;
  currentUserType: "student" | "company";
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  registrationData: {},
  currentUserType: "student",
};

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

    // Update registration data
    updateRegistrationData: (
      state,
      action: PayloadAction<Partial<RegistrationData>>
    ) => {
      state.registrationData = {
        ...state.registrationData,
        ...action.payload,
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
  },
  extraReducers: (builder) => {
    builder
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

        // Store token in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
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
} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
