/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Medal, Star, Award, Search, Filter } from 'lucide-react';
import { WingId } from '../../types';

export const MemberLeaderboard: React.FC = () => {
  const { leaderboard } = useApp();
  const [selectedWing, setSelectedWing] = useState<string>('all');
  const [search, setSearch] = useState('');

  const wings = [
    { id: 'all', label: 'All Wings' },
    { id: 'technical', label: 'Technical' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'media_marketing', label: 'Media & Marketing' },
    { id: 'internal_external', label: 'I&E Affairs' },
    { id: 'discipline', label: 'Discipline' },
  ];

  const filtered = leaderboard.filter((entry) => {
    const matchesWing = selectedWing === 'all' || entry.wing === selectedWing;
    const matchesSearch =
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.memberId.toLowerCase().includes(search.toLowerCase()) ||
      entry.recentContribution.toLowerCase().includes(search.toLowerCase());
    return matchesWing && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>ORION Meritocracy Leaderboard</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time rankings calculated from validated project commits, event operations, and duty hours.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search member, ID..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Wing-wise Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {wings.map((w) => (
          <button
            key={w.id}
            onClick={() => setSelectedWing(w.id)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedWing === w.id
                ? 'bg-violet-600 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            {w.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium Cards */}
      {selectedWing === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {leaderboard.slice(0, 3).map((entry, idx) => {
            const colors = [
              'border-amber-500/60 bg-amber-950/20 text-amber-400',
              'border-slate-400/60 bg-slate-900/40 text-slate-300',
              'border-amber-700/60 bg-amber-950/10 text-amber-600',
            ];
            const badges = ['Gold Merit Crest', 'Silver Merit Crest', 'Bronze Merit Crest'];

            return (
              <div
                key={entry.memberId}
                className={`p-6 rounded-3xl border ${colors[idx]} flex flex-col items-center text-center relative overflow-hidden backdrop-blur-md`}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-current mb-3">
                  <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider">{badges[idx]}</span>
                <h3 className="text-xl font-display font-bold text-white mt-1">{entry.name}</h3>
                <span className="text-xs text-slate-400 font-mono">{entry.memberId} · {entry.wing.replace('_', ' ')}</span>

                <div className="mt-4 pt-4 border-t border-slate-800/80 w-full flex justify-around text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block">Score</span>
                    <span className="text-white font-bold text-base tabular-nums">{entry.points}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Honors</span>
                    <span className="text-white font-bold text-base tabular-nums">{entry.achievementsCount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tabular Full Leaderboard */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 w-16">Rank</th>
                <th className="py-3.5 px-4">Member</th>
                <th className="py-3.5 px-4">Wing</th>
                <th className="py-3.5 px-4">Latest Contribution</th>
                <th className="py-3.5 px-4 text-center">Badges</th>
                <th className="py-3.5 px-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {filtered.map((entry) => (
                <tr key={entry.memberId} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white tabular-nums">
                    {entry.rank <= 3 ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-600/30 text-violet-300">
                        {entry.rank}
                      </span>
                    ) : (
                      `#${entry.rank}`
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-sans">
                    <div className="flex items-center gap-3">
                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <span className="font-semibold text-white block">{entry.name}</span>
                        <span className="text-[11px] font-mono text-slate-500">{entry.memberId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 capitalize text-slate-300 font-sans">
                    {entry.wing.replace('_', ' ')}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-sans max-w-xs truncate">
                    {entry.recentContribution}
                  </td>
                  <td className="py-3.5 px-4 text-center tabular-nums text-slate-300">
                    {entry.achievementsCount}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-violet-400 text-sm tabular-nums">
                    {entry.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
