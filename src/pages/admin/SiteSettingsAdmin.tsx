import React, { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

export function SiteSettingsAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  const [form, setForm] = useState(data?.site || {});
  const [aboutForm, setAboutForm] = useState(data?.about || {});
  const [campusForm, setCampusForm] = useState(data?.campus || {});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.site) setForm(data.site);
    if (data?.about) setAboutForm(data.about);
    if (data?.campus) setCampusForm(data.campus);
  }, [data]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('site', form, token!);
      await updateSection('about', aboutForm, token!);
      await updateSection('campus', campusForm, token!);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
        <p className="text-gray-600 mt-1">Manage global website settings, contact information, and footer content.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">General & Contact Info</h3>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <Input 
                  value={form.name || ''} 
                  onChange={e => setForm({...form, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input 
                  type="email"
                  value={form.email || ''} 
                  onChange={e => setForm({...form, email: e.target.value})}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Logo URL</label>
                <Input 
                  value={form.logo || ''} 
                  onChange={e => setForm({...form, logo: e.target.value})}
                  placeholder="https://i.ibb.co/..."
                />
                {form.logo && <img src={form.logo} alt="Logo Preview" className="mt-2 h-10 w-auto object-contain rounded border" />}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                <Input 
                  value={form.whatsapp || ''} 
                  onChange={e => setForm({...form, whatsapp: e.target.value})}
                  required
                  placeholder="+2349030882127"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School Address</label>
                <Input 
                  value={form.address || ''} 
                  onChange={e => setForm({...form, address: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Footer Content</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Footer Description</label>
              <Textarea 
                value={form.footerDescription || ''} 
                onChange={e => setForm({...form, footerDescription: e.target.value})}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Copyright Text</label>
              <Input 
                value={form.copyright || ''} 
                onChange={e => setForm({...form, copyright: e.target.value})}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Social Media Links</h3>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                <Input 
                  value={form.facebook || ''} 
                  onChange={e => setForm({...form, facebook: e.target.value})}
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
                <Input 
                  value={form.twitter || ''} 
                  onChange={e => setForm({...form, twitter: e.target.value})}
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                <Input 
                  value={form.instagram || ''} 
                  onChange={e => setForm({...form, instagram: e.target.value})}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <Input 
                  value={form.linkedin || ''} 
                  onChange={e => setForm({...form, linkedin: e.target.value})}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Global Images</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">About Page Image</h4>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (e.g. https://i.ibb.co/...)</label>
              <Input 
                value={aboutForm.image || ''} 
                onChange={e => setAboutForm({...aboutForm, image: e.target.value})}
              />
              {aboutForm.image && <img src={aboutForm.image} alt="Preview" className="mt-2 h-32 w-auto object-cover rounded shadow-sm border" />}
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="font-semibold text-gray-800 mb-2">Campus Images</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image 1 URL</label>
                  <Input 
                    value={campusForm.image1 || ''} 
                    onChange={e => setCampusForm({...campusForm, image1: e.target.value})}
                  />
                  {campusForm.image1 && <img src={campusForm.image1} alt="Preview" className="mt-2 h-24 w-full object-cover rounded shadow-sm border" />}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image 2 URL</label>
                  <Input 
                    value={campusForm.image2 || ''} 
                    onChange={e => setCampusForm({...campusForm, image2: e.target.value})}
                  />
                  {campusForm.image2 && <img src={campusForm.image2} alt="Preview" className="mt-2 h-24 w-full object-cover rounded shadow-sm border" />}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image 3 URL</label>
                  <Input 
                    value={campusForm.image3 || ''} 
                    onChange={e => setCampusForm({...campusForm, image3: e.target.value})}
                  />
                  {campusForm.image3 && <img src={campusForm.image3} alt="Preview" className="mt-2 h-24 w-full object-cover rounded shadow-sm border" />}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => {
            setForm(data?.site || {});
            setAboutForm(data?.about || {});
            setCampusForm(data?.campus || {});
          }}>Reset</Button>
          <Button type="submit" className="bg-green-700 hover:bg-green-800 gap-2" disabled={isSaving}>
            <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}