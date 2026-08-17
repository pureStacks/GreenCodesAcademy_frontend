import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/src/store';
import { 
  LayoutDashboard, 
  Home, 
  Info, 
  BookOpen, 
  CheckCircle, 
  MessageSquare, 
  MapPin, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  CreditCard, 
  FileText, 
  Shield,
  Loader2,
  Lock
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/src/components/ui/Button';

const adminNavItems = [
  { path: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard },
  { path: '/admin/settings', label: 'Global Settings', icon: Settings },
  { path: '/admin/navigation', label: 'Navigation Menu', icon: Menu },
  { path: '/admin/home', label: 'Home Page', icon: Home },
  { path: '/admin/countdown', label: 'Countdown Timer', icon: CheckCircle },
  { path: '/admin/about', label: 'About Page', icon: Info },
  { path: '/admin/programs', label: 'Programs', icon: BookOpen },
  { path: '/admin/why-choose-us', label: 'Why Choose Us', icon: CheckCircle },
  { path: '/admin/testimonials', label: 'Testimonials / Reviews', icon: MessageSquare },
  { path: '/admin/faqs', label: 'FAQs', icon: FileText },
  { path: '/admin/contact', label: 'Contact Page', icon: MapPin },
  { path: '/admin/popups', label: 'Popups & Notifications', icon: MessageSquare },
  { path: '/admin/enrollments', label: 'Enrollments', icon: CreditCard },
  { path: '/admin/security', label: 'Security Settings', icon: Shield },
];

export function AdminLayout() {
  const { isAuthenticated, token, adminEmail, isCheckingSession, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center max-w-sm w-full">
          <Loader2 className="h-10 w-10 text-green-700 animate-spin mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">Verifying Admin Access</h3>
          <p className="text-sm text-gray-500">Checking credentials and security session...</p>
        </div>
      </div>
    );
  }

  // Strict route guard: Unauthenticated visitors cannot view admin content
  if (!isAuthenticated || !token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-green-950 text-white transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-green-800">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-green-800 rounded-lg text-yellow-400">
              <Lock className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-yellow-400 tracking-tight">Green Codes CMS</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-300 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2 mt-2">Content Management</div>
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm
                  ${isActive ? 'bg-green-800 text-white font-semibold' : 'text-green-100 hover:bg-green-900/70'}
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
          
          <div className="pt-6 mt-6 border-t border-green-900/60">
            <div className="px-3 py-2 mb-2 bg-green-900/40 rounded-lg">
              <span className="text-[11px] text-green-300 block font-mono truncate">
                {adminEmail || 'Verified Admin'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-950/40 hover:text-red-300 w-full transition-colors text-sm font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-8 justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg md:text-xl font-bold text-gray-900 truncate">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/" target="_blank">
              <Button variant="outline" size="sm">View Live Site</Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              Sign Out
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
