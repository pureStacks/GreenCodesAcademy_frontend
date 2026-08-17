import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/src/lib/supabase';

export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state change, particularly the 'PASSWORD_RECOVERY' event
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // Handled automatically by Supabase setting the session
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success('Password updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
          <h2 className="text-3xl font-extrabold text-green-950">PASSWORD RESET SUCCESSFULLY</h2>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border-t-4 border-t-green-500 text-center">
            <Lock className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">
              Your administrator password has been updated securely.
            </p>
            <Button 
              className="w-full" 
              onClick={() => {
                supabase.auth.signOut();
                navigate('/admin/login');
              }}
            >
              RETURN TO ADMIN LOGIN
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h2 className="text-3xl font-extrabold text-green-950">CREATE NEW PASSWORD</h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border-t-4 border-t-yellow-400">
          <form className="space-y-6" onSubmit={handleReset}>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  required
                  type={showPassword ? 'text' : 'password'}
                  className="pl-10"
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  required
                  type={showPassword ? 'text' : 'password'}
                  className="pl-10"
                  placeholder="Min 8 characters"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-green-700 hover:bg-green-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  UPDATING...
                </>
              ) : (
                'RESET PASSWORD'
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
