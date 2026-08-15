import React, { useState } from 'react';
import { useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Save, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export function SecurityAdmin() {
  const { token } = useAuthStore();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(result.error || 'Failed to update password');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
        <p className="text-gray-600 mt-1">Update your admin login credentials.</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="password"
                required
                value={currentPassword} 
                onChange={e => setCurrentPassword(e.target.value)} 
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="border-t pt-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">New Password</label>
            <div className="relative mb-4">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="password"
                required
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
                className="pl-10"
              />
            </div>
            
            <label className="block text-sm font-medium mb-1 text-gray-700">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="password"
                required
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-green-700 hover:bg-green-800 gap-2" disabled={isSaving}>
              <Save className="h-4 w-4" /> {isSaving ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
