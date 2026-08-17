import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { CheckCircle2, X } from "lucide-react"
import { useAppStore } from "@/src/store"

export function NotificationPopup() {
  const { data } = useAppStore();
  const config = data?.notifications || { enabled: true };
  const enrollments = data?.enrollments || [];
  
  // Filter for approved enrollments
  const approvedEnrollments = enrollments.filter((e: any) => e.status === 'approved');

  const [currentNotification, setCurrentNotification] = React.useState<any | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!config.enabled || approvedEnrollments.length === 0) return;

    const triggerNotification = () => {
      // Pick a random recent approved enrollment
      const randomUser = approvedEnrollments[Math.floor(Math.random() * approvedEnrollments.length)];
      setCurrentNotification(randomUser);
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }

    // Initial delay before first notification
    const initialTimer = setTimeout(() => {
      triggerNotification()
      
      // Subsequent notifications every 30-45 seconds
      const intervalTimer = setInterval(() => {
        triggerNotification()
      }, Math.floor(Math.random() * 15000) + 30000)

      return () => clearInterval(intervalTimer)
    }, 10000)

    return () => clearTimeout(initialTimer)
  }, [config.enabled, approvedEnrollments.length])

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {isVisible && currentNotification && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="bg-white rounded-xl shadow-lg border border-green-100 p-4 pr-10 flex items-start gap-3 w-72 sm:w-80 pointer-events-auto relative"
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="bg-green-50 p-2 rounded-full shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">New Enrollment</p>
              <p className="text-sm text-gray-800 leading-tight">
                <span className="font-semibold">{currentNotification.firstName} {currentNotification.lastName}</span> from <span className="font-semibold">{currentNotification.city}</span> just enrolled.
              </p>
              <p className="text-xs text-gray-500 mt-1">Recently joined</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
