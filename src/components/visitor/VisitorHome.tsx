/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WingConstellationSection } from './WingConstellationSection';
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Users,
  Compass,
  Sparkles,
  Send,
  X,
  Search,
  Filter,
} from 'lucide-react';
import { EventItem } from '../../types';
import { MeetTheTeamSection } from '../team/MeetTheTeamSection';

export const VisitorHome: React.FC = () => {
  const { events, media, announcements, registerForEvent, navigateTo } = useApp();

  // Registration modal state
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [regName, setRegName] = useState('');
  const [regId, setRegId] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regStatus, setRegStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Gallery category filter
  const [galleryFilter, setGalleryFilter] = useState<string>('All');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !regName || !regId) return;

    const ok = registerForEvent(selectedEvent.id, regName, regId);
    if (ok) {
      setRegStatus('success');
      setTimeout(() => {
        setSelectedEvent(null);
        setRegStatus('idle');
        setRegName('');
        setRegId('');
        setRegEmail('');
      }, 1800);
    } else {
      setRegStatus('error');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 3500);
  };

  const filteredMedia =
    galleryFilter === 'All' ? media : media.filter((m) => m.category === galleryFilter);

  return (
    <div className="w-full relative z-10">
      {/* 1. HERO & INTRODUCTION SECTION */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-cyan-300 font-mono mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span>ORION</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>A Multidisciplinary Club</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tight leading-[1.05] mb-4">
            ORION
          </h1>

          <div className="text-2xl sm:text-4xl lg:text-5xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 mb-6">
            Earned, Not Favored!
          </div>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            ORION is the premier collegiate multidisciplinary organization uniting engineering, autonomous systems,
            stagecraft, media broadcasting, and constitutional integrity. Here, leadership is earned through craftsmanship
            and verifiable impact.
          </p>

          {/* Quick Proof Metrics adjacent to claim */}
          <div className="grid grid-cols-3 gap-6 sm:gap-12 pt-6 border-t border-slate-800/90 mb-8 max-w-xl w-full">
            <div>
              <p className="text-2xl sm:text-3xl font-display font-bold text-white font-mono tabular-nums">5</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Specialized Wings</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-display font-bold text-white font-mono tabular-nums">140+</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Active Fellows</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-display font-bold text-white font-mono tabular-nums">100%</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Meritocratic Induction</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('constellations');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>Explore the Five Wings</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('auth')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center gap-2 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Sign In / Sign Up</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('events');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold uppercase tracking-wider transition-colors backdrop-blur-md"
            >
              Upcoming Events
            </button>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE VERTICAL CONSTELLATIONS EXPLORATION */}
      <div id="constellations">
        <WingConstellationSection />
      </div>

      {/* 3. EVENTS AND ACTIVITIES SECTION */}
      <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Campus Calendar</div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Events & Public Initiatives</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Join flagship hackathons, symposiums, cultural nights, and open technical clinics hosted across campus.
            </p>
          </div>
          <button
            onClick={() => navigateTo('visitor/events')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            <span>View All Schedules</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="flex flex-col justify-between rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 overflow-hidden transition-all duration-300 group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-cyan-300">
                  {evt.category}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono capitalize text-slate-300">
                  {evt.status}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {evt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {evt.description}
                  </p>

                  <div className="space-y-2 text-xs text-slate-400 font-mono mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{evt.date}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-400">
                    <span className="text-white font-semibold tabular-nums">{evt.registrationsCount}</span> /{' '}
                    <span className="tabular-nums">{evt.maxCapacity}</span> registered
                  </div>

                  {evt.registrationOpen ? (
                    <button
                      onClick={() => setSelectedEvent(evt)}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors"
                    >
                      Register Now
                    </button>
                  ) : (
                    <span className="text-xs font-mono text-slate-500">Registration Closed</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CLUB ACHIEVEMENTS & MILESTONES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Empirical Proof</div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Milestones & Honors</h2>
          <p className="text-slate-400 text-sm mt-2">
            Recognitions earned on regional, national, and collegiate battlegrounds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-white font-mono tabular-nums">#1</p>
              <h3 className="text-base font-semibold text-white mt-1">National Tech League</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                1st place overall across 140 collegiate engineering organizations at National Tech League 2026.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-white font-mono tabular-nums">$35k+</p>
              <h3 className="text-base font-semibold text-white mt-1">Research & Project Grants</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Autonomous rover and edge telemetry hardware grants sponsored by industry research partners.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-white font-mono tabular-nums">2,500+</p>
              <h3 className="text-base font-semibold text-white mt-1">Annual Gala Attendees</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Record attendance at Aura Celestial Gala, uniting technical stagecraft and musical composition.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-white font-mono tabular-nums">100%</p>
              <h3 className="text-base font-semibold text-white mt-1">Open-Source Codebases</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                All production tools, scoring systems, and club apps engineered transparently under MIT license.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MEDIA & GALLERY PREVIEW */}
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Visual Archive</div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Media & Highlights</h2>
            <p className="text-slate-400 text-sm mt-1">
              Curated glimpses into hackathon warfare, amphitheatre rehearsals, and high-impact assemblies.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto">
            {['All', 'Events', 'Projects', 'Cultural', 'Awards'].map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  galleryFilter === cat
                    ? 'bg-cyan-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-[4/3]"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900/80 text-cyan-300 border border-slate-700/80">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{item.uploadedAt}</span>
                </div>

                <div>
                  <h4 className="text-base font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ANNOUNCEMENTS & RECRUITMENT UPDATES */}
      <section id="announcements" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Official Dispatch</div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Announcements & Notices</h2>
          <p className="text-slate-400 text-sm mt-2">
            Stay aligned with executive decisions, recruitment phases, and campus alerts.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-cyan-400 uppercase font-semibold">{ann.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-400">{ann.date}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-500">By {ann.author}</span>
                </div>
                <h3 className="text-base sm:text-lg font-display font-bold text-white">{ann.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">{ann.content}</p>
              </div>

              {ann.linkText && (
                <button
                  onClick={() => {
                    if (ann.linkTarget?.startsWith('/')) {
                      navigateTo(ann.linkTarget);
                    } else if (ann.linkTarget?.startsWith('#')) {
                      const el = document.getElementById(ann.linkTarget.slice(1));
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-4 py-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-slate-950 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-colors whitespace-nowrap shrink-0 self-start sm:self-center"
                >
                  {ann.linkText} →
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONTACT & RECRUITMENT APPLICATION */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Join the Collective</div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Join ORION</h2>
              <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                Recruitment takes place every semester across all five wings. Admission is competitive, blind to bias,
                and assessed strictly through technical trials, creative portfolios, and constitutional interviews.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                The Induction Creed
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                "We do not promise titles. We promise hard problems, zero bureaucracy, world-class peers, and the
                satisfaction of building things that leave a mark. Earned, Not Favored!"
              </p>
              <div className="text-xs font-mono text-cyan-400">
                Official Inquiries: <a href="mailto:contact@orion.club" className="underline">contact@orion.club</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <h3 className="text-xl font-display font-bold text-white mb-2">Candidate & Guest Inquiry</h3>
              <p className="text-xs text-slate-400 mb-6">
                Reach out to the executive council for recruitment information or collaboration proposals.
              </p>

              {contactSubmitted ? (
                <div className="p-6 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-cyan-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Transmission Dispatched</h4>
                  <p className="text-xs text-slate-300">
                    Your inquiry has been routed to the Internal & External Affairs desk. We will respond within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Jordan Hayes"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="jordan@university.edu"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Message / Proposal</label>
                    <textarea
                      rows={3}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Tell us about your background, wing interest, or inquiry..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Orion Council</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM SECTION (PRESIDENT, CHIEF SECRETARY, 5 WING DIRECTORS, SECRETARIES, LEADS, CO-LEADS, COORDINATORS) */}
      <MeetTheTeamSection />

      {/* EVENT REGISTRATION MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Event Pass Verification</span>
              <h3 className="text-2xl font-display font-bold text-white mt-1">{selectedEvent.title}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {selectedEvent.date} · {selectedEvent.venue}
              </p>
            </div>

            {regStatus === 'success' ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Registration Confirmed!</h4>
                <p className="text-xs text-slate-300">
                  Your seat has been reserved. A confirmation ticket has been dispatched to your university email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Student Roll / ID</label>
                    <input
                      type="text"
                      required
                      value={regId}
                      onChange={(e) => setRegId(e.target.value)}
                      placeholder="e.g. 23CS049"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Student Email</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@univ.edu"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Available Capacity:</span>
                    <span className="text-white font-mono">{selectedEvent.maxCapacity - selectedEvent.registrationsCount} seats remaining</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Admission Fee:</span>
                    <span className="text-cyan-400 font-mono">Complimentary (Campus ID verified)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Confirm Event Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
