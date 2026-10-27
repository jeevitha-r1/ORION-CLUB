/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Shield,
  FileCode,
  ExternalLink,
  Edit3,
  User,
  Star,
  Zap,
} from 'lucide-react';
import { MemberProfileView } from './MemberProfileView';
import { MemberLeaderboard } from './MemberLeaderboard';

export const MemberDashboard: React.FC = () => {
  const { currentMemberProfile, session, events, announcements, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'leaderboard'>('overview');

  const profile = currentMemberProfile || {
    id: 'usr-default',
    memberId: session.memberId || 'ORN-2026-042',
    name: session.name || 'Alex Chen',
    email: session.email || 'alex.chen@orion.club',
    avatar: session.avatar,
    wing: session.wing || 'technical',
    position: session.roleTitle || 'Senior Systems Architect',
    year: '3rd Year',
    branch: 'Computer Science',
    points: 1840,
    rank: 1,
    joinDate: 'September 2024',
    skills: ['TypeScript', 'Distributed Consensus', 'Rust'],
    bio: 'ORION active member committed to engineering excellence.',
    achievements: [],
    activities: [],
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
      {/* 1. PERSONALIZED WELCOME & STATUS RIBBON */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-slate-800 gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-violet-500/60 shadow-xl"
            />
            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-md bg-violet-600 text-[10px] font-mono text-white font-bold">
              #{profile.rank}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-violet-400">
              <span>{profile.memberId}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="capitalize">{profile.wing.replace('_', ' ')} Wing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-0.5">
              Welcome back, {profile.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {profile.position} · {profile.year} ({profile.branch})
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Member Profile
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'leaderboard'
                ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Club Leaderboard
          </button>
        </div>
      </div>

      {activeTab === 'profile' && <MemberProfileView profile={profile} />}
      {activeTab === 'leaderboard' && <MemberLeaderboard />}

      {activeTab === 'overview' && (
        <div className="space-y-10">
          {/* Key Score Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Merit Points</span>
                <p className="text-2xl sm:text-3xl font-display font-bold text-white font-mono tabular-nums mt-1">
                  {profile.points}
                </p>
                <span className="text-[11px] text-emerald-400 font-mono">+120 this cycle</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <Zap className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Club Rank</span>
                <p className="text-2xl sm:text-3xl font-display font-bold text-cyan-400 font-mono tabular-nums mt-1">
                  #{profile.rank}
                </p>
                <span className="text-[11px] text-slate-400 font-mono">Top 1% Standing</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Trophy className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Duty Reliability</span>
                <p className="text-2xl sm:text-3xl font-display font-bold text-emerald-400 font-mono tabular-nums mt-1">
                  100%
                </p>
                <span className="text-[11px] text-slate-400 font-mono">Zero Demerits</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Honors Awarded</span>
                <p className="text-2xl sm:text-3xl font-display font-bold text-amber-400 font-mono tabular-nums mt-1">
                  {profile.achievements.length || 3}
                </p>
                <span className="text-[11px] text-slate-400 font-mono">Verified Badges</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* 2-Column Split: Achievements & Exclusive Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 cols: Honors, Recognitions & Activities History */}
            <div className="lg:col-span-7 space-y-8">
              {/* Achievements Showcase */}
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Honors & Recognitions</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Earned Through Rigor</span>
                </div>

                <div className="space-y-3">
                  {profile.achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-white">{ach.title}</h4>
                          <span className="text-[11px] font-mono text-slate-500">{ach.date}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ach.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Participation History Timeline */}
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span>Participation & Contribution History</span>
                </h3>

                <div className="relative pl-6 border-l border-slate-800 space-y-6">
                  {profile.activities.map((act) => (
                    <div key={act.id} className="relative group">
                      <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-950" />
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-white">{act.title}</h4>
                        <span className="text-xs font-mono text-cyan-400 font-semibold tabular-nums">
                          +{act.pointsAwarded} pts
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-0.5">
                        <span>Role: {act.role}</span>
                        <span aria-hidden="true">·</span>
                        <span>{act.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Member Exclusive Opportunities & Upcoming Events */}
            <div className="lg:col-span-5 space-y-8">
              {/* Member-Exclusive Initiatives */}
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-violet-800/40 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400">
                    Members Only
                  </span>
                  <span className="w-2 h-2 rounded-full bg-violet-400" />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2">Member-Exclusive Sprints</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Closed incubators and architecture reviews reserved strictly for authenticated ORION fellows.
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-white">Closed Sandbox: Autonomous Rover ROS2</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Collaborative telemetry sprint in Room 204</p>
                    </div>
                    <span className="px-2 py-1 rounded bg-violet-950/80 border border-violet-800 text-[10px] font-mono text-violet-300 shrink-0">
                      Active
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-white">Private Rehearsal: Aura Lighting Rig</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Stage crew sound & laser cue synchronization</p>
                    </div>
                    <span className="px-2 py-1 rounded bg-slate-900 text-[10px] font-mono text-slate-400 shrink-0">
                      Nov 02
                    </span>
                  </div>
                </div>
              </div>

              {/* Upcoming Club Events & Attendance */}
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span>Upcoming Club Calendar</span>
                </h3>

                <div className="space-y-3">
                  {events.slice(0, 3).map((evt) => (
                    <div
                      key={evt.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-xs font-semibold text-white">{evt.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{evt.date} · {evt.venue}</p>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 font-medium">RSVP Confirmed</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Member Announcements */}
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-lg font-display font-bold text-white mb-3">Internal Bulletins</h3>
                <div className="space-y-3">
                  {announcements.slice(0, 2).map((ann) => (
                    <div key={ann.id} className="text-xs border-b border-slate-800 pb-2.5 last:border-0 last:pb-0">
                      <span className="font-mono text-cyan-400 text-[10px] uppercase">{ann.category}</span>
                      <p className="font-semibold text-white mt-0.5">{ann.title}</p>
                      <p className="text-slate-400 line-clamp-2 mt-1">{ann.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
