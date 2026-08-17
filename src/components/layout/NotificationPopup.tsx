import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { CheckCircle2, X, Sparkles } from "lucide-react"
import { useAppStore } from "@/src/store"

export function NotificationPopup() {
  const { data } = useAppStore();
  const config = data?.notifications || { 
    enabled: true,
    sticker: "NEW ENROLLMENT",
    source: "all", // "all", "enrollments", "custom"
    customAlerts: [
      { name: "Chinedu O.", location: "Ikeja, Lagos", program: "Full-Stack Web Development", timeAgo: "10 mins ago" },
      { name: "Amina B.", location: "Yaba, Lagos", program: "Data Science & AI", timeAgo: "25 mins ago" },
      { name: "Emeka K.", location: "Surulere, Lagos", program: "Mobile App Development", timeAgo: "1 hour ago" },
      { name: "Blessing T.", location: "Lekki, Lagos", program: "UI/UX Product Design", timeAgo: "2 hours ago" }
    ]
  };

  const enrollments = data?.enrollments || [];
  
  // Create unified alerts pool
  const alertsList: Array<{ name: string; location?: string; program: string; timeAgo: string; isLive?: boolean }> = React.useMemo(() => {
    const list: Array<{ name: string; location?: string; program: string; timeAgo: string; isLive?: boolean }> = [];
    
    // Add real database enrollments if available
    if (enrollments.length > 0 && config.source !== "custom") {
      enrollments.slice(-10).forEach((e: any) => {
        list.push({
          name: e.fullName || "A student",
          location: "Nigeria",
          program: e.program || "Tech Program",
          timeAgo: e.createdAt ? new Date(e.createdAt).toLocaleDateString() : "Just now",
          isLive: true
        });
      });
    }

    // Add custom alerts if configured
    if (config.customAlerts && config.customAlerts.length > 0 && (list.length === 0 || config.source !== "enrollments")) {
      config.customAlerts.forEach((a: any) => {
        list.push({
          name: a.name || "Student",
          location: a.location || "Lagos",
          program: a.program || "Tech Program",
          timeAgo: a.timeAgo || "Recently",
          isLive: false
        });
      });
    }

    return list;
  }, [enrollments, config.customAlerts, config.source]);

  const [currentNotification, setCurrentNotification] = React.useState<any | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!config.enabled || alertsList.length === 0) return;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const triggerNotification = () => {
      const randomAlert = alertsList[Math.floor(Math.random() * alertsList.length)];
      setCurrentNotification(randomAlert);
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5500);
    };

    // Initial delay of 6 seconds
    timeoutId = setTimeout(() => {
      triggerNotification();

      // Subsequent notifications every 25 seconds
      intervalId = setInterval(() => {
        triggerNotification();
      }, 25000);
    }, 6000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [config.enabled, alertsList]);

  if (!config.enabled) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {isVisible && currentNotification && (
          <motion.div
            initial={{ opacity: 0, x: -40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -40, scale: 0.95 }}
            transition={{ duration: 0.35, type: "spring", stiffness: 120 }}
            className="bg-white rounded-2xl shadow-2xl border border-green-100 p-4 pr-10 flex items-start gap-3 w-80 sm:w-88 pointer-events-auto relative"
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-700 transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="bg-green-100 p-2.5 rounded-full shrink-0 mt-0.5 text-green-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-extrabold text-green-700 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-green-200">
                  {config.sticker || "NEW ENROLLMENT"}
                </span>
                {currentNotification.isLive && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-900 leading-snug">
                <span className="font-bold text-gray-900">{currentNotification.name}</span>{" "}
                {currentNotification.location && <span className="text-gray-500 font-normal">({currentNotification.location})</span>}{" "}
                enrolled in <span className="font-semibold text-green-800">{currentNotification.program}</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                {currentNotification.timeAgo}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
