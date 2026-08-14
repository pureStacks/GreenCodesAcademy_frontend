import { useState } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import { Edit, Trash, Plus, Check, X, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export function TestimonialsAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  const [testimonials, setTestimonials] = useState(data?.testimonials || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSection('testimonials', testimonials, token!);
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

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    setTestimonials(testimonials.map((t: any) => t.id === editingId ? editForm : t));
    setEditingId(null);
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now().toString(),
      name: 'New Student',
      program: 'Web Development',
      text: '',
      rating: 5,
      published: false
    };
    setTestimonials([...testimonials, newTestimonial]);
    startEdit(newTestimonial);
  };

  const deleteTestimonial = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(testimonials.filter((t: any) => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
          <p className="text-gray-600 mt-1">Manage what students say about the academy.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={addTestimonial} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" /> Add Testimonial
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-green-700 hover:bg-green-800">
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial: any) => (
          <Card key={testimonial.id} className="p-4">
            {editingId === testimonial.id ? (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Student Name</label>
                    <Input 
                      value={editForm.name} 
                      onChange={e => setEditForm({...editForm, name: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Program Taken</label>
                    <Input 
                      value={editForm.program} 
                      onChange={e => setEditForm({...editForm, program: e.target.value})} 
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                    <Input 
                      type="number"
                      min="1"
                      max="5"
                      value={editForm.rating} 
                      onChange={e => setEditForm({...editForm, rating: Number(e.target.value)})} 
                    />
                  </div>
                  <div className="flex items-center mt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded text-green-600"
                        checked={editForm.published}
                        onChange={e => setEditForm({...editForm, published: e.target.checked})}
                      />
                      <span className="text-sm font-medium">Published to Website</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Testimonial Text</label>
                  <Textarea 
                    value={editForm.text} 
                    onChange={e => setEditForm({...editForm, text: e.target.value})} 
                    rows={4}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={cancelEdit} className="gap-2">
                    <X className="h-4 w-4" /> Cancel
                  </Button>
                  <Button onClick={saveEdit} className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Check className="h-4 w-4" /> Done Editing
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{testimonial.program}</span>
                    {!testimonial.published && <span className="px-2 py-0.5 rounded text-xs bg-yellow-100 text-yellow-800 font-medium">Draft</span>}
                  </div>
                  
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>

                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </div>
                
                <div className="flex gap-2 shrink-0">
                  <Button size="icon" variant="outline" onClick={() => startEdit(testimonial)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => deleteTestimonial(testimonial.id)} className="text-red-500 hover:bg-red-50">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
        {testimonials.length === 0 && (
          <div className="p-8 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
            No testimonials found. Click "Add Testimonial" to create one.
          </div>
        )}
      </div>
    </div>
  );
}