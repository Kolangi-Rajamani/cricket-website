import React from 'react';
import { Radio, ShieldAlert, Award, Users, Newspaper, Calendar, Search, Activity, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, liveMatchCount = 2, isSimulating, onToggleSimulation }) {
  const navItems = [
    { id: 'matches', label: 'Live Scores', icon: Activity, badge: `${liveMatchCount} LIVE` },
    { id: 'news', label: 'News & Stories', icon: Newspaper },
    { id: 'rankings', label: 'ICC Rankings', icon: Award },
    { id: 'players', label: 'Players & Stats', icon: Users },
    { id: 'admin', label: 'Admin Console', icon: ShieldAlert, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0e1e25] border-b border-[#1b2f3c] shadow-lg">
      {/* Top Bar with Cricbuzz signature Green accent */}
      <div className="bg-[#009270] text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
              <span className="font-semibold tracking-wide uppercase text-[11px]">Match Centre Live</span>
            </span>
            <span className="hidden sm:inline text-emerald-100">|</span>
            <span className="hidden sm:inline text-emerald-100">ICC Champions Trophy Final: IND vs AUS live at MCG</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleSimulation}
              className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition ${
                isSimulating 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-emerald-900/60 hover:bg-emerald-900 text-white'
              }`}
              title="Automatically simulates ball-by-ball commentary and score changes"
            >
              <Sparkles className="w-3 h-3" />
              <span>{isSimulating ? 'Live Sim: Active' : 'Start Live Sim'}</span>
            </button>
            <span className="hidden md:inline text-emerald-200 text-[11px]"></span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setActiveTab('matches')}
              className="flex items-center space-x-2.5 group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-[#009270] flex items-center justify-center font-black text-xl text-white shadow-md group-hover:bg-[#00a676] transition">
                cb
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition">
                  cric<span className="text-[#009270]">buzz</span>
                </span>
                <span className="block text-[10px] text-slate-400 -mt-1 font-medium tracking-wider uppercase">Cricket Pulse</span>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                      item.highlight 
                        ? isActive
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                          : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                        : isActive
                          ? 'bg-[#1b2f3c] text-emerald-400 font-semibold border-b-2 border-[#009270]'
                          : 'text-slate-300 hover:text-white hover:bg-[#152530]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Area */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('admin')}
              className="lg:hidden flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold shadow"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center space-x-2 overflow-x-auto py-2 border-t border-[#1b2f3c] text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition ${
                  isActive
                    ? 'bg-[#009270] text-white font-semibold'
                    : 'bg-[#152530] text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
