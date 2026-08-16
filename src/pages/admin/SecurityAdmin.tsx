import React, { useState } from 'react';
import { useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Lock, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/src/lib/supabase';

export function SecurityAdmin() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const { token } = useAuthStore();

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    setIsSaving(true);
    try {
      // In a pure frontend app, verify the current password against Supabase
      const { data, error } = await supabase.from('app_data').select('*').eq('section_key', 'admin').single();
      
      let isValid = false;
      if (!error && data && data.section_data?.password) {
         isValid = (currentPassword === data.section_data.password);
      } else {
         isValid = (currentPassword === 'admin123'); // fallback
      }

      if (!isValid) {
        toast.error('Incorrect current password');
        setIsSaving(false);
        return;
      }

      // Update password
      await supabase.from('app_data').upsert({
        section_key: 'admin',
        section_data: { ...(data?.section_data || {}), password: newPassword }
      }, { onConflict: 'section_key' });

      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="h-8 w-8 text-green-700" />
        <h1 className="text-3xl font-bold text-gray-900">Security Settings</h1>
      </div>

      <Card className="p-6 max-w-2xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-4">Change Admin Password</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <Input 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <Input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <Input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={isSaving || !currentPassword || !newPassword || !confirmPassword}
              className="bg-green-700 hover:bg-green-800"
            >
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Update Password
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
