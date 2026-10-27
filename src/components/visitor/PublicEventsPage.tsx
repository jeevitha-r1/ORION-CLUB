/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, Search, Filter, CheckCircle2, X } from 'lucide-react';
import { EventItem } from '../../types';

export const PublicEventsPage: React.FC = () => {
  const { events, registerForEvent } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Registration modal
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [regName, setRegName] = useState('');
  const [regId, setRegId] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  const categories = ['All', 'Hackathon', 'Cultural Fest', 'Workshop', 'Orientation'];

  const filteredEvents = events.filter((e) => {
    const matchesCat = filterCategory === 'All' || e.category === filterCategory;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !regName || !regId) return;
    registerForEvent(selectedEvent.id, regName, regId);
    setRegSuccess(true);
    setTimeout(() => {
      setSelectedEvent(null);
      setRegSuccess(false);
      setRegName('');
      setRegId('');
    }, 1600);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div className="mb-10">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Campus Schedule</div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white">ORION Events & Protocols</h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
          Complete schedule of upcoming hackathons, symposiums, auditions, and open technological workshops.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, venues..."
            className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/80 text-[11px] font-mono text-cyan-300 border border-slate-800">
                  {evt.category}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-950/80 text-[11px] font-mono capitalize text-slate-300 border border-slate-800">
                  {evt.status}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {evt.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">
                  {evt.description}
                </p>

                <div className="space-y-2 text-xs font-mono text-slate-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>{evt.date}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>

                {/* Event Schedule preview if present */}
                {evt.schedule && evt.schedule.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2">
                      Key Highlights & Timeline
                    </span>
                    <div className="space-y-1.5">
                      {evt.schedule.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-start justify-between text-[11px]">
                          <span className="font-mono text-cyan-400 shrink-0 mr-2">{item.time}</span>
                          <span className="text-slate-300 text-right truncate">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-800/80 mt-auto flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                <span className="text-white font-semibold tabular-nums">{evt.registrationsCount}</span> /{' '}
                <span className="tabular-nums">{evt.maxCapacity}</span> passes
              </div>

              {evt.registrationOpen ? (
                <button
                  onClick={() => setSelectedEvent(evt)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Reserve Seat
                </button>
              ) : (
                <span className="text-xs font-mono text-slate-500">Registration Closed</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-display font-bold text-white mb-1">{selectedEvent.title}</h3>
            <p className="text-xs text-slate-400 mb-6">{selectedEvent.date} · {selectedEvent.venue}</p>

            {regSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Seat Verified & Confirmed!</h4>
                <p className="text-xs text-slate-300">You are on the official guest list.</p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Jordan Hayes"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Student ID / Roll Number</label>
                  <input
                    type="text"
                    required
                    value={regId}
                    onChange={(e) => setRegId(e.target.value)}
                    placeholder="e.g. 24ECE012"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Verify & Obtain Ticket
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
