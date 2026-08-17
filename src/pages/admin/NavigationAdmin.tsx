import React, { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { ConfirmModal } from '@/src/components/ui/ConfirmModal';
import toast from 'react-hot-toast';
import { Save, Plus, Trash } from 'lucide-react';

export function NavigationAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  
  const [links, setLinks] = useState<any[]>(data?.navigation?.links || [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Why Choose Us", path: "/why-choose-us" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ]);
  
  const [cta, setCta] = useState<any>(data?.navigation?.cta || { text: 'ENROLL NOW', url: '/enrollment' });
  const [isSaving, setIsSaving] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (data?.navigation?.links) setLinks(data.navigation.links);
    if (data?.navigation?.cta) setCta(data.navigation.cta);
  }, [data]);

  const handleSave = async (e?: React.FormEvent, customLinks?: any[]) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('navigation', { links: customLinks || links, cta }, token!);
      toast.success('Navigation updated successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const addLink = () => {
    setLinks([...links, { name: '', path: '' }]);
  };

  const updateLink = (index: number, field: string, value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const confirmRemoveLink = async () => {
    if (deletingIndex === null) return;
    const newLinks = [...links];
    newLinks.splice(deletingIndex, 1);
    setLinks(newLinks);
    setDeletingIndex(null);
    await handleSave(undefined, newLinks);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Navigation Menu</h2>
        <p className="text-gray-600 mt-1">Manage header and footer navigation links and call-to-action button.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 space-y-6">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-bold text-gray-900">Menu Links</h3>
            <Button type="button" onClick={addLink} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add Link
            </Button>
          </div>
          
          <div className="space-y-4">
            {links.map((link, index) => (
              <div key={index} className="flex gap-4 items-end bg-gray-50 p-4 rounded-xl border">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Display Name</label>
                  <Input 
                    value={link.name} 
                    onChange={e => updateLink(index, 'name', e.target.value)}
                    placeholder="e.g. Home"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">URL Path</label>
                  <Input 
                    value={link.path} 
                    onChange={e => updateLink(index, 'path', e.target.value)}
                    placeholder="e.g. /about"
                  />
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                  onClick={() => setDeletingIndex(index)}
                  title="Remove link"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {links.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No navigation links configured.</p>
            )}
          </div>
        </Card>
        
        <Card className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Call to Action (CTA) Button</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <Input 
                value={cta.text} 
                onChange={e => setCta({...cta, text: e.target.value})}
                placeholder="e.g. ENROLL NOW"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination URL</label>
              <Input 
                value={cta.url} 
                onChange={e => setCta({...cta, url: e.target.value})}
                placeholder="e.g. /enrollment"
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

      <ConfirmModal
        isOpen={deletingIndex !== null}
        title="Delete Navigation Link"
        message={`Are you sure you want to remove the navigation link "${links[deletingIndex ?? 0]?.name || 'this item'}"?`}
        confirmText="Remove Link"
        isLoading={isSaving}
        onConfirm={confirmRemoveLink}
        onClose={() => setDeletingIndex(null)}
      />
    </div>
  );
}
