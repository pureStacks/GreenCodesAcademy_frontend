import * as React from "react"
import { motion } from "motion/react"
import { CheckCircle2, Wrench, GraduationCap, Building2, TrendingUp, SmilePlus, Component } from "lucide-react"
import { Card } from "@/src/components/ui/Card"
import { CTA } from "@/src/components/sections/CTA"

export function WhyChooseUs() {
  const reasons = [
    {
      title: "Practical Training",
      icon: <Wrench className="h-8 w-8 text-green-600" />,
      desc: "Students learn by doing and building real projects. We emphasize hands-on experience over theoretical lectures."
    },
    {
      title: "Experienced Instructors",
      icon: <GraduationCap className="h-8 w-8 text-green-600" />,
      desc: "Students receive guidance from knowledgeable instructors who work in the tech industry and understand current trends."
    },
    {
      title: "Modern Learning Environment",
      icon: <Building2 className="h-8 w-8 text-green-600" />,
      desc: "We provide a comfortable physical environment equipped with modern computers and reliable internet for effective learning."
    },
    {
      title: "Career-Focused Skills",
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      desc: "We teach practical skills that can directly support employment, freelancing, entrepreneurship, and further education."
    },
    {
      title: "Beginner Friendly",
      icon: <SmilePlus className="h-8 w-8 text-green-600" />,
      desc: "Students can start without any previous coding experience. Our curriculum is designed to take you from zero to proficient."
    },
    {
      title: "Project-Based Learning",
      icon: <Component className="h-8 w-8 text-green-600" />,
      desc: "Students gain experience by creating practical projects they can show to future employers or clients."
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
              Why Choose Green Codes Academy?
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
              We provide the environment, curriculum, and mentorship you need to succeed in the technology industry.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full flex flex-col hover:border-green-300 hover:shadow-lg transition-all group">
                  <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{reason.desc}</p>
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
