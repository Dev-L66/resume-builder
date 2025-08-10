import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";
import { API_PATHS } from "../api/apiPaths";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  signup: async ({ name, email, password }) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        name,
        email,
        password,
      });
      console.log("from zustand",res.data);
      set({
        token: res.data.user.token,
        user: res.data.user,
        loading: false,
        error: null,
      });
      localStorage.setItem("token", res.data.user.token);
    } catch (error) {
      set({
        error:
          error.response?.data.message ||
          error.response?.data.error ||
          error.message ||
          "Something went wrong.",
        loading: false,
      });
    }
  },

  verifyEmail: async ({ emailToken }) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.VERIFY_EMAIL, {
        emailToken,
      });
      set({
        token: res.data.token,
        user: res.data.user,
        loading: false,
        error: null,
      });
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      set({
        error:
          error.response?.data.error ||
          error.response?.data.message ||
          error.message ||
          "Something went wrong",
        loading: false,
      });
    }
  },

  checkAuth: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(API_PATHS.AUTH.CHECK_AUTH);
      set({
        token: res.data.token,
        user: res.data.user,
        loading: false,
        error: null,
      });
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      set({
        error:
          error.response?.data.error ||
          error.response?.data.message ||
          error.message ||
          "Something went wrong",
        loading: false,
        user: null,
        token: null,
      });
    }
  },
  login: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      set({
        token: res.data.token,
        user: res.data.user,
        loading: false,
        error: null,
      });
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      set({
        error:
          error.response?.data.error ||
          error.response?.data.message ||
          error.message ||
          "Something went wrong",
        loading: false,
      });
    }
  },
}));
