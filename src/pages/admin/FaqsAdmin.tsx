import { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import { Edit, Trash, Plus, Check, X, HelpCircle } from 'lucide-react';
import { ConfirmModal } from '@/src/components/ui/ConfirmModal';
import toast from 'react-hot-toast';

export function FaqsAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  const [faqs, setFaqs] = useState<any[]>(data?.faqs || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [deletingFaq, setDeletingFaq] = useState<{ id: string; question: string } | null>(null);

  useEffect(() => {
    if (data?.faqs && editingId === null) {
      setFaqs(data.faqs);
    }
  }, [data?.faqs, editingId]);

  const handleSave = async (updatedFaqs: any[]) => {
    setIsSaving(true);
    try {
      await updateSection('faqs', updatedFaqs, token!);
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
    const updated = faqs.map((f: any) => f.id === editingId ? editForm : f);
    setFaqs(updated);
    handleSave(updated);
  };

  const addFaq = () => {
    const newFaq = {
      id: Date.now().toString(),
      question: 'New Question',
      answer: 'New Answer',
      published: true
    };
    const updated = [...faqs, newFaq];
    setFaqs(updated);
    setEditingId(newFaq.id);
    setEditForm(newFaq);
  };

  const confirmDelete = async () => {
    if (!deletingFaq) return;
    const updated = faqs.filter((f: any) => f.id !== deletingFaq.id);
    setFaqs(updated);
    await handleSave(updated);
    setDeletingFaq(null);
  };

  const togglePublish = (id: string) => {
    const updated = faqs.map((f: any) => {
      if (f.id === id) {
        return { ...f, published: f.published === false ? true : false };
      }
      return f;
    });
    setFaqs(updated);
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-1">Manage FAQs displayed on the home and contact pages.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={addFaq} className="gap-2 bg-green-700 hover:bg-green-800">
            <Plus className="h-4 w-4" /> Add FAQ
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
                      checked={editForm.published !== false}
                      onChange={e => setEditForm({...editForm, published: e.target.checked})}
                    />
                    <span className="text-sm font-medium">Published (Visible on Frontend)</span>
                  </label>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={cancelEdit} className="gap-2">
                    <X className="h-4 w-4" /> Cancel
                  </Button>
                  <Button onClick={saveEdit} disabled={isSaving} className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Check className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                    {faq.published === false ? (
                      <span className="px-2 py-0.5 rounded text-xs bg-yellow-100 text-yellow-800 font-medium">Draft</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-800 font-medium">Published</span>
                    )}
                  </div>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => togglePublish(faq.id)}
                    className={faq.published === false ? "text-green-700 border-green-200 hover:bg-green-50" : "text-amber-700 border-amber-200 hover:bg-amber-50"}
                  >
                    {faq.published === false ? 'Publish' : 'Unpublish'}
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => startEdit(faq)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={() => setDeletingFaq({ id: faq.id, question: faq.question })} 
                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                    title="Delete FAQ"
                  >
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

      <ConfirmModal
        isOpen={!!deletingFaq}
        title="Delete FAQ"
        message={`Are you sure you want to delete "${deletingFaq?.question || 'this FAQ'}"? This action cannot be undone and will immediately sync across the website.`}
        confirmText="Delete FAQ"
        isLoading={isSaving}
        onConfirm={confirmDelete}
        onClose={() => setDeletingFaq(null)}
      />
    </div>
  );
}
