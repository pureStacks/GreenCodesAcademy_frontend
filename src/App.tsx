import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useAppStore } from "@/src/store"
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
import { AdminDashboard } from "@/src/pages/admin/Dashboard"
import { HomeAdmin } from "@/src/pages/admin/HomeAdmin"
import { ProgramsAdmin } from "@/src/pages/admin/ProgramsAdmin"
import { EnrollmentsAdmin } from "@/src/pages/admin/EnrollmentsAdmin"
import { SiteSettingsAdmin } from "@/src/pages/admin/SiteSettingsAdmin"
import { TestimonialsAdmin } from "@/src/pages/admin/TestimonialsAdmin"
import { FaqsAdmin } from "@/src/pages/admin/FaqsAdmin"
import { WhyChooseUsAdmin } from "@/src/pages/admin/WhyChooseUsAdmin"
import { SecurityAdmin } from "@/src/pages/admin/SecurityAdmin"

export default function App() {
  const { fetchData, isLoading, data } = useAppStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading && !data) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-green-900 font-bold">Loading...</div>;
  }

  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="home" element={<HomeAdmin />} />
            <Route path="programs" element={<ProgramsAdmin />} />
            <Route path="why-choose-us" element={<WhyChooseUsAdmin />} />
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="faqs" element={<FaqsAdmin />} />
            <Route path="enrollments" element={<EnrollmentsAdmin />} />
            <Route path="settings" element={<SiteSettingsAdmin />} />
            <Route path="security" element={<SecurityAdmin />} />
            {/* We will add more admin routes here */}
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
