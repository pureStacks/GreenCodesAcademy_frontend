import { useState } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import { Edit, Trash, Plus, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

export function ProgramsAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  const [programs, setPrograms] = useState(data?.programs || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSection('programs', programs, token!);
      toast.success('Programs updated successfully');
      setEditingId(null);
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (program: any) => {
    setEditingId(program.id);
    setEditForm({ ...program });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    setPrograms(programs.map((p: any) => p.id === editingId ? editForm : p));
    setEditingId(null);
  };

  const addProgram = () => {
    const newProgram = {
      id: Date.now().toString(),
      name: 'New Program',
      shortDescription: '',
      duration: '',
      level: '',
      published: false
    };
    setPrograms([...programs, newProgram]);
    startEdit(newProgram);
  };

  const deleteProgram = (id: string) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      setPrograms(programs.filter((p: any) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Programs Management</h2>
          <p className="text-gray-600 mt-1">Add, edit, or remove programs offered by the academy.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={addProgram} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" /> Add Program
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-green-700 hover:bg-green-800">
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {programs.map((program: any) => (
          <Card key={program.id} className="p-4">
            {editingId === program.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input 
                      value={editForm.name} 
                      onChange={e => setEditForm({...editForm, name: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration</label>
                    <Input 
                      value={editForm.duration} 
                      onChange={e => setEditForm({...editForm, duration: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Level</label>
                    <Input 
                      value={editForm.level} 
                      onChange={e => setEditForm({...editForm, level: e.target.value})} 
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
                      <span className="text-sm font-medium">Published</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea 
                    value={editForm.shortDescription} 
                    onChange={e => setEditForm({...editForm, shortDescription: e.target.value})} 
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    {program.name} 
                    {!program.published && <span className="px-2 py-0.5 rounded text-xs bg-yellow-100 text-yellow-800 font-medium">Draft</span>}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{program.shortDescription}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>Duration: {program.duration}</span>
                    <span>Level: {program.level}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => startEdit(program)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => deleteProgram(program.id)} className="text-red-500 hover:bg-red-50">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
        {programs.length === 0 && (
          <div className="p-8 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
            No programs found. Click "Add Program" to create one.
          </div>
        )}
      </div>
    </div>
  );
}