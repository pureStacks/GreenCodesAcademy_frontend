import React, { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

export function HomeAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  const [form, setForm] = useState(data?.home || {});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.home) setForm(data.home);
  }, [data]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('home', form, token!);
      toast.success('Home page content updated successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Home Page Content</h2>
        <p className="text-gray-600 mt-1">Manage the hero section, text, and calls to action on the main page.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Heading</label>
              <Input 
                value={form.heroHeading || ''} 
                onChange={e => setForm({...form, heroHeading: e.target.value})}
                placeholder="e.g. BUILD THE SKILLS OF TOMORROW, TODAY."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subheading</label>
              <Textarea 
                value={form.heroSubheading || ''} 
                onChange={e => setForm({...form, heroSubheading: e.target.value})}
                placeholder="Brief description below the heading..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary CTA Text</label>
                <Input 
                  value={form.heroCtaText || ''} 
                  onChange={e => setForm({...form, heroCtaText: e.target.value})}
                  placeholder="e.g. ENROLL NOW"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL (from ImgBB)</label>
                <Input 
                  value={form.heroImage || ''} 
                  onChange={e => setForm({...form, heroImage: e.target.value})}
                  placeholder="https://i.ibb.co/..."
                />
              </div>
            </div>
            {form.heroImage && (
              <div className="mt-4 border rounded-xl overflow-hidden max-w-sm">
                <img src={form.heroImage} alt="Hero preview" className="w-full h-auto" />
              </div>
            )}
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => setForm(data?.home || {})}>Reset to Saved</Button>
          <Button type="submit" className="bg-green-700 hover:bg-green-800 gap-2" disabled={isSaving}>
            <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}