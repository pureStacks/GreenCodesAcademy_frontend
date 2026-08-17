import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useAppStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Link } from 'react-router-dom';

export function FAQSection() {
  const { data } = useAppStore();
  const rawFaqs = data?.faqs || [
    {
      id: '1',
      question: 'Do I need prior coding experience to join?',
      answer: 'No prior coding experience is required for our beginner programs! We start with the core fundamentals and gradually advance through practical, project-based exercises with live instructor support.',
      published: true
    },
    {
      id: '2',
      question: 'What are the class schedules and learning modes?',
      answer: 'We offer flexible physical classroom schedules including Weekday morning/afternoon batches and Weekend intensive batches to accommodate both full-time students and working professionals.',
      published: true
    },
    {
      id: '3',
      question: 'Are the training sessions strictly in-person?',
      answer: 'Yes! Green Codes Academy is an immersive, physical tech academy with high-speed internet, continuous power supply, and modern workstations to ensure hands-on, distraction-free learning.',
      published: true
    },
    {
      id: '4',
      question: 'Do I get a certificate upon course completion?',
      answer: 'Yes, all students who successfully complete their coursework and capstone projects receive an accredited Certificate of Completion from Green Codes Academy.',
      published: true
    },
    {
      id: '5',
      question: 'How do I pay and are installment payment plans available?',
      answer: 'Yes, we offer flexible installment payment options to make learning accessible. You can pay via direct bank transfer or visit our campus for payment inquiries.',
      published: true
    }
  ];

  // Filter for published FAQs (if published is true or undefined)
  const faqs = rawFaqs.filter((f: any) => f.published !== false);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const siteData = data?.site || {};
  const cleanPhone = (siteData.whatsapp || "+234 903 088 2127").replace(/\s/g, '');

  return (
    <section className="py-20 bg-gray-50/70 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-100/80 text-green-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="h-4 w-4 text-green-700" />
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Everything you need to know about joining Green Codes Academy, learning paths, and admissions.
          </p>
        </motion.div>

        {faqs.length > 0 ? (
          <div className="space-y-4 max-w-3xl mx-auto mb-12">
            {faqs.map((faq: any, index: number) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={faq.id || index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-green-300 bg-white shadow-md' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left font-semibold text-gray-900 text-base md:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 transition-colors select-none"
                    aria-expanded={isOpen}
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span className={`p-1.5 rounded-full shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-green-100 text-green-700 rotate-180' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <ChevronDown className="h-5 w-5" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 md:px-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 text-sm md:text-base">
                      {faq.answer}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-dashed max-w-xl mx-auto mb-12">
            No FAQs currently published.
          </div>
        )}

        {/* Quick assistance card */}
        <div className="bg-green-900 text-white rounded-3xl p-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-white mb-1">Still have questions?</h3>
            <p className="text-green-200 text-sm">We are here to help guide your tech career journey.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href={`https://wa.me/${cleanPhone.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a] px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <Link to="/contact">
              <Button variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white text-sm">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
