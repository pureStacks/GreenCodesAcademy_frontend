import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/src/components/ui/Button"
import { motion } from "motion/react"
import { MessageCircle } from "lucide-react"

export function CTA() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "2349030882127"
    const message = encodeURIComponent("Hello Green Codes Academy, I would like to learn more about enrollment and your available programs.")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-green-900 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              YOUR TECHNOLOGY JOURNEY STARTS HERE.
            </h2>
            <p className="text-lg md:text-xl text-green-100 mb-10">
              Don't wait to build the skills that can shape your future. Join Green Codes Academy today.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/enrollment" tabIndex={-1}>
                <Button size="lg" className="w-full sm:w-auto px-10 bg-yellow-400 text-yellow-950 hover:bg-yellow-500 text-lg">
                  ENROLL NOW
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto px-8 gap-2 border-green-700 text-white hover:bg-green-800 text-lg"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="h-5 w-5" />
                CHAT ON WHATSAPP
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
