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
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Hero Section</h3>
          
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
                placeholder="Brief description under the main heading..."
                rows={3}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary CTA Text</label>
                <Input 
                  value={form.heroCtaText || ''} 
                  onChange={e => setForm({...form, heroCtaText: e.target.value})}
                  placeholder="e.g. ENROLL NOW"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
                <Input 
                  value={form.heroImage || ''} 
                  onChange={e => setForm({...form, heroImage: e.target.value})}
                  placeholder="https://i.ibb.co/..."
                />
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Statistics Grid</h3>
          <p className="text-sm text-gray-500">Update the 4 statistics shown on the home page.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 p-4 border rounded-xl bg-gray-50">
              <h4 className="font-semibold text-gray-700">Statistic 1 (Top Left)</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <Input value={form.stat1Value || ''} onChange={e => setForm({...form, stat1Value: e.target.value})} placeholder="e.g. 500+" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <Input value={form.stat1Label || ''} onChange={e => setForm({...form, stat1Label: e.target.value})} placeholder="e.g. Students Trained" />
              </div>
            </div>
            
            <div className="space-y-4 p-4 border rounded-xl bg-gray-50">
              <h4 className="font-semibold text-gray-700">Statistic 2 (Bottom Left)</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <Input value={form.stat2Value || ''} onChange={e => setForm({...form, stat2Value: e.target.value})} placeholder="e.g. 95%" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <Input value={form.stat2Label || ''} onChange={e => setForm({...form, stat2Label: e.target.value})} placeholder="e.g. Success Rate" />
              </div>
            </div>
            
            <div className="space-y-4 p-4 border rounded-xl bg-gray-50">
              <h4 className="font-semibold text-gray-700">Statistic 3 (Top Right)</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <Input value={form.stat3Value || ''} onChange={e => setForm({...form, stat3Value: e.target.value})} placeholder="e.g. 20+" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <Input value={form.stat3Label || ''} onChange={e => setForm({...form, stat3Label: e.target.value})} placeholder="e.g. Practical Projects" />
              </div>
            </div>
            
            <div className="space-y-4 p-4 border rounded-xl bg-gray-50">
              <h4 className="font-semibold text-gray-700">Statistic 4 (Bottom Right)</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <Input value={form.stat4Value || ''} onChange={e => setForm({...form, stat4Value: e.target.value})} placeholder="e.g. 10+" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <Input value={form.stat4Label || ''} onChange={e => setForm({...form, stat4Label: e.target.value})} placeholder="e.g. Tech Programs" />
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
