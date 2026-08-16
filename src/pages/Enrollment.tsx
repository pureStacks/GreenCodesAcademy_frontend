import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export function Enrollment() {
  const { data, addEnrollment } = useAppStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const programs = data?.programs?.filter((p: any) => p.published) || [];

  const onSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      await addEnrollment(formData);
      setIsSuccess(true);
      toast.success('Enrollment submitted successfully!');
      reset();
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="py-20 bg-gray-50 min-h-[60vh] flex items-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle2 className="mx-auto h-24 w-24 text-green-500 mb-8" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Received!</h2>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for applying to Green Codes Academy. Our admissions team will review your application and contact you within 48 hours.
          </p>
          <Button onClick={() => setIsSuccess(false)} className="bg-green-700 hover:bg-green-800 text-lg h-12 px-8">
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-950 mb-4">
            Begin Your Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take the first step towards your tech career. Fill out the application form below.
          </p>
        </div>

        <Card className="p-8 md:p-12 shadow-xl border-t-4 border-t-yellow-400">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Form structure same as before, simplified for this rewrite to keep it working */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <Input {...register('firstName', { required: true })} />
                {errors.firstName && <span className="text-red-500 text-sm">Required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <Input {...register('lastName', { required: true })} />
                {errors.lastName && <span className="text-red-500 text-sm">Required</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <Input type="email" {...register('email', { required: true })} />
                {errors.email && <span className="text-red-500 text-sm">Required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <Input type="tel" {...register('phone', { required: true })} />
                {errors.phone && <span className="text-red-500 text-sm">Required</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Program</label>
              <select 
                className="w-full flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                {...register('program', { required: true })}
              >
                <option value="">Select a program...</option>
                {programs.map((p: any) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
              {errors.program && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join this program?</label>
              <textarea 
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[120px]"
                {...register('motivation', { required: true })}
              ></textarea>
              {errors.motivation && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Button 
                type="submit" 
                className="w-full h-14 text-lg bg-green-700 hover:bg-green-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
