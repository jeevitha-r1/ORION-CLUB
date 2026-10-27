/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { EventItem } from '../../../types';
import { Palette, Plus, Edit2, Trash2, Calendar, Clock, MapPin, X, CheckCircle2 } from 'lucide-react';

export const CulturalEventsModule: React.FC = () => {
  const { events, createEvent, updateEvent, deleteEvent } = useApp();

  const culturalEvents = events.filter((e) => e.wing === 'cultural' || e.category === 'Cultural Fest');

  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-12-10');
  const [time, setTime] = useState('06:00 PM - 10:00 PM');
  const [venue, setVenue] = useState('Open Air Amphitheatre');
  const [category, setCategory] = useState<EventItem['category']>('Cultural Fest');
  const [description, setDescription] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(800);
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80');

  // Schedule items
  const [scheduleList, setScheduleList] = useState<{ time: string; activity: string; speaker?: string }[]>([
    { time: '06:00 PM', activity: 'Acoustic Soundcheck & Ambient Prelude', speaker: 'Student Ensemble' },
    { time: '07:30 PM', activity: 'Main Orchestral Performance', speaker: 'Orion Music Cell' },
  ]);
  const [newSchedTime, setNewSchedTime] = useState('');
  const [newSchedActivity, setNewSchedActivity] = useState('');

  const openCreate = () => {
    setEditingEvent(null);
    setTitle('');
    setDescription('Annual campus cultural festival celebrating music, theatrical drama, and laser stagecraft.');
    setDate('2026-12-10');
    setTime('06:00 PM - 10:00 PM');
    setVenue('Open Air Amphitheatre');
    setMaxCapacity(1000);
    setRegistrationOpen(true);
    setScheduleList([
      { time: '06:00 PM', activity: 'Curtain Opener & Acoustic Prelude' },
      { time: '07:30 PM', activity: 'Flagship Cultural Showcase' },
    ]);
    setShowEventModal(true);
  };

  const openEdit = (e: EventItem) => {
    setEditingEvent(e);
    setTitle(e.title);
    setDescription(e.description);
    setDate(e.date);
    setTime(e.time);
    setVenue(e.venue);
    setCategory(e.category);
    setMaxCapacity(e.maxCapacity);
    setRegistrationOpen(e.registrationOpen);
    setImage(e.image);
    setScheduleList(e.schedule || []);
    setShowEventModal(true);
  };

  const handleAddScheduleItem = () => {
    if (newSchedTime && newSchedActivity) {
      setScheduleList([...scheduleList, { time: newSchedTime, activity: newSchedActivity }]);
      setNewSchedTime('');
      setNewSchedActivity('');
    }
  };

  const handleRemoveScheduleItem = (index: number) => {
    setScheduleList(scheduleList.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent(editingEvent.id, {
        title,
        date,
        time,
        venue,
        category,
        description,
        maxCapacity: Number(maxCapacity),
        registrationOpen,
        image,
        schedule: scheduleList,
      });
    } else {
      createEvent({
        title,
        wing: 'cultural',
        date,
        time,
        venue,
        category,
        description,
        status: 'upcoming',
        maxCapacity: Number(maxCapacity),
        registrationOpen,
        image,
        schedule: scheduleList,
      });
    }
    setShowEventModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-400" />
            <span>Cultural Wing Event & Production Desk</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Cultural Secretariat: Curate campus galas, orchestrate run-of-show flows, and manage stage credentials.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors self-start sm:self-auto shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Curate Cultural Production</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {culturalEvents.map((evt) => (
          <div
            key={evt.id}
            className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="h-40 w-full bg-slate-950 relative overflow-hidden">
                <img src={evt.image} alt={evt.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-purple-300 border border-slate-800">
                  {evt.category}
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-slate-400 border border-slate-800">
                  {evt.status}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-display font-bold text-white mb-2">{evt.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">{evt.description}</p>

                <div className="space-y-1.5 text-xs font-mono text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{evt.date}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>{evt.venue}</span>
                  </div>
                </div>

                {/* Run of show count */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  <span className="text-white font-mono font-bold">{evt.schedule?.length || 0}</span> cues on
                  timeline · <span className="text-emerald-400 font-mono">{evt.registrationsCount}</span> reserved
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Registration: {evt.registrationOpen ? 'Active' : 'Closed'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(evt)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Flow</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove event "${evt.title}"?`)) {
                      deleteEvent(evt.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Production Flow Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => setShowEventModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-display font-bold text-white mb-1">
              {editingEvent ? 'Edit Cultural Production Flow' : 'Create Cultural Event'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Define production cue timings, stage logistics, and audience capacity.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Production Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Aura 2026: The Celestial Symphony"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description & Aesthetic Theme</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Max Passes</label>
                  <input
                    type="number"
                    required
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Venue Location</label>
                <input
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Run of Show Timeline Builder */}
              <div className="pt-2 border-t border-slate-800">
                <label className="block text-xs font-mono uppercase tracking-wider text-purple-400 mb-2">
                  Run of Show / Flow Schedule
                </label>

                <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                  {scheduleList.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-purple-400">{item.time}</span>
                        <span className="text-white">{item.activity}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveScheduleItem(idx)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSchedTime}
                    onChange={(e) => setNewSchedTime(e.target.value)}
                    placeholder="Time (e.g. 08:30 PM)"
                    className="w-1/3 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={newSchedActivity}
                    onChange={(e) => setNewSchedActivity(e.target.value)}
                    placeholder="Cue / Activity description"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddScheduleItem}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white"
                  >
                    Add Cue
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Commit Production Flow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
