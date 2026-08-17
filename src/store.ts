import { create } from 'zustand';
import { supabase } from './lib/supabase';

export const ADMIN_EMAIL = 'kehindehusseinpopoola@gmail.com';

export const initialData = {
  site: {
    name: 'Green Codes Academy',
    logo: '',
    email: 'greencodesacademy@gmail.com',
    phone: '+234 903 088 2127',
    whatsapp: '+234 903 088 2127',
    address: '123 Tech Avenue, Lagos, Nigeria.',
    footerDescription: 'Empowering the next generation with practical technology and digital skills.',
    copyright: '© 2026 Green Code Academy. All Rights Reserved.',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  },
  navigation: {
    links: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Programs", path: "/programs" },
      { name: "Why Choose Us", path: "/why-choose-us" },
      { name: "Testimonials", path: "/testimonials" },
      { name: "Contact", path: "/contact" },
    ],
    cta: { text: "ENROLL NOW", url: "/enrollment" }
  },
  home: {
    hero: {
      badge: "Empowering Next-Gen Tech Talent",
      headline: "Learn In-Demand Tech Skills with Practical Hands-on Training",
      subheadline: "Physical classroom training, expert mentors, and real-world project portfolios in Nigeria.",
      primaryCtaText: "Explore Programs",
      primaryCtaUrl: "/programs",
      secondaryCtaText: "Enroll Now",
      secondaryCtaUrl: "/enrollment",
      highlights: [
        "100% Practical In-Person Classes",
        "Industry Recognized Certification",
        "Career & Internship Support"
      ],
      stats: [
        { label: "Graduates Trained", value: "1,200+" },
        { label: "Job Placement Rate", value: "94%" },
        { label: "Hands-on Projects", value: "50+" }
      ]
    },
    campus: {
      title: "Experience Modern Physical Classrooms",
      subtitle: "Equipped with uninterrupted power, high-speed fiber internet, and interactive project labs.",
      features: [
        "High-Speed Internet & Uninterrupted Power",
        "Dedicated Mentorship & 1-on-1 Guidance",
        "Collaborative Workstations & Modern Labs",
        "Real-world Capstone Project Experience"
      ]
    },
    ctaBanner: {
      badge: "Limited Seats Available",
      heading: "Ready to Kickstart Your Career in Tech?",
      description: "Join Nigeria's fastest growing tech community. Enroll today or chat directly with our admissions counselor.",
      primaryButtonText: "Enroll Now",
      primaryButtonUrl: "/enrollment",
      secondaryButtonText: "Chat on WhatsApp",
      whatsappNumber: "+2349030882127"
    }
  },
  about: {
    title: "Empowering Africa's Tech Leaders",
    subtitle: "Green Codes Academy is dedicated to bridging the digital skills gap through immersive in-person education.",
    mission: "To equip students with cutting-edge digital and programming skills through rigorous, hands-on, and physical laboratory training.",
    vision: "To become the leading physical tech incubator across Africa, producing globally competitive software engineers and tech creators.",
    values: [
      { title: "Practical First", description: "Learn by building actual software, not just theory." },
      { title: "Industry Mentorship", description: "Mentored by senior engineers and industry leaders." },
      { title: "Community & Growth", description: "Thrive in an active peer network of passionate tech builders." }
    ]
  },
  programs: [
    {
      id: "1",
      name: "Frontend Web Development",
      shortDescription: "Master HTML, CSS, JavaScript, React, and modern UI design to build interactive web apps.",
      duration: "12 Weeks",
      level: "Beginner to Intermediate",
      published: true
    },
    {
      id: "2",
      name: "Fullstack Software Engineering",
      shortDescription: "Build complete end-to-end applications using Node.js, Express, PostgreSQL, and React.",
      duration: "16 Weeks",
      level: "Intermediate",
      published: true
    },
    {
      id: "3",
      name: "Python for Data & AI",
      shortDescription: "Learn Python, data analysis, visualization, and practical artificial intelligence concepts.",
      duration: "12 Weeks",
      level: "Beginner to Intermediate",
      published: true
    }
  ],
  whyChooseUs: [
    {
      id: "1",
      title: "Physical In-Person Classes",
      description: "Learn in modern tech laboratories with direct face-to-face mentorship.",
      icon: "MonitorPlay"
    },
    {
      id: "2",
      title: "Portfolio Ready Capstones",
      description: "Graduate with real projects deployed live on the internet.",
      icon: "CheckCircle2"
    },
    {
      id: "3",
      title: "Job & Internship Assistance",
      description: "Resume reviews, mock interviews, and direct hiring partner referrals.",
      icon: "Users"
    }
  ],
  testimonials: [
    {
      id: "1",
      name: "Chinedu Okafor",
      program: "Frontend Web Development",
      text: "The physical classes at Green Codes Academy gave me the structure and focus I needed. Within 3 months of graduating, I landed my first frontend role!",
      rating: 5,
      published: true,
      status: "published"
    },
    {
      id: "2",
      name: "Amina Bello",
      program: "Fullstack Engineering",
      text: "Tutors are patient and extremely knowledgeable. Building full-stack projects gave me immense confidence.",
      rating: 5,
      published: true,
      status: "published"
    }
  ],
  faqs: [
    {
      id: "1",
      question: "Are the classes physical or online?",
      answer: "All our core programs are held in-person at our physical academy campus in Lagos, Nigeria with dedicated lab workstations."
    },
    {
      id: "2",
      question: "Do I need prior coding experience?",
      answer: "No! Our foundational programs are designed specifically for beginners starting from scratch."
    },
    {
      id: "3",
      question: "Do you offer certificates upon completion?",
      answer: "Yes, every student who completes their coursework and capstone project receives an accredited certificate of completion."
    }
  ],
  countdown: {
    enabled: true,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    badge: "Enrollment is Now Open",
    heading: "Secure your place in the next training cohort.",
    description: "Spaces are limited to ensure personalized mentor attention. Register today.",
    ctaText: "ENROLL NOW",
    ctaUrl: "/enrollment",
    expiredMessage: "Enrollment is currently closed."
  },
  popups: {
    topBar: {
      enabled: true,
      text: "⚡ Next Cohort starts in 2 weeks! Physical seats are filling fast.",
      linkText: "Apply Now",
      linkUrl: "/enrollment"
    },
    modal: {
      enabled: false,
      title: "Special Early Bird Discount!",
      description: "Get 15% off tuition when you register for the upcoming cohort this week.",
      ctaText: "Claim Discount",
      ctaUrl: "/enrollment",
      delaySeconds: 5
    },
    floatingSticker: {
      enabled: true,
      text: "🔥 8 seats remaining in Cohort 4",
      linkUrl: "/enrollment"
    },
    whatsappWidget: {
      enabled: true,
      phoneNumber: "+2349030882127",
      defaultMessage: "Hello Green Codes Academy! I want to inquire about enrollment for the upcoming cohort."
    }
  },
  enrollments: []
};

interface AppState {
  data: any;
  isLoading: boolean;
  error: string | null;
  fetchData: (force?: boolean) => Promise<void>;
  updateSection: (sectionKey: string, sectionData: any, token: string) => Promise<void>;
  addEnrollment: (enrollmentData: any) => Promise<void>;
  submitEnrollment: (enrollmentData: any) => Promise<void>;
  updateEnrollmentStatus: (id: string, status: string, token: string) => Promise<void>;
  deleteEnrollment: (id: string, token: string) => Promise<void>;
  addTestimonial: (testimonialData: any) => Promise<void>;
  submitTestimonial: (testimonialData: any) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  data: initialData,
  isLoading: true,
  error: null,

  fetchData: async (force = false) => {
    try {
      set({ isLoading: true, error: null });
      const { data: dbData, error } = await supabase
        .from('app_data')
        .select('*');

      if (error) throw error;

      if (dbData && dbData.length > 0) {
        const formattedData: any = { ...initialData };
        dbData.forEach((row) => {
          formattedData[row.section_key] = row.section_data;
        });

        // Also fetch enrollments if admin
        const { data: enrollmentsData } = await supabase
          .from('enrollments')
          .select('*')
          .order('created_at', { ascending: false });

        if (enrollmentsData) {
          formattedData.enrollments = enrollmentsData.map(e => ({
            id: e.id,
            fullName: e.full_name,
            email: e.email,
            phone: e.phone,
            program: e.program,
            schedule: e.schedule,
            message: e.message,
            status: e.status,
            createdAt: e.created_at
          }));
        }

        set({ data: formattedData, isLoading: false });
      } else {
        // First time initialization: populate database with initial content
        try {
          const insertPayloads = Object.keys(initialData).map(key => ({
            section_key: key,
            section_data: (initialData as any)[key]
          }));
          
          await supabase.from('app_data').upsert(insertPayloads, { onConflict: 'section_key' });
        } catch (initErr) {
          console.warn('Initial seeding note:', initErr);
        }
        set({ data: initialData, isLoading: false });
      }
    } catch (error: any) {
      console.error('Error fetching data from Supabase:', error);
      set({ error: error.message, isLoading: false });
    }
  },

  updateSection: async (sectionKey: string, sectionData: any, token: string) => {
    try {
      const { error } = await supabase
        .from('app_data')
        .upsert({
          section_key: sectionKey,
          section_data: sectionData,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_key' });

      if (error) throw error;

      set((state) => ({
        data: {
          ...state.data,
          [sectionKey]: sectionData
        }
      }));
    } catch (error: any) {
      console.error(`Error updating section ${sectionKey}:`, error);
      throw error;
    }
  },

  addEnrollment: async (enrollmentData: any) => {
    return get().submitEnrollment(enrollmentData);
  },

  submitEnrollment: async (enrollmentData: any) => {
    try {
      const newEnrollment = {
        full_name: enrollmentData.fullName,
        email: enrollmentData.email,
        phone: enrollmentData.phone,
        program: enrollmentData.program,
        schedule: enrollmentData.schedule,
        message: enrollmentData.message,
        status: 'new'
      };

      const { data, error } = await supabase
        .from('enrollments')
        .insert([newEnrollment])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const added = {
          id: data[0].id,
          fullName: data[0].full_name,
          email: data[0].email,
          phone: data[0].phone,
          program: data[0].program,
          schedule: data[0].schedule,
          message: data[0].message,
          status: data[0].status,
          createdAt: data[0].created_at
        };

        set((state) => ({
          data: {
            ...state.data,
            enrollments: [added, ...(state.data.enrollments || [])]
          }
        }));
      }
    } catch (error: any) {
      console.error('Error submitting enrollment:', error);
      throw error;
    }
  },

  updateEnrollmentStatus: async (id: string, status: string, token: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        data: {
          ...state.data,
          enrollments: (state.data.enrollments || []).map((e: any) =>
            e.id === id ? { ...e, status } : e
          )
        }
      }));
    } catch (error: any) {
      console.error('Error updating enrollment status:', error);
      throw error;
    }
  },

  deleteEnrollment: async (id: string, token: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        data: {
          ...state.data,
          enrollments: (state.data.enrollments || []).filter((e: any) => e.id !== id)
        }
      }));
    } catch (error: any) {
      console.error('Error deleting enrollment:', error);
      throw error;
    }
  },

  addTestimonial: async (testimonialData: any) => {
    return get().submitTestimonial(testimonialData);
  },

  submitTestimonial: async (testimonialData: any) => {
    try {
      const currentData = get().data;
      const testimonials = [...(currentData.testimonials || [])];
      
      const newTestimonial = {
        id: Date.now().toString(),
        ...testimonialData,
        published: false,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      testimonials.push(newTestimonial);
      
      const { error } = await supabase.from('app_data').upsert({
        section_key: 'testimonials',
        section_data: testimonials
      }, { onConflict: 'section_key' });

      if (error) throw error;
      
      set((state) => ({
        data: {
          ...state.data,
          testimonials
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
  adminEmail: string | null;
  isAuthenticated: boolean;
  isCheckingSession: boolean;
  login: (token: string, email: string) => void;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  adminEmail: null,
  isAuthenticated: false,
  isCheckingSession: true,
  
  login: (token: string, email: string) => {
    set({ token, adminEmail: email, isAuthenticated: true, isCheckingSession: false });
  },
  
  logout: async () => {
    try {
      await supabase.auth.signOut();
      if (typeof window !== 'undefined') {
        sessionStorage.clear();
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth-token'))) {
            localStorage.removeItem(key);
          }
        }
      }
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      set({ token: null, adminEmail: null, isAuthenticated: false, isCheckingSession: false });
    }
  },
  
  checkSession: async () => {
    try {
      set({ isCheckingSession: true });
      
      // Perform genuine server authentication verification with Supabase Auth
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (
        !userError &&
        user &&
        user.email &&
        user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
        session?.access_token
      ) {
        set({ 
          token: session.access_token, 
          adminEmail: user.email,
          isAuthenticated: true, 
          isCheckingSession: false 
        });
      } else {
        if (user && user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
          await supabase.auth.signOut();
        }
        set({ token: null, adminEmail: null, isAuthenticated: false, isCheckingSession: false });
      }
      
      supabase.auth.onAuthStateChange(async (_event, newSession) => {
        if (newSession && newSession.user?.email && newSession.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          set({ 
            token: newSession.access_token, 
            adminEmail: newSession.user.email,
            isAuthenticated: true, 
            isCheckingSession: false 
          });
        } else {
          set({ token: null, adminEmail: null, isAuthenticated: false, isCheckingSession: false });
        }
      });
    } catch (e) {
      set({ token: null, adminEmail: null, isAuthenticated: false, isCheckingSession: false });
    }
  }
}));
