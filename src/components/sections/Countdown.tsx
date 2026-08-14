import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/src/components/ui/Button"
import { motion } from "motion/react"

export function Countdown() {
  // Set deadline to 14 days from now for demo
  const [deadline] = React.useState(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000))
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = deadline.getTime() - new Date().getTime()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [deadline])

  return (
    <section className="bg-green-50 py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase mb-6 shadow-sm">
            Enrollment is Now Open
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Secure your place in the next training cohort.
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Spaces are limited. Register today to begin your journey in tech.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-10">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="bg-white text-green-700 text-4xl md:text-6xl font-black w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center rounded-2xl shadow-sm border border-green-100 mb-3 tracking-tighter tabular-nums">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <span className="text-sm md:text-base font-semibold text-gray-500 uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>

          <Link to="/enrollment" tabIndex={-1}>
            <Button size="lg" className="px-12 text-lg shadow-lg">
              ENROLL NOW
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
