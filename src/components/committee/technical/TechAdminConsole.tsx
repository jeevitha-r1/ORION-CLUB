/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Cpu,
  Shield,
  Activity,
  Bell,
  Settings,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Users,
} from 'lucide-react';
import { VenueManagementModule } from '../venues/VenueManagementModule';
import { CulturalEventsModule } from '../cultural/CulturalEventsModule';
import { MediaManagementModule } from '../media/MediaManagementModule';

export const TechAdminConsole: React.FC = () => {
  const { auditLogs, announcements, createAnnouncement, deleteAnnouncement, members, logActivity } = useApp();

  const [activeSubView, setActiveSubView] = useState<'system' | 'venues' | 'cultural' | 'media' | 'logs'>('system');

  // Announcement state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'General' | 'Recruitment' | 'Events' | 'Urgent'>('General');

  // Technical toggles
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowPublicRegistrations, setAllowPublicRegistrations] = useState(true);
  const [strictConductEnforcement, setStrictConductEnforcement] = useState(true);

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;
    createAnnouncement({
      title: newTitle,
      content: newContent,
      category: newCategory,
      date: new Date().toISOString().split('T')[0],
      author: 'Maya Patel (CTO)',
    });
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="space-y-8">
      {/* Top Console Status Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Cpu className="w-4 h-4" />
            <span>Technical Secretariat · Master Governance</span>
          </div>
          <h2 className="text-2xl font-display font-extrabold text-white mt-1">Technical Wing Operations Console</h2>
          <p className="text-xs text-slate-400 mt-1">
            Super-Administrator authorization granted to Chief Technical Officer. System-wide modules unlocked.
          </p>
        </div>

        {/* Global Navigation Tabs across all wing tools */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setActiveSubView('system')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeSubView === 'system' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            System & Bulletins
          </button>
          <button
            onClick={() => setActiveSubView('logs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeSubView === 'logs' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Audit Logs ({auditLogs.length})
          </button>
          <button
            onClick={() => setActiveSubView('venues')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeSubView === 'venues' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            I&E Venues
          </button>
          <button
            onClick={() => setActiveSubView('cultural')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeSubView === 'cultural' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Cultural Events
          </button>
          <button
            onClick={() => setActiveSubView('media')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeSubView === 'media' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Media Manager
          </button>
        </div>
      </div>

      {/* Render delegated Wing Management Sub-views */}
      {activeSubView === 'venues' && <VenueManagementModule />}
      {activeSubView === 'cultural' && <CulturalEventsModule />}
      {activeSubView === 'media' && <MediaManagementModule />}

      {/* Render System & Bulletins */}
      {activeSubView === 'system' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 6 cols: System Settings & Governance Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-5">
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-400" />
                <span>Platform Switches & Governance</span>
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Public Event Registration</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Allow non-members to reserve passes on public pages</p>
                  </div>
                  <button
                    onClick={() => {
                      setAllowPublicRegistrations(!allowPublicRegistrations);
                      logActivity('Toggled Registration Gateway', !allowPublicRegistrations ? 'Enabled' : 'Disabled', 'technical');
                    }}
                    className={`w-12 h-6 rounded-full transition-colors p-1 ${
                      allowPublicRegistrations ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        allowPublicRegistrations ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Strict Conduct Enforcement</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Require Discipline Wing biometric signoff on passes</p>
                  </div>
                  <button
                    onClick={() => {
                      setStrictConductEnforcement(!strictConductEnforcement);
                      logActivity('Toggled Discipline Protocol', !strictConductEnforcement ? 'Active' : 'Bypassed', 'discipline');
                    }}
                    className={`w-12 h-6 rounded-full transition-colors p-1 ${
                      strictConductEnforcement ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        strictConductEnforcement ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Maintenance Mode Override</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Restrict all public routes to executive members only</p>
                  </div>
                  <button
                    onClick={() => {
                      setMaintenanceMode(!maintenanceMode);
                      logActivity('Maintenance Mode', !maintenanceMode ? 'ENGAGED' : 'DISENGAGED', 'technical');
                    }}
                    className={`w-12 h-6 rounded-full transition-colors p-1 ${
                      maintenanceMode ? 'bg-red-500' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        maintenanceMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Member Directory Quick Counter */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-400" />
                  <span>Enrolled Fellows & Member Pool</span>
                </h3>
                <span className="text-xs font-mono text-cyan-400">{members.length} Active Records</span>
              </div>

              <div className="space-y-2">
                {members.slice(0, 4).map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-lg object-cover" />
                      <div>
                        <span className="font-semibold text-white block">{m.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">{m.memberId} · {m.wing.replace('_', ' ')}</span>
                      </div>
                    </div>
                    <span className="font-mono text-violet-400 font-semibold">{m.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 6 cols: Dispatch Official Announcement */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800">
              <h3 className="text-lg font-display font-bold text-white mb-2 flex items-center gap-2">
                <Bell className="w-5 h-5 text-cyan-400" />
                <span>Publish Official Club Dispatch</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Post notifications broadcast directly onto the visitor home, member dashboards, and mobile feeds.
              </p>

              <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Dispatch Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Autumn 2026 Core Roster Ratification"
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="General">General</option>
                    <option value="Recruitment">Recruitment</option>
                    <option value="Events">Events</option>
                    <option value="Urgent">Urgent Directive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Dispatch Content</label>
                  <textarea
                    rows={3}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Write official message..."
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Announcement</span>
                </button>
              </form>
            </div>

            {/* Existing Announcements List with Delete */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800">
              <h4 className="text-sm font-display font-bold text-white mb-3">Live Published Bulletins</h4>
              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                        <span className="text-cyan-400 uppercase font-semibold">{ann.category}</span>
                        <span>· {ann.date}</span>
                      </div>
                      <h5 className="font-semibold text-white mt-0.5">{ann.title}</h5>
                      <p className="text-slate-400 line-clamp-1 mt-0.5">{ann.content}</p>
                    </div>

                    <button
                      onClick={() => deleteAnnouncement(ann.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Delete announcement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render Audit Logs */}
      {activeSubView === 'logs' && (
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <span>Executive Activity & Security Audit Trail</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Immutable chronological log of all administrative creations, status toggles, and wing permissions.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 border border-slate-800/80 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Operator</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Target Entity</th>
                  <th className="py-3 px-4 text-right">Wing Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-3 px-4 font-semibold text-white">{log.userName}</td>
                    <td className="py-3 px-4 text-cyan-300">{log.action}</td>
                    <td className="py-3 px-4 text-slate-300 max-w-xs truncate">{log.target}</td>
                    <td className="py-3 px-4 text-right uppercase text-slate-400">{log.wing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
