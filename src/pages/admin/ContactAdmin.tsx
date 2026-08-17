import React, { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

export function ContactAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  const [form, setForm] = useState(data?.contact || {});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.contact) setForm(data.contact);
  }, [data]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('contact', form, token!);
      toast.success('Contact page content updated successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Contact Page Content</h2>
        <p className="text-gray-600 mt-1">Manage the hero content on the Contact page.</p>
        <p className="text-sm text-yellow-600 mt-2 font-medium">Note: Global contact info (Email, Phone, Address) is managed in Global Settings.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Hero Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <Input 
                value={form.heading || ''} 
                onChange={e => setForm({...form, heading: e.target.value})}
                placeholder="e.g. Get in Touch"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
              <Textarea 
                value={form.subheading || ''} 
                onChange={e => setForm({...form, subheading: e.target.value})}
                placeholder="e.g. Have questions? We'd love to hear from you..."
                rows={3}
              />
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
