import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Lock, Eye, EyeOff, Loader2, Mail, ShieldCheck, LogOut, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/src/lib/supabase';

export const ADMIN_EMAIL = 'kehindehusseinpopoola@gmail.com';

export function AdminLogin() {
  const { isAuthenticated, adminEmail, login, logout } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    // Strict verified email check
    if (normalizedEmail !== ADMIN_EMAIL.toLowerCase()) {
      toast.error('Unauthorized access. Only the verified administrator email is allowed.', {
        duration: 4000
      });
      return;
    }

    if (!password) {
      toast.error('Please enter your administrator password.');
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials.');
        }
        if (error.message.toLowerCase().includes('email not confirmed')) {
          throw new Error('Email not yet confirmed. Please verify your email via the confirmation link sent to your inbox.');
        }
        throw error;
      }

      if (data.user && data.session) {
        // Double-check verified administrator email
        if (data.user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
          await supabase.auth.signOut();
          toast.error('Unauthorized administrator account.');
          return;
        }
        
        login(data.session.access_token, data.user.email);
        toast.success('Admin authentication verified. Welcome back!');
        navigate('/admin');
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail !== ADMIN_EMAIL.toLowerCase()) {
      toast.error('Unauthorized access. Password reset is only available for the verified administrator email.');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) throw error;
      
      setResetEmailSent(true);
      toast.success('Secure password reset link sent to your verified email.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already authenticated and visits login page
  if (isAuthenticated && !isResetMode) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
          <h2 className="text-3xl font-extrabold text-green-950">Green Codes Academy</h2>
          <p className="text-sm text-gray-600 mt-1">Admin Portal Active Session</p>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="py-8 px-6 shadow-xl sm:rounded-2xl border-t-4 border-t-green-600 text-center space-y-6">
            <div className="mx-auto w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Active Admin Session</h3>
              <p className="text-sm text-gray-500 mt-1">
                You are currently authenticated as:
              </p>
              <div className="mt-2 font-mono text-xs bg-gray-100 p-2.5 rounded-lg text-gray-800 font-semibold truncate">
                {adminEmail || ADMIN_EMAIL}
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full h-11 bg-green-700 hover:bg-green-800 font-bold"
                onClick={() => navigate('/admin')}
              >
                Go to Admin Dashboard <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-11 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                onClick={async () => {
                  await logout();
                  toast.success('Logged out successfully.');
                }}
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </div>
            
            <div className="pt-2 border-t text-xs text-gray-400">
              <Link to="/" className="hover:underline">Return to main website</Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
              A secure password reset link has been sent to your verified administrator email address (<strong className="text-gray-900">{ADMIN_EMAIL}</strong>).
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
          {isResetMode ? 'Administrator Password Recovery' : 'Admin Portal Login'}
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          Authorized personnel only. All access is strictly authenticated.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border-t-4 border-t-yellow-400">
          {isResetMode && (
             <p className="text-sm text-gray-600 mb-6 text-center">
               Enter your verified administrator email address and a secure one-time reset link will be sent to your inbox.
             </p>
          )}
          <form className="space-y-6" onSubmit={isResetMode ? handleResetPassword : handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Verified Admin Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  required
                  type="email"
                  className="pl-10"
                  placeholder="admin@greencodes.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {!isResetMode && (
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Admin Password</label>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    required
                    type={showPassword ? 'text' : 'password'}
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
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
              className="w-full h-12 text-base font-bold bg-green-700 hover:bg-green-800 shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isResetMode ? 'VERIFYING & SENDING...' : 'VERIFYING CREDENTIALS...'}
                </>
              ) : (
                isResetMode ? 'SEND RESET LINK' : 'LOG IN AS ADMIN'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 pt-4">
            <button
              type="button"
              className="text-xs font-semibold text-green-700 hover:text-green-800 tracking-wider uppercase focus:outline-none focus:underline"
              onClick={() => setIsResetMode(!isResetMode)}
            >
              {isResetMode ? '← Back to Admin Login' : 'FORGOT PASSWORD?'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
