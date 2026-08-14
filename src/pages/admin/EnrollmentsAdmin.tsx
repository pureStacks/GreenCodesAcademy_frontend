import { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Search, Mail, Phone, Calendar } from 'lucide-react';
import { Input } from '@/src/components/ui/Input';
import toast from 'react-hot-toast';

export function EnrollmentsAdmin() {
  const { data, fetchData } = useAppStore();
  const { token } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [enrollments, setEnrollments] = useState(data?.enrollments || []);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    // If enrollments is missing from public data, we need to fetch full admin data
    const fetchAdminData = async () => {
      try {
        const res = await fetch('/api/admin/data', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const fullData = await res.json();
        setEnrollments(fullData.enrollments || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAdminData();
  }, [token]);

  const updateStatus = async (id: string, status: string) => {
    setIsUpdating(id);
    try {
      const res = await fetch(`/api/admin/enrollments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error();
      
      setEnrollments(enrollments.map((e: any) => e.id === id ? { ...e, status } : e));
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    } finally {
      setIsUpdating(null);
    }
  };

  const filtered = enrollments.filter((e: any) => 
    e.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.program?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Enrollment Submissions</h2>
          <p className="text-gray-600 mt-1">Manage and track student applications.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            className="pl-9 w-full sm:w-64"
            placeholder="Search enrollments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
                <th className="p-4">Applicant</th>
                <th className="p-4">Program & Schedule</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((enrollment: any) => (
                <tr key={enrollment.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{enrollment.fullName}</div>
                    {enrollment.message && (
                      <div className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-[200px]" title={enrollment.message}>
                        {enrollment.message}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-green-700">{enrollment.program}</div>
                    <div className="text-sm text-gray-500">{enrollment.schedule}</div>
                  </td>
                  <td className="p-4 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-3 w-3" /> {enrollment.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-3 w-3" /> {enrollment.phone}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(enrollment.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      enrollment.status === 'processed' ? 'bg-green-50 text-green-700 border-green-200' :
                      enrollment.status === 'contacted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                      {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <select 
                        className="text-sm border border-gray-200 rounded-lg p-1.5 bg-white outline-none focus:border-green-500 disabled:opacity-50"
                        value={enrollment.status}
                        onChange={(e) => updateStatus(enrollment.id, e.target.value)}
                        disabled={isUpdating === enrollment.id}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="processed">Processed</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No enrollments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}