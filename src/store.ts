import { create } from 'zustand';
import { supabase } from '@/src/lib/supabase';

interface AppState {
  data: any;
  isLoading: boolean;
  error: string | null;
  isSubscribed: boolean;
  fetchData: (force?: boolean) => Promise<void>;
  updateSection: (section: string, payload: any, token: string) => Promise<void>;
  updateEnrollmentStatus: (id: string, status: string, token: string) => Promise<void>;
  addEnrollment: (enrollment: any) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  data: null,
  isLoading: true,
  error: null,
  isSubscribed: false,

  fetchData: async (force = false) => {
    const state = get();
    if (state.data && !force) return; // Prevent duplicate fetches
    
    try {
      set({ isLoading: true, error: null });
      
      const { data: rawData, error } = await supabase.from('app_data').select('*');
      if (error) throw error;
      
      const fullData: any = {};
      if (rawData) {
        rawData.forEach(row => {
          fullData[row.section_key] = row.section_data;
        });
      }
      
      // Ensure enrollments array exists
      if (!fullData.enrollments) fullData.enrollments = [];
      
      set({ data: fullData, isLoading: false });

      // Setup Realtime Subscription so changes reflect globally automatically
      if (!get().isSubscribed) {
        supabase.channel('public:app_data')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'app_data' }, (payload: any) => {
            if (payload.new && payload.new.section_key) {
              set((state) => {
                if (!state.data) return state;
                return {
                  data: {
                    ...state.data,
                    [payload.new.section_key]: payload.new.section_data
                  }
                };
              });
            }
          })
          .subscribe();
          
        set({ isSubscribed: true });
      }

    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateSection: async (section, payload, token) => {
    try {
      // Direct upsert to Supabase
      const { error } = await supabase.from('app_data').upsert({
        section_key: section,
        section_data: payload
      }, { onConflict: 'section_key' });
      
      if (error) throw error;
      
      set((state) => ({
        data: {
          ...state.data,
          [section]: payload
        }
      }));
    } catch (error: any) {
      throw error;
    }
  },
  
  updateEnrollmentStatus: async (id, status, token) => {
    try {
      const state = get();
      if (!state.data) throw new Error('No data loaded');
      
      const enrollments = [...(state.data.enrollments || [])];
      const index = enrollments.findIndex((e: any) => e.id === id);
      
      if (index === -1) throw new Error('Enrollment not found');
      
      enrollments[index].status = status;
      
      // Upsert back to Supabase
      const { error } = await supabase.from('app_data').upsert({
        section_key: 'enrollments',
        section_data: enrollments
      }, { onConflict: 'section_key' });
      
      if (error) throw error;
      
      set((state) => ({
        data: {
          ...state.data,
          enrollments
        }
      }));
    } catch (error: any) {
      throw error;
    }
  },
  
  addEnrollment: async (enrollment) => {
    try {
      const state = get();
      // Ensure data is loaded
      if (!state.data) await get().fetchData(true);
      
      const enrollments = [...(get().data?.enrollments || [])];
      
      const newEnrollment = {
        id: Date.now().toString(),
        ...enrollment,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      
      enrollments.push(newEnrollment);
      
      const { error } = await supabase.from('app_data').upsert({
        section_key: 'enrollments',
        section_data: enrollments
      }, { onConflict: 'section_key' });
      
      if (error) throw error;
      
      set((state) => ({
        data: {
          ...state.data,
          enrollments
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
