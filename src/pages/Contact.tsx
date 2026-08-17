import * as React from "react"
import { motion } from "motion/react"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Textarea } from "@/src/components/ui/Textarea"
import { Accordion } from "@/src/components/ui/Accordion"
import { Card } from "@/src/components/ui/Card"
import { useAppStore } from "@/src/store"

export function Contact() {
  const { data } = useAppStore();
  const siteData = data?.site || {};
  const contactData = data?.contact || {};
  const defaultFaqs = [
    {
      question: 'Do I need prior coding experience to join?',
      answer: 'No prior coding experience is required for our beginner programs! We start with the core fundamentals and gradually advance through practical, project-based exercises with live instructor support.'
    },
    {
      question: 'What are the class schedules and learning modes?',
      answer: 'We offer flexible physical classroom schedules including Weekday morning/afternoon batches and Weekend intensive batches to accommodate both full-time students and working professionals.'
    },
    {
      question: 'Are the training sessions strictly in-person?',
      answer: 'Yes! Green Codes Academy is an immersive, physical tech academy with high-speed internet, continuous power supply, and modern workstations to ensure hands-on, distraction-free learning.'
    },
    {
      question: 'Do I get a certificate upon course completion?',
      answer: 'Yes, all students who successfully complete their coursework and capstone projects receive an accredited Certificate of Completion from Green Codes Academy.'
    }
  ];

  const rawFaqs = data?.faqs || defaultFaqs;
  const faqs = rawFaqs.filter((f: any) => f.published !== false);
  
  const heading = contactData.heading || "Get in Touch";
  const subheading = contactData.subheading || "Have questions? We'd love to hear from you. Send us a message or visit our physical campus.";

  const phone = siteData.whatsapp || "+234 903 088 2127";
  const email = siteData.email || "greencodesacademy@gmail.com";
  const address = siteData.address || "123 Tech Avenue, Lagos, Nigeria.";

  const cleanPhone = phone.replace(/\s/g, '');

  const [formState, setFormState] = React.useState({ status: "idle" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState({ status: "submitting" })
    setTimeout(() => {
      setFormState({ status: "success" })
    }, 1000)
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello Green Codes Academy, I would like to learn more about your programs and enrollment.")
    window.open(`https://wa.me/${cleanPhone.replace('+', '')}?text=${message}`, "_blank")
  }

  return (
    <>
      <section className="bg-green-950 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {heading}
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
              {subheading}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Contact Info & Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full shrink-0">
                    <MapPin className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">School Address</h4>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full shrink-0">
                    <Phone className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Phone & WhatsApp</h4>
                    <a href={`tel:${cleanPhone}`} className="text-gray-600 hover:text-green-700 block">{phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full shrink-0">
                    <Mail className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Email Address</h4>
                    <a href={`mailto:${email}`} className="text-gray-600 hover:text-green-700 block">{email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full shrink-0">
                    <Clock className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Opening Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a]"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="h-5 w-5" />
                  CHAT ON WHATSAPP
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                {formState.status === "success" ? (
                  <div className="bg-green-50 text-green-800 p-6 rounded-xl text-center">
                    <h3 className="font-bold text-lg mb-2">Message Sent!</h3>
                    <p>Thank you for contacting us. We will get back to you shortly.</p>
                    <Button 
                      variant="outline" 
                      className="mt-6"
                      onClick={() => setFormState({ status: "idle" })}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <Input id="name" required placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <Input id="email" type="email" required placeholder="john@example.com" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <Input id="subject" required placeholder="How can we help?" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <Textarea id="message" required placeholder="Write your message here..." />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={formState.status === "submitting"}
                    >
                      {formState.status === "submitting" ? "Sending..." : "SEND MESSAGE"}
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>

          {/* Map Placeholder */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Locate Us</h2>
            <div className="w-full h-[400px] bg-gray-200 rounded-3xl overflow-hidden flex items-center justify-center relative shadow-inner border border-gray-300">
               <div className="text-center p-6 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-gray-100 max-w-sm mx-auto z-10">
                  <MapPin className="h-10 w-10 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Green Codes Academy Campus</h3>
                  <p className="text-gray-600 text-sm">{address}</p>
                  <p className="text-xs text-gray-400 mt-4">(Interactive Map Placeholder)</p>
               </div>
               {/* Decorative background grid for the placeholder */}
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#15803d 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            </div>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Find quick answers to common questions about our academy.</p>
            </div>
            {faqs.length > 0 ? (
              <Accordion items={faqs} />
            ) : (
              <div className="text-center text-gray-500 py-8">No FAQs available at the moment.</div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
