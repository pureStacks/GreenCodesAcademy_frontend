import React, { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

export function AboutAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  const [form, setForm] = useState(data?.about || {});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.about) setForm(data.about);
  }, [data]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('about', form, token!);
      toast.success('About page content updated successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">About Page Content</h2>
        <p className="text-gray-600 mt-1">Manage the content, mission, values, and imagery for the About page.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Hero & Introduction</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <Input 
                value={form.heading || ''} 
                onChange={e => setForm({...form, heading: e.target.value})}
                placeholder="e.g. LEARN. BUILD. CREATE. GROW."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description Paragraph 1</label>
              <Textarea 
                value={form.description1 || ''} 
                onChange={e => setForm({...form, description1: e.target.value})}
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description Paragraph 2</label>
              <Textarea 
                value={form.description2 || ''} 
                onChange={e => setForm({...form, description2: e.target.value})}
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Page Image URL</label>
              <Input 
                value={form.image || ''} 
                onChange={e => setForm({...form, image: e.target.value})}
                placeholder="https://i.ibb.co/..."
              />
              {form.image && <img src={form.image} alt="Preview" className="mt-2 h-32 w-auto object-cover rounded shadow-sm border" />}
            </div>
          </div>
        </Card>
        
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Mission & Values</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Our Mission Statement</label>
              <Textarea 
                value={form.mission || ''} 
                onChange={e => setForm({...form, mission: e.target.value})}
                rows={4}
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 pt-4">
              <div className="space-y-3 p-4 border rounded-xl bg-gray-50">
                <h4 className="font-semibold text-gray-700">Value 1</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                  <Input value={form.value1Title || ''} onChange={e => setForm({...form, value1Title: e.target.value})} placeholder="Goal-Oriented" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <Textarea value={form.value1Desc || ''} onChange={e => setForm({...form, value1Desc: e.target.value})} rows={2} />
                </div>
              </div>
              
              <div className="space-y-3 p-4 border rounded-xl bg-gray-50">
                <h4 className="font-semibold text-gray-700">Value 2</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                  <Input value={form.value2Title || ''} onChange={e => setForm({...form, value2Title: e.target.value})} placeholder="Project-Based" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <Textarea value={form.value2Desc || ''} onChange={e => setForm({...form, value2Desc: e.target.value})} rows={2} />
                </div>
              </div>
              
              <div className="space-y-3 p-4 border rounded-xl bg-gray-50">
                <h4 className="font-semibold text-gray-700">Value 3</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                  <Input value={form.value3Title || ''} onChange={e => setForm({...form, value3Title: e.target.value})} placeholder="Community" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <Textarea value={form.value3Desc || ''} onChange={e => setForm({...form, value3Desc: e.target.value})} rows={2} />
                </div>
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
