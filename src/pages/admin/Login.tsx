import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/src/lib/supabase';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a pure frontend app with basic auth (no backend), we can fetch the hashed pass or just do a simple string comparison for a prototype.
      // The previous backend had "admin123" fallback or bcrypt. Since we can't securely bcrypt in pure browser JS easily without pulling heavy libs, we'll use a basic check.
      // But let's check Supabase first to see if an admin password hash exists
      
      const { data, error } = await supabase.from('app_data').select('*').eq('section_key', 'admin').single();
      
      let isValid = false;
      if (!error && data && data.section_data?.password) {
         // Using plain text check for now since backend is gone. A real prod app would use Supabase Auth.
         isValid = (password === data.section_data.password);
      } else {
         isValid = (password === 'admin123'); // fallback
      }

      if (isValid) {
        // Generating a dummy token since there's no backend to verify it anyway
        login('dummy-jwt-token-for-frontend-auth');
        toast.success('Login successful');
        navigate('/admin');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h2 className="text-3xl font-extrabold text-green-950">Green Codes Academy</h2>
        <h3 className="text-xl font-medium text-gray-600 mt-2">Admin Login</h3>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border-t-4 border-t-yellow-400">
          <form className="space-y-6" onSubmit={handleLogin}>
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

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-green-700 hover:bg-green-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'LOGIN'
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
