/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DisciplineRecord } from '../../types';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Search,
  Plus,
  ArrowLeft,
  Calendar,
  X,
  Sparkles,
  KeyRound,
  EyeOff,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';
import { AudioController } from '../audio/AudioController';

export const DisciplinePlatform: React.FC = () => {
  const {
    disciplineRecords,
    createDisciplineRecord,
    updateDisciplineRecord,
    members,
    navigateTo,
    session,
    loginWithRevaSSO,
    setIsLoginModalOpen,
  } = useApp();

  // STRICT ZERO-LEAKAGE CHECK:
  // Only Discipline Officers, Tech Admins, or members assigned to the Discipline Wing may access tables and logs.
  const isDisciplineCleared =
    session.isAuthenticated &&
    (session.role === 'discipline_officer' ||
      session.role === 'tech_admin' ||
      session.wing === 'discipline');

  const [activeTab, setActiveTab] = useState<'records' | 'roster' | 'charter'>('records');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Inline REVA SSO unlock form for proctors
  const [revaInput, setRevaInput] = useState('proctor.discipline@reva.edu.in');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');

  // New Record Dialog (Only mounted if cleared)
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.memberId || '');
  const [category, setCategory] = useState<DisciplineRecord['category']>('Attendance');
  const [severity, setSeverity] = useState<DisciplineRecord['severity']>('low');
  const [notes, setNotes] = useState('');
  const [actionTaken, setActionTaken] = useState('');

  const filteredRecords = isDisciplineCleared
    ? disciplineRecords.filter((rec) => {
        const matchesSev = filterSeverity === 'all' || rec.severity === filterSeverity;
        const matchesSearch =
          rec.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.notes.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSev && matchesSearch;
      })
    : [];

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDisciplineCleared) return;
    const targetMember = members.find((m) => m.memberId === selectedMemberId) || members[0];

    createDisciplineRecord({
      memberId: targetMember.memberId,
      memberName: targetMember.name,
      wing: targetMember.wing,
      date: new Date().toISOString().split('T')[0],
      category,
      severity,
      status: 'Logged',
      notes,
      loggedBy: session.name || 'Marcus Vance (Discipline Marshall)',
      actionTaken: actionTaken || 'Logged in permanent club file.',
    });

    setShowAddModal(false);
    setNotes('');
    setActionTaken('');
  };

  const handleResolve = (id: string) => {
    if (!isDisciplineCleared) return;
    updateDisciplineRecord(id, { status: 'Resolved' });
  };

  const handleInlineRevaUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      const success = loginWithRevaSSO(revaInput, 'committee');
      if (!success) {
        setAuthError('Authentication failed. Please verify your REVA Proctor credentials.');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-[#07080d] text-slate-200 select-none font-sans relative z-10 pb-20">
      {/* Tactical Top Bar */}
      <div className="w-full bg-[#040508] border-b border-red-950/70 sticky top-0 z-50 px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('visitor')}
            title="Return to Orion Public Portal"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded bg-[#0f1118] border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Campus Home</span>
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <span className="font-display font-extrabold text-white tracking-widest text-xs sm:text-sm uppercase">
              ORION DISCIPLINE COMMAND
            </span>
            <span
              className={`hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded border ${
                isDisciplineCleared
                  ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-400'
                  : 'bg-red-950/60 border-red-800/60 text-red-400'
              }`}
            >
              {isDisciplineCleared ? 'SEC-CLEARED · LEVEL 5' : 'SEC-LOCKED · CONFIDENTIAL'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AudioController />
          {isDisciplineCleared ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 hidden sm:inline-block">
                ● Live Proctor Session: {session.name}
              </span>
              <button
                onClick={() => navigateTo('committee/dashboard')}
                className="text-xs font-mono text-slate-300 hover:text-white px-3 py-1 rounded bg-slate-900 border border-slate-700"
              >
                Executive Console
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-xs font-mono text-white px-3.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In / Sign Up</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Discipline Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Discipline Banner Header */}
        <div className="p-6 rounded-2xl bg-[#0c0d14] border border-red-950/80 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest mb-1">
              <span>Meritocracy & Constitutional Integrity Wing</span>
              <span aria-hidden="true">·</span>
              <span>Earned, Not Favored!</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-2.5">
              <span>Discipline & Proctorial Oversight</span>
              {!isDisciplineCleared && (
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-400 font-normal">
                  Classified Air-Gap Active
                </span>
              )}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
              Autonomous oversight organ maintaining uncompromised standards, meritocratic accountability, and 100% duty roster attendance across all ORION operations.
            </p>
          </div>

          {/* Tab Navigation (Only visible when authenticated and cleared) */}
          {isDisciplineCleared && (
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('records')}
                className={`px-3.5 py-1.5 text-xs font-mono font-semibold rounded-lg transition-colors ${
                  activeTab === 'records'
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                    : 'bg-[#12141c] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Audits & Demerits
              </button>
              <button
                onClick={() => setActiveTab('roster')}
                className={`px-3.5 py-1.5 text-xs font-mono font-semibold rounded-lg transition-colors ${
                  activeTab === 'roster'
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                    : 'bg-[#12141c] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Duty Roster
              </button>
              <button
                onClick={() => setActiveTab('charter')}
                className={`px-3.5 py-1.5 text-xs font-mono font-semibold rounded-lg transition-colors ${
                  activeTab === 'charter'
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                    : 'bg-[#12141c] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                The Charter
              </button>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* ZERO-LEAKAGE ENFORCEMENT: UNAUTHENTICATED OR NON-DISCIPLINE */}
        {/* ======================================================== */}
        {!isDisciplineCleared ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Air-Gapped Lockdown Terminal Gate */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#11131c] to-[#0a0b10] border border-red-900/50 text-center max-w-3xl mx-auto space-y-6 shadow-[0_0_50px_rgba(239,68,68,0.12)]">
              <div className="w-16 h-16 rounded-2xl bg-red-950/70 border border-red-700/60 flex items-center justify-center text-red-400 mx-auto shadow-[0_0_25px_rgba(239,68,68,0.3)]">
                <EyeOff className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-800/80">
                  Zero Data Exposure Policy Enforced
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-3">
                  Classified Disciplinary Command Terminal
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2 leading-relaxed">
                  In compliance with ORION Constitutional Ethics & Privacy Mandates, individual case dossiers, member demerit logs, disciplinary hearings, and security shift allocations are strictly air-gapped.
                </p>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  No disciplinary records, tables, or student identities are exposed to public visitors or general club members.
                </p>
              </div>

              {/* Direct REVA Microsoft SSO Authentication Gate for Proctor / Core Committee */}
              <div className="p-6 rounded-2xl bg-[#06070a] border border-red-950/80 text-left max-w-lg mx-auto">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800 mb-4">
                  {/* Microsoft 4-Color Icon */}
                  <div className="w-5 h-5 grid grid-cols-2 gap-0.5 shrink-0">
                    <div className="bg-[#f25022]" />
                    <div className="bg-[#7fba00]" />
                    <div className="bg-[#00a4ef]" />
                    <div className="bg-[#ffb900]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-display font-bold text-white">
                      REVA University Microsoft SSO Gate
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400">
                      Discipline Marshall & Proctor Authorization
                    </p>
                  </div>
                </div>

                {authError && (
                  <div className="mb-3 p-2.5 rounded-lg bg-red-950/60 border border-red-600/40 text-xs text-red-300">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleInlineRevaUnlock} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      REVA Proctor / Discipline Official Email
                    </label>
                    <input
                      type="text"
                      required
                      value={revaInput}
                      onChange={(e) => setRevaInput(e.target.value)}
                      placeholder="proctor.discipline@reva.edu.in"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#0b0c13] border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(239,68,68,0.35)]"
                  >
                    {isAuthenticating ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying REVA SSO Clearance...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Authenticate with REVA Microsoft SSO</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Quick 1-Click Chief Proctor Unlock for Evaluation */}
                <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setRevaInput('proctor.discipline@reva.edu.in');
                      loginWithRevaSSO('proctor.discipline@reva.edu.in', 'committee');
                    }}
                    className="text-[11px] font-mono text-red-400 hover:text-red-300 hover:underline flex items-center justify-center gap-1.5 mx-auto"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Quick Unlock: Chief Proctor Marcus Vance (Demo)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Public Safe Information Only: The Constitutional Charter Statement */}
            <div className="p-8 rounded-2xl bg-[#0c0d14] border border-slate-800 space-y-6 max-w-3xl mx-auto">
              <div className="text-center space-y-1.5 pb-5 border-b border-slate-800">
                <ShieldCheck className="w-8 h-8 text-cyan-400 mx-auto" />
                <h3 className="text-xl font-display font-bold text-white">THE ORION CONSTITUTIONAL CHARTER</h3>
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Publicly Observable Ethical Mandate
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                <p>
                  <strong className="text-white block font-sans text-sm">ARTICLE I: THE MERITOCRATIC MANDATE</strong>
                  "No member shall hold position, project ownership, or stage leadership through personal favors,
                  academic seniority, or social clout. Authority is earned exclusively through audited impact, transparent
                  code contributions, and event stewardship."
                </p>
                <p>
                  <strong className="text-white block font-sans text-sm">ARTICLE II: DUTY OF REPUTATIONAL PROTECTION</strong>
                  "Disciplinary dockets, demerits, and operational incident files are strictly air-gapped to prevent
                  public prejudice. All inquiries remain confidential to the Discipline Wing."
                </p>
                <p>
                  <strong className="text-white block font-sans text-sm">ARTICLE III: INDEPENDENT PROCTORIAL OVERSIGHT</strong>
                  "The Discipline Wing operates with constitutional autonomy. Its rulings on safety, attendance, and code
                  of conduct are sovereign and cannot be overturned by executive veto."
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* CLEARED OPERATIONAL DISCIPLINE CONSOLE (TABLES & LOGS)   */
          /* ======================================================== */
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* TAB 1: AUDIT & DEMERIT RECORDS */}
            {activeTab === 'records' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0c0d14] border border-slate-800">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                    {['all', 'low', 'medium', 'high', 'commendation'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilterSeverity(s)}
                        className={`px-3 py-1 rounded-md text-xs font-mono uppercase transition-colors whitespace-nowrap ${
                          filterSeverity === s
                            ? 'bg-red-500 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative min-w-[220px]">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search dossier..."
                        className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#050609] border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Log Record</span>
                    </button>
                  </div>
                </div>

                {/* Confidentially Unlocked Records Table */}
                <div className="rounded-2xl bg-[#0c0d14] border border-slate-800 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#050609] text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="py-3 px-4">Case ID</th>
                          <th className="py-3 px-4">Member Name</th>
                          <th className="py-3 px-4">Wing</th>
                          <th className="py-3 px-4">Classification</th>
                          <th className="py-3 px-4">Findings & Notes</th>
                          <th className="py-3 px-4">Action Enforced</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 font-mono">
                        {filteredRecords.map((rec) => {
                          const isCommendation = rec.severity === 'commendation';
                          return (
                            <tr key={rec.id} className="hover:bg-[#12141e]/70 transition-colors">
                              <td className="py-3.5 px-4 text-slate-500">{rec.id}</td>
                              <td className="py-3.5 px-4 font-sans font-semibold text-white">
                                <div>
                                  <span>{rec.memberName}</span>
                                  <span className="block text-[10px] font-mono text-slate-500">
                                    {rec.memberId}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 capitalize text-slate-300 font-sans">
                                {rec.wing.replace('_', ' ')}
                              </td>
                              <td className="py-3.5 px-4">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                                    isCommendation
                                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                      : rec.severity === 'high'
                                      ? 'bg-red-950 text-red-400 border border-red-800'
                                      : 'bg-amber-950 text-amber-400 border border-amber-800'
                                  }`}
                                >
                                  {rec.severity} · {rec.category}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 font-sans text-slate-300 max-w-xs">{rec.notes}</td>
                              <td className="py-3.5 px-4 font-sans text-slate-400 text-[11px]">
                                {rec.actionTaken || 'None'}
                              </td>
                              <td className="py-3.5 px-4">
                                <span
                                  className={`text-[11px] ${
                                    rec.status === 'Resolved' ? 'text-emerald-400' : 'text-amber-400'
                                  }`}
                                >
                                  {rec.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                {rec.status !== 'Resolved' && !isCommendation && (
                                  <button
                                    onClick={() => handleResolve(rec.id)}
                                    className="px-2.5 py-1 rounded bg-[#161822] hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500 text-[11px] text-slate-300 hover:text-emerald-300 transition-colors"
                                  >
                                    Mark Resolved
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DUTY ROSTER */}
            {activeTab === 'roster' && (
              <div className="p-6 rounded-2xl bg-[#0c0d14] border border-slate-800 space-y-4">
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-400" />
                  <span>Event Security & Marshaling Duty Roster (Autumn 2026)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  All active members across all wings must complete 2 rotational security, crowd protocol, and stagecraft duty shifts per term.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#050609] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-red-400 font-bold">StellarHack 2026 (Shift Alpha)</span>
                      <span className="text-emerald-400">100% Staffed</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Auditorium Main Gate, Server Room Lockdown, Verification Desk
                    </p>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Assigned Marshalls: Alex Chen, Kabir Sengupta, 6 Fellows
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#050609] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-red-400 font-bold">Aura Celestial Gala (Amphitheatre Perimeter)</span>
                      <span className="text-amber-400">8 / 12 Confirmed</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Crowd Circulation Control, VIP Guest Escort, Greenroom Protocol
                    </p>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Assigned Marshalls: Zara Thorne, Devin Rao, 6 Volunteers
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CONSTITUTIONAL CHARTER */}
            {activeTab === 'charter' && (
              <div className="p-8 rounded-2xl bg-[#0c0d14] border border-slate-800 space-y-6 max-w-3xl mx-auto">
                <div className="text-center space-y-2 pb-6 border-b border-slate-800">
                  <ShieldAlert className="w-10 h-10 text-red-500 mx-auto" />
                  <h2 className="text-2xl font-display font-bold text-white">THE CONSTITUTION OF ORION</h2>
                  <p className="text-xs font-mono text-red-400 uppercase tracking-widest">
                    Ratified by All Five Wings
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                  <p>
                    <strong className="text-white block font-sans">ARTICLE I: THE MERITOCRATIC MANDATE</strong>
                    "No member shall hold position, project ownership, or stage leadership through personal favors,
                    academic seniority, or social clout. Authority is earned exclusively through audited impact, transparent
                    code contributions, and event stewardship."
                  </p>
                  <p>
                    <strong className="text-white block font-sans">ARTICLE II: DUTY OF ABSOLUTE TRANSPARENCY</strong>
                    "All financial allocations, room approvals, project scopes, and disciplinary hearings must remain
                    visible in the executive audit logs without redaction."
                  </p>
                  <p>
                    <strong className="text-white block font-sans">ARTICLE III: INDEPENDENT PROCTORIAL OVERSIGHT</strong>
                    "The Discipline Wing operates with constitutional autonomy. Its rulings on attendance, safety, and code
                    of conduct are sovereign and cannot be overturned by executive veto."
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Log Record Modal (Only rendered when cleared) */}
      {showAddModal && isDisciplineCleared && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0d0f17] border border-red-900/60 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-bold text-white mb-1">
              Disciplinary & Merit Record Entry
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Official audit log committed to member's permanent standing.
            </p>

            <form onSubmit={handleCreateRecord} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Target Member</label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#050608] border border-slate-800 text-sm text-white focus:outline-none focus:border-red-500"
                >
                  {members.map((m) => (
                    <option key={m.memberId} value={m.memberId}>
                      {m.name} ({m.memberId}) · {m.wing}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DisciplineRecord['category'])}
                    className="w-full px-4 py-2 rounded-xl bg-[#050608] border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Attendance">Attendance</option>
                    <option value="Conduct">Conduct</option>
                    <option value="Deliverable">Deliverable</option>
                    <option value="Integrity">Integrity</option>
                    <option value="Commendation">Commendation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Severity / Merit</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as DisciplineRecord['severity'])}
                    className="w-full px-4 py-2 rounded-xl bg-[#050608] border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="low">Low Demerit</option>
                    <option value="medium">Medium Demerit</option>
                    <option value="high">High Demerit</option>
                    <option value="commendation">Exemplary Commendation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Findings / Fact Notes</label>
                <textarea
                  required
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detail the factual violation or exceptional merit..."
                  className="w-full px-4 py-2 rounded-xl bg-[#050608] border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Action Enforced</label>
                <input
                  type="text"
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  placeholder="e.g. Mandatory duty shift added / 25 merit points deducted"
                  className="w-full px-4 py-2 rounded-xl bg-[#050608] border border-slate-800 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
                >
                  Commit Official Record to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
