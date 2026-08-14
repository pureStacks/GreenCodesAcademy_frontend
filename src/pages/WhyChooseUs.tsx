import * as React from "react"
import { motion } from "motion/react"
import { CheckCircle2, Wrench, GraduationCap, Building2, TrendingUp, SmilePlus, Component, MonitorPlay, Users, Award } from "lucide-react"
import { Card } from "@/src/components/ui/Card"
import { CTA } from "@/src/components/sections/CTA"
import { useAppStore } from "@/src/store"

// Map of potential icons, falling back to CheckCircle2
const iconMap: Record<string, React.ReactNode> = {
  Wrench: <Wrench className="h-8 w-8 text-green-600" />,
  GraduationCap: <GraduationCap className="h-8 w-8 text-green-600" />,
  Building2: <Building2 className="h-8 w-8 text-green-600" />,
  TrendingUp: <TrendingUp className="h-8 w-8 text-green-600" />,
  SmilePlus: <SmilePlus className="h-8 w-8 text-green-600" />,
  Component: <Component className="h-8 w-8 text-green-600" />,
  MonitorPlay: <MonitorPlay className="h-8 w-8 text-green-600" />,
  Users: <Users className="h-8 w-8 text-green-600" />,
  Award: <Award className="h-8 w-8 text-green-600" />,
  CheckCircle2: <CheckCircle2 className="h-8 w-8 text-green-600" />
};

export function WhyChooseUs() {
  const { data } = useAppStore();
  const reasons = data?.whyChooseUs || [];

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
            {reasons.map((reason: any, index: number) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full flex flex-col hover:border-green-300 hover:shadow-lg transition-all group">
                  <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                    {iconMap[reason.icon] || iconMap.CheckCircle2}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          {reasons.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              More information coming soon!
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  )
}
