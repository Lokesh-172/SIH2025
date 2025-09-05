import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "user" | "admin" | "company";
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
  };
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
  },
});

// Export actions
export const { } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
