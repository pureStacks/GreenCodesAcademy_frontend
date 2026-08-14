import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { motion } from "motion/react"

export function Hero() {
  return (
    <section className="relative bg-white pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-green-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 font-medium text-sm mb-6 border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Registration for 2026 Cohort is Open
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              BUILD THE SKILLS OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">TOMORROW</span>, TODAY.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              Empowering students with practical technology, coding, and digital skills for a smarter future. Join the premier physical tech academy in Nigeria.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link to="/enrollment" tabIndex={-1}>
                <Button size="lg" className="w-full sm:w-auto px-8 shadow-lg shadow-green-700/20 text-base">
                  ENROLL NOW
                </Button>
              </Link>
              <Link to="/programs" tabIndex={-1}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 gap-2 bg-white text-base">
                  LEARN ABOUT OUR PROGRAMS
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                <span>Practical Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                <span>Experienced Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                <span>Career-Focused Training</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-100 border border-gray-200">
              {/* Fallback image if actual image is missing */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-950 flex items-center justify-center">
                 <div className="text-center p-8">
                    <p className="text-white/80 font-medium text-lg mb-2">Green Codes Academy Classroom</p>
                    <p className="text-white/50 text-sm">Image placeholder for students learning tech</p>
                 </div>
              </div>
              <img 
                src="https://i.ibb.co/B2jpgXwv/test.jpg" 
                alt="Students collaborating and coding in a modern classroom" 
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce-slow">
              <div className="bg-yellow-400 p-3 rounded-xl">
                <span className="font-bold text-yellow-900 text-xl">95%</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 leading-tight">Student<br/>Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
