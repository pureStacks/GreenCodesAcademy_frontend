import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useAppStore, useAuthStore } from "@/src/store"
import { Layout } from "@/src/components/layout/Layout"
import { AdminLayout } from "@/src/components/admin/AdminLayout"
import { Home } from "@/src/pages/Home"
import { About } from "@/src/pages/About"
import { Programs } from "@/src/pages/Programs"
import { WhyChooseUs } from "@/src/pages/WhyChooseUs"
import { Testimonials } from "@/src/pages/Testimonials"
import { Contact } from "@/src/pages/Contact"
import { Enrollment } from "@/src/pages/Enrollment"
import { AdminLogin } from "@/src/pages/admin/Login"
import { ResetPassword } from "@/src/pages/admin/ResetPassword"
import { AdminDashboard } from "@/src/pages/admin/Dashboard"
import { HomeAdmin } from "@/src/pages/admin/HomeAdmin"
import { AboutAdmin } from "@/src/pages/admin/AboutAdmin"
import { ContactAdmin } from "@/src/pages/admin/ContactAdmin"
import { NavigationAdmin } from "@/src/pages/admin/NavigationAdmin"
import { CountdownAdmin } from "@/src/pages/admin/CountdownAdmin"
import { PopupsAdmin } from "@/src/pages/admin/PopupsAdmin"
import { ProgramsAdmin } from "@/src/pages/admin/ProgramsAdmin"
import { EnrollmentsAdmin } from "@/src/pages/admin/EnrollmentsAdmin"
import { SiteSettingsAdmin } from "@/src/pages/admin/SiteSettingsAdmin"
import { TestimonialsAdmin } from "@/src/pages/admin/TestimonialsAdmin"
import { FaqsAdmin } from "@/src/pages/admin/FaqsAdmin"
import { WhyChooseUsAdmin } from "@/src/pages/admin/WhyChooseUsAdmin"
import { SecurityAdmin } from "@/src/pages/admin/SecurityAdmin"

export default function App() {
  const { fetchData } = useAppStore();
  const { checkSession, isCheckingSession } = useAuthStore();

  useEffect(() => {
    fetchData();
    checkSession();
  }, [fetchData, checkSession]);

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-green-700 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-gray-500">Loading Green Codes Academy...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/reset-password" element={<ResetPassword />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="navigation" element={<NavigationAdmin />} />
            <Route path="home" element={<HomeAdmin />} />
            <Route path="about" element={<AboutAdmin />} />
            <Route path="contact" element={<ContactAdmin />} />
            <Route path="countdown" element={<CountdownAdmin />} />
            <Route path="popups" element={<PopupsAdmin />} />
            <Route path="programs" element={<ProgramsAdmin />} />
            <Route path="why-choose-us" element={<WhyChooseUsAdmin />} />
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="faqs" element={<FaqsAdmin />} />
            <Route path="enrollments" element={<EnrollmentsAdmin />} />
            <Route path="settings" element={<SiteSettingsAdmin />} />
            <Route path="security" element={<SecurityAdmin />} />
          </Route>

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="programs" element={<Programs />} />
            <Route path="why-choose-us" element={<WhyChooseUs />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="contact" element={<Contact />} />
            <Route path="enrollment" element={<Enrollment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
