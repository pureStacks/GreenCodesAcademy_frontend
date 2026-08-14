import * as React from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Monitor, Code, Terminal, Smartphone, Laptop, Cpu, CheckCircle2 } from "lucide-react"
import { Card } from "@/src/components/ui/Card"
import { Button } from "@/src/components/ui/Button"
import { CTA } from "@/src/components/sections/CTA"

export function Programs() {
  const courses = [
    {
      title: "Web Development",
      icon: <Monitor className="h-10 w-10 text-green-600" />,
      desc: "Learn how to create modern websites and web applications.",
      benefits: ["HTML, CSS & JavaScript fundamentals", "Responsive layout design", "Frontend frameworks (React)", "Backend APIs integration"]
    },
    {
      title: "Software Development",
      icon: <Code className="h-10 w-10 text-green-600" />,
      desc: "Develop practical software development skills and problem-solving.",
      benefits: ["Software architecture principles", "Version control with Git", "Database management", "Full-stack development"]
    },
    {
      title: "Coding & Programming",
      icon: <Terminal className="h-10 w-10 text-green-600" />,
      desc: "Learn programming fundamentals and computational thinking.",
      benefits: ["Python programming basics", "Data structures & algorithms", "Logic and problem solving", "Scripting and automation"]
    },
    {
      title: "UI/UX Design",
      icon: <Smartphone className="h-10 w-10 text-green-600" />,
      desc: "Learn how to design attractive and user-friendly digital products.",
      benefits: ["User research & wireframing", "Figma mastery", "Prototyping & testing", "Visual design principles"]
    },
    {
      title: "Digital Skills",
      icon: <Laptop className="h-10 w-10 text-green-600" />,
      desc: "Develop essential digital skills for education, work, and business.",
      benefits: ["Digital marketing basics", "Content creation", "Online collaboration tools", "Data analysis fundamentals"]
    },
    {
      title: "Computer Fundamentals",
      icon: <Cpu className="h-10 w-10 text-green-600" />,
      desc: "Build strong computer literacy and technology foundations.",
      benefits: ["Operating systems navigation", "File management", "Internet security basics", "Word processing & spreadsheets"]
    }
  ]

  return (
    <>
      <section className="bg-green-950 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Training Programs
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
              Choose the right path for your technology career. Our courses are designed to take you from beginner to job-ready.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-gray-200">
                  <div className="bg-green-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                    {course.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-6 flex-1">{course.desc}</p>
                  
                  <div className="space-y-3 mb-8">
                    <h4 className="font-semibold text-sm text-gray-900 uppercase tracking-wider">Key Benefits</h4>
                    {course.benefits.map((benefit, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 mt-auto">
                    <Link to="/enrollment" tabIndex={-1}>
                      <Button className="w-full">ENROLL NOW</Button>
                    </Link>
                    <Link to="/contact" tabIndex={-1}>
                      <Button variant="outline" className="w-full bg-white">LEARN MORE</Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
