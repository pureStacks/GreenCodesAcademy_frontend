import React, { useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Star } from 'lucide-react';
import { useAppStore } from '@/src/store';
import toast from 'react-hot-toast';

export function ReviewForm() {
  const { addTestimonial } = useAppStore();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    program: '',
    text: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.program || !form.text) {
      toast.error('Please fill out all fields');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await addTestimonial({ ...form, rating });
      toast.success('Review submitted successfully! It will appear once approved.');
      setForm({ name: '', program: '', text: '' });
      setRating(5);
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto mt-16">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Share Your Experience</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <Input 
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Program Attended</label>
            <Input 
              value={form.program}
              onChange={(e) => setForm({...form, program: e.target.value})}
              placeholder="e.g. Frontend Web Development"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star 
                  className={`h-8 w-8 ${star <= (hoverRating || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
          <Textarea 
            value={form.text}
            onChange={(e) => setForm({...form, text: e.target.value})}
            placeholder="Tell us about your experience..."
            rows={4}
            required
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  );
}
