import * as React from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { cn } from "@/src/lib/utils"
import { motion, AnimatePresence } from "motion/react"
import { useAppStore } from "@/src/store"

export function WhatsAppPopup() {
  const { data } = useAppStore();
  const config = data?.whatsappPopup || {
    enabled: true,
    heading: "NEED HELP WITH ENROLLMENT?",
    description: "Have questions about our programs, fees, schedule, or enrollment? Chat with us on WhatsApp.",
    buttonText: "CHAT ON WHATSAPP",
    prefilledMessage: "Hello Green Codes Academy, I would like to learn more about enrollment and your available programs."
  };
  
  const siteData = data?.site || {};
  const phone = siteData.whatsapp || "+234 903 088 2127";
  const cleanPhone = phone.replace(/\s/g, '').replace('+', '');

  const [isOpen, setIsOpen] = React.useState(false)

  if (!config.enabled) return null;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(config.prefilledMessage);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-72 sm:w-80 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="bg-[#25D366] p-4 text-white flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg leading-tight">{config.heading}</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Close WhatsApp Popup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-5">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {config.description}
              </p>
              <Button variant="whatsapp" className="w-full gap-2" onClick={handleWhatsAppClick}>
                <MessageCircle className="h-5 w-5" />
                {config.buttonText}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center transition-colors hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]",
          isOpen ? "bg-gray-800 hover:bg-gray-700" : ""
        )}
        aria-label="Open WhatsApp Chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </motion.button>
    </div>
  )
}
