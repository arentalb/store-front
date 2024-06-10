import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store.ts";

interface User {
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const getUser = (state: RootState): User | null => state.auth.user;

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
