import * as React from "react"
import { motion } from "motion/react"
import { Star } from "lucide-react"
import { Card } from "@/src/components/ui/Card"
import { CTA } from "@/src/components/sections/CTA"

export function Testimonials() {
  const testimonials = [
    {
      name: "Chukwudi N.",
      course: "Web Development",
      text: "I came in with almost no coding experience, and the practical approach made learning much easier. I can now build projects on my own. The instructors were always available to help when I got stuck."
    },
    {
      name: "Sarah A.",
      course: "UI/UX Design",
      text: "Green Codes Academy gave me the confidence and practical skills I needed to start my technology journey. The curriculum is up-to-date with what employers are actually looking for."
    },
    {
      name: "Tobi M.",
      course: "Software Development",
      text: "The instructors are patient, supportive, and focused on making sure students actually understand what they are learning. It's not just about passing exams, it's about building real skills."
    },
    {
      name: "Fatima B.",
      course: "Digital Skills",
      text: "The physical learning environment makes a huge difference. Being able to interact with classmates and instructors face-to-face kept me motivated throughout the program."
    },
    {
      name: "Emmanuel K.",
      course: "Coding & Programming",
      text: "I tried learning online but kept giving up. Green Codes Academy provided the structure and mentorship I needed. The project-based approach is exactly what I was looking for."
    },
    {
      name: "Grace O.",
      course: "Web Development",
      text: "Best investment I've made in my career. Within months of completing my training, I was able to secure an internship thanks to the portfolio of projects I built during the course."
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
              What Our Students Say
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
              Real stories from students who have transformed their careers through our practical training programs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-8 text-left h-full flex flex-col bg-white hover:shadow-lg transition-shadow">
                  <div className="flex text-yellow-400 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                  </div>
                  <p className="text-gray-700 italic mb-8 flex-1 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-auto">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-800 text-lg shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.course}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">YOUR SUCCESS STORY COULD BE NEXT.</h3>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
