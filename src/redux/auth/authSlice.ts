import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TUser } from "../../types/TUser";

interface AuthState {
  user: TUser | null;
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
    setCredentials: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    updateVerificationStatus: (state) => {
      if (state.user) {
        state.user.isVerified = true;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const getUser = (state: RootState): TUser | null => state.auth.user;

export const { setCredentials, updateVerificationStatus, logOut } =
  authSlice.actions;
export default authSlice.reducer;
