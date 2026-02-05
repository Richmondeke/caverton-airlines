
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SHIPMENTS } from '../constants.tsx';
import { ShipmentStatus } from '../types';

const ShipmentsList: React.FC = () => {
  const [filter, setFilter] = useState<ShipmentStatus | 'All'>('All');

  const filteredShipments = filter === 'All' 
    ? SHIPMENTS 
    : SHIPMENTS.filter(s => s.status === filter);

  return (
    <div className="flex-1 overflow-y-auto p-8 h-full">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Active Shipments</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage and track your active cargo worldwide.</p>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-surface-dark p-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto no-scrollbar">
            {['All', 'In Transit', 'Customs Hold', 'Delivered'].map((status) => (
              <button 
                key={status}
                onClick={() => setFilter(status as any)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                  filter === status 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </header>

        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Shipment ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Route</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Weight</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredShipments.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-primary">{s.id}</td>
                    <td className="px-6 py-4 text-slate-500">{s.dateCreated}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">{s.origin}</span>
                        <span className="material-symbols-outlined text-sm text-slate-400">arrow_forward</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{s.destination}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-lg">{s.serviceType.includes('Ocean') ? 'sailing' : 'flight'}</span>
                        {s.serviceType}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{s.weight}</td>
                    <td className="px-6 py-4">
                       <StatusBadge status={s.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/shipments/${s.id.replace('#', '')}`} className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-all" title="Track">
                          <span className="material-symbols-outlined">map</span>
                        </Link>
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-all">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-500 font-medium">Showing {filteredShipments.length} of {SHIPMENTS.length} active shipments</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-500 disabled:opacity-50">Prev</button>
              <button className="px-3 py-1 rounded border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-500">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: ShipmentStatus }> = ({ status }) => {
  let colors = "bg-blue-50 text-blue-700 border-blue-100";
  if (status === 'Delivered') colors = "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (status === 'Customs Hold') colors = "bg-orange-50 text-orange-700 border-orange-100";
  if (status === 'Exception') colors = "bg-red-50 text-red-700 border-red-100";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${colors}`}>
      {status}
    </span>
  );
};

export default ShipmentsList;
