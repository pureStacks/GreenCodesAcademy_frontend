import React, { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import { ConfirmModal } from '@/src/components/ui/ConfirmModal';
import toast from 'react-hot-toast';
import { Save, Plus, Trash2, Info, Target, Building } from 'lucide-react';

export function AboutAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  const [form, setForm] = useState<any>({
    sticker: "ABOUT GREEN CODES ACADEMY",
    heading: "LEARN. BUILD. CREATE. GROW.",
    description1: "We are Nigeria's premier physical technology academy, dedicated to empowering students with practical, career-ready digital skills.",
    description2: "We go beyond theory. Our curriculum is designed around real-world projects, ensuring that our students graduate not just with knowledge, but with the confidence to build, create, and innovate.",
    mission: "At Green Codes Academy, we believe that practical technology education is the key to unlocking future opportunities. Our mission is to bridge the digital skills gap by providing accessible, high-quality, and hands-on training to individuals of all backgrounds.",
    value1Title: "Goal-Oriented",
    value1Desc: "Focused on career readiness.",
    value2Title: "Project-Based",
    value2Desc: "Learn by building real apps.",
    value3Title: "Community",
    value3Desc: "Collaborative learning space.",
    image: "https://i.ibb.co/dsJrwsPC/temp.jpg",
    imageAlt: "Students in coding class",
    imageTitle: "Modern Learning Environment",
    imageSubtitle: "Equipped with the latest tools and technologies.",
    classroomTitle: "LEARN IN A REAL CLASSROOM. BUILD REAL SKILLS.",
    classroomDesc: "Because Green Codes Academy is a physical school, we offer an immersive learning experience that online courses simply cannot match. You get immediate feedback, peer collaboration, and a distraction-free environment.",
    features: [
      "Computer-based practical sessions",
      "Instructor-led lessons",
      "Collaborative learning",
      "Hands-on projects",
      "Student interaction",
      "Dedicated mentorship"
    ]
  });

  const [deletingFeatureIdx, setDeletingFeatureIdx] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.about) setForm((prev: any) => ({ ...prev, ...data.about }));
  }, [data]);

  const handleAddFeature = () => {
    const features = [...(form.features || [])];
    features.push("New Practical Classroom Feature");
    setForm({ ...form, features });
  };

  const handleUpdateFeature = (idx: number, val: string) => {
    const features = [...(form.features || [])];
    features[idx] = val;
    setForm({ ...form, features });
  };

  const handleRemoveFeature = (idx: number) => {
    const features = (form.features || []).filter((_: any, i: number) => i !== idx);
    setForm({ ...form, features });
    setDeletingFeatureIdx(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('about', form, token!);
      toast.success('About page content updated successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">About Page Content</h2>
        <p className="text-gray-600 mt-1">Manage the story, mission statement, core values, classroom photo captions, and practical feature badges.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* HERO & INTRODUCTION */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="p-2 bg-green-100 text-green-800 rounded-lg">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Hero & Introduction</h3>
              <p className="text-xs text-gray-500">Main header and lead paragraphs of the about page.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sticker / Badge Text</label>
                <Input 
                  value={form.sticker || ''} 
                  onChange={e => setForm({...form, sticker: e.target.value})}
                  placeholder="e.g. ABOUT GREEN CODES ACADEMY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Heading</label>
                <Input 
                  value={form.heading || ''} 
                  onChange={e => setForm({...form, heading: e.target.value})}
                  placeholder="e.g. LEARN. BUILD. CREATE. GROW."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description Paragraph 1 (Top Hero)</label>
              <Textarea 
                value={form.description1 || ''} 
                onChange={e => setForm({...form, description1: e.target.value})}
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description Paragraph 2 (Under Mission)</label>
              <Textarea 
                value={form.description2 || ''} 
                onChange={e => setForm({...form, description2: e.target.value})}
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* IMAGE & CAPTION */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">About Page Image & Floating Captions</h3>
              <p className="text-xs text-gray-500">Classroom photo and caption overlay.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <Input 
                value={form.image || ''} 
                onChange={e => setForm({...form, image: e.target.value})}
                placeholder="https://i.ibb.co/..."
              />
              {form.image && (
                <img src={form.image} alt="Preview" className="mt-2 h-36 object-cover rounded-xl border" />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Overlay Caption Title</label>
              <Input 
                value={form.imageTitle || ''} 
                onChange={e => setForm({...form, imageTitle: e.target.value})}
                placeholder="e.g. Modern Learning Environment"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Overlay Caption Subtitle</label>
              <Input 
                value={form.imageSubtitle || ''} 
                onChange={e => setForm({...form, imageSubtitle: e.target.value})}
                placeholder="e.g. Equipped with the latest tools and technologies."
              />
            </div>
          </div>
        </Card>
        
        {/* MISSION & VALUES */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="p-2 bg-purple-100 text-purple-800 rounded-lg">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Mission Statement & Core Values</h3>
              <p className="text-xs text-gray-500">The 3 pillar values highlighted for prospective students.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Our Mission Statement</label>
              <Textarea 
                value={form.mission || ''} 
                onChange={e => setForm({...form, mission: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-3 p-4 border rounded-xl bg-gray-50">
                <h4 className="font-semibold text-gray-800 text-sm">Value 1</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                  <Input value={form.value1Title || ''} onChange={e => setForm({...form, value1Title: e.target.value})} placeholder="Goal-Oriented" className="bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                  <Textarea value={form.value1Desc || ''} onChange={e => setForm({...form, value1Desc: e.target.value})} rows={2} className="bg-white" />
                </div>
              </div>
              
              <div className="space-y-3 p-4 border rounded-xl bg-gray-50">
                <h4 className="font-semibold text-gray-800 text-sm">Value 2</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                  <Input value={form.value2Title || ''} onChange={e => setForm({...form, value2Title: e.target.value})} placeholder="Project-Based" className="bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                  <Textarea value={form.value2Desc || ''} onChange={e => setForm({...form, value2Desc: e.target.value})} rows={2} className="bg-white" />
                </div>
              </div>
              
              <div className="space-y-3 p-4 border rounded-xl bg-gray-50">
                <h4 className="font-semibold text-gray-800 text-sm">Value 3</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                  <Input value={form.value3Title || ''} onChange={e => setForm({...form, value3Title: e.target.value})} placeholder="Community" className="bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                  <Textarea value={form.value3Desc || ''} onChange={e => setForm({...form, value3Desc: e.target.value})} rows={2} className="bg-white" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* CLASSROOM TRAINING SECTION */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="p-2 bg-yellow-100 text-yellow-800 rounded-lg">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Classroom Practical Highlights</h3>
              <p className="text-xs text-gray-500">The 6 feature cards at the bottom of the About page.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading</label>
              <Input 
                value={form.classroomTitle || ''} 
                onChange={e => setForm({...form, classroomTitle: e.target.value})}
                placeholder="e.g. LEARN IN A REAL CLASSROOM. BUILD REAL SKILLS."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Description / Caption</label>
              <Textarea 
                value={form.classroomDesc || ''} 
                onChange={e => setForm({...form, classroomDesc: e.target.value})}
                rows={2}
              />
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-800">Classroom Feature Badges</label>
                <Button type="button" size="sm" variant="outline" onClick={handleAddFeature} className="gap-1 text-xs">
                  <Plus className="h-3.5 w-3.5" /> Add Feature Badge
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {(form.features || []).map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input 
                      value={feat} 
                      onChange={e => handleUpdateFeature(idx, e.target.value)}
                      className="bg-white text-sm"
                    />
                    <Button 
                      type="button" 
                      size="icon" 
                      variant="outline" 
                      onClick={() => setDeletingFeatureIdx(idx)}
                      className="text-red-500 hover:text-red-700 shrink-0 h-9 w-9"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Sticky Save Bar */}
        <div className="flex justify-end sticky bottom-6 z-20">
          <Button type="submit" size="lg" disabled={isSaving} className="px-10 shadow-xl gap-2 text-base">
            <Save className="h-5 w-5" />
            {isSaving ? 'Saving Changes...' : 'Save About Page Content'}
          </Button>
        </div>
      </form>

      {/* Delete confirmation modal */}
      <ConfirmModal 
        isOpen={deletingFeatureIdx !== null}
        title="Remove Classroom Feature"
        message="Are you sure you want to remove this classroom feature badge?"
        confirmText="Remove Feature"
        onConfirm={() => deletingFeatureIdx !== null && handleRemoveFeature(deletingFeatureIdx)}
        onClose={() => setDeletingFeatureIdx(null)}
      />
    </div>
  );
}
