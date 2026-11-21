import React, { useState } from 'react';
import { X, Radio, Sparkles, TrendingUp, Users, Info, Shield, Award, Play } from 'lucide-react';

export default function MatchCenterModal({ match, onClose, onSimulateBall, isSimulating, onToggleSimulation }) {
  const [activeTab, setActiveTab] = useState('commentary');
  const [scorecardInning, setScorecardInning] = useState('inning2');

  if (!match) return null;

  const isLive = match.status === 'LIVE';
  const commentaryList = match.commentary || [];

  const getTagBadge = (tag, runs) => {
    switch (tag) {
      case 'SIX':
        return <span className="px-2 py-0.5 rounded-full text-xs font-black bg-purple-600 text-white shadow">6 SIX</span>;
      case 'FOUR':
        return <span className="px-2 py-0.5 rounded-full text-xs font-black bg-emerald-500 text-white shadow">4 FOUR</span>;
      case 'WICKET':
        return <span className="px-2 py-0.5 rounded-full text-xs font-black bg-red-600 text-white shadow animate-pulse">W WICKET</span>;
      case 'WIDE':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950">WD ({runs})</span>;
      case 'NOBALL':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-500 text-white">NB ({runs})</span>;
      case 'DOT':
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-700 text-slate-300">0</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white">{runs}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#11222c] border border-[#223947] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="bg-[#0b1820] border-b border-[#1b2f3c] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded bg-[#009270] flex items-center justify-center text-white font-black text-xs">
              CB
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                <span>{match.title}</span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-normal">{match.series}</span>
              </h2>
              <p className="text-[11px] text-slate-400">{match.venue}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isLive && (
              <button
                onClick={onToggleSimulation}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition ${
                  isSimulating
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSimulating ? 'Stop Auto-Sim' : 'Auto-Simulate Live'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Scorecard Header Banner */}
        <div className="bg-gradient-to-r from-[#142833] via-[#162e3d] to-[#12242e] p-4 sm:p-5 border-b border-[#223947]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Team A */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e1d25]/60 border border-slate-800">
              <div className="flex items-center space-x-3">
                <img
                  src={match.teamA?.flag}
                  alt={match.teamA?.name}
                  className="w-10 h-7 object-cover rounded shadow border border-slate-700"
                />
                <div>
                  <h3 className="font-bold text-base text-white">{match.teamA?.name}</h3>
                  <span className="text-xs text-slate-400">{match.teamA?.overs || '0.0'} Overs</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-white">{match.teamA?.score || '0/0'}</div>
                {match.teamA?.crr && (
                  <span className="text-xs text-slate-400">CRR: {match.teamA.crr}</span>
                )}
              </div>
            </div>

            {/* Team B */}
            <div className={`flex items-center justify-between p-3 rounded-xl border ${
              isLive ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-[#0e1d25]/60 border-slate-800'
            }`}>
              <div className="flex items-center space-x-3">
                <img
                  src={match.teamB?.flag}
                  alt={match.teamB?.name}
                  className="w-10 h-7 object-cover rounded shadow border border-slate-700"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base text-white">{match.teamB?.name}</h3>
                    {isLive && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">{match.teamB?.overs || '0.0'} Overs</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-black ${isLive ? 'text-emerald-400' : 'text-white'}`}>
                  {match.teamB?.score || '0/0'}
                </div>
                {match.teamB?.crr && (
                  <span className="text-xs text-slate-400">CRR: {match.teamB.crr}</span>
                )}
              </div>
            </div>
          </div>

          {/* Status Note & Quick Match Indicators */}
          <div className="mt-3.5 pt-3 border-t border-[#203746] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                {match.statusNote || 'Match in progress'}
              </span>
              {match.target > 0 && (
                <span className="text-slate-300">
                  Target: <strong className="text-white">{match.target}</strong>
                </span>
              )}
              {match.requiredRunRate > 0 && (
                <span className="text-slate-300">
                  RRR: <strong className="text-emerald-400">{match.requiredRunRate}</strong>
                </span>
              )}
            </div>

            <div className="text-slate-400 text-[11px]">
              {match.toss}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-[#223947] bg-[#0c1921] px-4">
          {[
            { id: 'commentary', label: 'Live Commentary' },
            { id: 'scorecard', label: 'Full Scorecard' },
            { id: 'info', label: 'Match Info & Squads' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-[#009270] text-emerald-400 bg-[#142833]/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents (Scrollable) */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: LIVE COMMENTARY */}
          {activeTab === 'commentary' && (
            <div className="space-y-4">
              {/* Pitch Live State: Current Batsmen & Bowler Widget */}
              {isLive && match.batsmen && match.batsmen.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#0c1a22] border border-[#1e3442]">
                  {/* Batsmen On Crease */}
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <span>🏏 Batting</span>
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      {match.batsmen.map((b, idx) => (
                        <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-[#132631]">
                          <div className="flex items-center space-x-1.5">
                            <span className="font-bold text-slate-100">{b.name}</span>
                            {b.isStriker && (
                              <span className="text-[10px] px-1.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                                Strike
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-slate-300">
                            <strong className="text-white">{b.runs}</strong>* ({b.balls}) • 4s: {b.fours} • 6s: {b.sixes} • SR: {b.sr}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bowler Spells */}
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <span>⚾ Bowling</span>
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      {match.bowlers && match.bowlers.map((bw, idx) => (
                        <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-[#132631]">
                          <div className="font-bold text-slate-100">{bw.name}</div>
                          <div className="font-mono text-slate-300">
                            {bw.overs} ov • {bw.maidens} m • <strong className="text-white">{bw.runs}</strong> r • <strong className="text-emerald-400">{bw.wickets}</strong> w • Eco: {bw.economy}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Single Ball Simulation Action */}
              {isLive && onSimulateBall && (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
                  <span className="text-xs text-emerald-200">
                    Want to see live commentary update right now?
                  </span>
                  <button
                    onClick={onSimulateBall}
                    className="flex items-center space-x-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition shadow"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Simulate 1 Ball</span>
                  </button>
                </div>
              )}

              {/* Ball-by-ball Feed */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>BALL-BY-BALL COMMENTARY</span>
                  <span>{commentaryList.length} updates logged</span>
                </div>

                {commentaryList.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 text-sm">
                    No commentary balls recorded yet.
                  </div>
                ) : (
                  commentaryList.map((comm, idx) => (
                    <div
                      key={comm.id || idx}
                      className="p-3.5 rounded-xl bg-[#142833]/80 border border-[#203746] hover:border-slate-600 transition flex items-start space-x-3.5"
                    >
                      {/* Over & Tag */}
                      <div className="flex flex-col items-center min-w-[54px]">
                        <span className="font-mono font-bold text-sm text-slate-200">{comm.ball}</span>
                        <div className="mt-1">{getTagBadge(comm.tag, comm.runs)}</div>
                      </div>

                      {/* Ball Narrative */}
                      <div className="flex-1 text-xs sm:text-sm leading-relaxed text-slate-200">
                        <p>{comm.text}</p>
                        {(comm.bowler || comm.batsman) && (
                          <div className="mt-1 text-[11px] text-slate-400 flex items-center space-x-2">
                            {comm.bowler && <span>Bowler: <strong className="text-slate-300">{comm.bowler}</strong></span>}
                            {comm.batsman && <span>• Batsman: <strong className="text-slate-300">{comm.batsman}</strong></span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SCORECARD */}
          {activeTab === 'scorecard' && (
            <div className="space-y-4">
              {/* Inning Switcher */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setScorecardInning('inning1')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    scorecardInning === 'inning1'
                      ? 'bg-[#009270] text-white'
                      : 'bg-[#152732] text-slate-300 hover:text-white'
                  }`}
                >
                  1st Innings: {match.scorecard?.inning1?.team || match.teamA?.name}
                </button>
                <button
                  onClick={() => setScorecardInning('inning2')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    scorecardInning === 'inning2'
                      ? 'bg-[#009270] text-white'
                      : 'bg-[#152732] text-slate-300 hover:text-white'
                  }`}
                >
                  2nd Innings: {match.scorecard?.inning2?.team || match.teamB?.name}
                </button>
              </div>

              {/* Selected Inning Data */}
              {(() => {
                const inn = match.scorecard?.[scorecardInning] || {};
                const batting = inn.batting || [];
                const bowling = inn.bowling || [];
                const fow = inn.fallOfWickets || [];

                return (
                  <div className="space-y-4">
                    {/* Inning Summary Card */}
                    <div className="p-3 rounded-lg bg-[#0c1a22] border border-[#1b2f3c] flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400">Batting Team: </span>
                        <strong className="text-white text-sm">{inn.team || 'Team'}</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400">Total: </span>
                        <strong className="text-emerald-400 text-sm font-black">{inn.total || '0/0'}</strong>
                      </div>
                    </div>

                    {/* Batting Table */}
                    <div className="overflow-x-auto rounded-xl border border-[#203746] bg-[#142833]">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#0e1d25] text-slate-400 border-b border-[#203746]">
                          <tr>
                            <th className="py-2.5 px-3">Batter</th>
                            <th className="py-2.5 px-3">Dismissal</th>
                            <th className="py-2.5 px-3 text-right">R</th>
                            <th className="py-2.5 px-3 text-right">B</th>
                            <th className="py-2.5 px-3 text-right">4s</th>
                            <th className="py-2.5 px-3 text-right">6s</th>
                            <th className="py-2.5 px-3 text-right">SR</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1e3442]">
                          {batting.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="py-6 text-center text-slate-500">
                                Detailed batting data recorded live
                              </td>
                            </tr>
                          ) : (
                            batting.map((b, i) => (
                              <tr key={i} className="hover:bg-[#18313f] transition">
                                <td className="py-2 px-3 font-bold text-slate-100">{b.name}</td>
                                <td className="py-2 px-3 text-slate-400 text-[11px]">{b.outStatus}</td>
                                <td className="py-2 px-3 text-right font-extrabold text-white">{b.runs}</td>
                                <td className="py-2 px-3 text-right text-slate-300">{b.balls}</td>
                                <td className="py-2 px-3 text-right text-slate-300">{b.fours}</td>
                                <td className="py-2 px-3 text-right text-slate-300">{b.sixes}</td>
                                <td className="py-2 px-3 text-right text-slate-300">{b.sr}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Extras */}
                    <div className="p-2.5 rounded-lg bg-[#0c1a22] border border-[#1b2f3c] text-xs text-slate-300 flex justify-between">
                      <span>Extras</span>
                      <span className="font-semibold">{inn.extras || '6 (w 4, nb 1, lb 1)'}</span>
                    </div>

                    {/* Bowling Table */}
                    {bowling.length > 0 && (
                      <div className="overflow-x-auto rounded-xl border border-[#203746] bg-[#142833]">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#0e1d25] text-slate-400 border-b border-[#203746]">
                            <tr>
                              <th className="py-2.5 px-3">Bowler</th>
                              <th className="py-2.5 px-3 text-right">O</th>
                              <th className="py-2.5 px-3 text-right">M</th>
                              <th className="py-2.5 px-3 text-right">R</th>
                              <th className="py-2.5 px-3 text-right">W</th>
                              <th className="py-2.5 px-3 text-right">ECON</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#1e3442]">
                            {bowling.map((bw, i) => (
                              <tr key={i} className="hover:bg-[#18313f] transition">
                                <td className="py-2 px-3 font-bold text-slate-100">{bw.name}</td>
                                <td className="py-2 px-3 text-right text-slate-300">{bw.overs}</td>
                                <td className="py-2 px-3 text-right text-slate-300">{bw.maidens}</td>
                                <td className="py-2 px-3 text-right text-slate-300">{bw.runs}</td>
                                <td className="py-2 px-3 text-right font-extrabold text-emerald-400">{bw.wickets}</td>
                                <td className="py-2 px-3 text-right text-slate-300">{bw.economy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Fall of Wickets */}
                    {fow.length > 0 && (
                      <div className="p-3 rounded-lg bg-[#0c1a22] border border-[#1b2f3c]">
                        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Fall of Wickets
                        </h5>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {fow.map((f, i) => (
                            <span key={i} className="px-2 py-1 rounded bg-[#132631] text-slate-300 border border-slate-700">
                              <strong className="text-white">{f.score}</strong> ({f.player}, {f.over} ov)
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 3: MATCH INFO */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#142833] border border-[#203746] space-y-2.5 text-xs">
                  <h4 className="font-bold text-sm text-white border-b border-[#203746] pb-2">
                    Match Details
                  </h4>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Series:</span>
                    <span className="font-semibold text-slate-200">{match.series}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Match:</span>
                    <span className="font-semibold text-slate-200">{match.title}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Date & Time:</span>
                    <span className="font-semibold text-slate-200">{match.date} • {match.time}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Venue:</span>
                    <span className="font-semibold text-slate-200">{match.venue}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Toss:</span>
                    <span className="font-semibold text-amber-300">{match.toss || 'TBD'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#142833] border border-[#203746] space-y-2.5 text-xs">
                  <h4 className="font-bold text-sm text-white border-b border-[#203746] pb-2">
                    Venue & Officials
                  </h4>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">City / Country:</span>
                    <span className="font-semibold text-slate-200">Melbourne, Australia</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Pitch Condition:</span>
                    <span className="font-semibold text-slate-200">Even bounce, good carry</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Umpires:</span>
                    <span className="font-semibold text-slate-200">Richard Illingworth, Nitin Menon</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Match Referee:</span>
                    <span className="font-semibold text-slate-200">Javagal Srinath</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
