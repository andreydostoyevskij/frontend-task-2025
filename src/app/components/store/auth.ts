// store/auth.ts
import { create } from "zustand";

type UserRole = "member" | "partner";

interface AuthState {
  email: string;
  role: UserRole | null;
  loggedIn: boolean;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  role: null,
  loggedIn: false,
  login: (email, role) => set({ email, role, loggedIn: true }),
  logout: () => set({ email: "", role: null, loggedIn: false }),
}));
