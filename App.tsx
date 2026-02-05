
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ShipmentsList from './pages/ShipmentsList';
import FinancialHub from './pages/FinancialHub';
import NewBooking from './pages/NewBooking';
import AdminOps from './pages/AdminOps';
import Settings from './pages/Settings';
import NetworkView from './pages/NetworkView';
import TrackingDetail from './pages/TrackingDetail';
import AIChat from './components/AIChat';

const SidebarLink: React.FC<{ to: string; icon: string; label: string; active?: boolean }> = ({ to, icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
      active 
        ? 'bg-primary/10 text-primary' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`}
  >
    <span className={`material-symbols-outlined text-xl ${active ? 'fill-1' : 'group-hover:text-primary transition-colors'}`}>
      {icon}
    </span>
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="flex h-screen w-full flex-row overflow-hidden font-display">
        {/* Sidebar */}
        <aside className="flex h-full w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a202c] transition-all shrink-0">
          <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-center size-8 bg-primary rounded-lg text-white">
              <span className="material-symbols-outlined text-2xl">local_shipping</span>
            </div>
            <h1 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Cargofly</h1>
          </div>
          
          <div className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
            <SidebarContent />
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
             <button 
              onClick={() => setDarkMode(!darkMode)}
              className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
              <span className="text-sm font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <div className="flex items-center gap-3 mt-4 px-3">
              <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden bg-cover bg-center" style={{backgroundImage: `url('https://picsum.photos/seed/user/100/100')`}}></div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900 dark:text-white">Alex Morgan</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Admin</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/shipments" element={<ShipmentsList />} />
            <Route path="/shipments/:id" element={<TrackingDetail />} />
            <Route path="/financial" element={<FinancialHub />} />
            <Route path="/new-booking" element={<NewBooking />} />
            <Route path="/admin" element={<AdminOps />} />
            <Route path="/network" element={<NetworkView />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <AIChat />
        </main>
      </div>
    </Router>
  );
};

const SidebarContent: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <SidebarLink to="/" icon="dashboard" label="Dashboard" active={path === '/'} />
      <SidebarLink to="/shipments" icon="inventory_2" label="Shipments" active={path.startsWith('/shipments')} />
      <SidebarLink to="/new-booking" icon="add_circle" label="New Booking" active={path === '/new-booking'} />
      <SidebarLink to="/financial" icon="receipt_long" label="Financial Hub" active={path === '/financial'} />
      <SidebarLink to="/network" icon="map" label="Global Network" active={path === '/network'} />
      
      <div className="mt-8 mb-2 px-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Management</span>
      </div>
      <SidebarLink to="/admin" icon="admin_panel_settings" label="Operations" active={path === '/admin'} />
      <SidebarLink to="/settings" icon="settings" label="Settings" active={path === '/settings'} />
    </>
  );
}

export default App;
