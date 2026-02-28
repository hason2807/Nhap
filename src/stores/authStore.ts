import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id?: string;
  email: string;
  fullName?: string;
  phone?: string;
  // optionally store the user's role, e.g. "student" or "instructor"
  role?: string;
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      
      login: (userData) => {
        set({ user: userData, isLoggedIn: true });
      },
      
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);