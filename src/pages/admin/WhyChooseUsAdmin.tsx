import { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import { Edit, Trash, Plus, Check, X } from 'lucide-react';
import { ConfirmModal } from '@/src/components/ui/ConfirmModal';
import toast from 'react-hot-toast';

export function WhyChooseUsAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  const [items, setItems] = useState<any[]>(data?.whyChooseUs || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [deletingItem, setDeletingItem] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    if (data?.whyChooseUs && editingId === null) {
      setItems(data.whyChooseUs);
    }
  }, [data?.whyChooseUs, editingId]);

  const handleSave = async (updatedItems: any[]) => {
    setIsSaving(true);
    try {
      await updateSection('whyChooseUs', updatedItems, token!);
      toast.success('Items updated successfully');
      setEditingId(null);
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    const updated = items.map((f: any) => f.id === editingId ? editForm : f);
    setItems(updated);
    handleSave(updated);
  };

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      title: 'New Feature',
      description: 'New Description',
      icon: 'CheckCircle2'
    };
    const updated = [...items, newItem];
    setItems(updated);
    setEditingId(newItem.id);
    setEditForm(newItem);
  };

  const confirmDelete = async () => {
    if (!deletingItem) return;
    const updated = items.filter((f: any) => f.id !== deletingItem.id);
    setItems(updated);
    await handleSave(updated);
    setDeletingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="text-gray-600 mt-1">Manage the features displayed in the Why Choose Us section.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={addItem} className="gap-2 bg-green-700 hover:bg-green-800">
            <Plus className="h-4 w-4" /> Add Feature
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {items.map((item: any) => (
          <Card key={item.id} className="p-4">
            {editingId === item.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input 
                    value={editForm.title} 
                    onChange={e => setEditForm({...editForm, title: e.target.value})} 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea 
                    value={editForm.description} 
                    onChange={e => setEditForm({...editForm, description: e.target.value})} 
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Icon Name (Lucide Icon)</label>
                  <Input 
                    value={editForm.icon} 
                    onChange={e => setEditForm({...editForm, icon: e.target.value})} 
                  />
                  <p className="text-xs text-gray-500 mt-1">Example: CheckCircle2, MonitorPlay, Users, Award</p>
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
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-700">{item.description}</p>
                  <p className="text-sm text-gray-400 mt-2">Icon: {item.icon}</p>
                </div>
                
                <div className="flex gap-2 shrink-0">
                  <Button size="icon" variant="outline" onClick={() => startEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={() => setDeletingItem({ id: item.id, title: item.title })} 
                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                    title="Delete Feature"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
        {items.length === 0 && (
          <div className="p-8 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
            No features found. Click "Add Feature" to create one.
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deletingItem}
        title="Delete Feature"
        message={`Are you sure you want to delete "${deletingItem?.title || 'this feature'}"? This action cannot be undone and will immediately reflect across the site.`}
        confirmText="Delete Feature"
        isLoading={isSaving}
        onConfirm={confirmDelete}
        onClose={() => setDeletingItem(null)}
      />
    </div>
  );
}
