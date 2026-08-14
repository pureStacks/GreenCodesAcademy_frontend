import * as React from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Code, Monitor, Smartphone, Database, CheckCircle2, Star, Users, Briefcase, Award } from "lucide-react"
import { Hero } from "@/src/components/sections/Hero"
import { Countdown } from "@/src/components/sections/Countdown"
import { CTA } from "@/src/components/sections/CTA"
import { PhysicalCampus } from "@/src/components/sections/PhysicalCampus"
import { Card } from "@/src/components/ui/Card"
import { Button } from "@/src/components/ui/Button"

export function Home() {
  return (
    <>
      <Hero />
      <Countdown />

      {/* Programs Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Technology Programs</h2>
            <p className="text-lg text-gray-600">
              Practical, hands-on courses designed to equip you with the skills needed in today's digital economy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Web Development",
                icon: <Monitor className="h-8 w-8 text-green-600" />,
                desc: "Learn how to create modern websites and web applications from scratch.",
              },
              {
                title: "Software Development",
                icon: <Code className="h-8 w-8 text-green-600" />,
                desc: "Develop practical software development skills and understand software architecture.",
              },
              {
                title: "UI/UX Design",
                icon: <Smartphone className="h-8 w-8 text-green-600" />,
                desc: "Learn how to design attractive and user-friendly digital products.",
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full flex flex-col hover:border-green-300 hover:shadow-lg transition-all group">
                  <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-8 flex-1">{program.desc}</p>
                  <Link to="/programs" className="text-green-700 font-semibold flex items-center hover:text-green-800">
                    Learn more <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/programs" tabIndex={-1}>
              <Button variant="outline" size="lg">VIEW ALL PROGRAMS</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Students Choose Green Codes Academy
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We focus on practical, project-based learning in a modern physical environment. No prior experience needed to start building your future.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  { title: "Practical Training", desc: "Students learn by doing and building real projects." },
                  { title: "Experienced Instructors", desc: "Guidance from knowledgeable industry professionals." },
                  { title: "Modern Learning Environment", desc: "Comfortable physical classrooms for effective learning." }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="bg-green-100 p-1 rounded-full h-fit mt-1">
                      <CheckCircle2 className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/why-choose-us" tabIndex={-1}>
                <Button>Learn More About Us</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 aspect-square flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform">
                  <Users className="h-10 w-10 text-yellow-500 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                  <div className="text-sm font-medium text-gray-500 uppercase">Students Trained</div>
                </div>
                <div className="bg-green-700 p-6 rounded-3xl shadow-md aspect-square flex flex-col items-center justify-center text-center text-white hover:-translate-y-1 transition-transform">
                  <Award className="h-10 w-10 text-green-300 mb-3" />
                  <div className="text-3xl font-bold mb-1">95%</div>
                  <div className="text-sm font-medium text-green-100 uppercase">Success Rate</div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-yellow-400 p-6 rounded-3xl shadow-md aspect-square flex flex-col items-center justify-center text-center text-yellow-950 hover:-translate-y-1 transition-transform">
                  <Briefcase className="h-10 w-10 text-yellow-700 mb-3" />
                  <div className="text-3xl font-bold mb-1">20+</div>
                  <div className="text-sm font-medium text-yellow-800 uppercase">Practical Projects</div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 aspect-square flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform">
                  <Code className="h-10 w-10 text-green-600 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">10+</div>
                  <div className="text-sm font-medium text-gray-500 uppercase">Tech Programs</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PhysicalCampus />

      {/* Testimonials Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            Hear from our students about their experience learning at Green Codes Academy.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Chukwudi N.",
                course: "Web Development",
                text: "I came in with almost no coding experience, and the practical approach made learning much easier. I can now build projects on my own."
              },
              {
                name: "Sarah A.",
                course: "UI/UX Design",
                text: "Green Codes Academy gave me the confidence and practical skills I needed to start my technology journey."
              },
              {
                name: "Tobi M.",
                course: "Software Development",
                text: "The instructors are patient, supportive, and focused on making sure students actually understand what they are learning."
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-8 text-left h-full flex flex-col bg-gray-50 border-transparent">
                  <div className="flex text-yellow-400 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                  </div>
                  <p className="text-gray-700 italic mb-8 flex-1 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-800 text-lg">
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
          
          <Link to="/testimonials" tabIndex={-1}>
            <Button variant="outline" size="lg">READ MORE SUCCESS STORIES</Button>
          </Link>
        </div>
      </section>

      <CTA />
    </>
  )
}
