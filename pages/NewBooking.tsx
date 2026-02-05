
import React, { useState } from 'react';

const NewBooking: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="flex-1 overflow-y-auto p-8 h-full">
      <div className="max-w-[1000px] mx-auto flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Create New Booking</h1>
          <p className="text-slate-500 dark:text-slate-400">Fill in the details to receive a dynamic shipping quote.</p>
        </header>

        <div className="flex items-center justify-between relative px-10 mb-4">
          <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 dark:bg-slate-800 -z-0"></div>
          <StepIndicator active={step >= 1} current={step === 1} number={1} label="Route" />
          <StepIndicator active={step >= 2} current={step === 2} number={2} label="Cargo" />
          <StepIndicator active={step >= 3} current={step === 3} number={3} label="Service" />
          <StepIndicator active={step >= 4} current={step === 4} number={4} label="Payment" />
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-8">
          {step === 1 && (
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput label="Origin City / Port" placeholder="e.g. Shanghai (PVG)" icon="trip_origin" />
                <FormInput label="Destination City / Port" placeholder="e.g. London (LHR)" icon="location_on" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput label="Pickup Date" type="date" icon="calendar_today" />
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Ready for pickup?</label>
                  <div className="flex items-center gap-4 h-12">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="ready" className="text-primary focus:ring-primary" checked />
                      <span className="text-sm">Yes, immediate</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="ready" className="text-primary focus:ring-primary" />
                      <span className="text-sm">Scheduled</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-8">
              <FormInput label="Commodity Description" placeholder="e.g. Consumer Electronics" icon="category" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FormInput label="Total Weight (kg)" type="number" placeholder="0" icon="scale" />
                <FormInput label="Pieces / Boxes" type="number" placeholder="0" icon="inventory_2" />
                <FormInput label="Value (USD)" type="number" placeholder="0" icon="payments" />
              </div>
            </div>
          )}

          {step > 2 && (
             <div className="py-20 text-center flex flex-col items-center gap-4">
               <div className="size-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                 <span className="material-symbols-outlined text-4xl">check_circle</span>
               </div>
               <h3 className="text-xl font-bold">Details Received!</h3>
               <p className="text-slate-500 max-w-xs">Our system is calculating the best routes and rates for your shipment.</p>
             </div>
          )}

          <div className="flex justify-between mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
            <button 
              onClick={() => step > 1 && setStep(step - 1)}
              className={`px-8 py-3 rounded-xl font-bold border border-slate-300 dark:border-slate-700 transition-colors ${step === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              Back
            </button>
            <button 
              onClick={() => step < 4 && setStep(step + 1)}
              className="px-10 py-3 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all"
            >
              {step === 4 ? 'Confirm Booking' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepIndicator: React.FC<{ active: boolean; current: boolean; number: number; label: string }> = ({ active, current, number, label }) => (
  <div className="flex flex-col items-center gap-2 relative z-10">
    <div className={`size-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
      current ? 'bg-primary border-primary text-white shadow-lg' : 
      active ? 'bg-white dark:bg-slate-800 border-primary text-primary' : 
      'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-400'
    }`}>
      {number}
    </div>
    <span className={`text-xs font-bold uppercase tracking-wider ${active ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{label}</span>
  </div>
);

const FormInput: React.FC<{ label: string; placeholder?: string; type?: string; icon: string }> = ({ label, placeholder, type = 'text', icon }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">{label}</label>
    <div className="relative">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full h-12 pl-12 pr-4 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      />
    </div>
  </div>
);

export default NewBooking;
