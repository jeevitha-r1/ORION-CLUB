/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MediaItem } from '../../types';
import { X, Calendar, User, Eye } from 'lucide-react';

export const PublicGalleryPage: React.FC = () => {
  const { media } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const categories = ['All', 'Events', 'Projects', 'Behind The Scenes', 'Cultural', 'Awards'];

  const filtered =
    activeCategory === 'All' ? media : media.filter((m) => m.category === activeCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div className="mb-10">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Visual Heritage</div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white">Media & Broadcast Archive</h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
          High-definition photojournalism, robotic project captures, and festival cinematography recorded by the Media & Marketing Wing.
        </p>
      </div>

      {/* Category Pills / Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-[4/3] cursor-pointer"
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-cyan-300 border border-slate-700/80 uppercase">
                  {item.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{item.uploadedAt}</span>
              </div>

              <div>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Full Asset</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg">
          <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-950/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 bg-slate-900">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-2">
                <span className="text-cyan-400 uppercase font-semibold">{selectedItem.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedItem.eventTitle}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedItem.uploadedAt}</span>
              </div>

              <h2 className="text-2xl font-display font-bold text-white mb-2">{selectedItem.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{selectedItem.caption}</p>

              <div className="pt-4 border-t border-slate-800 text-xs font-mono text-slate-500">
                Archived by: <span className="text-slate-300">{selectedItem.uploaderName}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
