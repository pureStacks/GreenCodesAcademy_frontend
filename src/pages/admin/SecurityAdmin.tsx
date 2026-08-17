import React, { useState } from 'react';
import { useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Lock, Save, Loader2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/src/lib/supabase';

export function SecurityAdmin() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    setIsSaving(true);
    try {
      // Re-authenticate to verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: 'kehindehusseinpopoola@gmail.com',
        password: currentPassword,
      });

      if (signInError) {
        toast.error('Incorrect current password');
        setIsSaving(false);
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

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
            <div className="relative">
              <Input 
                type={showCurrentPassword ? 'text' : 'password'} 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <Input 
                type={showNewPassword ? 'text' : 'password'} 
                placeholder="Min 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <div className="relative">
              <Input 
                type={showConfirmPassword ? 'text' : 'password'} 
                placeholder="Min 8 characters"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
              </button>
            </div>
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
