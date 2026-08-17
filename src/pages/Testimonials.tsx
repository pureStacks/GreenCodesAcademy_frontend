import * as React from "react"
import { motion } from "motion/react"
import { Star } from "lucide-react"
import { Card } from "@/src/components/ui/Card"
import { CTA } from "@/src/components/sections/CTA"
import { ReviewForm } from "@/src/components/sections/ReviewForm"
import { useAppStore } from "@/src/store"

export function Testimonials() {
  const { data } = useAppStore();
  const testimonials = data?.testimonials?.filter((t: any) => t.published) || [];

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
            {testimonials.map((testimonial: any, idx: number) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-8 text-left h-full flex flex-col bg-white hover:shadow-lg transition-shadow">
                  <div className="flex text-yellow-400 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'fill-current' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-8 flex-1 leading-relaxed">"{testimonial.text}"</p>
                  
                  {testimonial.adminReply && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
                      <p className="text-xs font-bold text-gray-900 mb-1">Response from Green Codes Academy:</p>
                      <p className="text-sm text-gray-600">"{testimonial.adminReply}"</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-auto">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-800 text-lg shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.program}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {testimonials.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-xl font-medium">
              Check back soon for new student success stories!
            </div>
          )}

          <div className="text-center mt-12 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">YOUR SUCCESS STORY COULD BE NEXT.</h3>
          </div>
          
          <ReviewForm />
        </div>
      </section>

      <CTA />
    </>
  )
}
