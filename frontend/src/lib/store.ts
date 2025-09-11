import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/user-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific action types that may contain File objects
        ignoredActions: ["user/updateRegistrationData"],
        // Ignore specific paths in action payloads
        ignoredActionsPaths: ["payload.avatar", "payload.resume"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
