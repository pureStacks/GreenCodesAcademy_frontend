import React, { useState, useEffect } from 'react';
import { useAppStore, useAuthStore } from '@/src/store';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Card } from '@/src/components/ui/Card';
import { ConfirmModal } from '@/src/components/ui/ConfirmModal';
import toast from 'react-hot-toast';
import { Save, Plus, Trash2, Sparkles, MessageCircle, Bell, Megaphone, Gift } from 'lucide-react';

export function PopupsAdmin() {
  const { data, updateSection } = useAppStore();
  const { token } = useAuthStore();
  
  // 1. Top Announcement Bar
  const [announcementForm, setAnnouncementForm] = useState<any>({
    enabled: true,
    sticker: "ADMISSIONS OPEN",
    message: "Registration for 2026 Cohort is now open! Limited seats available.",
    ctaText: "Enroll Today",
    ctaUrl: "/enrollment",
    bgColor: "bg-green-900",
    dismissible: true
  });

  // 2. Promo / Special Offer Modal Popup
  const [promoForm, setPromoForm] = useState<any>({
    enabled: false,
    sticker: "🔥 2026 ADMISSION SPECIAL",
    title: "Kickstart Your Tech Career",
    caption: "Get 15% discount on early registration for Full-Stack Web Development, Data Science, and Mobile App courses.",
    image: "https://i.ibb.co/B2jpgXwv/test.jpg",
    ctaText: "Claim Your Spot",
    ctaUrl: "/enrollment",
    delaySeconds: 4
  });

  // 3. WhatsApp Popup
  const [waForm, setWaForm] = useState<any>({
    enabled: true,
    heading: "NEED HELP WITH ENROLLMENT?",
    description: "Have questions about our programs, fees, schedule, or enrollment? Chat with us on WhatsApp.",
    buttonText: "CHAT ON WHATSAPP",
    prefilledMessage: "Hello Green Codes Academy, I would like to learn more about enrollment and your available programs."
  });

  // 4. Live / Custom Notifications
  const [notifForm, setNotifForm] = useState<any>({
    enabled: true,
    sticker: "NEW ENROLLMENT",
    source: "all",
    customAlerts: [
      { name: "Chinedu O.", location: "Ikeja, Lagos", program: "Full-Stack Web Development", timeAgo: "10 mins ago" },
      { name: "Amina B.", location: "Yaba, Lagos", program: "Data Science & AI", timeAgo: "25 mins ago" },
      { name: "Emeka K.", location: "Surulere, Lagos", program: "Mobile App Development", timeAgo: "1 hour ago" },
      { name: "Blessing T.", location: "Lekki, Lagos", program: "UI/UX Product Design", timeAgo: "2 hours ago" }
    ]
  });

  const [deletingAlertIndex, setDeletingAlertIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.announcement) setAnnouncementForm(data.announcement);
    if (data?.promoModal) setPromoForm(data.promoModal);
    if (data?.whatsappPopup) setWaForm(data.whatsappPopup);
    if (data?.notifications) setNotifForm(data.notifications);
  }, [data]);

  const handleAddCustomAlert = () => {
    const alerts = [...(notifForm.customAlerts || [])];
    alerts.push({
      name: "New Student",
      location: "Lagos",
      program: "Full-Stack Web Development",
      timeAgo: "Just now"
    });
    setNotifForm({ ...notifForm, customAlerts: alerts });
  };

  const handleUpdateCustomAlert = (index: number, field: string, val: string) => {
    const alerts = [...(notifForm.customAlerts || [])];
    alerts[index] = { ...alerts[index], [field]: val };
    setNotifForm({ ...notifForm, customAlerts: alerts });
  };

  const handleRemoveCustomAlert = (index: number) => {
    const alerts = (notifForm.customAlerts || []).filter((_: any, i: number) => i !== index);
    setNotifForm({ ...notifForm, customAlerts: alerts });
    setDeletingAlertIndex(null);
    toast.success('Alert notice removed');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('announcement', announcementForm, token!);
      await updateSection('promoModal', promoForm, token!);
      await updateSection('whatsappPopup', waForm, token!);
      await updateSection('notifications', notifForm, token!);
      toast.success('All popups, stickers & captions updated successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Popups, Stickers & Banners</h2>
        <p className="text-gray-600 mt-1">
          Customize all interactive overlays, announcement stickers, promotional popups, WhatsApp widgets, and social proof notifications.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Top Announcement Bar & Sticker */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 text-yellow-800 rounded-lg">
                <Megaphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Top Announcement Bar & Sticker</h3>
                <p className="text-xs text-gray-500">Displays at the very top of all pages across the website.</p>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-lg border">
              <input 
                type="checkbox" 
                checked={announcementForm.enabled} 
                onChange={e => setAnnouncementForm({...announcementForm, enabled: e.target.checked})}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="font-semibold text-sm text-gray-700">Enable Bar</span>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sticker / Badge Text</label>
              <Input 
                value={announcementForm.sticker || ''} 
                onChange={e => setAnnouncementForm({...announcementForm, sticker: e.target.value})}
                placeholder="e.g. ADMISSIONS OPEN or 🔥 LIMITED SEATS"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Style</label>
              <select
                value={announcementForm.bgColor || 'bg-green-900'}
                onChange={e => setAnnouncementForm({...announcementForm, bgColor: e.target.value})}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:border-green-500"
              >
                <option value="bg-green-900">Dark Green (Default)</option>
                <option value="bg-green-950">Deep Forest Green</option>
                <option value="bg-yellow-500 text-yellow-950">Vibrant Yellow Accent</option>
                <option value="bg-gray-900">Charcoal Dark</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Announcement Message / Caption</label>
              <Input 
                value={announcementForm.message || ''} 
                onChange={e => setAnnouncementForm({...announcementForm, message: e.target.value})}
                placeholder="e.g. Registration for 2026 Cohort is now open! Limited seats available."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Action Button Text</label>
              <Input 
                value={announcementForm.ctaText || ''} 
                onChange={e => setAnnouncementForm({...announcementForm, ctaText: e.target.value})}
                placeholder="e.g. Enroll Today"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Action Button Destination URL</label>
              <Input 
                value={announcementForm.ctaUrl || ''} 
                onChange={e => setAnnouncementForm({...announcementForm, ctaUrl: e.target.value})}
                placeholder="/enrollment or /programs"
              />
            </div>
          </div>
        </Card>

        {/* Section 2: Promotional Action Modal Popup */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-800 rounded-lg">
                <Gift className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Promotional Modal Popup</h3>
                <p className="text-xs text-gray-500">A high-conversion modal popup for special discounts or cohort openings.</p>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-lg border">
              <input 
                type="checkbox" 
                checked={promoForm.enabled} 
                onChange={e => setPromoForm({...promoForm, enabled: e.target.checked})}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="font-semibold text-sm text-gray-700">Enable Promo Modal</span>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sticker / Badge Text</label>
              <Input 
                value={promoForm.sticker || ''} 
                onChange={e => setPromoForm({...promoForm, sticker: e.target.value})}
                placeholder="e.g. 🔥 2026 ADMISSION SPECIAL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Popup Delay (Seconds)</label>
              <Input 
                type="number"
                min="1"
                max="30"
                value={promoForm.delaySeconds || 4} 
                onChange={e => setPromoForm({...promoForm, delaySeconds: parseInt(e.target.value) || 4})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Popup Title</label>
              <Input 
                value={promoForm.title || ''} 
                onChange={e => setPromoForm({...promoForm, title: e.target.value})}
                placeholder="e.g. Kickstart Your Tech Career"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Caption / Description</label>
              <Textarea 
                value={promoForm.caption || ''} 
                onChange={e => setPromoForm({...promoForm, caption: e.target.value})}
                placeholder="Details of the offer..."
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Promotional Image URL</label>
              <Input 
                value={promoForm.image || ''} 
                onChange={e => setPromoForm({...promoForm, image: e.target.value})}
                placeholder="https://i.ibb.co/..."
              />
              {promoForm.image && (
                <img src={promoForm.image} alt="Preview" className="mt-2 h-24 object-cover rounded-lg border" />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
              <Input 
                value={promoForm.ctaText || ''} 
                onChange={e => setPromoForm({...promoForm, ctaText: e.target.value})}
                placeholder="e.g. Claim Your Spot"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Destination URL</label>
              <Input 
                value={promoForm.ctaUrl || ''} 
                onChange={e => setPromoForm({...promoForm, ctaUrl: e.target.value})}
                placeholder="/enrollment"
              />
            </div>
          </div>
        </Card>

        {/* Section 3: WhatsApp Chat Popup */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-800 rounded-lg">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">WhatsApp Chat Floating Popup</h3>
                <p className="text-xs text-gray-500">Floating widget at bottom-right allowing direct student chats.</p>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-lg border">
              <input 
                type="checkbox" 
                checked={waForm.enabled} 
                onChange={e => setWaForm({...waForm, enabled: e.target.checked})}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="font-semibold text-sm text-gray-700">Enable WhatsApp</span>
            </label>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Popup Heading</label>
              <Input 
                value={waForm.heading || ''} 
                onChange={e => setWaForm({...waForm, heading: e.target.value})}
                placeholder="e.g. NEED HELP WITH ENROLLMENT?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Popup Description / Caption</label>
              <Textarea 
                value={waForm.description || ''} 
                onChange={e => setWaForm({...waForm, description: e.target.value})}
                rows={2}
                placeholder="Have questions about our programs, fees, schedule, or enrollment? Chat with us on WhatsApp."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <Input 
                  value={waForm.buttonText || ''} 
                  onChange={e => setWaForm({...waForm, buttonText: e.target.value})}
                  placeholder="e.g. CHAT ON WHATSAPP"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pre-filled WhatsApp Message</label>
                <Input 
                  value={waForm.prefilledMessage || ''} 
                  onChange={e => setWaForm({...waForm, prefilledMessage: e.target.value})}
                  placeholder="Hello Green Codes Academy, I would like to learn more..."
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Section 4: Live Social Proof & Enrollment Alerts */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Live Social Proof & Enrollment Alerts</h3>
                <p className="text-xs text-gray-500">Floating alerts showing recent student registrations at bottom-left.</p>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-1.5 rounded-lg border">
              <input 
                type="checkbox" 
                checked={notifForm.enabled} 
                onChange={e => setNotifForm({...notifForm, enabled: e.target.checked})}
                className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="font-semibold text-sm text-gray-700">Enable Alerts</span>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alert Sticker / Badge</label>
              <Input 
                value={notifForm.sticker || ''} 
                onChange={e => setNotifForm({...notifForm, sticker: e.target.value})}
                placeholder="e.g. NEW ENROLLMENT"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Source</label>
              <select
                value={notifForm.source || 'all'}
                onChange={e => setNotifForm({...notifForm, source: e.target.value})}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:border-green-500"
              >
                <option value="all">Both Live DB Enrollments + Custom Alerts (Recommended)</option>
                <option value="enrollments">Live Database Enrollments Only</option>
                <option value="custom">Custom Admin Alerts Only</option>
              </select>
            </div>
          </div>

          {/* Custom Alerts Manager */}
          <div className="pt-4 border-t space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">Custom Social Proof Alerts</h4>
                <p className="text-xs text-gray-500">Add, edit, or remove specific student enrollment captions.</p>
              </div>
              <Button type="button" size="sm" variant="outline" onClick={handleAddCustomAlert} className="gap-1.5">
                <Plus className="h-4 w-4" /> Add Alert
              </Button>
            </div>

            <div className="space-y-3">
              {(notifForm.customAlerts || []).map((alert: any, idx: number) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 grid sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Student Name</label>
                    <Input 
                      value={alert.name || ''} 
                      onChange={e => handleUpdateCustomAlert(idx, 'name', e.target.value)}
                      placeholder="e.g. Chinedu O."
                      className="bg-white"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Location / State</label>
                    <Input 
                      value={alert.location || ''} 
                      onChange={e => handleUpdateCustomAlert(idx, 'location', e.target.value)}
                      placeholder="e.g. Ikeja, Lagos"
                      className="bg-white"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Program</label>
                    <Input 
                      value={alert.program || ''} 
                      onChange={e => handleUpdateCustomAlert(idx, 'program', e.target.value)}
                      placeholder="e.g. Full-Stack Web Dev"
                      className="bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">Time Ago</label>
                    <Input 
                      value={alert.timeAgo || ''} 
                      onChange={e => handleUpdateCustomAlert(idx, 'timeAgo', e.target.value)}
                      placeholder="e.g. 10 mins ago"
                      className="bg-white"
                    />
                  </div>
                  <div className="sm:col-span-1 flex justify-end pt-5 sm:pt-0">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => setDeletingAlertIndex(idx)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-700 h-9 w-9"
                      title="Remove alert"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {(!notifForm.customAlerts || notifForm.customAlerts.length === 0) && (
                <div className="text-center py-6 text-sm text-gray-500 bg-gray-50 rounded-xl border border-dashed">
                  No custom alerts added. Click "Add Alert" to add social proof items.
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end sticky bottom-6 z-20">
          <Button type="submit" size="lg" disabled={isSaving} className="px-10 shadow-xl gap-2 text-base">
            <Save className="h-5 w-5" />
            {isSaving ? 'Saving Changes...' : 'Save All Popups & Stickers'}
          </Button>
        </div>
      </form>

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={deletingAlertIndex !== null}
        title="Remove Alert Notice"
        message="Are you sure you want to remove this social proof alert notice from your rotation?"
        confirmText="Remove Alert"
        onConfirm={() => deletingAlertIndex !== null && handleRemoveCustomAlert(deletingAlertIndex)}
        onClose={() => setDeletingAlertIndex(null)}
      />
    </div>
  );
}
