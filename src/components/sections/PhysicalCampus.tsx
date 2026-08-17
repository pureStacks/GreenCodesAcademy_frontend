import * as React from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { useAppStore } from "@/src/store"

export function PhysicalCampus() {
  const { data } = useAppStore();
  const campusData = data?.campus || {};

  const title = campusData.title || "LEARN IN A REAL CLASSROOM.";
  const highlight = campusData.highlight || "BUILD REAL SKILLS.";
  const description = campusData.description || "Because Green Codes Academy is a physical school, we offer an immersive learning experience that online courses simply cannot match. You get immediate feedback, peer collaboration, and a distraction-free environment.";
  
  const features = campusData.features || [
    "Physical classroom training",
    "Computer-based practical sessions",
    "Instructor-led lessons",
    "Collaborative learning",
    "Hands-on projects",
    "Student interaction"
  ];

  const ctaText = campusData.ctaText || "ENROLL NOW";
  const ctaUrl = campusData.ctaUrl || "/enrollment";
  const badgeValue = campusData.badgeValue || "100%";
  const badgeLabel = campusData.badgeLabel || "Practical";
  const badgeEnabled = campusData.badgeEnabled !== false;

  return (
    <section className="py-20 bg-green-950 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white leading-tight">
              {title} <br className="hidden sm:block" />
              <span className="text-yellow-400">{highlight}</span>
            </h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-10">
              {features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                  <span className="text-green-50 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Link to={ctaUrl} tabIndex={-1}>
              <Button size="lg" className="px-10 bg-yellow-400 text-yellow-950 hover:bg-yellow-500 shadow-lg text-lg font-bold">
                {ctaText}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src={campusData?.image1 || "https://i.ibb.co/gFvmkzHP/temp.jpg"}
                  alt={campusData?.caption1 || "Students coding together"} 
                  className="rounded-3xl w-full h-48 object-cover shadow-lg border border-green-800"
                />
                <img 
                  src={campusData?.image2 || "https://i.ibb.co/nNZ56Bvy/temp.jpg"}
                  alt={campusData?.caption2 || "Student interaction"} 
                  className="rounded-3xl w-full h-64 object-cover shadow-lg border border-green-800"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img 
                  src={campusData?.image3 || "https://i.ibb.co/nMcY3y7W/temp.jpg"}
                  alt={campusData?.caption3 || "Modern classroom"} 
                  className="rounded-3xl w-full h-64 object-cover shadow-lg border border-green-800"
                />
                {badgeEnabled && (
                  <div className="bg-green-800 rounded-3xl h-48 flex items-center justify-center p-6 text-center border border-green-700 shadow-lg">
                    <div>
                      <div className="text-4xl font-extrabold text-white mb-2">{badgeValue}</div>
                      <div className="text-green-200 font-bold uppercase tracking-wider text-sm">{badgeLabel}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
