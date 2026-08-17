import * as React from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { X, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { useAppStore } from "@/src/store"

export function PromoModal() {
  const { data } = useAppStore();
  const promo = data?.promoModal || {
    enabled: false,
    sticker: "🔥 2026 ADMISSION SPECIAL",
    title: "Kickstart Your Tech Career",
    caption: "Get 15% discount on early registration for Full-Stack Web Development, Data Science, and Mobile App courses.",
    image: "https://i.ibb.co/B2jpgXwv/test.jpg",
    ctaText: "Claim Your Spot",
    ctaUrl: "/enrollment",
    delaySeconds: 4
  };

  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (!promo.enabled) {
      setIsOpen(false);
      return;
    }

    // Check if user previously closed it in this session
    const hasSeenPromo = sessionStorage.getItem('gca_seen_promo');
    if (hasSeenPromo) return;

    const delay = (promo.delaySeconds || 4) * 1000;
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [promo.enabled, promo.delaySeconds]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('gca_seen_promo', 'true');
  };

  if (!promo.enabled) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-gray-700 hover:text-black p-2 rounded-full shadow-md transition-all backdrop-blur-xs"
              aria-label="Close Promo Modal"
            >
              <X className="h-5 w-5" />
            </button>

            {promo.image && (
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-green-950">
                <img
                  src={promo.image}
                  alt={promo.title || "Special Offer"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {promo.sticker && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-yellow-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      <Sparkles className="h-3.5 w-3.5" />
                      {promo.sticker}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="p-6 sm:p-8 text-center space-y-4">
              {!promo.image && promo.sticker && (
                <div>
                  <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5" />
                    {promo.sticker}
                  </span>
                </div>
              )}

              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                {promo.title}
              </h3>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                {promo.caption}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to={promo.ctaUrl || "/enrollment"} onClick={handleClose} tabIndex={-1} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full px-8 gap-2 shadow-lg shadow-green-700/20 text-base">
                    {promo.ctaText || "Enroll Now"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" onClick={handleClose} className="w-full sm:w-auto text-gray-600 hover:text-gray-900">
                  Maybe Later
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
