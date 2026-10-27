/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { VenueItem } from '../../../types';
import { Building2, Plus, Edit2, Trash2, CheckCircle2, Clock, AlertTriangle, X } from 'lucide-react';

export const VenueManagementModule: React.FC = () => {
  const { venues, createVenue, updateVenue, deleteVenue, toggleVenueAvailability } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVenue, setEditingVenue] = useState<VenueItem | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [building, setBuilding] = useState('');
  const [capacity, setCapacity] = useState(250);
  const [equipmentStr, setEquipmentStr] = useState('');
  const [contactPerson, setContactPerson] = useState('');

  // Booking status toggle modal
  const [bookingVenue, setBookingVenue] = useState<VenueItem | null>(null);
  const [bookingStatus, setBookingStatus] = useState<VenueItem['availability']>('available');
  const [bookedBy, setBookedBy] = useState('');
  const [bookingReason, setBookingReason] = useState('');

  const openCreateModal = () => {
    setName('');
    setBuilding('');
    setCapacity(250);
    setEquipmentStr('4K Projector, Wireless Audio, Fiber Drop');
    setContactPerson('Rohan Sharma (I&E)');
    setEditingVenue(null);
    setShowAddModal(true);
  };

  const openEditModal = (v: VenueItem) => {
    setEditingVenue(v);
    setName(v.name);
    setBuilding(v.building);
    setCapacity(v.capacity);
    setEquipmentStr(v.equipment.join(', '));
    setContactPerson(v.contactPerson);
    setShowAddModal(true);
  };

  const handleSaveVenue = (e: React.FormEvent) => {
    e.preventDefault();
    const equipment = equipmentStr.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingVenue) {
      updateVenue(editingVenue.id, {
        name,
        building,
        capacity: Number(capacity),
        equipment,
        contactPerson,
      });
    } else {
      createVenue({
        name,
        building,
        capacity: Number(capacity),
        equipment,
        availability: 'available',
        contactPerson,
      });
    }
    setShowAddModal(false);
  };

  const handleUpdateAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingVenue) return;
    toggleVenueAvailability(bookingVenue.id, bookingStatus, bookedBy, bookingReason);
    setBookingVenue(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-400" />
            <span>Campus Venues & Allocation Desk</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Internal & External Affairs Module: Authorize venue availability, audit capacities, and manage reservations.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Venue</span>
        </button>
      </div>

      {/* Venue Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {venues.map((venue) => {
          const statusColors = {
            available: 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300',
            booked: 'bg-amber-950/60 border-amber-500/50 text-amber-300',
            maintenance: 'bg-red-950/60 border-red-500/50 text-red-300',
          };

          return (
            <div
              key={venue.id}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400">{venue.building}</span>
                    <h3 className="text-lg font-display font-bold text-white mt-0.5">{venue.name}</h3>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono uppercase font-semibold border ${
                      statusColors[venue.availability]
                    }`}
                  >
                    {venue.availability}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 font-mono mb-4">
                  <div>
                    Capacity: <span className="text-white font-bold tabular-nums">{venue.capacity} attendees</span>
                  </div>
                  <div>
                    Liaison: <span className="text-slate-400">{venue.contactPerson}</span>
                  </div>
                  {venue.bookedBy && (
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-amber-300">
                      Booked by: <strong>{venue.bookedBy}</strong>
                      {venue.bookingReason && <span className="block text-slate-400">{venue.bookingReason}</span>}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {venue.equipment.map((eq, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    setBookingVenue(venue);
                    setBookingStatus(venue.availability);
                    setBookedBy(venue.bookedBy || '');
                    setBookingReason(venue.bookingReason || '');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
                >
                  Change Status
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(venue)}
                    title="Edit venue details"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete venue "${venue.name}"?`)) {
                        deleteVenue(venue.id);
                      }
                    }}
                    title="Delete venue"
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-bold text-white mb-1">
              {editingVenue ? 'Edit Venue Information' : 'Register New Campus Venue'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              I&E Affairs venue allocation and equipment registry.
            </p>

            <form onSubmit={handleSaveVenue} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Venue Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Science Auditorium C"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Campus Building / Location</label>
                <input
                  type="text"
                  required
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  placeholder="e.g. Technology Center, Block 2"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Capacity</label>
                  <input
                    type="number"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Liaison In-Charge</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Equipment List (comma separated)
                </label>
                <input
                  type="text"
                  value={equipmentStr}
                  onChange={(e) => setEquipmentStr(e.target.value)}
                  placeholder="e.g. 4K Dual Projectors, Audio Rig, Fiber Drop"
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Save Venue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Status Modal */}
      {bookingVenue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setBookingVenue(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-bold text-white mb-1">
              Update Status: {bookingVenue.name}
            </h3>
            <p className="text-xs text-slate-400 mb-6">Modify booking availability and assignment.</p>

            <form onSubmit={handleUpdateAvailability} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Availability Status</label>
                <select
                  value={bookingStatus}
                  onChange={(e) => setBookingStatus(e.target.value as VenueItem['availability'])}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="available">Available (Unassigned)</option>
                  <option value="booked">Booked (Reserved)</option>
                  <option value="maintenance">Under Maintenance</option>
                </select>
              </div>

              {bookingStatus === 'booked' && (
                <>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Booked By (Wing / Entity)</label>
                    <input
                      type="text"
                      required
                      value={bookedBy}
                      onChange={(e) => setBookedBy(e.target.value)}
                      placeholder="e.g. Cultural Wing / Tech Wing"
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Purpose / Reason</label>
                    <input
                      type="text"
                      required
                      value={bookingReason}
                      onChange={(e) => setBookingReason(e.target.value)}
                      placeholder="e.g. StellarHack 2026 rehearsal"
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBookingVenue(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Commit Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
