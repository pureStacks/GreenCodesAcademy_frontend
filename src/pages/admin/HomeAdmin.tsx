import React, { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import { ConfirmModal } from '@/src/components/ui/ConfirmModal';
import toast from 'react-hot-toast';
import { Save, Plus, Trash2, Layout, Building, Megaphone, BarChart } from 'lucide-react';

export function HomeAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();

  // 1. Home / Hero Form
  const [form, setForm] = useState<any>({
    heroBadgeEnabled: true,
    heroBadge: "Registration for 2026 Cohort is Open",
    heroHeading: "BUILD THE SKILLS OF TOMORROW, TODAY.",
    heroSubheading: "Empowering students with practical technology, coding, and digital skills for a smarter future. Join the premier physical tech academy in Nigeria.",
    heroCtaText: "ENROLL NOW",
    heroCtaUrl: "/enrollment",
    heroSecondaryText: "LEARN ABOUT OUR PROGRAMS",
    heroSecondaryUrl: "/programs",
    heroImage: "https://i.ibb.co/B2jpgXwv/test.jpg",
    heroImageCaption: "Students collaborating and coding in a modern classroom",
    heroFeatures: ["Practical Learning", "Experienced Instructors", "Career-Focused Training"],
    heroStatEnabled: true,
    heroStatValue: "95%",
    heroStatLabel: "Student Satisfaction",
    
    // Stats
    stat1Value: "500+",
    stat1Label: "Students Trained",
    stat2Value: "95%",
    stat2Label: "Success Rate",
    stat3Value: "20+",
    stat3Label: "Practical Projects",
    stat4Value: "10+",
    stat4Label: "Tech Programs"
  });

  // 2. Physical Campus Form
  const [campusForm, setCampusForm] = useState<any>({
    title: "LEARN IN A REAL CLASSROOM.",
    highlight: "BUILD REAL SKILLS.",
    description: "Because Green Codes Academy is a physical school, we offer an immersive learning experience that online courses simply cannot match. You get immediate feedback, peer collaboration, and a distraction-free environment.",
    features: [
      "Physical classroom training",
      "Computer-based practical sessions",
      "Instructor-led lessons",
      "Collaborative learning",
      "Hands-on projects",
      "Student interaction"
    ],
    ctaText: "ENROLL NOW",
    ctaUrl: "/enrollment",
    image1: "https://i.ibb.co/gFvmkzHP/temp.jpg",
    caption1: "Students coding together",
    image2: "https://i.ibb.co/nNZ56Bvy/temp.jpg",
    caption2: "Student interaction",
    image3: "https://i.ibb.co/nMcY3y7W/temp.jpg",
    caption3: "Modern classroom",
    badgeEnabled: true,
    badgeValue: "100%",
    badgeLabel: "Practical"
  });

  // 3. CTA Section Form
  const [ctaForm, setCtaForm] = useState<any>({
    sticker: "START TODAY",
    heading: "YOUR TECHNOLOGY JOURNEY STARTS HERE.",
    subheading: "Don't wait to build the skills that can shape your future. Join Green Codes Academy today.",
    primaryText: "ENROLL NOW",
    primaryUrl: "/enrollment",
    secondaryText: "CHAT ON WHATSAPP",
    showWhatsApp: true,
    whatsappMessage: "Hello Green Codes Academy, I would like to learn more about enrollment and your available programs."
  });

  const [deletingFeatureIndex, setDeletingFeatureIndex] = useState<{ type: 'hero' | 'campus', index: number } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.home) setForm((prev: any) => ({ ...prev, ...data.home }));
    if (data?.campus) setCampusForm((prev: any) => ({ ...prev, ...data.campus }));
    if (data?.ctaSection) setCtaForm((prev: any) => ({ ...prev, ...data.ctaSection }));
  }, [data]);

  // Hero Features
  const handleAddHeroFeature = () => {
    const features = [...(form.heroFeatures || [])];
    features.push("New Practical Benefit");
    setForm({ ...form, heroFeatures: features });
  };

  const handleUpdateHeroFeature = (idx: number, val: string) => {
    const features = [...(form.heroFeatures || [])];
    features[idx] = val;
    setForm({ ...form, heroFeatures: features });
  };

  const handleRemoveHeroFeature = (idx: number) => {
    const features = (form.heroFeatures || []).filter((_: any, i: number) => i !== idx);
    setForm({ ...form, heroFeatures: features });
    setDeletingFeatureIndex(null);
  };

  // Campus Features
  const handleAddCampusFeature = () => {
    const features = [...(campusForm.features || [])];
    features.push("New Classroom Feature");
    setCampusForm({ ...campusForm, features: features });
  };

  const handleUpdateCampusFeature = (idx: number, val: string) => {
    const features = [...(campusForm.features || [])];
    features[idx] = val;
    setCampusForm({ ...campusForm, features: features });
  };

  const handleRemoveCampusFeature = (idx: number) => {
    const features = (campusForm.features || []).filter((_: any, i: number) => i !== idx);
    setCampusForm({ ...campusForm, features: features });
    setDeletingFeatureIndex(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('home', form, token!);
      await updateSection('campus', campusForm, token!);
      await updateSection('ctaSection', ctaForm, token!);
      toast.success('Home page content & sections saved successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Home Page Content & Sections</h2>
        <p className="text-gray-600 mt-1">Manage the hero headline, captions, stickers, statistics, physical campus gallery, and CTA banner.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* HERO SECTION */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="p-2 bg-green-100 text-green-800 rounded-lg">
              <Layout className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Hero Section</h3>
              <p className="text-xs text-gray-500">The main banner and first impressions for visitors.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Hero Top Badge / Sticker */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-800">Top Sticker / Live Badge</label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-600">
                  <input 
                    type="checkbox"
                    checked={form.heroBadgeEnabled !== false}
                    onChange={e => setForm({...form, heroBadgeEnabled: e.target.checked})}
                    className="w-4 h-4 rounded text-green-600 focus:ring-green-500"
                  />
                  Show Badge
                </label>
              </div>
              <Input 
                value={form.heroBadge || ''} 
                onChange={e => setForm({...form, heroBadge: e.target.value})}
                placeholder="e.g. Registration for 2026 Cohort is Open"
                className="bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Main Heading</label>
              <Input 
                value={form.heroHeading || ''} 
                onChange={e => setForm({...form, heroHeading: e.target.value})}
                placeholder="e.g. BUILD THE SKILLS OF TOMORROW, TODAY."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subheading / Caption</label>
              <Textarea 
                value={form.heroSubheading || ''} 
                onChange={e => setForm({...form, heroSubheading: e.target.value})}
                placeholder="Brief description under the main heading..."
                rows={3}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary CTA Button Text</label>
                <Input 
                  value={form.heroCtaText || ''} 
                  onChange={e => setForm({...form, heroCtaText: e.target.value})}
                  placeholder="e.g. ENROLL NOW"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary CTA Destination URL</label>
                <Input 
                  value={form.heroCtaUrl || ''} 
                  onChange={e => setForm({...form, heroCtaUrl: e.target.value})}
                  placeholder="/enrollment"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
                <Input 
                  value={form.heroSecondaryText || ''} 
                  onChange={e => setForm({...form, heroSecondaryText: e.target.value})}
                  placeholder="e.g. LEARN ABOUT OUR PROGRAMS"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button URL</label>
                <Input 
                  value={form.heroSecondaryUrl || ''} 
                  onChange={e => setForm({...form, heroSecondaryUrl: e.target.value})}
                  placeholder="/programs"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
                <Input 
                  value={form.heroImage || ''} 
                  onChange={e => setForm({...form, heroImage: e.target.value})}
                  placeholder="https://i.ibb.co/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image Alt / Caption</label>
                <Input 
                  value={form.heroImageCaption || ''} 
                  onChange={e => setForm({...form, heroImageCaption: e.target.value})}
                  placeholder="Students collaborating and coding..."
                />
              </div>
            </div>

            {/* Floating Satisfaction Metric Sticker */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 grid sm:grid-cols-3 gap-4 items-center">
              <div>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-800">
                  <input 
                    type="checkbox"
                    checked={form.heroStatEnabled !== false}
                    onChange={e => setForm({...form, heroStatEnabled: e.target.checked})}
                    className="w-4 h-4 rounded text-green-600 focus:ring-green-500"
                  />
                  Enable Floating Satisfaction Sticker
                </label>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Metric Value</label>
                <Input 
                  value={form.heroStatValue || ''} 
                  onChange={e => setForm({...form, heroStatValue: e.target.value})} 
                  placeholder="95%"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Metric Label</label>
                <Input 
                  value={form.heroStatLabel || ''} 
                  onChange={e => setForm({...form, heroStatLabel: e.target.value})} 
                  placeholder="Student Satisfaction"
                  className="bg-white"
                />
              </div>
            </div>

            {/* Hero Key Features / Checkmarks */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-800">Hero Highlights / Benefits (Checkmarks)</label>
                <Button type="button" size="sm" variant="outline" onClick={handleAddHeroFeature} className="gap-1 text-xs">
                  <Plus className="h-3.5 w-3.5" /> Add Benefit
                </Button>
              </div>
              <div className="space-y-2">
                {(form.heroFeatures || []).map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input 
                      value={feat} 
                      onChange={e => handleUpdateHeroFeature(idx, e.target.value)}
                      placeholder="e.g. Practical Learning"
                      className="bg-white"
                    />
                    <Button 
                      type="button" 
                      size="icon" 
                      variant="outline" 
                      onClick={() => setDeletingFeatureIndex({ type: 'hero', index: idx })}
                      className="text-red-500 hover:text-red-700 shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
        
        {/* STATISTICS GRID */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
              <BarChart className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Statistics Grid</h3>
              <p className="text-xs text-gray-500">Key metrics shown under the hero section.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 p-4 border rounded-xl bg-gray-50">
              <h4 className="font-semibold text-gray-800 text-sm">Statistic 1 (Top Left)</h4>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Value</label>
                <Input value={form.stat1Value || ''} onChange={e => setForm({...form, stat1Value: e.target.value})} placeholder="e.g. 500+" className="bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
                <Input value={form.stat1Label || ''} onChange={e => setForm({...form, stat1Label: e.target.value})} placeholder="e.g. Students Trained" className="bg-white" />
              </div>
            </div>
            
            <div className="space-y-3 p-4 border rounded-xl bg-gray-50">
              <h4 className="font-semibold text-gray-800 text-sm">Statistic 2 (Bottom Left)</h4>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Value</label>
                <Input value={form.stat2Value || ''} onChange={e => setForm({...form, stat2Value: e.target.value})} placeholder="e.g. 95%" className="bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
                <Input value={form.stat2Label || ''} onChange={e => setForm({...form, stat2Label: e.target.value})} placeholder="e.g. Success Rate" className="bg-white" />
              </div>
            </div>
            
            <div className="space-y-3 p-4 border rounded-xl bg-gray-50">
              <h4 className="font-semibold text-gray-800 text-sm">Statistic 3 (Top Right)</h4>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Value</label>
                <Input value={form.stat3Value || ''} onChange={e => setForm({...form, stat3Value: e.target.value})} placeholder="e.g. 20+" className="bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
                <Input value={form.stat3Label || ''} onChange={e => setForm({...form, stat3Label: e.target.value})} placeholder="e.g. Practical Projects" className="bg-white" />
              </div>
            </div>
            
            <div className="space-y-3 p-4 border rounded-xl bg-gray-50">
              <h4 className="font-semibold text-gray-800 text-sm">Statistic 4 (Bottom Right)</h4>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Value</label>
                <Input value={form.stat4Value || ''} onChange={e => setForm({...form, stat4Value: e.target.value})} placeholder="e.g. 10+" className="bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
                <Input value={form.stat4Label || ''} onChange={e => setForm({...form, stat4Label: e.target.value})} placeholder="e.g. Tech Programs" className="bg-white" />
              </div>
            </div>
          </div>
        </Card>

        {/* PHYSICAL CAMPUS SECTION */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Physical Campus Section</h3>
              <p className="text-xs text-gray-500">Showcase real classroom environments, features, and photos.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
              <Input 
                value={campusForm.title || ''} 
                onChange={e => setCampusForm({...campusForm, title: e.target.value})}
                placeholder="e.g. LEARN IN A REAL CLASSROOM."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Text (Accent Color)</label>
              <Input 
                value={campusForm.highlight || ''} 
                onChange={e => setCampusForm({...campusForm, highlight: e.target.value})}
                placeholder="e.g. BUILD REAL SKILLS."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description / Caption</label>
              <Textarea 
                value={campusForm.description || ''} 
                onChange={e => setCampusForm({...campusForm, description: e.target.value})}
                rows={3}
              />
            </div>
          </div>

          {/* Campus Images */}
          <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Image 1 URL</label>
              <Input 
                value={campusForm.image1 || ''} 
                onChange={e => setCampusForm({...campusForm, image1: e.target.value})} 
                placeholder="https://..."
                className="bg-white mb-2"
              />
              <Input 
                value={campusForm.caption1 || ''} 
                onChange={e => setCampusForm({...campusForm, caption1: e.target.value})} 
                placeholder="Caption 1"
                className="bg-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Image 2 URL</label>
              <Input 
                value={campusForm.image2 || ''} 
                onChange={e => setCampusForm({...campusForm, image2: e.target.value})} 
                placeholder="https://..."
                className="bg-white mb-2"
              />
              <Input 
                value={campusForm.caption2 || ''} 
                onChange={e => setCampusForm({...campusForm, caption2: e.target.value})} 
                placeholder="Caption 2"
                className="bg-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Image 3 URL</label>
              <Input 
                value={campusForm.image3 || ''} 
                onChange={e => setCampusForm({...campusForm, image3: e.target.value})} 
                placeholder="https://..."
                className="bg-white mb-2"
              />
              <Input 
                value={campusForm.caption3 || ''} 
                onChange={e => setCampusForm({...campusForm, caption3: e.target.value})} 
                placeholder="Caption 3"
                className="bg-white text-xs"
              />
            </div>
          </div>

          {/* Campus Features */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-800">Classroom Features & Amenities</label>
              <Button type="button" size="sm" variant="outline" onClick={handleAddCampusFeature} className="gap-1 text-xs">
                <Plus className="h-3.5 w-3.5" /> Add Feature
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {(campusForm.features || []).map((feat: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input 
                    value={feat} 
                    onChange={e => handleUpdateCampusFeature(idx, e.target.value)}
                    placeholder="e.g. Computer-based practical sessions"
                    className="bg-white text-sm"
                  />
                  <Button 
                    type="button" 
                    size="icon" 
                    variant="outline" 
                    onClick={() => setDeletingFeatureIndex({ type: 'campus', index: idx })}
                    className="text-red-500 hover:text-red-700 shrink-0 h-9 w-9"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* CALL TO ACTION (CTA) SECTION */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="p-2 bg-yellow-100 text-yellow-800 rounded-lg">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Bottom Call-to-Action (CTA) Banner</h3>
              <p className="text-xs text-gray-500">The primary high-contrast enrollment banner shown across the app.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sticker / Badge Text</label>
              <Input 
                value={ctaForm.sticker || ''} 
                onChange={e => setCtaForm({...ctaForm, sticker: e.target.value})}
                placeholder="e.g. START TODAY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <Input 
                value={ctaForm.heading || ''} 
                onChange={e => setCtaForm({...ctaForm, heading: e.target.value})}
                placeholder="e.g. YOUR TECHNOLOGY JOURNEY STARTS HERE."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subheading / Caption</label>
              <Textarea 
                value={ctaForm.subheading || ''} 
                onChange={e => setCtaForm({...ctaForm, subheading: e.target.value})}
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
              <Input 
                value={ctaForm.primaryText || ''} 
                onChange={e => setCtaForm({...ctaForm, primaryText: e.target.value})}
                placeholder="ENROLL NOW"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Destination URL</label>
              <Input 
                value={ctaForm.primaryUrl || ''} 
                onChange={e => setCtaForm({...ctaForm, primaryUrl: e.target.value})}
                placeholder="/enrollment"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Button Text</label>
              <Input 
                value={ctaForm.secondaryText || ''} 
                onChange={e => setCtaForm({...ctaForm, secondaryText: e.target.value})}
                placeholder="CHAT ON WHATSAPP"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pre-filled WhatsApp Message</label>
              <Input 
                value={ctaForm.whatsappMessage || ''} 
                onChange={e => setCtaForm({...ctaForm, whatsappMessage: e.target.value})}
                placeholder="Hello Green Codes Academy..."
              />
            </div>
          </div>
        </Card>

        {/* Sticky Save Bar */}
        <div className="flex justify-end sticky bottom-6 z-20">
          <Button type="submit" size="lg" disabled={isSaving} className="px-10 shadow-xl gap-2 text-base">
            <Save className="h-5 w-5" />
            {isSaving ? 'Saving Changes...' : 'Save All Home Page Content'}
          </Button>
        </div>
      </form>

      {/* Verification modal for deleting items */}
      <ConfirmModal 
        isOpen={deletingFeatureIndex !== null}
        title="Remove Item"
        message="Are you sure you want to remove this highlight feature from the page?"
        confirmText="Remove"
        onConfirm={() => {
          if (!deletingFeatureIndex) return;
          if (deletingFeatureIndex.type === 'hero') handleRemoveHeroFeature(deletingFeatureIndex.index);
          if (deletingFeatureIndex.type === 'campus') handleRemoveCampusFeature(deletingFeatureIndex.index);
        }}
        onClose={() => setDeletingFeatureIndex(null)}
      />
    </div>
  );
}
