import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";
import { API_PATHS } from "../api/apiPaths";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  message: null,
  verificationToken: null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setMessage: (message) => set({ message }),
  setVerificationToken: (verificationToken) => set({ verificationToken }),

  signup: async ({ name, email, password }) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        name,
        email,
        password,
      });
      console.log("from zustand", res.data);
      set({
        message: res.data.message || "Verification email sent",
        token: res.data.user.token,
        user: res.data.user,
        loading: false,
        error: null,
      });
      localStorage.setItem("token", res.data.user.token);
      return true;
    } catch (err) {
      if (err.response?.data?.errors) {
        const fieldErrors = {};

        err.response.data.errors.forEach((e) => {
          if (!fieldErrors[e.path]) {
            fieldErrors[e.path] = [];
          }
          fieldErrors[e.path].push(e.message);
        });

        set({ error: fieldErrors, loading: false });
      } else {
        set({
          error: {
            message:
              err.response?.data?.message ||
              err.response?.data?.error ||
              err.message ||
              "Something went wrong",
          },
          loading: false,
        });
      }
      return false;
    }
  },

  verifyEmail: async ({ verificationToken }) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(
        `${API_PATHS.AUTH.VERIFY_EMAIL}?token=${verificationToken}`,
        {
          verificationToken,
        }
      );
      console.log(res.data);
      set({
        message: res.data.message || "Email verified successfully",
        verificationToken: res.data.user.verificationToken,
        token: res.data.token,
        user: res.data.user,
        loading: false,
        error: null,
      });
      localStorage.setItem("token", res.data.user.token);
      return true;
    } catch (error) {
      set({
        error: {
          message:
            error.response?.data.error ||
            error.response?.data.message ||
            error.message ||
            "Something went wrong",
        },
        loading: false,
      });
    }
    return false;
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
      localStorage.setItem("token", res.data.user.token);
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
        token: res.data.user.token,
        user: res.data.user,
        loading: false,
        error: null,
      });
      localStorage.setItem("token", res.data.user.token);
      return true;
    } catch (err) {
      if (err.response?.data?.errors) {

        set({ error: {message:"Invalid password or email."}, loading: false });
      } else {
        set({
          error: {
            message:
              err.response?.data?.message ||
              err.response?.data?.error ||
              err.message ||
              "Something went wrong",
          },
          loading: false,
        });
      }
      return false;
    }
  },
}));
