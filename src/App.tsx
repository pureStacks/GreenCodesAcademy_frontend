import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/src/components/layout/Layout"
import { Home } from "@/src/pages/Home"
import { About } from "@/src/pages/About"
import { Programs } from "@/src/pages/Programs"
import { WhyChooseUs } from "@/src/pages/WhyChooseUs"
import { Testimonials } from "@/src/pages/Testimonials"
import { Contact } from "@/src/pages/Contact"
import { Enrollment } from "@/src/pages/Enrollment"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
  )
}
