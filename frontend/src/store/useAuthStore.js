import { create } from "zustand";
import { apiInstance } from "../api/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,
  error: null,

  checkAuth: async () => {
    try {
      const res = await apiInstance.get("/auth/currentUser");
      set({ authUser: res.data.user, error: null });
    } catch (error) {
      console.error("Error while checking auth:", error);
      set({
        authUser: null,
        error: error.response?.data?.message || "Auth check failed",
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (userData) => {
    set({ isSigningUp: true });
    try {
      const res = await apiInstance.post("/auth/signup", userData);
      toast.success(res.data.message)
      set({ authUser: res.data.newUser, error: null });
      return res.data;
    } catch (error) {
      console.error("Signup error:", error);
      set({ error: error.response?.data?.message || "Signup failed" });
      throw error;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await apiInstance.post("/auth/signin", credentials);
      set({ authUser: res.data.userLogin, error: null });
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      console.error("Login error:", error);
      set({ error: error.response?.data?.message || "Login failed" });
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await apiInstance.post("/auth/logout");
      set({ authUser: null, error: null });
    } catch (error) {
      console.error("Logout error:", error);
      set({ error: error.response?.data?.message || "Logout failed" });
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
