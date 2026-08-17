import React, { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

export function PopupsAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  
  const [waForm, setWaForm] = useState<any>({
    enabled: true,
    heading: "NEED HELP WITH ENROLLMENT?",
    description: "Have questions about our programs, fees, schedule, or enrollment? Chat with us on WhatsApp.",
    buttonText: "CHAT ON WHATSAPP",
    prefilledMessage: "Hello Green Codes Academy, I would like to learn more about enrollment and your available programs."
  });

  const [notifForm, setNotifForm] = useState<any>({
    enabled: true
  });
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.whatsappPopup) setWaForm(data.whatsappPopup);
    if (data?.notifications) setNotifForm(data.notifications);
  }, [data]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('whatsappPopup', waForm, token!);
      await updateSection('notifications', notifForm, token!);
      toast.success('Popups updated successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Popups & Notifications</h2>
        <p className="text-gray-600 mt-1">Manage floating interactive elements like the WhatsApp chat and real-time enrollment alerts.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-4 border-b pb-4">
            <h3 className="text-lg font-bold text-gray-900 flex-1">WhatsApp Chat Popup</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={waForm.enabled} 
                onChange={e => setWaForm({...waForm, enabled: e.target.checked})}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="font-medium text-gray-700">Enable</span>
            </label>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <Input 
                value={waForm.heading || ''} 
                onChange={e => setWaForm({...waForm, heading: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea 
                value={waForm.description || ''} 
                onChange={e => setWaForm({...waForm, description: e.target.value})}
                rows={2}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <Input 
                  value={waForm.buttonText || ''} 
                  onChange={e => setWaForm({...waForm, buttonText: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pre-filled WhatsApp Message</label>
                <Input 
                  value={waForm.prefilledMessage || ''} 
                  onChange={e => setWaForm({...waForm, prefilledMessage: e.target.value})}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-4 border-b pb-4">
            <h3 className="text-lg font-bold text-gray-900 flex-1">Live Enrollment Notifications</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifForm.enabled} 
                onChange={e => setNotifForm({...notifForm, enabled: e.target.checked})}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="font-medium text-gray-700">Enable</span>
            </label>
          </div>
          <p className="text-sm text-gray-600">
            When enabled, a small notification will periodically pop up showing recent, <strong>verified</strong> student enrollments from your database to build social proof.
          </p>
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
