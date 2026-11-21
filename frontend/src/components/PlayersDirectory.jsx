import React, { useState } from 'react';
import { Search, Users, Award, Shield, ArrowUpRight, Filter } from 'lucide-react';

export default function PlayersDirectory({ players = [], onSelectPlayer }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedRole, setSelectedRole] = useState('ALL');

  const countries = [
    { id: 'ALL', name: 'All Nations' },
    { id: 'India', name: 'India', flag: 'https://flagcdn.com/w160/in.png' },
    { id: 'Australia', name: 'Australia', flag: 'https://flagcdn.com/w160/au.png' },
    { id: 'England', name: 'England', flag: 'https://flagcdn.com/w160/gb-eng.png' },
    { id: 'Pakistan', name: 'Pakistan', flag: 'https://flagcdn.com/w160/pk.png' },
    { id: 'South Africa', name: 'South Africa', flag: 'https://flagcdn.com/w160/za.png' },
    { id: 'New Zealand', name: 'New Zealand', flag: 'https://flagcdn.com/w160/nz.png' },
    { id: 'Afghanistan', name: 'Afghanistan', flag: 'https://flagcdn.com/w160/af.png' },
  ];

  const roles = ['ALL', 'Batter', 'Bowler', 'All-Rounder', 'Wicketkeeper'];

  const filteredPlayers = players.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCountry = selectedCountry === 'ALL' || p.country.toLowerCase() === selectedCountry.toLowerCase();
    const matchRole = selectedRole === 'ALL' || p.role.toLowerCase().includes(selectedRole.toLowerCase());
    return matchSearch && matchCountry && matchRole;
  });

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Title & Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#142833] p-5 rounded-2xl border border-[#203746]">
        <div>
          <h1 className="text-xl font-black text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <span>International Cricketers & Stars</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore career profiles, batting and bowling records, rankings, and stats.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search player or team..."
            className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Filters: Countries and Roles */}
      <div className="space-y-2.5">
        {/* Country Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          {countries.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCountry(c.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition border ${
                selectedCountry === c.id
                  ? 'bg-[#009270] text-white border-emerald-400 shadow'
                  : 'bg-[#152530] text-slate-300 border-[#223947] hover:bg-[#1c3342] hover:text-white'
              }`}
            >
              {c.flag && (
                <img src={c.flag} alt={c.name} className="w-4 h-3 object-cover rounded shadow-xs" />
              )}
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Role Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-slate-500 text-[11px] font-semibold flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Role:</span>
          </span>
          {roles.map(r => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedRole === r
                  ? 'bg-slate-200 text-slate-900 font-bold'
                  : 'bg-[#12222b] text-slate-400 hover:text-white hover:bg-[#1a3342]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Cricketers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPlayers.map(player => {
          const stats = player.stats || {};
          const odi = stats.odi || {};
          const test = stats.test || {};
          const t20 = stats.t20 || {};

          return (
            <div
              key={player.id}
              onClick={() => onSelectPlayer(player)}
              className="cursor-pointer group relative bg-[#142833] hover:bg-[#172f3d] border border-[#203746] hover:border-emerald-500/50 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 shadow-md flex flex-col justify-between"
            >
              {/* Card Header: Avatar & Country Flag */}
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="relative">
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-700 shadow group-hover:border-emerald-400 transition"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80';
                      }}
                    />
                    <img
                      src={player.countryFlag}
                      alt={player.country}
                      className="absolute -bottom-1 -right-1 w-6 h-4 object-cover rounded shadow border border-slate-800"
                    />
                  </div>

                  <div className="text-right">
                    {player.jerseyNumber > 0 && (
                      <span className="font-black text-xl text-slate-400 group-hover:text-emerald-400 transition">
                        #{player.jerseyNumber}
                      </span>
                    )}
                    <span className="block text-[11px] text-slate-400">{player.country}</span>
                  </div>
                </div>

                {/* Player Name & Role */}
                <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition">
                  {player.name}
                </h3>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-1">
                  {player.role}
                </span>

                {/* Quick Highlight Numbers */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#1e3442] text-center text-xs">
                  <div className="p-1.5 rounded bg-[#0e1d25]">
                    <span className="text-[10px] text-slate-400 block">ODI Runs</span>
                    <strong className="text-white font-extrabold">{odi.runs || 0}</strong>
                  </div>
                  <div className="p-1.5 rounded bg-[#0e1d25]">
                    <span className="text-[10px] text-slate-400 block">100s</span>
                    <strong className="text-amber-400 font-extrabold">{odi.centuries || test.centuries || 0}</strong>
                  </div>
                  <div className="p-1.5 rounded bg-[#0e1d25]">
                    <span className="text-[10px] text-slate-400 block">Wickets</span>
                    <strong className="text-emerald-400 font-extrabold">{test.wickets || odi.wickets || t20.wickets || 0}</strong>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-3 pt-2.5 border-t border-[#1e3442] flex items-center justify-between text-xs text-slate-400 group-hover:text-emerald-300">
                <span>View Full Career Record</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
