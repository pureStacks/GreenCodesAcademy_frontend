import { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import { Edit, Trash, Plus, Check, X, Star, MessageSquare } from 'lucide-react';
import { ConfirmModal } from '@/src/components/ui/ConfirmModal';
import toast from 'react-hot-toast';

export function TestimonialsAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  const [testimonials, setTestimonials] = useState<any[]>(data?.testimonials || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [deletingTestimonial, setDeletingTestimonial] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (data?.testimonials && editingId === null) {
      setTestimonials(data.testimonials);
    }
  }, [data?.testimonials, editingId]);

  const handleSave = async (updatedTestimonials: any[]) => {
    setIsSaving(true);
    try {
      await updateSection('testimonials', updatedTestimonials, token!);
      toast.success('Testimonials updated successfully');
      setEditingId(null);
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (testimonial: any) => {
    setEditingId(testimonial.id);
    setEditForm({ ...testimonial });
  };

  const saveEdit = () => {
    const updated = testimonials.map(t => t.id === editingId ? editForm : t);
    setTestimonials(updated);
    handleSave(updated);
  };

  const confirmDelete = async () => {
    if (!deletingTestimonial) return;
    const updated = testimonials.filter(t => t.id !== deletingTestimonial.id);
    setTestimonials(updated);
    await handleSave(updated);
    setDeletingTestimonial(null);
  };

  const togglePublish = (id: string) => {
    const updated = testimonials.map(t => {
      if (t.id === id) {
        return { ...t, published: !t.published, status: t.published ? 'hidden' : 'published' };
      }
      return t;
    });
    setTestimonials(updated);
    handleSave(updated);
  };

  const addNew = () => {
    const newTestimonial = {
      id: Date.now().toString(),
      name: '',
      program: '',
      text: '',
      rating: 5,
      published: true,
      status: 'published',
      adminReply: ''
    };
    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    setEditingId(newTestimonial.id);
    setEditForm(newTestimonial);
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Testimonials & Reviews</h2>
          <p className="text-gray-600 mt-1">Manage student success stories, reviews, and admin replies.</p>
        </div>
        <Button onClick={addNew} className="gap-2">
          <Plus className="h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      <div className="grid gap-6">
        {testimonials.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">No testimonials found. Wait for submissions or add one manually.</p>
          </div>
        ) : (
          testimonials.map((testimonial: any) => (
            <Card key={testimonial.id} className="p-6">
              {editingId === testimonial.id ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                      <Input 
                        value={editForm.name} 
                        onChange={e => setEditForm({...editForm, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                      <Input 
                        value={editForm.program} 
                        onChange={e => setEditForm({...editForm, program: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                    <Input 
                      type="number" 
                      min="1" max="5"
                      value={editForm.rating} 
                      onChange={e => setEditForm({...editForm, rating: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Text</label>
                    <Textarea 
                      value={editForm.text} 
                      onChange={e => setEditForm({...editForm, text: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className="bg-gray-50 p-4 border rounded-xl">
                    <label className="block text-sm font-bold text-gray-900 mb-1">Admin Reply</label>
                    <p className="text-xs text-gray-500 mb-2">This will be displayed publicly under their review.</p>
                    <Textarea 
                      value={editForm.adminReply || ''} 
                      onChange={e => setEditForm({...editForm, adminReply: e.target.value})}
                      rows={2}
                      placeholder="Thank you for your feedback..."
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                    <Button onClick={saveEdit} disabled={isSaving}>
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        {testimonial.name}
                        {!testimonial.published && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium">Pending Review</span>
                        )}
                      </h3>
                      <p className="text-gray-600">{testimonial.program}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => togglePublish(testimonial.id)}
                        className={testimonial.published ? "text-orange-600 border-orange-200 hover:bg-orange-50" : "text-green-600 border-green-200 hover:bg-green-50"}
                      >
                        {testimonial.published ? <X className="h-4 w-4 mr-1" /> : <Check className="h-4 w-4 mr-1" />}
                        {testimonial.published ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => startEdit(testimonial)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setDeletingTestimonial({ id: testimonial.id, name: testimonial.name || 'Testimonial' })} 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Delete Testimonial"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                  
                  {testimonial.adminReply && (
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-600 border-l-2 border-green-600">
                      <strong>Admin Reply: </strong> {testimonial.adminReply}
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      <ConfirmModal
        isOpen={!!deletingTestimonial}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${deletingTestimonial?.name || 'this student'}"? This action cannot be undone and will immediately sync across the website.`}
        confirmText="Delete Testimonial"
        isLoading={isSaving}
        onConfirm={confirmDelete}
        onClose={() => setDeletingTestimonial(null)}
      />
    </div>
  );
}
