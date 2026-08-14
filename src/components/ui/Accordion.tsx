import * as React from "react"
import { cn } from "@/src/lib/utils"
import { ChevronDown } from "lucide-react"

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
          <button
            className="w-full flex justify-between items-center p-5 text-left font-semibold text-lg text-green-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-inset transition-colors hover:bg-gray-50"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            {item.question}
            <ChevronDown
              className={cn("h-5 w-5 text-green-700 transition-transform duration-300", {
                "transform rotate-180": openIndex === index,
              })}
            />
          </button>
          <div
            className={cn(
              "grid transition-all duration-300 ease-in-out",
              openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="p-5 pt-0 text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
