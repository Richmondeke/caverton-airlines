
import React from 'react';

const NetworkView: React.FC = () => {
  return (
    <div className="flex h-full w-full">
      <aside className="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Global Hubs</h2>
          <p className="text-xs text-slate-500 mt-1">Select a region to view active routes.</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <RegionSection title="North America" active count={3} hubs={['New York (JFK)', 'Chicago (ORD)', 'Los Angeles (LAX)']} />
          <RegionSection title="Europe" count={5} hubs={['London (LHR)', 'Frankfurt (FRA)', 'Paris (CDG)']} />
          <RegionSection title="Asia Pacific" count={8} hubs={['Singapore (SIN)', 'Tokyo (NRT)', 'Hong Kong (HKG)']} />
          <RegionSection title="Middle East" count={2} hubs={['Dubai (DXB)', 'Abu Dhabi (AUH)']} />
        </div>
      </aside>

      <div className="flex-1 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/darkmap/1920/1080')] opacity-30 mix-blend-screen bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600">
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1754cf" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1754cf" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          <path d="M200,200 Q500,100 800,300" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8 4" className="opacity-40" />
          <path d="M200,200 Q300,400 600,500" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8 4" className="opacity-40" />
          
          <circle cx="200" cy="200" r="20" fill="url(#hubGlow)" />
          <circle cx="200" cy="200" r="4" fill="#3b82f6" />
          
          <circle cx="800" cy="300" r="15" fill="url(#hubGlow)" />
          <circle cx="800" cy="300" r="4" fill="#3b82f6" />

          <circle cx="600" cy="500" r="12" fill="url(#hubGlow)" />
          <circle cx="600" cy="500" r="4" fill="#3b82f6" />
        </svg>

        <div className="absolute top-6 left-6 max-w-xs bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-2xl">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">timeline</span>
            Live Network Status
          </h3>
          <p className="text-[10px] text-slate-400 leading-relaxed">Visualizing global connectivity between major hubs. Blue lines indicate primary air freight corridors.</p>
        </div>

        <div className="absolute bottom-6 right-6">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-2xl flex flex-col gap-3">
             <div className="flex items-center gap-2 text-xs text-white">
                <span className="size-2 rounded-full bg-primary shadow-lg shadow-primary"></span>
                <span>Active Route</span>
             </div>
             <div className="flex items-center gap-2 text-xs text-white">
                <span className="size-2 rounded-full bg-slate-600"></span>
                <span>Planned Hub</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegionSection: React.FC<{ title: string; active?: boolean; count: number; hubs: string[] }> = ({ title, active, count, hubs }) => (
  <div className="border-b border-slate-100 dark:border-slate-800">
    <button className={`w-full flex items-center justify-between px-6 py-4 ${active ? 'bg-slate-50 dark:bg-slate-800/50 border-l-4 border-primary' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
      <span className={`text-sm font-bold ${active ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>{title}</span>
      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-bold">{count}</span>
    </button>
    {active && (
      <div className="py-2 bg-white dark:bg-surface-dark">
        {hubs.map((hub) => (
          <div key={hub} className="px-10 py-2 hover:text-primary cursor-pointer text-sm font-medium text-slate-600 dark:text-slate-400">
            {hub}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default NetworkView;
