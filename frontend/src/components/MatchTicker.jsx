import React, { useState } from 'react';
import { Radio, ChevronRight, Clock, Award, Shield } from 'lucide-react';

export default function MatchTicker({ matches = [], onSelectMatch, selectedMatchId }) {
  const [filter, setFilter] = useState('ALL');

  const filteredMatches = matches.filter(m => {
    if (filter === 'ALL') return true;
    if (filter === 'LIVE') return m.status === 'LIVE';
    if (filter === 'UPCOMING') return m.status === 'UPCOMING';
    if (filter === 'COMPLETED') return m.status === 'COMPLETED';
    if (filter === 'T20') return m.matchFormat === 'T20';
    if (filter === 'TEST') return m.matchFormat === 'TEST';
    if (filter === 'ODI') return m.matchFormat === 'ODI';
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'LIVE':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span>LIVE</span>
          </span>
        );
      case 'UPCOMING':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            UPCOMING
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            RESULT
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#12232c] border-b border-[#1b2f3c] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Ticker Header & Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Matches Ticker</span>
            </span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto text-xs py-1">
            {[
              { id: 'ALL', label: 'All' },
              { id: 'LIVE', label: '🔴 Live' },
              { id: 'UPCOMING', label: 'Upcoming' },
              { id: 'COMPLETED', label: 'Finished' },
              { id: 'T20', label: 'T20' },
              { id: 'TEST', label: 'Test' },
              { id: 'ODI', label: 'ODI' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition ${
                  filter === tab.id
                    ? 'bg-[#009270] text-white shadow'
                    : 'bg-[#182c38] text-slate-300 hover:text-white hover:bg-[#1e3645]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Match Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredMatches.map(match => {
            const isSelected = selectedMatchId === match._id || selectedMatchId === match.id;
            const isLive = match.status === 'LIVE';

            return (
              <div
                key={match._id || match.id}
                onClick={() => onSelectMatch(match)}
                className={`cursor-pointer group relative rounded-xl p-3.5 transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#18313f] border-emerald-500 shadow-glow'
                    : 'bg-[#152732] hover:bg-[#192f3d] border-[#223947] hover:border-slate-500'
                }`}
              >
                {/* Card Top: Series & Status */}
                <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[#203746] text-xs">
                  <div className="flex items-center space-x-1.5 overflow-hidden">
                    <span className="font-semibold text-slate-300 truncate text-[11px]">
                      {match.series}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-bold">
                      {match.matchFormat}
                    </span>
                  </div>
                  <div>{getStatusBadge(match.status)}</div>
                </div>

                {/* Team Scores */}
                <div className="space-y-2 mb-3">
                  {/* Team A */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={match.teamA?.flag}
                        alt={match.teamA?.name}
                        className="w-5 h-3.5 object-cover rounded shadow-sm border border-slate-700"
                        onError={(e) => {
                          e.target.src = 'https://flagcdn.com/w160/un.png';
                        }}
                      />
                      <span className="font-bold text-sm text-slate-100">
                        {match.teamA?.shortName || match.teamA?.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-sm text-slate-100">
                        {match.teamA?.score || 'Yet to Bat'}
                      </span>
                      {match.teamA?.overs && match.teamA?.score !== 'Yet to Bat' && (
                        <span className="text-[11px] text-slate-400 ml-1.5">
                          ({match.teamA.overs} ov)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Team B */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={match.teamB?.flag}
                        alt={match.teamB?.name}
                        className="w-5 h-3.5 object-cover rounded shadow-sm border border-slate-700"
                        onError={(e) => {
                          e.target.src = 'https://flagcdn.com/w160/un.png';
                        }}
                      />
                      <span className="font-bold text-sm text-slate-100">
                        {match.teamB?.shortName || match.teamB?.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`font-extrabold text-sm ${isLive ? 'text-emerald-400 font-black' : 'text-slate-100'}`}>
                        {match.teamB?.score || 'Yet to Bat'}
                      </span>
                      {match.teamB?.overs && match.teamB?.score !== 'Yet to Bat' && (
                        <span className="text-[11px] text-slate-400 ml-1.5">
                          ({match.teamB.overs} ov)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Note / Action */}
                <div className="pt-2 border-t border-[#203746] flex items-center justify-between text-xs">
                  <span className={`truncate max-w-[210px] text-[11px] ${
                    isLive ? 'text-amber-400 font-semibold' : 'text-slate-400'
                  }`}>
                    {match.statusNote || match.venue}
                  </span>

                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-0.5 group-hover:translate-x-0.5 transition">
                    <span>Center</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
