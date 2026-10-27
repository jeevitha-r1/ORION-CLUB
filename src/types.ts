/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole =
  | 'visitor'
  | 'member'
  | 'ie_lead'
  | 'cultural_lead'
  | 'tech_admin'
  | 'media_lead'
  | 'discipline_officer';

export type WingId =
  | 'internal_external'
  | 'cultural'
  | 'technical'
  | 'media_marketing'
  | 'discipline';

export interface WingInfo {
  id: WingId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  responsibilities: string[];
  leadName: string;
  leadRole: string;
  contactEmail: string;
  accentColor: string;
  nodeColor: string;
  starCount: number;
  // Geometric star coordinates (percentages 0-100) for custom constellation pattern
  stars: { x: number; y: number; label?: string; size?: number }[];
  connections: [number, number][]; // index pairs of connected stars
}

export interface EventItem {
  id: string;
  title: string;
  wing: WingId;
  date: string;
  time: string;
  venue: string;
  category: 'Hackathon' | 'Cultural Fest' | 'Workshop' | 'Orientation' | 'Exhibition' | 'Internal';
  description: string;
  schedule: { time: string; activity: string; speaker?: string }[];
  status: 'upcoming' | 'ongoing' | 'completed';
  registrationsCount: number;
  maxCapacity: number;
  registrationOpen: boolean;
  image: string;
  highlightNotes?: string;
}

export interface VenueItem {
  id: string;
  name: string;
  building: string;
  capacity: number;
  equipment: string[];
  availability: 'available' | 'booked' | 'maintenance';
  bookedBy?: string;
  bookingReason?: string;
  bookingDate?: string;
  contactPerson: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail?: string;
  category: 'Events' | 'Projects' | 'Behind The Scenes' | 'Cultural' | 'Awards';
  eventTitle: string;
  uploadedAt: string;
  uploaderName: string;
  caption: string;
}

export interface MemberAchievement {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  badgeIcon: string;
}

export interface MemberActivity {
  id: string;
  title: string;
  date: string;
  role: string;
  wing: WingId;
  pointsAwarded: number;
}

export interface MemberProfile {
  id: string;
  memberId: string;
  name: string;
  email: string;
  avatar: string;
  wing: WingId;
  position: string;
  year: string;
  branch: string;
  points: number;
  rank: number;
  joinDate: string;
  skills: string[];
  bio: string;
  github?: string;
  linkedin?: string;
  achievements: MemberAchievement[];
  activities: MemberActivity[];
}

export interface LeaderboardEntry {
  rank: number;
  memberId: string;
  name: string;
  wing: WingId;
  points: number;
  achievementsCount: number;
  recentContribution: string;
  avatar: string;
}

export interface DisciplineRecord {
  id: string;
  memberId: string;
  memberName: string;
  wing: WingId;
  date: string;
  category: 'Attendance' | 'Event Duty' | 'Code of Conduct' | 'Commendation';
  severity: 'low' | 'medium' | 'high' | 'commendation';
  status: 'Pending' | 'Resolved' | 'Logged';
  notes: string;
  loggedBy: string;
  actionTaken?: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'General' | 'Recruitment' | 'Events' | 'Urgent';
  date: string;
  author: string;
  content: string;
  linkText?: string;
  linkTarget?: string;
}

export interface ActivityAuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: UserRole;
  action: string;
  target: string;
  wing: WingId | 'global';
}
