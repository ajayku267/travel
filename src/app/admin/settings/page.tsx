import { getSettings } from "@/lib/settings";
import { updateSettings } from "./actions";
import { Save } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = getSettings();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Site Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Update global information across the entire website from here.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <form action={updateSettings} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                Business Information
              </h2>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Company Name</label>
                <input 
                  name="companyName" 
                  defaultValue={settings.companyName}
                  className="w-full form-input bg-gray-50 focus:bg-white text-sm" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone Number</label>
                <input 
                  name="phone" 
                  defaultValue={settings.phone}
                  className="w-full form-input bg-gray-50 focus:bg-white text-sm" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email Address</label>
                <input 
                  name="email" 
                  type="email"
                  defaultValue={settings.email}
                  className="w-full form-input bg-gray-50 focus:bg-white text-sm" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">WhatsApp Number (For Link)</label>
                <input 
                  name="whatsapp" 
                  defaultValue={settings.whatsapp}
                  className="w-full form-input bg-gray-50 focus:bg-white text-sm" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                Website Content
              </h2>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Hero Title (Homepage)</label>
                <input 
                  name="heroTitle" 
                  defaultValue={settings.heroTitle}
                  className="w-full form-input bg-gray-50 focus:bg-white text-sm" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Hero Subtitle</label>
                <textarea 
                  name="heroSubtitle" 
                  defaultValue={settings.heroSubtitle}
                  rows={3}
                  className="w-full form-input bg-gray-50 focus:bg-white text-sm resize-none" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Store Address</label>
                <textarea 
                  name="address" 
                  defaultValue={settings.address}
                  rows={2}
                  className="w-full form-input bg-gray-50 focus:bg-white text-sm resize-none" 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex justify-end">
            <button type="submit" className="flex items-center gap-2 btn-primary px-6 py-2.5">
              <Save size={18} /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
