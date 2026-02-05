
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8 h-full">
      <div className="max-w-[800px] mx-auto flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Account Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your profile, company details, and system preferences.</p>
        </header>

        <section className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary text-2xl">person</span>
            <h2 className="text-xl font-bold">Personal Profile</h2>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="size-20 rounded-full bg-slate-200 dark:bg-slate-800 bg-cover bg-center ring-4 ring-slate-50 dark:ring-slate-900" style={{backgroundImage: `url('https://picsum.photos/seed/user/200/200')`}}></div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-all">Change Photo</button>
              <button className="text-slate-500 hover:text-red-500 text-sm font-bold transition-all">Remove</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <SettingsInput label="Full Name" value="Alex Morgan" />
               <SettingsInput label="Email Address" value="alex.morgan@cargofly.com" />
               <SettingsInput label="Phone Number" value="+1 (555) 000-0000" />
               <SettingsInput label="Role" value="Logistics Admin" disabled />
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary text-2xl">business</span>
            <h2 className="text-xl font-bold">Company Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <SettingsInput label="Company Name" value="Cargofly Logistics Inc." />
             <SettingsInput label="Tax ID / VAT" value="US-987654321" />
          </div>
        </section>

        <section className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary text-2xl">notifications</span>
            <h2 className="text-xl font-bold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <ToggleOption label="Shipment Status Updates" desc="Get notified when a shipment reaches a new milestone." defaultChecked />
            <ToggleOption label="Invoicing & Billing" desc="Alerts for new invoices and successful payments." defaultChecked />
            <ToggleOption label="System Alerts" desc="Critical operational and maintenance alerts." />
          </div>
        </section>

        <div className="flex justify-end gap-4 p-4 sticky bottom-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 -mx-8 -mb-8">
           <button className="px-6 py-2 rounded-lg border border-slate-300 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 transition-all">Cancel</button>
           <button className="px-6 py-2 rounded-lg bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

const SettingsInput: React.FC<{ label: string; value: string; disabled?: boolean }> = ({ label, value, disabled }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
    <input 
      defaultValue={value}
      disabled={disabled}
      className={`h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm font-medium ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    />
  </div>
);

const ToggleOption: React.FC<{ label: string; desc: string; defaultChecked?: boolean }> = ({ label, desc, defaultChecked }) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800 last:border-none">
    <div className="flex flex-col">
      <span className="text-sm font-bold text-slate-900 dark:text-white">{label}</span>
      <span className="text-xs text-slate-500">{desc}</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

export default Settings;
