import React, { useState } from 'react';
import { ShieldAlert, Plus, Trash2, Edit3, Sparkles, RefreshCw, Radio, CheckCircle, AlertCircle, Play, Square } from 'lucide-react';

export default function AdminDashboard({
  matches = [],
  players = [],
  teams = [],
  news = [],
  onScoreBall,
  onSimulateBall,
  isSimulating,
  onToggleSimulation,
  onCreateMatch,
  onDeleteMatch,
  onCreatePlayer,
  onDeletePlayer,
  onCreateNews,
  onResetDatabase
}) {
  const [activeAdminTab, setActiveAdminTab] = useState('scorer');
  const [selectedMatchId, setSelectedMatchId] = useState(matches[0]?._id || matches[0]?.id || '');
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  // Scorer state
  const [ballRuns, setBallRuns] = useState(1);
  const [isWicket, setIsWicket] = useState(false);
  const [extraType, setExtraType] = useState('');
  const [commentaryText, setCommentaryText] = useState('');
  const [bowlerName, setBowlerName] = useState('');
  const [batsmanName, setBatsmanName] = useState('');

  // New Match Form State
  const [newMatch, setNewMatch] = useState({
    title: 'India vs Pakistan, Super 4',
    series: 'Asia Cup 2025',
    matchFormat: 'T20',
    venue: 'Dubai International Cricket Stadium',
    date: 'Today',
    time: '19:30 IST',
    toss: 'India won the toss and elected to bat',
    status: 'LIVE',
    teamAId: 'ind',
    teamBId: 'pak',
    teamAScore: '178/4',
    teamAOvers: '20.0',
    teamBScore: '142/3',
    teamBOvers: '15.2',
    statusNote: 'Pakistan need 37 runs in 28 balls'
  });

  // New Player Form State
  const [newPlayer, setNewPlayer] = useState({
    name: 'Yashasvi Jaiswal',
    fullName: 'Yashasvi Bhupendra Kumar Jaiswal',
    country: 'India',
    countryCode: 'in',
    role: 'Batter',
    jerseyNumber: 64,
    battingStyle: 'Left Handed Bat',
    bowlingStyle: 'Right-arm legbreak',
    born: 'Dec 28, 2001 (Age 24)',
    age: 24,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80',
    bio: 'Dynamic young opening sensation known for fearless attacking strokeplay and double centuries in Test cricket.',
    testRuns: 1407,
    testAvg: 56.28,
    t20Runs: 723,
    t20SR: 164.3
  });

  // New News Article State
  const [newArticle, setNewArticle] = useState({
    title: 'Champions Trophy: Road to the Finals',
    subtitle: 'Comprehensive tournament breakdown and tactical masterclasses.',
    category: 'Analysis',
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80',
    author: 'Cricbuzz Analyst Desk',
    content: 'An exhilarating tournament reaches its crescendo with high-voltage cricket across venues.'
  });

  const showFeedback = (text, type = 'success') => {
    setStatusMsg({ text, type });
    setTimeout(() => setStatusMsg({ text: '', type: '' }), 4000);
  };

  const currentMatch = matches.find(m => (m._id === selectedMatchId || m.id === selectedMatchId)) || matches[0];

  const handleScoreSubmit = async (e) => {
    e.preventDefault();
    if (!currentMatch) return;

    try {
      await onScoreBall(currentMatch._id || currentMatch.id, {
        runs: ballRuns,
        isExtra: Boolean(extraType),
        extraType,
        isWicket,
        text: commentaryText || `${ballRuns} run(s) scored.`,
        bowlerName: bowlerName || currentMatch.bowlers?.[0]?.name,
        batsmanName: batsmanName || currentMatch.batsmen?.[0]?.name,
      });

      setCommentaryText('');
      setIsWicket(false);
      setExtraType('');
      showFeedback(`Ball scored successfully (+${ballRuns} runs)!`);
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  const handleCreateMatchSubmit = async (e) => {
    e.preventDefault();
    try {
      const teamA = teams.find(t => t.id === newMatch.teamAId) || { name: 'Team A', shortName: 'TMA', flag: 'https://flagcdn.com/w160/in.png' };
      const teamB = teams.find(t => t.id === newMatch.teamBId) || { name: 'Team B', shortName: 'TMB', flag: 'https://flagcdn.com/w160/pk.png' };

      await onCreateMatch({
        ...newMatch,
        teamA: {
          id: teamA.id,
          name: teamA.name,
          shortName: teamA.shortName,
          flag: teamA.flag,
          score: newMatch.teamAScore,
          overs: newMatch.teamAOvers
        },
        teamB: {
          id: teamB.id,
          name: teamB.name,
          shortName: teamB.shortName,
          flag: teamB.flag,
          score: newMatch.teamBScore,
          overs: newMatch.teamBOvers
        }
      });
      showFeedback('Match created successfully!');
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  const handleCreatePlayerSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCreatePlayer({
        ...newPlayer,
        countryFlag: `https://flagcdn.com/w160/${newPlayer.countryCode}.png`,
        stats: {
          test: { matches: 15, runs: Number(newPlayer.testRuns), avg: Number(newPlayer.testAvg), centuries: 3, fifties: 5 },
          t20: { matches: 23, runs: Number(newPlayer.t20Runs), sr: Number(newPlayer.t20SR), centuries: 1, fifties: 5 }
        }
      });
      showFeedback(`Player ${newPlayer.name} added successfully!`);
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  const handleCreateNewsSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCreateNews(newArticle);
      showFeedback('Cricket News published successfully!');
    } catch (err) {
      showFeedback(err.message, 'error');
    }
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#172c38] to-[#12222b] p-5 rounded-2xl border border-[#223947] flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white flex items-center space-x-2">
              <span>Cricbuzz Admin & Live Scorer Console</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Full Control
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Score live matches ball-by-ball, stream updates, manage cricketers, fixtures, and news.
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSimulation}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow ${
              isSimulating
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isSimulating ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isSimulating ? 'Stop Auto-Simulation' : 'Auto-Run Live Simulation'}</span>
          </button>

          <button
            onClick={async () => {
              if (window.confirm('Reset all match scores, players and news to pristine Cricbuzz seed data?')) {
                await onResetDatabase();
                showFeedback('Database reset to default Cricbuzz seed data!');
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#1b2f3c] hover:bg-[#233c4d] text-slate-300 text-xs font-semibold border border-slate-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default Data</span>
          </button>
        </div>
      </div>

      {/* Status Feedback alert */}
      {statusMsg.text && (
        <div className={`p-3 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
          statusMsg.type === 'error'
            ? 'bg-red-950/50 text-red-300 border border-red-500/40'
            : 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/40'
        }`}>
          {statusMsg.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#203746] pb-2 overflow-x-auto text-xs">
        {[
          { id: 'scorer', label: '⚾ Live Match Scorer Console' },
          { id: 'matches', label: '🏏 Manage Matches' },
          { id: 'players', label: '👤 Manage Cricketers' },
          { id: 'news', label: '📰 Publish News' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id)}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition ${
              activeAdminTab === tab.id
                ? 'bg-[#009270] text-white shadow'
                : 'bg-[#152530] text-slate-400 hover:text-white hover:bg-[#1b2f3c]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: LIVE MATCH SCORER */}
      {activeAdminTab === 'scorer' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Scorer Control Console */}
          <div className="lg:col-span-2 space-y-5 bg-[#142833] p-5 rounded-2xl border border-[#203746]">
            {/* Select Match to Score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#203746]">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Select Active Match
                </label>
                <select
                  value={selectedMatchId}
                  onChange={(e) => setSelectedMatchId(e.target.value)}
                  className="bg-[#0e1d25] border border-[#2a4354] rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                >
                  {matches.map(m => (
                    <option key={m._id || m.id} value={m._id || m.id}>
                      {m.title} ({m.status})
                    </option>
                  ))}
                </select>
              </div>

              {currentMatch && (
                <div className="text-right">
                  <span className="text-xs text-slate-400">Current Score:</span>
                  <div className="text-lg font-black text-emerald-400">
                    {currentMatch.teamB?.shortName} {currentMatch.teamB?.score} ({currentMatch.teamB?.overs} ov)
                  </div>
                </div>
              )}
            </div>

            {/* Quick Scoring Buttons */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
                Quick Score Keypad (Click to select runs scored on this ball)
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {[
                  { r: 0, label: '0 (Dot)' },
                  { r: 1, label: '1 Single' },
                  { r: 2, label: '2 Two' },
                  { r: 3, label: '3 Three' },
                  { r: 4, label: '4 FOUR', highlight: 'emerald' },
                  { r: 6, label: '6 SIX', highlight: 'purple' },
                ].map(item => (
                  <button
                    key={item.r}
                    type="button"
                    onClick={() => {
                      setBallRuns(item.r);
                      setIsWicket(false);
                      if (item.r === 4) setCommentaryText('FOUR! Smashed cleanly through the gap to the fence!');
                      else if (item.r === 6) setCommentaryText('SIX! Towering maximum soaring over the boundary rope!');
                      else if (item.r === 1) setCommentaryText('Pushed into the gap for a smart single.');
                      else if (item.r === 0) setCommentaryText('Good length ball, defended back safely to the bowler.');
                    }}
                    className={`py-3 rounded-xl text-xs font-black transition border ${
                      ballRuns === item.r && !isWicket
                        ? item.highlight === 'emerald'
                          ? 'bg-emerald-500 text-white border-emerald-400 shadow-glow'
                          : item.highlight === 'purple'
                            ? 'bg-purple-600 text-white border-purple-400 shadow-glow'
                            : 'bg-blue-600 text-white border-blue-400 shadow-glow'
                        : 'bg-[#0e1d25] text-slate-200 border-[#223947] hover:bg-[#1a3342]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Wicket Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsWicket(true);
                    setBallRuns(0);
                    setCommentaryText('OUT! What a massive breakthrough! Clean bowled with an unplayable yorker!');
                  }}
                  className={`py-3 rounded-xl text-xs font-black transition border ${
                    isWicket
                      ? 'bg-red-600 text-white border-red-500 shadow-glow animate-pulse'
                      : 'bg-red-950/40 text-red-300 border-red-800/60 hover:bg-red-900/50'
                  }`}
                >
                  W WICKET!
                </button>
              </div>
            </div>

            {/* Extras Selection */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-slate-400 font-medium">Extras:</span>
              {[
                { id: '', label: 'None' },
                { id: 'WIDE', label: 'Wide' },
                { id: 'NOBALL', label: 'No Ball' },
                { id: 'BYE', label: 'Bye' },
                { id: 'LEG_BYE', label: 'Leg Bye' }
              ].map(ex => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => setExtraType(ex.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
                    extraType === ex.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-[#0e1d25] text-slate-300 border-[#223947] hover:bg-[#1a3342]'
                  }`}
                >
                  {ex.label}
                </button>
              ))}
            </div>

            {/* Commentary text input */}
            <form onSubmit={handleScoreSubmit} className="space-y-4 pt-3 border-t border-[#203746]">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  Ball Commentary Description
                </label>
                <textarea
                  rows="2"
                  value={commentaryText}
                  onChange={(e) => setCommentaryText(e.target.value)}
                  placeholder="Enter ball-by-ball description..."
                  className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Quick Template pills */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="text-slate-500 self-center">Templates:</span>
                {[
                  'Cover drive boundary',
                  'Upper cut for SIX',
                  'Yorker clean bowled',
                  'Quick single to mid-off',
                  'Beaten outside off stump'
                ].map((txt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCommentaryText(txt)}
                    className="px-2 py-0.5 rounded bg-[#0e1d25] hover:bg-[#1c3647] text-slate-300 border border-slate-700"
                  >
                    {txt}
                  </button>
                ))}
              </div>

              {/* Submit Ball */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#009270] hover:bg-[#00a676] text-white text-sm font-black transition shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Log Ball Score to Cricbuzz Feed</span>
              </button>
            </form>
          </div>

          {/* Right: Live Match Status & Recent Feed */}
          <div className="space-y-4 bg-[#142833] p-5 rounded-2xl border border-[#203746]">
            <h3 className="font-bold text-sm text-white border-b border-[#203746] pb-2 flex items-center justify-between">
              <span>Live Commentary Log</span>
              {currentMatch?.status === 'LIVE' && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              )}
            </h3>

            {currentMatch ? (
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {(currentMatch.commentary || []).slice(0, 6).map((c, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-[#0e1d25] border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-bold text-slate-300">{c.ball} ov</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-800 text-emerald-400">
                        {c.tag}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-2">{c.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">No match selected</p>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MATCHES MANAGER */}
      {activeAdminTab === 'matches' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Match Form */}
          <div className="lg:col-span-1 bg-[#142833] p-5 rounded-2xl border border-[#203746] space-y-4">
            <h3 className="font-bold text-sm text-white border-b border-[#203746] pb-2 flex items-center space-x-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Create New Cricket Match</span>
            </h3>

            <form onSubmit={handleCreateMatchSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Match Title</label>
                <input
                  type="text"
                  value={newMatch.title}
                  onChange={(e) => setNewMatch({ ...newMatch, title: e.target.value })}
                  className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Series</label>
                <input
                  type="text"
                  value={newMatch.series}
                  onChange={(e) => setNewMatch({ ...newMatch, series: e.target.value })}
                  className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Format</label>
                  <select
                    value={newMatch.matchFormat}
                    onChange={(e) => setNewMatch({ ...newMatch, matchFormat: e.target.value })}
                    className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                  >
                    <option value="T20">T20</option>
                    <option value="ODI">ODI</option>
                    <option value="TEST">TEST</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Status</label>
                  <select
                    value={newMatch.status}
                    onChange={(e) => setNewMatch({ ...newMatch, status: e.target.value })}
                    className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                  >
                    <option value="LIVE">LIVE</option>
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Team A</label>
                  <select
                    value={newMatch.teamAId}
                    onChange={(e) => setNewMatch({ ...newMatch, teamAId: e.target.value })}
                    className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                  >
                    {teams.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Team B</label>
                  <select
                    value={newMatch.teamBId}
                    onChange={(e) => setNewMatch({ ...newMatch, teamBId: e.target.value })}
                    className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                  >
                    {teams.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Venue</label>
                <input
                  type="text"
                  value={newMatch.venue}
                  onChange={(e) => setNewMatch({ ...newMatch, venue: e.target.value })}
                  className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Status Note</label>
                <input
                  type="text"
                  value={newMatch.statusNote}
                  onChange={(e) => setNewMatch({ ...newMatch, statusNote: e.target.value })}
                  className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition mt-2 shadow"
              >
                Create Match
              </button>
            </form>
          </div>

          {/* Matches List */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-sm text-white">Existing Matches ({matches.length})</h3>
            <div className="space-y-2">
              {matches.map(m => (
                <div
                  key={m._id || m.id}
                  className="p-3.5 rounded-xl bg-[#142833] border border-[#203746] flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{m.title}</span>
                      <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300 font-semibold">
                        {m.matchFormat}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        m.status === 'LIVE' ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                    <div className="text-slate-400">
                      {m.teamA?.shortName} {m.teamA?.score} vs {m.teamB?.shortName} {m.teamB?.score}
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteMatch(m._id || m.id)}
                    className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 transition"
                    title="Delete Match"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PLAYERS MANAGER */}
      {activeAdminTab === 'players' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Cricketer Form */}
          <div className="lg:col-span-1 bg-[#142833] p-5 rounded-2xl border border-[#203746] space-y-4">
            <h3 className="font-bold text-sm text-white border-b border-[#203746] pb-2 flex items-center space-x-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add International Cricketer</span>
            </h3>

            <form onSubmit={handleCreatePlayerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Player Name</label>
                <input
                  type="text"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Country</label>
                  <select
                    value={newPlayer.country}
                    onChange={(e) => {
                      const c = e.target.value;
                      const codeMap = { India: 'in', Australia: 'au', England: 'gb-eng', Pakistan: 'pk', 'South Africa': 'za', 'New Zealand': 'nz', Afghanistan: 'af' };
                      setNewPlayer({ ...newPlayer, country: c, countryCode: codeMap[c] || 'in' });
                    }}
                    className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                  >
                    <option value="India">India</option>
                    <option value="Australia">Australia</option>
                    <option value="England">England</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="South Africa">South Africa</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Afghanistan">Afghanistan</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Role</label>
                  <select
                    value={newPlayer.role}
                    onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
                    className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                  >
                    <option value="Batter">Batter</option>
                    <option value="Fast Bowler">Fast Bowler</option>
                    <option value="Spin Bowler">Spin Bowler</option>
                    <option value="All-Rounder">All-Rounder</option>
                    <option value="Wicketkeeper Batter">Wicketkeeper Batter</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Jersey Number</label>
                  <input
                    type="number"
                    value={newPlayer.jerseyNumber}
                    onChange={(e) => setNewPlayer({ ...newPlayer, jerseyNumber: e.target.value })}
                    className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Age</label>
                  <input
                    type="number"
                    value={newPlayer.age}
                    onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
                    className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Portrait Image URL</label>
                <input
                  type="text"
                  value={newPlayer.image}
                  onChange={(e) => setNewPlayer({ ...newPlayer, image: e.target.value })}
                  className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Bio</label>
                <textarea
                  rows="2"
                  value={newPlayer.bio}
                  onChange={(e) => setNewPlayer({ ...newPlayer, bio: e.target.value })}
                  className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition mt-2 shadow"
              >
                Add Cricketer
              </button>
            </form>
          </div>

          {/* Cricketer List */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-sm text-white">Registered Cricketers ({players.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
              {players.map(p => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-[#142833] border border-[#203746] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div>
                      <div className="font-bold text-white flex items-center space-x-1.5">
                        <span>{p.name}</span>
                        <img src={p.countryFlag} alt={p.country} className="w-3.5 h-2.5 rounded" />
                      </div>
                      <span className="text-slate-400 text-[11px]">{p.role} • #{p.jerseyNumber}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeletePlayer(p.id)}
                    className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 transition"
                    title="Remove Player"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: NEWS PUBLISHER */}
      {activeAdminTab === 'news' && (
        <div className="max-w-2xl mx-auto bg-[#142833] p-5 rounded-2xl border border-[#203746] space-y-4">
          <h3 className="font-bold text-sm text-white border-b border-[#203746] pb-2">
            Publish Cricket News & Match Reports
          </h3>

          <form onSubmit={handleCreateNewsSubmit} className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Headline</label>
              <input
                type="text"
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2.5 text-white"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Subtitle</label>
              <input
                type="text"
                value={newArticle.subtitle}
                onChange={(e) => setNewArticle({ ...newArticle, subtitle: e.target.value })}
                className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Category</label>
                <select
                  value={newArticle.category}
                  onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                  className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                >
                  <option value="Match Report">Match Report</option>
                  <option value="Exclusive">Exclusive</option>
                  <option value="News">News</option>
                  <option value="Analysis">Analysis</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={newArticle.coverImage}
                  onChange={(e) => setNewArticle({ ...newArticle, coverImage: e.target.value })}
                  className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Article Content</label>
              <textarea
                rows="5"
                value={newArticle.content}
                onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                className="w-full bg-[#0e1d25] border border-[#2a4354] rounded-lg p-2.5 text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition shadow"
            >
              Publish to Cricbuzz News Feed
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
