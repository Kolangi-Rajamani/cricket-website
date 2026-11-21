import React from 'react';
import { Radio, Shield, Heart } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="bg-[#0b1820] border-t border-[#1b2f3c] text-xs text-slate-400 mt-12 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-7 h-7 rounded bg-[#009270] flex items-center justify-center font-black text-sm text-white">
                cb
              </div>
              <span className="text-lg font-black text-white">
                cric<span className="text-[#009270]">buzz</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              The world's premier cricket portal. Live scores, comprehensive ball-by-ball commentary, player statistics, and match coverage.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Mobile & Apps</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-emerald-400 transition cursor-pointer">Android App (Play Store)</span></li>
              <li><span className="hover:text-emerald-400 transition cursor-pointer">iOS App (App Store)</span></li>
              <li><span className="hover:text-emerald-400 transition cursor-pointer">Cricbuzz Plus Membership</span></li>
              <li><span className="hover:text-emerald-400 transition cursor-pointer">Smart TV Match App</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Tournaments</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-emerald-400 transition cursor-pointer">ICC Champions Trophy 2025</span></li>
              <li><span className="hover:text-emerald-400 transition cursor-pointer">Indian Premier League (IPL)</span></li>
              <li><span className="hover:text-emerald-400 transition cursor-pointer">World Test Championship (WTC)</span></li>
              <li><span className="hover:text-emerald-400 transition cursor-pointer">The Ashes Series</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Engineering & Admin</h4>
            <ul className="space-y-2">
              <li><span className="text-emerald-400 font-semibold">React + Node + Express + MongoDB</span></li>
              <li><span className="text-slate-400">Server-Sent Events (SSE) Live Feed</span></li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 hover:bg-amber-500/30 transition text-[11px]"
                >
                  Open Admin Scorer Console
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#162732] flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
          <span>© 2025-2026 Cricbuzz Clone. Built with React, Tailwind CSS, Express & MongoDB.</span>
          <span className="flex items-center space-x-1">
            <span>Powered by</span>
            <span className="text-emerald-400 font-bold">Node.js Live Engine</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
