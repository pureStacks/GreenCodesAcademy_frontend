import { create } from 'zustand';

interface AppState {
  data: any;
  isLoading: boolean;
  error: string | null;
  fetchData: (force?: boolean) => Promise<void>;
  updateSection: (section: string, payload: any, token: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  data: null,
  isLoading: true,
  error: null,
  fetchData: async (force = false) => {
    const state = get();
    if (state.data && !force) return; // Prevent duplicate fetches
    try {
      set({ isLoading: true, error: null });
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      set({ data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  updateSection: async (section, payload, token) => {
    try {
      const response = await fetch(`/api/admin/data/${section}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Failed to update data');
      const result = await response.json();
      
      set((state) => ({
        data: {
          ...state.data,
          [section]: result.section
        }
      }));
    } catch (error: any) {
      throw error;
    }
  }
}));

// Admin Auth Store
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('adminToken'),
  isAuthenticated: !!localStorage.getItem('adminToken'),
  login: (token: string) => {
    localStorage.setItem('adminToken', token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('adminToken');
    set({ token: null, isAuthenticated: false });
  }
}));