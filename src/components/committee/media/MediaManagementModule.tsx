/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { MediaItem } from '../../../types';
import { Film, Upload, Trash2, Image as ImageIcon, Video, Eye, X, CheckCircle2 } from 'lucide-react';

export const MediaManagementModule: React.FC = () => {
  const { media, uploadMedia, deleteMedia, session } = useApp();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80');
  const [category, setCategory] = useState<MediaItem['category']>('Events');
  const [eventTitle, setEventTitle] = useState('StellarHack 2026 Finals');
  const [caption, setCaption] = useState('');
  const [type, setType] = useState<'photo' | 'video'>('photo');

  const [inspectItem, setInspectItem] = useState<MediaItem | null>(null);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    uploadMedia({
      title,
      type,
      url,
      category,
      eventTitle,
      uploaderName: session.name || 'Liam Vance (Media Lead)',
      caption: caption || 'Captured during official ORION proceedings.',
    });

    setShowUploadModal(false);
    setTitle('');
    setCaption('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-amber-400" />
            <span>Media & Broadcast Asset Manager</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Media & Marketing Wing: Publish documentary event imagery, verify tags, and organize public galleries.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs flex items-center gap-2 transition-colors self-start sm:self-auto shadow-[0_0_15px_rgba(245,158,11,0.3)]"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Media Asset</span>
        </button>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {media.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-amber-300 border border-slate-800 uppercase">
                  {item.category}
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-sm font-display font-bold text-white mb-1 truncate">{item.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.caption}</p>
                <div className="mt-3 text-[11px] font-mono text-slate-500">
                  Event: {item.eventTitle} · {item.uploadedAt}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setInspectItem(item)}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`Delete media asset "${item.title}"?`)) {
                    deleteMedia(item.id);
                  }
                }}
                className="text-xs text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-red-950/40"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-bold text-white mb-1">Upload New Media Asset</h3>
            <p className="text-xs text-slate-400 mb-6">Publish photography or highlights to the public showcase.</p>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Asset Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Amphitheatre Laser Cue Calibration"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Image / Asset URL</label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as MediaItem['category'])}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Events">Events</option>
                    <option value="Projects">Projects</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Behind The Scenes">Behind The Scenes</option>
                    <option value="Awards">Awards</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Associated Event</label>
                  <input
                    type="text"
                    required
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Journalistic Caption</label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Provide context on cameras used, participant reactions, or stage timings..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Publish Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl">
            <button
              onClick={() => setInspectItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={inspectItem.url} alt={inspectItem.title} className="w-full max-h-96 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-white">{inspectItem.title}</h3>
              <p className="text-xs text-slate-300 mt-2">{inspectItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
