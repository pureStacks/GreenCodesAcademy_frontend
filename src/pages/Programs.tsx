import * as React from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Monitor, Code, Terminal, Smartphone, Laptop, Cpu, Clock, Award } from "lucide-react"
import { Card } from "@/src/components/ui/Card"
import { Button } from "@/src/components/ui/Button"
import { CTA } from "@/src/components/sections/CTA"
import { useAppStore } from "@/src/store"

export function Programs() {
  const { data } = useAppStore();
  const programs = data?.programs?.filter((p: any) => p.published) || [];

  const getIcon = (index: number) => {
    const icons = [
      <Monitor className="h-10 w-10 text-green-600" />,
      <Code className="h-10 w-10 text-green-600" />,
      <Terminal className="h-10 w-10 text-green-600" />,
      <Smartphone className="h-10 w-10 text-green-600" />,
      <Laptop className="h-10 w-10 text-green-600" />,
      <Cpu className="h-10 w-10 text-green-600" />
    ];
    return icons[index % icons.length];
  }

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
            {programs.map((course: any, index: number) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-gray-200">
                  <div className="bg-green-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                    {getIcon(index)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.name}</h3>
                  <p className="text-gray-600 mb-6 flex-1">{course.shortDescription}</p>
                  
                  <div className="space-y-3 mb-8">
                    <h4 className="font-semibold text-sm text-gray-900 uppercase tracking-wider">Course Details</h4>
                    <div className="flex gap-2 items-start">
                      <Clock className="h-5 w-5 text-green-600 shrink-0" />
                      <span className="text-gray-600 text-sm"><strong>Duration:</strong> {course.duration || 'Flexible'}</span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <Award className="h-5 w-5 text-green-600 shrink-0" />
                      <span className="text-gray-600 text-sm"><strong>Level:</strong> {course.level || 'All Levels'}</span>
                    </div>
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
          {programs.length === 0 && (
            <div className="text-center py-20 text-gray-500 text-xl font-medium">
              Check back soon for upcoming programs!
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  )
}
