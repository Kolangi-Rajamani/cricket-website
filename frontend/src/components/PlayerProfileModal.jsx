import React from 'react';
import { X, Award, Shield, Activity, Calendar, MapPin, Hash } from 'lucide-react';

export default function PlayerProfileModal({ player, onClose }) {
  if (!player) return null;

  const stats = player.stats || {};
  const testStats = stats.test || {};
  const odiStats = stats.odi || {};
  const t20Stats = stats.t20 || {};
  const iccRank = player.iccRank || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#11222c] border border-[#223947] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-[#0b1820] border-b border-[#1b2f3c] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Cricketer Profile</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Banner */}
        <div className="bg-gradient-to-r from-[#172c38] via-[#162e3d] to-[#12222b] p-5 sm:p-6 border-b border-[#223947]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5">
            {/* Player Avatar */}
            <div className="relative">
              <img
                src={player.image}
                alt={player.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-emerald-500 shadow-xl"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80';
                }}
              />
              <img
                src={player.countryFlag}
                alt={player.country}
                className="absolute -bottom-2 -right-2 w-8 h-5 object-cover rounded shadow border border-slate-700"
              />
            </div>

            {/* Bio & Details */}
            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-black text-white">{player.name}</h2>
                {player.jerseyNumber && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center space-x-1">
                    <Hash className="w-3 h-3" />
                    <span>{player.jerseyNumber}</span>
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700">
                  {player.role}
                </span>
              </div>

              <div className="text-xs text-slate-300 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 pt-1">
                <span>Country: <strong className="text-white">{player.country}</strong></span>
                <span>Batting: <strong className="text-white">{player.battingStyle}</strong></span>
                <span>Bowling: <strong className="text-white">{player.bowlingStyle}</strong></span>
                {player.born && <span>Born: <strong className="text-white">{player.born}</strong></span>}
              </div>

              {player.bio && (
                <p className="text-xs text-slate-400 pt-2 leading-relaxed italic line-clamp-2">
                  "{player.bio}"
                </p>
              )}
            </div>
          </div>

          {/* ICC Rankings Bar */}
          <div className="mt-4 pt-3 border-t border-[#223947] flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 font-bold uppercase text-[11px] flex items-center space-x-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>ICC Rankings:</span>
            </span>
            <div className="flex items-center space-x-3 text-slate-300">
              <span>Test: <strong className="text-emerald-400">#{iccRank.testBatting || iccRank.testBowling || '—'}</strong></span>
              <span>ODI: <strong className="text-emerald-400">#{iccRank.odiBatting || iccRank.odiBowling || '—'}</strong></span>
              <span>T20I: <strong className="text-emerald-400">#{iccRank.t20Batting || iccRank.t20Bowling || '—'}</strong></span>
            </div>
          </div>
        </div>

        {/* Career Statistics Table */}
        <div className="p-5 overflow-y-auto space-y-5">
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Batting & Fielding Career Summary</span>
            </h4>
            <div className="overflow-x-auto rounded-xl border border-[#203746] bg-[#142833]">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0e1d25] text-slate-400 border-b border-[#203746]">
                  <tr>
                    <th className="py-2.5 px-3">Format</th>
                    <th className="py-2.5 px-3 text-right">Mat</th>
                    <th className="py-2.5 px-3 text-right">Inns</th>
                    <th className="py-2.5 px-3 text-right">Runs</th>
                    <th className="py-2.5 px-3 text-right">HS</th>
                    <th className="py-2.5 px-3 text-right">Avg</th>
                    <th className="py-2.5 px-3 text-right">SR</th>
                    <th className="py-2.5 px-3 text-right">100s</th>
                    <th className="py-2.5 px-3 text-right">50s</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e3442] text-slate-200">
                  <tr className="hover:bg-[#18313f]">
                    <td className="py-2.5 px-3 font-bold text-amber-400">Test</td>
                    <td className="py-2.5 px-3 text-right">{testStats.matches || 0}</td>
                    <td className="py-2.5 px-3 text-right">{testStats.innings || 0}</td>
                    <td className="py-2.5 px-3 text-right font-extrabold text-white">{testStats.runs || 0}</td>
                    <td className="py-2.5 px-3 text-right">{testStats.highest || '0'}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-400">{testStats.avg || 0}</td>
                    <td className="py-2.5 px-3 text-right">{testStats.sr || 0}</td>
                    <td className="py-2.5 px-3 text-right">{testStats.centuries || 0}</td>
                    <td className="py-2.5 px-3 text-right">{testStats.fifties || 0}</td>
                  </tr>
                  <tr className="hover:bg-[#18313f]">
                    <td className="py-2.5 px-3 font-bold text-blue-400">ODI</td>
                    <td className="py-2.5 px-3 text-right">{odiStats.matches || 0}</td>
                    <td className="py-2.5 px-3 text-right">{odiStats.innings || 0}</td>
                    <td className="py-2.5 px-3 text-right font-extrabold text-white">{odiStats.runs || 0}</td>
                    <td className="py-2.5 px-3 text-right">{odiStats.highest || '0'}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-400">{odiStats.avg || 0}</td>
                    <td className="py-2.5 px-3 text-right">{odiStats.sr || 0}</td>
                    <td className="py-2.5 px-3 text-right">{odiStats.centuries || 0}</td>
                    <td className="py-2.5 px-3 text-right">{odiStats.fifties || 0}</td>
                  </tr>
                  <tr className="hover:bg-[#18313f]">
                    <td className="py-2.5 px-3 font-bold text-emerald-400">T20I</td>
                    <td className="py-2.5 px-3 text-right">{t20Stats.matches || 0}</td>
                    <td className="py-2.5 px-3 text-right">{t20Stats.innings || 0}</td>
                    <td className="py-2.5 px-3 text-right font-extrabold text-white">{t20Stats.runs || 0}</td>
                    <td className="py-2.5 px-3 text-right">{t20Stats.highest || '0'}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-400">{t20Stats.avg || 0}</td>
                    <td className="py-2.5 px-3 text-right">{t20Stats.sr || 0}</td>
                    <td className="py-2.5 px-3 text-right">{t20Stats.centuries || 0}</td>
                    <td className="py-2.5 px-3 text-right">{t20Stats.fifties || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bowling Statistics */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Bowling Career Summary</span>
            </h4>
            <div className="overflow-x-auto rounded-xl border border-[#203746] bg-[#142833]">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0e1d25] text-slate-400 border-b border-[#203746]">
                  <tr>
                    <th className="py-2.5 px-3">Format</th>
                    <th className="py-2.5 px-3 text-right">Mat</th>
                    <th className="py-2.5 px-3 text-right">Wickets</th>
                    <th className="py-2.5 px-3 text-right">BBI</th>
                    <th className="py-2.5 px-3 text-right">Econ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e3442] text-slate-200">
                  <tr className="hover:bg-[#18313f]">
                    <td className="py-2.5 px-3 font-bold text-amber-400">Test</td>
                    <td className="py-2.5 px-3 text-right">{testStats.matches || 0}</td>
                    <td className="py-2.5 px-3 text-right font-extrabold text-emerald-400">{testStats.wickets || 0}</td>
                    <td className="py-2.5 px-3 text-right">{testStats.bestBowling || '0/0'}</td>
                    <td className="py-2.5 px-3 text-right">{testStats.economy || 0}</td>
                  </tr>
                  <tr className="hover:bg-[#18313f]">
                    <td className="py-2.5 px-3 font-bold text-blue-400">ODI</td>
                    <td className="py-2.5 px-3 text-right">{odiStats.matches || 0}</td>
                    <td className="py-2.5 px-3 text-right font-extrabold text-emerald-400">{odiStats.wickets || 0}</td>
                    <td className="py-2.5 px-3 text-right">{odiStats.bestBowling || '0/0'}</td>
                    <td className="py-2.5 px-3 text-right">{odiStats.economy || 0}</td>
                  </tr>
                  <tr className="hover:bg-[#18313f]">
                    <td className="py-2.5 px-3 font-bold text-emerald-400">T20I</td>
                    <td className="py-2.5 px-3 text-right">{t20Stats.matches || 0}</td>
                    <td className="py-2.5 px-3 text-right font-extrabold text-emerald-400">{t20Stats.wickets || 0}</td>
                    <td className="py-2.5 px-3 text-right">{t20Stats.bestBowling || '0/0'}</td>
                    <td className="py-2.5 px-3 text-right">{t20Stats.economy || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
