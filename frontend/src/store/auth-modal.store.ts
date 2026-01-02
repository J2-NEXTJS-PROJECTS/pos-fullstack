import { create } from "zustand";
import { devtools } from "zustand/middleware";
export type AuthMode = "login" | "signup";

//!Firma del state
interface AuthModalState {
  isOpen: boolean;
  mode: AuthMode;
  redirectTo?: string;
  open: (mode?: AuthMode, redirectTo?: string) => void;
  close: () => void;
  setMode: (mode: AuthMode) => void;
}

export const useAuthModalStore = create<AuthModalState>()(devtools((set) => ({
  isOpen: false,
  mode: "login",
  redirectTo: undefined,
  open: (mode = "login", redirectTo) => set({ isOpen: true, mode, redirectTo }),
  close: () => set({ isOpen: false, redirectTo: undefined }),
  setMode: (mode) => set({ mode }),
})));
