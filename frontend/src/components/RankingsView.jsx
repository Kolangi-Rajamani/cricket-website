import React, { useState } from 'react';
import { Award, Trophy, Users, Shield } from 'lucide-react';

export default function RankingsView({ teams = [], players = [] }) {
  const [selectedFormat, setSelectedFormat] = useState('test');

  const sortedTeams = [...teams].sort((a, b) => {
    const rankA = a.ranking?.[selectedFormat]?.rank || 99;
    const rankB = b.ranking?.[selectedFormat]?.rank || 99;
    return rankA - rankB;
  });

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-[#142833] p-5 rounded-2xl border border-[#203746] flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Official ICC International Cricket Rankings</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Updated team standings and player rankings across Test, One Day Internationals, and T20Is.
          </p>
        </div>

        {/* Format Switcher */}
        <div className="flex items-center space-x-1.5 bg-[#0e1d25] p-1 rounded-xl border border-[#223947]">
          {['test', 'odi', 't20'].map(fmt => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                selectedFormat === fmt
                  ? 'bg-[#009270] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {fmt === 't20' ? 'T20I' : fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Team Rankings Table */}
      <div className="bg-[#142833] rounded-2xl border border-[#203746] overflow-hidden shadow-lg">
        <div className="px-5 py-4 border-b border-[#203746] flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center space-x-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="uppercase tracking-wider">ICC Men's {selectedFormat.toUpperCase()} Team Standings</span>
          </h3>
          <span className="text-xs text-slate-400">Leading the World</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0e1d25] text-slate-400 border-b border-[#203746]">
              <tr>
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-4">Team</th>
                <th className="py-3 px-4">Captain</th>
                <th className="py-3 px-4 text-right">Rating</th>
                <th className="py-3 px-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3442]">
              {sortedTeams.map((team, idx) => {
                const rk = team.ranking?.[selectedFormat] || { rank: idx + 1, rating: 100, points: 2500 };
                return (
                  <tr key={team.id} className="hover:bg-[#18313f] transition">
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-black text-xs ${
                        idx === 0 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                          : idx === 1
                            ? 'bg-slate-300/20 text-slate-200 border border-slate-400/40'
                            : idx === 2
                              ? 'bg-amber-700/20 text-amber-500 border border-amber-700/40'
                              : 'text-slate-400'
                      }`}>
                        {rk.rank || idx + 1}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={team.flag}
                          alt={team.name}
                          className="w-6 h-4 object-cover rounded shadow border border-slate-700"
                        />
                        <span className="font-extrabold text-sm text-white">{team.name}</span>
                        <span className="text-slate-500 text-[11px]">({team.shortName})</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-medium">
                      {team.captain || '—'}
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-emerald-400 text-sm">
                      {rk.rating}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-300 font-mono">
                      {rk.points?.toLocaleString() || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
