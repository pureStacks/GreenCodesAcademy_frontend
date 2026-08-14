import { useState } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import { Edit, Trash, Plus, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

export function FaqsAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  const [faqs, setFaqs] = useState(data?.faqs || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSection('faqs', faqs, token!);
      toast.success('FAQs updated successfully');
      setEditingId(null);
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (faq: any) => {
    setEditingId(faq.id);
    setEditForm({ ...faq });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    setFaqs(faqs.map((f: any) => f.id === editingId ? editForm : f));
    setEditingId(null);
  };

  const addFaq = () => {
    const newFaq = {
      id: Date.now().toString(),
      question: 'New Question',
      answer: 'New Answer',
      published: false
    };
    setFaqs([...faqs, newFaq]);
    startEdit(newFaq);
  };

  const deleteFaq = (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(faqs.filter((f: any) => f.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-1">Manage FAQs displayed on the contact page.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={addFaq} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" /> Add FAQ
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-green-700 hover:bg-green-800">
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {faqs.map((faq: any) => (
          <Card key={faq.id} className="p-4">
            {editingId === faq.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Question</label>
                  <Input 
                    value={editForm.question} 
                    onChange={e => setEditForm({...editForm, question: e.target.value})} 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Answer</label>
                  <Textarea 
                    value={editForm.answer} 
                    onChange={e => setEditForm({...editForm, answer: e.target.value})} 
                    rows={4}
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded text-green-600"
                      checked={editForm.published}
                      onChange={e => setEditForm({...editForm, published: e.target.checked})}
                    />
                    <span className="text-sm font-medium">Published</span>
                  </label>
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
                    <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                    {!faq.published && <span className="px-2 py-0.5 rounded text-xs bg-yellow-100 text-yellow-800 font-medium">Draft</span>}
                  </div>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
                
                <div className="flex gap-2 shrink-0">
                  <Button size="icon" variant="outline" onClick={() => startEdit(faq)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => deleteFaq(faq.id)} className="text-red-500 hover:bg-red-50">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
        {faqs.length === 0 && (
          <div className="p-8 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
            No FAQs found. Click "Add FAQ" to create one.
          </div>
        )}
      </div>
    </div>
  );
}
