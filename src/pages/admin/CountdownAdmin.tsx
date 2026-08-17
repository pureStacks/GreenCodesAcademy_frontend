import React, { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

export function CountdownAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  
  const [form, setForm] = useState<any>({
    enabled: true,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    badge: "Enrollment is Now Open",
    heading: "Secure your place in the next training cohort.",
    description: "Spaces are limited. Register today to begin your journey in tech.",
    ctaText: "ENROLL NOW",
    ctaUrl: "/enrollment",
    expiredMessage: "Enrollment is currently closed."
  });
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.countdown) setForm(data.countdown);
  }, [data]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('countdown', form, token!);
      toast.success('Countdown updated successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Countdown Timer</h2>
        <p className="text-gray-600 mt-1">Manage the countdown section displayed on the home page.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-4 border-b pb-4">
            <h3 className="text-lg font-bold text-gray-900 flex-1">Timer Configuration</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={form.enabled} 
                onChange={e => setForm({...form, enabled: e.target.checked})}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="font-medium text-gray-700">Enable Countdown</span>
            </label>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Deadline (Date & Time)</label>
              <Input 
                type="datetime-local"
                value={form.deadline ? new Date(form.deadline).toISOString().slice(0, 16) : ''} 
                onChange={e => setForm({...form, deadline: new Date(e.target.value).toISOString()})}
                required
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text (Optional)</label>
                <Input 
                  value={form.badge || ''} 
                  onChange={e => setForm({...form, badge: e.target.value})}
                  placeholder="e.g. Enrollment Open"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expired Message</label>
                <Input 
                  value={form.expiredMessage || ''} 
                  onChange={e => setForm({...form, expiredMessage: e.target.value})}
                  placeholder="Message to show when time runs out"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <Input 
                value={form.heading || ''} 
                onChange={e => setForm({...form, heading: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea 
                value={form.description || ''} 
                onChange={e => setForm({...form, description: e.target.value})}
                rows={2}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 border-t pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                <Input 
                  value={form.ctaText || ''} 
                  onChange={e => setForm({...form, ctaText: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Destination URL</label>
                <Input 
                  value={form.ctaUrl || ''} 
                  onChange={e => setForm({...form, ctaUrl: e.target.value})}
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSaving} className="px-8">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
