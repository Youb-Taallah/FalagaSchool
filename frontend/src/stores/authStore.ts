import { User } from "../types/user"

export interface AuthState {
  currentUser: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

// store.ts
import { create } from 'zustand';

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  
  // Sign in
  signIn: (user) => set({ currentUser: user }),
  
  // Sign out
  signOut: () => set({ currentUser: null })
}));