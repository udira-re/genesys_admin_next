// store/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import jsCookie from "js-cookie";
import { TLoginSchema } from "@/types/authTypes";
import { login } from "@/services/auth";

const tokenNames = {
  access: "accessToken",
  refresh: "refreshToken",
};

interface AuthState {
  token?: string;
  loading: boolean;
  error?: string;

  login: (data: TLoginSchema) => Promise<boolean>;
  setAuth: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      token: undefined,
      loading: false,
      error: undefined,

      login: async (data) => {
        set((state) => {
          state.loading = true;
          state.error = undefined;
        });

        try {
          const response = await login(data);

          const accessToken = response?.data?.data?.accessToken;
          const refreshToken = response?.data?.data?.refreshToken;

          if (!accessToken) throw new Error("Access token missing in response");

          // Set cookies - so token is sent with requests and available server-side
          jsCookie.set(tokenNames.access, accessToken, {
            expires: 7,
            path: "/",
            sameSite: "lax",
            // secure: true, // uncomment for HTTPS in production
          });

          jsCookie.set(tokenNames.refresh, refreshToken || "", {
            expires: 7,
            path: "/",
            sameSite: "lax",
            // secure: true,
          });

          set((state) => {
            state.token = accessToken; // stored in Zustand + localStorage via persist
            state.loading = false;
          });

          return true;
        } catch (err: any) {
          set((state) => {
            state.loading = false;
            state.error =
              err.response?.data?.message || err.message || "Login failed";
          });
          return false;
        }
      },

      setAuth: (token) =>
        set((state) => {
          state.token = token;

          // Sync cookie with new token if setAuth used manually
          if (token) {
            jsCookie.set(tokenNames.access, token, {
              expires: 7,
              path: "/",
              sameSite: "lax",
              // secure: true,
            });
          } else {
            jsCookie.remove(tokenNames.access, { path: "/" });
          }

          state.error = undefined;
          state.loading = false;
        }),

      logout: () =>
        set((state) => {
          jsCookie.remove(tokenNames.access, { path: "/" });
          jsCookie.remove(tokenNames.refresh, { path: "/" });
          state.token = undefined;
          state.error = undefined;
          state.loading = false;
        }),
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
    },
  ),
);
