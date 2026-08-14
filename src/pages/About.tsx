import * as React from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { CheckCircle2, Target, BookOpen, Users2 } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { CTA } from "@/src/components/sections/CTA"

export function About() {
  return (
    <>
      <section className="bg-green-950 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              LEARN. BUILD. CREATE. GROW.
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              We are Nigeria's premier physical technology academy, dedicated to empowering students with practical, career-ready digital skills.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Green Codes Academy, we believe that practical technology education is the key to unlocking future opportunities. Our mission is to bridge the digital skills gap by providing accessible, high-quality, and hands-on training to individuals of all backgrounds.
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                We go beyond theory. Our curriculum is designed around real-world projects, ensuring that our students graduate not just with knowledge, but with the confidence to build, create, and innovate.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {[
                  { icon: <Target className="h-6 w-6 text-green-600" />, title: "Goal-Oriented", desc: "Focused on career readiness." },
                  { icon: <BookOpen className="h-6 w-6 text-green-600" />, title: "Project-Based", desc: "Learn by building real apps." },
                  { icon: <Users2 className="h-6 w-6 text-green-600" />, title: "Community", desc: "Collaborative learning space." },
                  { icon: <CheckCircle2 className="h-6 w-6 text-green-600" />, title: "Beginner Friendly", desc: "Start from absolute zero." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="bg-green-50 p-3 rounded-xl shrink-0 h-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/enrollment" tabIndex={-1}>
                <Button size="lg">ENROLL NOW</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-gray-100 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-900/80 to-transparent flex items-end p-8 z-10">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">Modern Learning Environment</h3>
                    <p className="text-green-50">Equipped with the latest tools and technologies.</p>
                  </div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" 
                  alt="Students and instructor in a modern coding bootcamp" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">LEARN IN A REAL CLASSROOM. BUILD REAL SKILLS.</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Because Green Codes Academy is a physical school, we offer an immersive learning experience that online courses simply cannot match. You get immediate feedback, peer collaboration, and a distraction-free environment.
          </p>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            {[
              "Computer-based practical sessions",
              "Instructor-led lessons",
              "Collaborative learning",
              "Hands-on projects",
              "Student interaction",
              "Dedicated mentorship"
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
                <CheckCircle2 className="h-8 w-8 text-green-600 mb-4" />
                <span className="font-semibold text-gray-900">{feature}</span>
              </div>
            ))}
          </div>

          <Link to="/enrollment" tabIndex={-1}>
             <Button size="lg" className="px-12 text-lg">ENROLL NOW</Button>
          </Link>
        </div>
      </section>

      <CTA />
    </>
  )
}
