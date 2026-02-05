
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SHIPMENTS } from '../constants.tsx';

const TrackingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const shipment = SHIPMENTS.find(s => s.id.includes(id || ''));

  if (!shipment) return <div className="p-8">Shipment not found.</div>;

  return (
    <div className="flex-1 overflow-y-auto p-8 h-full bg-slate-50 dark:bg-background-dark">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        <header className="flex items-center gap-4">
          <Link to="/shipments" className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Tracking {shipment.id}</h1>
              <span className="bg-primary text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">Live</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400">Current position: International Airspace over Greenland</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-[450px] relative group">
              <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 opacity-50 flex items-center justify-center">
                <img src="https://picsum.photos/seed/map/1200/800" className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-overlay" alt="Map pattern" />
              </div>
              
              {/* Simulated Map Visuals */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400">
                <path d="M 100 300 Q 400 50 700 150" fill="none" stroke="#1754cf" strokeWidth="3" strokeDasharray="10 5" strokeLinecap="round" className="opacity-60" />
                <circle cx="100" cy="300" r="6" fill="#1754cf" />
                <circle cx="450" cy="115" r="8" fill="#1754cf" className="animate-ping opacity-40" />
                <circle cx="450" cy="115" r="5" fill="#1754cf" />
                <circle cx="700" cy="150" r="6" fill="#cbd5e1" />
              </svg>

              <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 py-2 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800">
                 <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Vessel</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Atlantic Express - V192</span>
                 </div>
              </div>

              <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                 <button className="size-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center hover:text-primary transition-all"><span className="material-symbols-outlined">add</span></button>
                 <button className="size-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg flex items-center justify-center hover:text-primary transition-all"><span className="material-symbols-outlined">remove</span></button>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Detailed Milestone History</h3>
              <div className="flex flex-col gap-8 relative pl-6 border-l border-slate-200 dark:border-slate-800">
                <TimelineItem title="Arrived at Hub" location="Shanghai Port (PVG)" time="Today, 08:00 AM" status="Completed" />
                <TimelineItem title="Customs Clearance" location="Shanghai Customs" time="Oct 23, 02:15 PM" status="Completed" />
                <TimelineItem title="Shipment Picked Up" location="Factory Warehouse A" time="Oct 22, 10:00 AM" status="Completed" />
                <TimelineItem title="Booking Confirmed" location="Digital Portal" time="Oct 21, 11:30 AM" status="Completed" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Shipment Details</h3>
              <div className="flex flex-col gap-4">
                <DetailRow label="Origin" value={shipment.origin} icon="trip_origin" />
                <DetailRow label="Destination" value={shipment.destination} icon="location_on" />
                <DetailRow label="Weight" value={shipment.weight} icon="scale" />
                <DetailRow label="ETA" value={shipment.eta || 'Calculating...'} icon="event" />
                <DetailRow label="Status" value={shipment.status} icon="info" highlight />
              </div>
              <button className="w-full mt-6 py-2.5 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-all text-sm">
                Download Documents
              </button>
            </div>

            <div className="bg-emerald-600 rounded-xl p-6 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 opacity-20 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-9xl">support_agent</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Need Help?</h3>
              <p className="text-emerald-50 text-xs mb-4">Our logistics support is available 24/7 for urgent inquiries regarding your cargo.</p>
              <button className="bg-white text-emerald-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineItem: React.FC<{ title: string; location: string; time: string; status: string }> = ({ title, location, time, status }) => (
  <div className="relative">
    <div className="absolute -left-[31px] top-1 size-3.5 rounded-full bg-primary ring-4 ring-white dark:ring-surface-dark"></div>
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-slate-400 font-medium">{time}</span>
      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400">{location}</p>
    </div>
  </div>
);

const DetailRow: React.FC<{ label: string; value: string; icon: string; highlight?: boolean }> = ({ label, value, icon, highlight }) => (
  <div className="flex items-center gap-3">
    <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
      <span className="material-symbols-outlined text-lg">{icon}</span>
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</span>
      <span className={`text-sm font-bold ${highlight ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{value}</span>
    </div>
  </div>
);

export default TrackingDetail;
