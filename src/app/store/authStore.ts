// app/store/authStore.ts
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  role: string;
  token: string;
}

interface AuthStore {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (token) => {
    // Decode token (assumes token payload includes id, email, and role)
    interface DecodedToken {
      sub: string;
      email: string;
      role: string;
    }

    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
    set({
      user: {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
        token,
      },
    });
    localStorage.setItem("token", token);
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem("token");
  },
}));
