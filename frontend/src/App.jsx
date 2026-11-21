import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import MatchTicker from './components/MatchTicker.jsx';
import MatchCenterModal from './components/MatchCenterModal.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import PlayersDirectory from './components/PlayersDirectory.jsx';
import PlayerProfileModal from './components/PlayerProfileModal.jsx';
import RankingsView from './components/RankingsView.jsx';
import NewsSection from './components/NewsSection.jsx';
import Footer from './components/Footer.jsx';
import { Activity, Flame, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

const API_BASE = '/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('matches');
  const [matches, setMatches] = useState([]);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [news, setNews] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load all initial data
  const fetchData = useCallback(async () => {
    try {
      const [matchesRes, playersRes, teamsRes, newsRes] = await Promise.all([
        fetch(`${API_BASE}/matches`).then(r => r.json()),
        fetch(`${API_BASE}/players`).then(r => r.json()),
        fetch(`${API_BASE}/teams`).then(r => r.json()),
        fetch(`${API_BASE}/news`).then(r => r.json()),
      ]);

      if (matchesRes.success) {
        setMatches(matchesRes.data);
        // If a match is currently open in modal, refresh its state
        setSelectedMatch(prev => {
          if (!prev) return null;
          return matchesRes.data.find(m => (m._id === prev._id || m.id === prev.id)) || prev;
        });
      }
      if (playersRes.success) setPlayers(playersRes.data);
      if (teamsRes.success) setTeams(teamsRes.data);
      if (newsRes.success) setNews(newsRes.data);
    } catch (err) {
      console.error('Error fetching Cricbuzz data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Check simulation status
    fetch(`${API_BASE}/admin/matches/m1/simulation-status`)
      .then(r => r.json())
      .then(d => setIsSimulating(Boolean(d.isSimulating)))
      .catch(() => {});

    // Polling interval for live scores (every 3 seconds)
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // SSE Stream for instant ball updates
  useEffect(() => {
    let evtSource;
    try {
      evtSource = new EventSource(`${API_BASE}/matches/m1/live-stream`);
      evtSource.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed?.data) {
            setMatches(prev => prev.map(m => (m._id === parsed.data._id || m.id === parsed.data._id) ? parsed.data : m));
            setSelectedMatch(prev => {
              if (prev && (prev._id === parsed.data._id || prev.id === parsed.data._id)) {
                return parsed.data;
              }
              return prev;
            });
          }
        } catch (e) {}
      };
    } catch (e) {}

    return () => {
      if (evtSource) evtSource.close();
    };
  }, []);

  // Admin Actions
  const handleScoreBall = async (matchId, ballData) => {
    const res = await fetch(`${API_BASE}/admin/matches/${matchId}/score-ball`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ballData)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    await fetchData();
    return data;
  };

  const handleSimulateBall = async () => {
    const matchId = selectedMatch?._id || selectedMatch?.id || 'm1';
    const res = await fetch(`${API_BASE}/admin/matches/${matchId}/simulate-ball`, {
      method: 'POST'
    });
    const data = await res.json();
    if (data.success) await fetchData();
    return data;
  };

  const handleToggleSimulation = async () => {
    const matchId = selectedMatch?._id || selectedMatch?.id || 'm1';
    const res = await fetch(`${API_BASE}/admin/matches/${matchId}/toggle-simulation`, {
      method: 'POST'
    });
    const data = await res.json();
    if (data.success) {
      setIsSimulating(data.isSimulating);
      await fetchData();
    }
  };

  const handleCreateMatch = async (matchData) => {
    const res = await fetch(`${API_BASE}/admin/matches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matchData)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    await fetchData();
  };

  const handleDeleteMatch = async (matchId) => {
    const res = await fetch(`${API_BASE}/admin/matches/${matchId}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    await fetchData();
  };

  const handleCreatePlayer = async (playerData) => {
    const res = await fetch(`${API_BASE}/admin/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playerData)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    await fetchData();
  };

  const handleDeletePlayer = async (playerId) => {
    const res = await fetch(`${API_BASE}/admin/players/${playerId}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    await fetchData();
  };

  const handleCreateNews = async (newsData) => {
    const res = await fetch(`${API_BASE}/admin/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newsData)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    await fetchData();
  };

  const handleResetDatabase = async () => {
    const res = await fetch(`${API_BASE}/admin/reset`, { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      setIsSimulating(false);
      await fetchData();
    }
  };

  const liveMatches = matches.filter(m => m.status === 'LIVE');
  const featuredMatch = matches.find(m => m.featured) || liveMatches[0] || matches[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#0e1e25] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Signature Cricbuzz Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        liveMatchCount={liveMatches.length}
        isSimulating={isSimulating}
        onToggleSimulation={handleToggleSimulation}
      />

      {/* Real-time Match Ticker at Top */}
      <MatchTicker
        matches={matches}
        onSelectMatch={(m) => setSelectedMatch(m)}
        selectedMatchId={selectedMatch?._id || selectedMatch?.id}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'matches' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            {/* Live Featured Match Banner Card */}
            {featuredMatch && (
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#172c38] via-[#162e3d] to-[#12242e] border border-[#223947] p-5 sm:p-6 shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#223947]">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                      <span>FEATURED LIVE MATCH</span>
                    </span>
                    <span className="text-slate-400 text-xs font-semibold">{featuredMatch.series}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleToggleSimulation}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold transition ${
                        isSimulating
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 border border-emerald-500/30'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isSimulating ? 'Stop Auto-Sim' : 'Auto-Simulate Balls'}</span>
                    </button>

                    <button
                      onClick={() => setSelectedMatch(featuredMatch)}
                      className="px-4 py-1 rounded-full bg-[#009270] hover:bg-[#00a676] text-white text-xs font-black transition shadow"
                    >
                      Open Live Match Centre
                    </button>
                  </div>
                </div>

                {/* Match Scoreboard Hero */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Team A */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#0e1d25]/70 border border-slate-800">
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={featuredMatch.teamA?.flag}
                        alt={featuredMatch.teamA?.name}
                        className="w-12 h-8 object-cover rounded shadow border border-slate-700"
                      />
                      <div>
                        <h3 className="font-extrabold text-lg text-white">{featuredMatch.teamA?.name}</h3>
                        <span className="text-xs text-slate-400">{featuredMatch.teamA?.overs || '0.0'} Overs</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white">{featuredMatch.teamA?.score || '0/0'}</div>
                      {featuredMatch.teamA?.crr && (
                        <span className="text-xs text-slate-400">CRR: {featuredMatch.teamA.crr}</span>
                      )}
                    </div>
                  </div>

                  {/* Team B */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40">
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={featuredMatch.teamB?.flag}
                        alt={featuredMatch.teamB?.name}
                        className="w-12 h-8 object-cover rounded shadow border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-extrabold text-lg text-white">{featuredMatch.teamB?.name}</h3>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        </div>
                        <span className="text-xs text-slate-400">{featuredMatch.teamB?.overs || '0.0'} Overs</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-emerald-400">{featuredMatch.teamB?.score || '0/0'}</div>
                      {featuredMatch.teamB?.crr && (
                        <span className="text-xs text-slate-400">CRR: {featuredMatch.teamB.crr}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Note & Quick Commentary Highlight */}
                <div className="mt-4 pt-3 border-t border-[#203746] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="font-bold text-amber-300">
                    {featuredMatch.statusNote || featuredMatch.venue}
                  </div>

                  {featuredMatch.commentary?.[0] && (
                    <div className="text-slate-300 flex items-center space-x-2 bg-[#0e1d25]/60 px-3 py-1 rounded-lg border border-slate-800">
                      <span className="font-mono text-emerald-400 font-bold">{featuredMatch.commentary[0].ball} ov</span>
                      <span className="line-clamp-1">{featuredMatch.commentary[0].text}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Grid Sections: Recent News & Top Players */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: News preview */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-white flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Top Cricket Headlines</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('news')}
                    className="text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    View All News →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {news.slice(0, 4).map(item => (
                    <div
                      key={item._id || item.id}
                      onClick={() => setActiveTab('news')}
                      className="cursor-pointer group p-3.5 rounded-xl bg-[#142833] hover:bg-[#172e3d] border border-[#203746] hover:border-emerald-500/40 transition space-y-2.5 shadow"
                    >
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-36 object-cover rounded-lg group-hover:opacity-90 transition"
                      />
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#009270] text-white">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-xs text-white group-hover:text-emerald-300 transition line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 1 Col: Top Star Players Widget */}
              <div className="space-y-4 bg-[#142833] p-5 rounded-2xl border border-[#203746]">
                <div className="flex items-center justify-between border-b border-[#203746] pb-2">
                  <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Featured Cricketers</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('players')}
                    className="text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    See All →
                  </button>
                </div>

                <div className="space-y-2.5">
                  {players.slice(0, 5).map(player => (
                    <div
                      key={player.id}
                      onClick={() => setSelectedPlayer(player)}
                      className="cursor-pointer group p-2.5 rounded-xl bg-[#0e1d25] hover:bg-[#162f3f] border border-[#1e3442] flex items-center justify-between text-xs transition"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={player.image}
                          alt={player.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="font-bold text-white group-hover:text-emerald-300 transition flex items-center space-x-1.5">
                            <span>{player.name}</span>
                            <img src={player.countryFlag} alt={player.country} className="w-3.5 h-2.5 rounded" />
                          </div>
                          <span className="text-[11px] text-slate-400">{player.role}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-emerald-400 font-extrabold text-xs">
                          {player.stats?.odi?.runs || player.stats?.test?.runs || 0} Runs
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: NEWS */}
        {activeTab === 'news' && <NewsSection news={news} />}

        {/* TAB: RANKINGS */}
        {activeTab === 'rankings' && <RankingsView teams={teams} players={players} />}

        {/* TAB: PLAYERS DIRECTORY */}
        {activeTab === 'players' && (
          <PlayersDirectory
            players={players}
            onSelectPlayer={(p) => setSelectedPlayer(p)}
          />
        )}

        {/* TAB: ADMIN CONSOLE */}
        {activeTab === 'admin' && (
          <AdminDashboard
            matches={matches}
            players={players}
            teams={teams}
            news={news}
            onScoreBall={handleScoreBall}
            onSimulateBall={handleSimulateBall}
            isSimulating={isSimulating}
            onToggleSimulation={handleToggleSimulation}
            onCreateMatch={handleCreateMatch}
            onDeleteMatch={handleDeleteMatch}
            onCreatePlayer={handleCreatePlayer}
            onDeletePlayer={handleDeletePlayer}
            onCreateNews={handleCreateNews}
            onResetDatabase={handleResetDatabase}
          />
        )}
      </main>

      {/* Match Center Modal Popup */}
      {selectedMatch && (
        <MatchCenterModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onSimulateBall={handleSimulateBall}
          isSimulating={isSimulating}
          onToggleSimulation={handleToggleSimulation}
        />
      )}

      {/* Player Profile Modal Popup */}
      {selectedPlayer && (
        <PlayerProfileModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}

      {/* Cricbuzz Footer */}
      <Footer onOpenAdmin={() => setActiveTab('admin')} />
    </div>
  );
}
