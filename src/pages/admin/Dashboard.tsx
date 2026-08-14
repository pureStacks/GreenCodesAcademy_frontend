import { useEffect } from 'react';
import { useAppStore } from '@/src/store';
import { Card } from '@/src/components/ui/Card';
import { FileText, BookOpen, MessageSquare, CreditCard, Mail, Activity, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const { data, isLoading, fetchData } = useAppStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading || !data) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard data...</div>;
  }

  const statCards = [
    { label: 'Programs', value: data.programs?.length || 0, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', link: '/admin/programs' },
    { label: 'Testimonials', value: data.testimonials?.length || 0, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-100', link: '/admin/testimonials' },
    { label: 'Enrollments', value: data.enrollments?.length || 0, icon: CreditCard, color: 'text-green-600', bg: 'bg-green-100', link: '/admin/enrollments' },
    { label: 'FAQs', value: data.faqs?.length || 0, icon: FileText, color: 'text-yellow-600', bg: 'bg-yellow-100', link: '/admin/faqs' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back, Admin</h2>
        <p className="text-gray-600 mt-1">Here is what is happening with your website today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link to={stat.link} key={index}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-transparent hover:border-t-green-500">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-gray-400" />
            Website Status
          </h3>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start gap-4">
            <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900">All Systems Operational</h4>
              <p className="text-sm text-green-700 mt-1">The public website is live and responding normally.</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {data.enrollments?.slice(-3).reverse().map((enrollment: any) => (
              <div key={enrollment.id} className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-0">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{enrollment.fullName}</span> submitted a new enrollment for <span className="font-medium text-gray-900">{enrollment.program}</span>
                </p>
              </div>
            ))}
            {(!data.enrollments || data.enrollments.length === 0) && (
              <p className="text-sm text-gray-500">No recent activity.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}