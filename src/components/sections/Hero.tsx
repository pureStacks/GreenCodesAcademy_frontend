import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { motion } from "motion/react"
import { useAppStore } from "@/src/store"

export function Hero() {
  const { data } = useAppStore();
  const homeData = data?.home || {};

  const badgeEnabled = homeData.heroBadgeEnabled !== false;
  const badgeText = homeData.heroBadge || "Registration for 2026 Cohort is Open";
  const heading = homeData.heroHeading || "BUILD THE SKILLS OF TOMORROW, TODAY.";
  const subheading = homeData.heroSubheading || "Empowering students with practical technology, coding, and digital skills for a smarter future. Join the premier physical tech academy in Nigeria.";
  const ctaText = homeData.heroCtaText || "ENROLL NOW";
  const ctaUrl = homeData.heroCtaUrl || "/enrollment";
  const secondaryText = homeData.heroSecondaryText || "LEARN ABOUT OUR PROGRAMS";
  const secondaryUrl = homeData.heroSecondaryUrl || "/programs";
  const image = homeData.heroImage || "https://i.ibb.co/B2jpgXwv/test.jpg";
  const imageCaption = homeData.heroImageCaption || "Students collaborating and coding in a modern classroom";
  
  const features = homeData.heroFeatures || [
    "Practical Learning",
    "Experienced Instructors",
    "Career-Focused Training"
  ];

  const statEnabled = homeData.heroStatEnabled !== false;
  const statValue = homeData.heroStatValue || "95%";
  const statLabel = homeData.heroStatLabel || "Student Satisfaction";

  // Split heading to emphasize the last word
  const headingWords = heading.trim().split(' ');
  const lastWord = headingWords.length > 1 ? headingWords.pop() : '';
  const firstPart = headingWords.join(' ');

  return (
    <section className="relative bg-white pt-10 pb-16 lg:pt-20 lg:pb-28 overflow-hidden">
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
            {badgeEnabled && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-50 text-green-800 font-bold text-xs sm:text-sm mb-6 border border-green-200 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {badgeText}
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.12] mb-6 tracking-tight">
              {firstPart} {lastWord && <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">{lastWord}</span>}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              {subheading}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link to={ctaUrl} tabIndex={-1}>
                <Button size="lg" className="w-full sm:w-auto px-8 shadow-lg shadow-green-700/20 text-base">
                  {ctaText}
                </Button>
              </Link>
              {secondaryText && (
                <Link to={secondaryUrl} tabIndex={-1}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 gap-2 bg-white text-base">
                    {secondaryText}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm font-medium text-gray-700">
              {features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-50/80 px-3 py-1.5 rounded-lg border border-gray-100">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-100 border border-gray-200">
              <img 
                src={image} 
                alt={imageCaption} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            {/* Floating Satisfaction / Metric Sticker */}
            {statEnabled && (
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 sm:gap-4 animate-bounce-slow">
                <div className="bg-yellow-400 p-2.5 sm:p-3 rounded-xl shadow-xs">
                  <span className="font-extrabold text-yellow-950 text-lg sm:text-xl">{statValue}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 leading-tight text-xs sm:text-sm">{statLabel}</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
