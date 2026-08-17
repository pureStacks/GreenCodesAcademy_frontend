import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/src/components/ui/Button"
import { motion } from "motion/react"
import { useAppStore } from "@/src/store"

const DEFAULT_DEADLINE = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

export function Countdown() {
  const { data } = useAppStore();
  const config = data?.countdown || {
    enabled: true,
    deadline: DEFAULT_DEADLINE,
    badge: "Enrollment is Now Open",
    heading: "Secure your place in the next training cohort.",
    description: "Spaces are limited. Register today to begin your journey in tech.",
    ctaText: "ENROLL NOW",
    ctaUrl: "/enrollment",
    expiredMessage: "Enrollment is currently closed."
  };

  if (!config.enabled) return null;

  const deadline = new Date(config.deadline);
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = React.useState(false);

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
      } else {
        setIsExpired(true);
      }
    }
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [config.deadline])

  if (isExpired) {
    return (
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-green-900 mb-4">{config.expiredMessage}</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-green-50 py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {config.badge && (
            <div className="inline-block bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase mb-6 shadow-sm">
              {config.badge}
            </div>
          )}
          
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            {config.heading}
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            {config.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-10">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="bg-white text-green-700 text-4xl md:text-6xl font-black w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center rounded-2xl shadow-sm border border-green-100 mb-3 tracking-tighter tabular-nums">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <span className="text-sm md:text-base font-semibold text-gray-500 uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>

          <Link to={config.ctaUrl} tabIndex={-1}>
            <Button size="lg" className="px-12 text-lg shadow-lg">
              {config.ctaText}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
