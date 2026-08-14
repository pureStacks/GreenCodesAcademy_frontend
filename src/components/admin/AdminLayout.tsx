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
  Users,
  Settings,
  Image,
  LogOut,
  Menu,
  X,
  CreditCard,
  FileText
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/src/components/ui/Button';

const adminNavItems = [
  { path: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard },
  { path: '/admin/home', label: 'Home Page', icon: Home },
  { path: '/admin/programs', label: 'Programs', icon: BookOpen },
  { path: '/admin/why-choose-us', label: 'Why Choose Us', icon: CheckCircle },
  { path: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { path: '/admin/faqs', label: 'FAQs', icon: FileText },
  { path: '/admin/enrollments', label: 'Enrollments', icon: CreditCard },
  { path: '/admin/settings', label: 'Site Settings', icon: Settings },
];

export function AdminLayout() {
  const { isAuthenticated, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
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
          <span className="text-xl font-bold text-yellow-400">Green Codes CMS</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-300 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2 mt-4">Content Management</div>
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                  ${isActive ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-900'}
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
          
          <div className="pt-8 mt-8 border-t border-green-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-green-900 w-full transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
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
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 truncate">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/" target="_blank">
              <Button variant="outline" size="sm">View Site</Button>
            </Link>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
              A
            </div>
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