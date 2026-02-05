
import React from 'react';
import { SHIPMENTS, CLAIMS } from '../constants.tsx';

const AdminOps: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8 h-full bg-[#0f172a] text-white">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Operations Overview</h1>
            <p className="text-slate-400">Real-time system status and logistics tracking.</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-800/50 p-2 rounded-xl border border-slate-700">
             <div className="flex flex-col px-3">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Alerts</span>
               <span className="text-sm font-black text-amber-500 flex items-center gap-1">
                 <span className="size-2 bg-amber-500 rounded-full animate-pulse"></span>
                 3 Issues
               </span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <OpsMetric label="Active Flights" value="14" sub="2 new departures" icon="flight" color="blue" />
          <OpsMetric label="Pending Bookings" value="342" sub="+12% vs yesterday" icon="inventory_2" color="purple" />
          <OpsMetric label="Fleet Status" value="92%" sub="2 in maintenance" icon="check_circle" color="emerald" />
          <OpsMetric label="Weather Alerts" value="3" sub="HKG, LON, TYO" icon="thunderstorm" color="amber" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
               <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
                 <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">Vessel Locations</h3>
                 <div className="flex gap-2">
                   <span className="text-[10px] font-black bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">AERIAL</span>
                 </div>
               </div>
               <div className="h-[400px] relative">
                  <img src="https://picsum.photos/seed/ops/1200/800" className="w-full h-full object-cover grayscale opacity-20" alt="World map" />
                  {/* Static Mock Markers */}
                  <div className="absolute top-[30%] left-[45%] flex flex-col items-center">
                    <span className="material-symbols-outlined text-white text-2xl rotate-45 animate-pulse">flight</span>
                    <span className="text-[9px] bg-black/80 px-1.5 py-0.5 rounded border border-slate-700">CF-892</span>
                  </div>
                  <div className="absolute top-[55%] left-[20%] flex flex-col items-center">
                    <span className="material-symbols-outlined text-amber-500 text-2xl rotate-90">flight</span>
                    <span className="text-[9px] bg-black/80 px-1.5 py-0.5 rounded border border-amber-500/50 text-amber-500">DELAYED</span>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
               <div className="p-4 border-b border-slate-800 bg-slate-800/30">
                 <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">Live Shipments</h3>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-xs">
                   <thead className="bg-slate-800/50 text-slate-500 font-black">
                     <tr>
                       <th className="px-6 py-3">ID</th>
                       <th className="px-6 py-3">ROUTE</th>
                       <th className="px-6 py-3">STATUS</th>
                       <th className="px-6 py-3">ETA</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800">
                     {SHIPMENTS.map(s => (
                       <tr key={s.id} className="hover:bg-slate-800 transition-colors">
                         <td className="px-6 py-4 font-bold text-primary">{s.id}</td>
                         <td className="px-6 py-4">{s.origin} → {s.destination}</td>
                         <td className="px-6 py-4">
                           <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[9px] font-black uppercase border border-slate-700">{s.status}</span>
                         </td>
                         <td className="px-6 py-4 font-mono text-slate-400">{s.eta || 'TBD'}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-6">Critical Alerts</h3>
              <div className="flex flex-col gap-6">
                <AlertBox title="Weather Delay: HKG" desc="Typhoon grounding flights for 6 hours." time="12m ago" severity="amber" />
                <AlertBox title="Fleet Maintenance" desc="Aircraft #CF-42 diverted to Dubai." time="45m ago" severity="red" />
                <AlertBox title="Customs Backlog" desc="Frankfurt hub processing delays." time="2h ago" severity="blue" />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-6">Recent Claims</h3>
              <div className="flex flex-col gap-4">
                {CLAIMS.map(c => (
                  <div key={c.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold">{c.id}</p>
                      <p className="text-[10px] text-slate-500">{c.type} - ${c.amount.toLocaleString()}</p>
                    </div>
                    <span className="text-[10px] font-black uppercase text-blue-400">Review</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OpsMetric: React.FC<{ label: string; value: string; sub: string; icon: string; color: string }> = ({ label, value, sub, icon, color }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-2xl flex flex-col gap-1 h-36 justify-between">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{label}</p>
        <h3 className="text-3xl font-black mt-1">{value}</h3>
      </div>
      <div className={`p-2 rounded bg-${color}-500/20 text-${color}-400`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
    </div>
    <p className="text-[10px] text-slate-400 font-medium">{sub}</p>
  </div>
);

const AlertBox: React.FC<{ title: string; desc: string; time: string; severity: string }> = ({ title, desc, time, severity }) => (
  <div className="flex items-start gap-4">
    <span className={`material-symbols-outlined text-${severity}-500 text-lg mt-0.5`}>{severity === 'red' ? 'error' : severity === 'amber' ? 'warning' : 'info'}</span>
    <div className="flex flex-col">
      <h4 className="text-xs font-bold">{title}</h4>
      <p className="text-[10px] text-slate-500 leading-normal">{desc}</p>
      <span className="text-[9px] text-slate-600 mt-1 font-bold">{time}</span>
    </div>
  </div>
);

export default AdminOps;
