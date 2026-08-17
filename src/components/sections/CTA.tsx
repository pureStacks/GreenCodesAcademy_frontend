import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/src/components/ui/Button"
import { motion } from "motion/react"
import { MessageCircle, Sparkles } from "lucide-react"
import { useAppStore } from "@/src/store"

export function CTA() {
  const { data } = useAppStore();
  const ctaData = data?.ctaSection || {};
  const siteData = data?.site || {};
  const waPopup = data?.whatsappPopup || {};

  const sticker = ctaData.sticker || "";
  const heading = ctaData.heading || "YOUR TECHNOLOGY JOURNEY STARTS HERE.";
  const subheading = ctaData.subheading || "Don't wait to build the skills that can shape your future. Join Green Codes Academy today.";
  const primaryText = ctaData.primaryText || "ENROLL NOW";
  const primaryUrl = ctaData.primaryUrl || "/enrollment";
  const secondaryText = ctaData.secondaryText || "CHAT ON WHATSAPP";
  const showWhatsApp = ctaData.showWhatsApp !== false;

  const handleWhatsAppClick = () => {
    const rawNumber = siteData.whatsapp || "2349030882127";
    const cleanNumber = rawNumber.replace(/\D/g, '');
    const message = encodeURIComponent(
      ctaData.whatsappMessage || 
      waPopup.prefilledMessage || 
      "Hello Green Codes Academy, I would like to learn more about enrollment and your available programs."
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-green-900 rounded-3xl p-8 md:p-14 text-center relative overflow-hidden shadow-2xl border border-green-800"
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
            {sticker && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-yellow-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  {sticker}
                </span>
              </div>
            )}

            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
              {heading}
            </h2>
            <p className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed">
              {subheading}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={primaryUrl} tabIndex={-1}>
                <Button size="lg" className="w-full sm:w-auto px-10 bg-yellow-400 text-yellow-950 hover:bg-yellow-500 text-base font-bold shadow-lg">
                  {primaryText}
                </Button>
              </Link>
              {showWhatsApp && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto px-8 gap-2 border-green-700 text-white hover:bg-green-800 text-base font-medium"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="h-5 w-5 text-green-300" />
                  {secondaryText}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
