
import React from 'react';
import { INVOICES } from '../constants.tsx';

const FinancialHub: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8 h-full">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Financial Hub</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage invoices, payments, and credit standing.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark text-sm font-bold hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Statement
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-md hover:bg-blue-700 transition-colors">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Funds
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FinCard label="Total Outstanding" value="$5,550.00" sub="2 invoices overdue" icon="account_balance_wallet" color="red" progress={75} />
          <FinCard label="Last Payment" value="$1,200.00" sub="Processed on Oct 15" icon="payments" color="emerald" progress={100} />
          <FinCard label="Available Credit" value="$21,550.00" sub="of $25k limit" icon="leaderboard" color="blue" progress={85} />
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Invoices</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Invoice #</th>
                  <th className="px-6 py-4">Issued</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {INVOICES.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined text-slate-400 text-lg">receipt</span>
                        {inv.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{inv.dateIssued}</td>
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">${inv.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-500">{inv.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        inv.status === 'Overdue' ? 'bg-red-50 text-red-700 border-red-100' :
                        'bg-orange-50 text-orange-700 border-orange-100'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary font-bold hover:underline">Pay Now</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinCard: React.FC<{ label: string; value: string; sub: string; icon: string; color: string; progress: number }> = ({ label, value, sub, icon, color, progress }) => (
  <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
    </div>
    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{value}</h3>
    <div className="mt-4">
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div className={`h-full bg-${color}-500 transition-all`} style={{width: `${progress}%`}}></div>
      </div>
      <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-wide">{sub}</p>
    </div>
  </div>
);

export default FinancialHub;
