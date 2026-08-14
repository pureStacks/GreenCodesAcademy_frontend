import * as React from "react"
import { motion } from "motion/react"
import { useForm } from "react-hook-form"
import { CheckCircle2, ChevronRight } from "lucide-react"
import { Button } from "@/src/components/ui/Button"
import { Input } from "@/src/components/ui/Input"
import { Textarea } from "@/src/components/ui/Textarea"
import { Select } from "@/src/components/ui/Select"
import { Card } from "@/src/components/ui/Card"
import { useAppStore } from "@/src/store"
import toast from "react-hot-toast"

type EnrollmentFormInputs = {
  fullName: string
  email: string
  phone: string
  program: string
  schedule: string
  message: string
}

export function Enrollment() {
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const { data } = useAppStore()
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<EnrollmentFormInputs>()
  const programs = data?.programs?.filter((p: any) => p.published) || []

  const onSubmit = async (formData: EnrollmentFormInputs) => {
    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to submit');
      
      setIsSubmitted(true);
      toast.success('Enrollment submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit enrollment. Please try again.');
    }
  }

  const steps = [
    { title: "Choose Your Program", desc: "Select the program that matches your goals." },
    { title: "Complete Enrollment", desc: "Provide the required enrollment information." },
    { title: "Confirm Your Slot", desc: "Receive confirmation and training information." },
    { title: "Start Learning", desc: "Attend your classes and begin building practical skills." }
  ]

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
              Enrollment Form
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto">
              Take the first step towards your career in technology. Fill out the form below to secure your place.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="sticky top-32">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center mt-1">
                        <div className="h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        {index !== steps.length - 1 && (
                          <div className="w-0.5 h-full bg-green-100 mt-2"></div>
                        )}
                      </div>
                      <div className="pb-6">
                        <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 order-1 lg:order-2">
              <Card className="p-6 sm:p-10">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Received!</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                      Thank you for applying to Green Codes Academy. We have received your details and will contact you via email/WhatsApp shortly with the next steps.
                    </p>
                    <Button onClick={() => { setIsSubmitted(false); reset(); }}>Submit Another Application</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <Input 
                          {...register("fullName", { required: "Full name is required" })}
                          placeholder="e.g. John Doe"
                          className={errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <Input 
                          type="email"
                          {...register("email", { 
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address"
                            }
                          })}
                          placeholder="e.g. john@example.com"
                          className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone / WhatsApp Number *</label>
                        <Input 
                          type="tel"
                          {...register("phone", { 
                            required: "Phone number is required",
                            minLength: { value: 10, message: "Phone number is too short" }
                          })}
                          placeholder="e.g. 09012345678"
                          className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Program / Course *</label>
                        <div className="relative">
                          <Select 
                            {...register("program", { required: "Please select a program" })}
                            className={errors.program ? "border-red-500 focus-visible:ring-red-500" : ""}
                            defaultValue=""
                          >
                            <option value="" disabled>Select a program...</option>
                            {programs.map((p: any) => (
                              <option key={p.id} value={p.name}>{p.name}</option>
                            ))}
                            {programs.length === 0 && (
                              <option value="web-dev">Web Development</option>
                            )}
                          </Select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90 pointer-events-none" />
                        </div>
                        {errors.program && <p className="text-red-500 text-xs mt-1">{errors.program.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Training Schedule *</label>
                      <div className="relative">
                        <Select 
                          {...register("schedule", { required: "Please select a schedule" })}
                          className={errors.schedule ? "border-red-500 focus-visible:ring-red-500" : ""}
                          defaultValue=""
                        >
                          <option value="" disabled>Select a schedule...</option>
                          <option value="weekday-morning">Weekday Morning (9am - 12pm)</option>
                          <option value="weekday-afternoon">Weekday Afternoon (1pm - 4pm)</option>
                          <option value="weekend">Weekend (Saturdays 10am - 2pm)</option>
                        </Select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90 pointer-events-none" />
                      </div>
                      {errors.schedule && <p className="text-red-500 text-xs mt-1">{errors.schedule.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message (Optional)</label>
                      <Textarea 
                        {...register("message")}
                        placeholder="Tell us about your goals or ask any specific questions..."
                      />
                    </div>

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full text-lg h-14"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "PROCESSING..." : "ENROLL NOW"}
                      </Button>
                      <p className="text-center text-xs text-gray-500 mt-4">
                        By submitting this form, you agree to our privacy policy and terms. Your information will be sent securely to Green Codes Academy.
                      </p>
                    </div>
                  </form>
                )}
              </Card>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
