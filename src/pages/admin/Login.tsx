import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Lock, Eye, EyeOff, Loader2, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/src/lib/supabase';

const ADMIN_EMAIL = 'kehindehusseinpopoola@gmail.com';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== ADMIN_EMAIL) {
      toast.error('Unauthorized administrator email.');
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        if (data.user.email !== ADMIN_EMAIL) {
          await supabase.auth.signOut();
          toast.error('Unauthorized administrator email.');
          return;
        }
        
        toast.success('Login successful');
        navigate('/admin');
      }
    } catch (error: any) {
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== ADMIN_EMAIL) {
      toast.error('Unauthorized administrator email.');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) throw error;
      
      setResetEmailSent(true);
      toast.success('Secure password reset link sent.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  if (resetEmailSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
          <h2 className="text-3xl font-extrabold text-green-950">CHECK YOUR EMAIL</h2>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border-t-4 border-t-yellow-400 text-center space-y-4">
            <Mail className="h-12 w-12 text-green-600 mx-auto" />
            <p className="text-gray-600">
              A secure password reset link has been sent to your authorized administrator email address.
            </p>
            <Button 
              className="w-full mt-4" 
              variant="outline" 
              onClick={() => {
                setResetEmailSent(false);
                setIsResetMode(false);
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
        <h2 className="text-3xl font-extrabold text-green-950">Green Codes Academy</h2>
        <h3 className="text-xl font-medium text-gray-600 mt-2">
          {isResetMode ? 'Forgot Your Password?' : 'Admin Login'}
        </h3>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border-t-4 border-t-yellow-400">
          {isResetMode && (
             <p className="text-sm text-gray-600 mb-6 text-center">
               Enter your administrator email address and we'll send you a secure password reset link.
             </p>
          )}
          <form className="space-y-6" onSubmit={isResetMode ? handleResetPassword : handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Admin Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  required
                  type="email"
                  className="pl-10"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {!isResetMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Admin Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    required
                    type={showPassword ? 'text' : 'password'}
                    className="pl-10"
                    placeholder="••••••••"
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
            )}

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-green-700 hover:bg-green-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isResetMode ? 'SENDING...' : 'AUTHENTICATING...'}
                </>
              ) : (
                isResetMode ? 'SEND RESET LINK' : 'LOGIN'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-sm font-medium text-green-700 hover:text-green-600 focus:outline-none focus:underline"
              onClick={() => setIsResetMode(!isResetMode)}
            >
              {isResetMode ? 'Back to Login' : 'FORGOT PASSWORD?'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
