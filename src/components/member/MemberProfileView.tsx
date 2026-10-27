/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MemberProfile } from '../../types';
import { User, Mail, Shield, CheckCircle2, Save, Github, Linkedin, Plus, Trash2 } from 'lucide-react';

export const MemberProfileView: React.FC<{ profile: MemberProfile }> = ({ profile }) => {
  const { updateCurrentMemberProfile } = useApp();

  const [bio, setBio] = useState(profile.bio || '');
  const [skills, setSkills] = useState<string[]>(profile.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [github, setGithub] = useState(profile.github || '');
  const [linkedin, setLinkedin] = useState(profile.linkedin || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentMemberProfile({
      bio,
      skills,
      github,
      linkedin,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Identity Card (Read Only Fields Enforced by RBAC) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-violet-500/50 shadow-xl"
          />

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-mono text-violet-400">
              <span>{profile.memberId}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="capitalize">{profile.wing.replace('_', ' ')} Wing</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400 font-bold">Good Standing</span>
            </div>

            <h2 className="text-2xl font-display font-bold text-white">{profile.name}</h2>
            <p className="text-sm text-slate-300">{profile.position}</p>
            <p className="text-xs text-slate-400 font-mono">
              Enrolled: {profile.year} · {profile.branch} · Inducted {profile.joinDate}
            </p>
          </div>

          <div className="text-center sm:text-right p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Total Merit</span>
            <span className="text-2xl font-bold font-mono text-violet-400 tabular-nums">{profile.points}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Rank #{profile.rank}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-500 font-mono">
          Note: Core administrative attributes (Member ID, Assigned Wing, Rank) are governed by the Discipline Wing and Technical Secretariat.
        </div>
      </div>

      {/* Editable Profile Information Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-bold text-white">Editable Member Dossier</h3>
          {savedSuccess && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Dossier Updated & Synced</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Personal Technical Bio / Statement</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe your technical focus, research interest, or creative contribution inside ORION..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Technical & Creative Skills</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-slate-300"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add new skill (e.g. ROS2, WebGL, Sound Engineering)..."
                className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-violet-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">GitHub / Code Repository</label>
              <div className="relative">
                <Github className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn / Professional Profile</label>
              <div className="relative">
                <Linkedin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
