import * as React from "react"
import { Link } from "react-router-dom"
import { X, Sparkles, ArrowRight } from "lucide-react"
import { useAppStore } from "@/src/store"

export function TopAnnouncementBar() {
  const { data } = useAppStore();
  const banner = data?.announcement || {
    enabled: true,
    sticker: "ADMISSIONS OPEN",
    message: "Registration for 2026 Cohort is now open! Limited seats available.",
    ctaText: "Enroll Today",
    ctaUrl: "/enrollment",
    bgColor: "bg-green-900", // bg-green-900, bg-yellow-500, bg-gray-900
    dismissible: true
  };

  const [dismissed, setDismissed] = React.useState(false);

  if (!banner.enabled || dismissed) return null;

  return (
    <div className={`relative z-50 text-white text-xs sm:text-sm py-2 px-4 ${banner.bgColor || 'bg-green-900'} border-b border-green-800 transition-all`}>
      <div className="container mx-auto max-w-7xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 mx-auto text-center flex-wrap justify-center">
          {banner.sticker && (
            <span className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-950 font-extrabold text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              <Sparkles className="h-3 w-3" />
              {banner.sticker}
            </span>
          )}
          <span className="font-medium text-green-50">
            {banner.message}
          </span>
          {banner.ctaText && banner.ctaUrl && (
            <Link
              to={banner.ctaUrl}
              className="inline-flex items-center gap-1 font-bold text-yellow-300 hover:text-white underline underline-offset-2 transition-colors ml-1"
            >
              {banner.ctaText}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {banner.dismissible && (
          <button
            onClick={() => setDismissed(true)}
            className="text-green-200 hover:text-white p-1 rounded transition-colors shrink-0"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
