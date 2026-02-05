
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { SHIPMENTS } from '../constants.tsx';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const MetricCard: React.FC<{ label: string; value: string; trend: string; icon: string; color: string }> = ({ label, value, trend, icon, color }) => (
  <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-1">
    <div className="flex justify-between items-start mb-2">
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">{label}</p>
      <div className={`p-2 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
    </div>
    <p className="text-slate-900 dark:text-white text-3xl font-bold">{value}</p>
    <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1 font-medium">
      <span className="material-symbols-outlined text-sm">trending_up</span> {trend}
    </p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8 h-full">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Overview</h1>
            <p className="text-slate-500 dark:text-slate-400">Welcome back, Alex. Here's what's happening today.</p>
          </div>
          <Link to="/new-booking" className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/20">
            <span className="material-symbols-outlined">add</span>
            New Shipment
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Active Shipments" value="12" trend="+2 new today" icon="local_shipping" color="blue" />
          <MetricCard label="Pending Quotes" value="3" trend="Review required" icon="request_quote" color="orange" />
          <MetricCard label="Total Spend (Mo)" value="$42,500" trend="+5% vs last month" icon="payments" color="emerald" />
          <MetricCard label="Avg. Transit" value="3.2 Days" trend="-0.4 Days" icon="schedule" color="purple" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Monthly Volume</h3>
              </div>
              <div className="p-6 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="value" fill="#1754cf" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Shipments</h3>
                <Link to="/shipments" className="text-sm font-semibold text-primary hover:underline">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {SHIPMENTS.slice(0, 3).map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-primary">{s.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 dark:text-white">{s.origin}</span>
                            <span className="text-xs text-slate-500">To: {s.destination}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {s.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link to={`/shipments/${s.id.replace('#', '')}`} className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">arrow_forward</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
              <div className="flex flex-col gap-6 relative pl-4 border-l border-slate-200 dark:border-slate-800">
                <ActivityItem title="Invoice Generated" desc="#INV-2024-01 for shipment #SHP-902." time="Just now" color="blue" />
                <ActivityItem title="Shipment Status" desc="#SHP-2023-001 is now 'In Transit'." time="2 hours ago" color="emerald" />
                <ActivityItem title="Quote Approved" desc="Abuja to Dubai quote approved." time="Yesterday" color="indigo" />
                <ActivityItem title="New Message" desc="Support agent replied to ticket #492." time="Nov 07, 2023" color="orange" />
              </div>
            </div>

            <div className="bg-primary rounded-xl p-6 text-white shadow-xl flex flex-col gap-4 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-9xl">rocket_launch</span>
              </div>
              <h3 className="text-xl font-bold relative z-10">Need express delivery?</h3>
              <p className="text-primary-50/80 text-sm relative z-10">Get your cargo delivered across the globe in under 24 hours with our premium priority air services.</p>
              <button className="bg-white text-primary rounded-lg px-4 py-2 font-bold text-sm w-fit hover:bg-slate-100 transition-colors relative z-10">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityItem: React.FC<{ title: string; desc: string; time: string; color: string }> = ({ title, desc, time, color }) => (
  <div className="relative">
    <div className={`absolute -left-[21px] top-1 size-2.5 rounded-full bg-${color}-500 ring-4 ring-white dark:ring-surface-dark`}></div>
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-slate-400 font-medium">{time}</span>
      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
    </div>
  </div>
);

export default Dashboard;
