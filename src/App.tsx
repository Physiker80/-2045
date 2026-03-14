import React, { useState } from 'react';
import { 
  BarChart3, 
  Database, 
  Map as MapIcon, 
  FileText, 
  TrendingUp, 
  Users, 
  Building2, 
  ShieldCheck,
  Menu,
  X,
  Home
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Registers from './pages/Registers';
import AleppoCommandCenter from './pages/AleppoCommandCenter';
import GISPlatform from './pages/GISPlatform';
import InvestmentPlan from './pages/InvestmentPlan';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: Home },
    { id: 'registers', label: 'السجلات الوطنية', icon: Database },
    { id: 'aleppo', label: 'مركز القيادة 2045', icon: Building2 },
    { id: 'gis', label: 'منصة GIS', icon: MapIcon },
    { id: 'investment', label: 'الخطة الاستثمارية', icon: TrendingUp },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'registers': return <Registers />;
      case 'aleppo': return <AleppoCommandCenter />;
      case 'gis': return <GISPlatform />;
      case 'investment': return <InvestmentPlan />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row font-sans text-slate-300" dir="rtl">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-cyan-400" />
          <span className="font-bold text-lg tracking-wide">بوابة الإحصاء الوطني</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-400 hover:text-white">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        md:translate-x-0
        fixed md:sticky top-0 right-0 h-screen w-64 bg-slate-900/80 backdrop-blur-xl text-slate-300 
        transition-transform duration-300 ease-in-out z-40
        flex flex-col border-l border-slate-800/50 shadow-2xl shadow-black/50
      `}>
        <div className="p-6 hidden md:flex items-center gap-3 border-b border-slate-800/50">
          <div className="bg-cyan-500/10 border border-cyan-500/20 p-2.5 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <BarChart3 className="text-cyan-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-white leading-tight tracking-wide">بوابة الإحصاء</h1>
            <p className="text-[10px] uppercase tracking-widest text-cyan-500/80 mt-1 font-mono">National Stat-Sys</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 border
                  ${isActive 
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                    : 'border-transparent hover:bg-slate-800/50 hover:border-slate-700/50 hover:text-white'}
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 flex items-start gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500/50"></div>
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-200 tracking-wide">اتصال مشفر</p>
              <p className="text-[10px] text-slate-500 mt-1 font-mono">AES-256-GCM</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto overflow-x-hidden relative">
        {/* Subtle background grid for technical feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="relative z-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
