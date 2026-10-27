/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  WingId,
  EventItem,
  VenueItem,
  MediaItem,
  MemberProfile,
  LeaderboardEntry,
  DisciplineRecord,
  Announcement,
  ActivityAuditLog,
} from '../types';
import {
  WINGS_DATA,
  INITIAL_EVENTS,
  INITIAL_VENUES,
  INITIAL_MEDIA,
  INITIAL_MEMBERS,
  INITIAL_LEADERBOARD,
  INITIAL_DISCIPLINE_RECORDS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_AUDIT_LOGS,
  COMMITTEE_ACCOUNTS,
} from '../data/mockData';

export interface AuthSession {
  isAuthenticated: boolean;
  role: UserRole;
  email: string;
  name: string;
  avatar: string;
  wing?: WingId;
  roleTitle?: string;
  memberId?: string;
}

interface AppContextType {
  currentRoute: string;
  navigateTo: (route: string) => void;
  selectedWingId: WingId | null;
  setSelectedWingId: (wingId: WingId | null) => void;
  session: AuthSession;
  loginMember: (email: string) => boolean;
  loginCommittee: (email: string) => boolean;
  loginWithRevaSSO: (revaIdentifier: string, targetType: 'member' | 'committee') => boolean;
  logout: () => void;
  switchRoleQuickly: (role: UserRole) => void;

  // Global UI modal & sidebar states
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;

  // Data collections & CRUD operations
  events: EventItem[];
  createEvent: (event: Omit<EventItem, 'id' | 'registrationsCount'>) => void;
  updateEvent: (id: string, updates: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
  registerForEvent: (eventId: string, studentName: string, studentId: string) => boolean;

  venues: VenueItem[];
  createVenue: (venue: Omit<VenueItem, 'id'>) => void;
  updateVenue: (id: string, updates: Partial<VenueItem>) => void;
  deleteVenue: (id: string) => void;
  toggleVenueAvailability: (id: string, availability: VenueItem['availability'], bookedBy?: string, reason?: string) => void;

  media: MediaItem[];
  uploadMedia: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => void;
  deleteMedia: (id: string) => void;

  members: MemberProfile[];
  currentMemberProfile: MemberProfile | null;
  updateCurrentMemberProfile: (updates: Partial<MemberProfile>) => void;

  leaderboard: LeaderboardEntry[];
  disciplineRecords: DisciplineRecord[];
  createDisciplineRecord: (record: Omit<DisciplineRecord, 'id'>) => void;
  updateDisciplineRecord: (id: string, updates: Partial<DisciplineRecord>) => void;

  announcements: Announcement[];
  createAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: string) => void;

  auditLogs: ActivityAuditLog[];
  logActivity: (action: string, target: string, wing?: WingId | 'global') => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY_PREFIX = 'orion_club_v2_';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
  }
  return fallback;
}

function saveToStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Modal & Sidebar navigation controls
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Current route management matching browser history (defaults directly to common public page)
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const path = window.location.pathname.replace(/^\//, '');
    return path === 'portal_select' || !path ? 'visitor' : path;
  });

  const [selectedWingId, setSelectedWingId] = useState<WingId | null>(() => {
    const path = window.location.pathname;
    const match = path.match(/\/visitor\/wings\/([a-z_]+)/);
    return match ? (match[1] as WingId) : null;
  });

  // Session state
  const [session, setSession] = useState<AuthSession>(() => {
    return loadFromStorage<AuthSession>('session', {
      isAuthenticated: false,
      role: 'visitor',
      email: '',
      name: 'Guest Explorer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    });
  });

  // Datasets with localStorage persistence
  const [events, setEvents] = useState<EventItem[]>(() =>
    loadFromStorage<EventItem[]>('events', INITIAL_EVENTS)
  );
  const [venues, setVenues] = useState<VenueItem[]>(() =>
    loadFromStorage<VenueItem[]>('venues', INITIAL_VENUES)
  );
  const [media, setMedia] = useState<MediaItem[]>(() =>
    loadFromStorage<MediaItem[]>('media', INITIAL_MEDIA)
  );
  const [members, setMembers] = useState<MemberProfile[]>(() =>
    loadFromStorage<MemberProfile[]>('members', INITIAL_MEMBERS)
  );
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() =>
    loadFromStorage<LeaderboardEntry[]>('leaderboard', INITIAL_LEADERBOARD)
  );
  const [disciplineRecords, setDisciplineRecords] = useState<DisciplineRecord[]>(() =>
    loadFromStorage<DisciplineRecord[]>('discipline', INITIAL_DISCIPLINE_RECORDS)
  );
  const [announcements, setAnnouncements] = useState<Announcement[]>(() =>
    loadFromStorage<Announcement[]>('announcements', INITIAL_ANNOUNCEMENTS)
  );
  const [auditLogs, setAuditLogs] = useState<ActivityAuditLog[]>(() =>
    loadFromStorage<ActivityAuditLog[]>('audit_logs', INITIAL_AUDIT_LOGS)
  );

  // Sync state to localStorage
  useEffect(() => saveToStorage('session', session), [session]);
  useEffect(() => saveToStorage('events', events), [events]);
  useEffect(() => saveToStorage('venues', venues), [venues]);
  useEffect(() => saveToStorage('media', media), [media]);
  useEffect(() => saveToStorage('members', members), [members]);
  useEffect(() => saveToStorage('leaderboard', leaderboard), [leaderboard]);
  useEffect(() => saveToStorage('discipline', disciplineRecords), [disciplineRecords]);
  useEffect(() => saveToStorage('announcements', announcements), [announcements]);
  useEffect(() => saveToStorage('audit_logs', auditLogs), [auditLogs]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '') || 'visitor';
      setCurrentRoute(path === 'portal_select' ? 'visitor' : path);
      const match = window.location.pathname.match(/\/visitor\/wings\/([a-z_]+)/);
      if (match) {
        setSelectedWingId(match[1] as WingId);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
    const finalRoute = cleanRoute === 'portal_select' || !cleanRoute ? 'visitor' : cleanRoute;
    setCurrentRoute(finalRoute);
    const displayPath = finalRoute === 'visitor' ? '/' : `/${finalRoute}`;
    if (window.location.pathname !== displayPath) {
      window.history.pushState({}, '', displayPath);
    }
    // Check if selecting a specific wing
    const match = finalRoute.match(/^visitor\/wings\/([a-z_]+)/);
    if (match) {
      setSelectedWingId(match[1] as WingId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logActivity = (action: string, target: string, wing: WingId | 'global' = 'global') => {
    const newLog: ActivityAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      userName: session.name || 'Anonymous',
      userRole: session.role,
      action,
      target,
      wing,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const loginMember = (email: string): boolean => {
    const found = members.find((m) => m.email.toLowerCase() === email.toLowerCase());
    if (found) {
      const newSession: AuthSession = {
        isAuthenticated: true,
        role: 'member',
        email: found.email,
        name: found.name,
        avatar: found.avatar,
        wing: found.wing,
        roleTitle: found.position,
        memberId: found.memberId,
      };
      setSession(newSession);
      logActivity('Member Authenticated', `${found.name} (${found.memberId})`, found.wing);
      navigateTo('member/dashboard');
      return true;
    }
    // Create new member on the fly if valid format
    if (email.includes('@')) {
      const generatedMember: MemberProfile = {
        id: `usr-${Date.now()}`,
        memberId: `ORN-2026-${Math.floor(100 + Math.random() * 900)}`,
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        wing: 'technical',
        position: 'Junior Associate Member',
        year: '2nd Year',
        branch: 'Computer Science',
        points: 450,
        rank: members.length + 1,
        joinDate: 'October 2026',
        skills: ['Python', 'System Architecture', 'Git'],
        bio: 'Newly joined member excited to explore ORION initiatives.',
        achievements: [],
        activities: [],
      };
      setMembers((prev) => [...prev, generatedMember]);
      const newSession: AuthSession = {
        isAuthenticated: true,
        role: 'member',
        email: generatedMember.email,
        name: generatedMember.name,
        avatar: generatedMember.avatar,
        wing: generatedMember.wing,
        roleTitle: generatedMember.position,
        memberId: generatedMember.memberId,
      };
      setSession(newSession);
      logActivity('New Member Registered & Logged In', generatedMember.name, generatedMember.wing);
      navigateTo('member/dashboard');
      return true;
    }
    return false;
  };

  const loginCommittee = (email: string): boolean => {
    const found = COMMITTEE_ACCOUNTS.find((c) => c.email.toLowerCase() === email.toLowerCase());
    if (found) {
      const newSession: AuthSession = {
        isAuthenticated: true,
        role: found.role,
        email: found.email,
        name: found.name,
        avatar: found.avatar,
        wing: found.wing,
        roleTitle: found.roleTitle,
      };
      setSession(newSession);
      logActivity('Committee Member Logged In', `${found.name} [${found.roleTitle}]`, found.wing);
      if (found.role === 'discipline_officer') {
        navigateTo('discipline');
      } else {
        navigateTo('committee/dashboard');
      }
      return true;
    }
    return false;
  };

  const loginWithRevaSSO = (revaIdentifier: string, targetType: 'member' | 'committee'): boolean => {
    const raw = revaIdentifier.trim().toLowerCase();
    const cleanId = raw.replace('@reva.edu.in', '').toUpperCase();
    const fullEmail = raw.includes('@') ? raw : `${raw}@reva.edu.in`;

    if (targetType === 'member') {
      // Check if existing member matches
      const existing = members.find(
        (m) =>
          m.email.toLowerCase() === fullEmail.toLowerCase() ||
          m.memberId.toUpperCase().includes(cleanId)
      );

      if (existing) {
        const newSession: AuthSession = {
          isAuthenticated: true,
          role: 'member',
          email: existing.email,
          name: `${existing.name} (REVA ID: ${cleanId})`,
          avatar: existing.avatar,
          wing: existing.wing,
          roleTitle: existing.position,
          memberId: existing.memberId,
        };
        setSession(newSession);
        logActivity('REVA Microsoft SSO: Member Verified', `${existing.name} [${cleanId}]`, existing.wing);
        navigateTo('member/dashboard');
        return true;
      }

      // Generate verified REVA student member profile
      const newMember: MemberProfile = {
        id: `reva-${cleanId.toLowerCase()}`,
        memberId: `REVA-${cleanId}`,
        name: `REVA Scholar (${cleanId})`,
        email: fullEmail,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        wing: 'technical',
        position: 'REVA Technical Fellow',
        year: '3rd Year B.Tech',
        branch: 'School of Computing & IT, REVA',
        points: 520,
        rank: members.length + 1,
        joinDate: 'Autumn 2026',
        skills: ['Cloud Computing', 'TypeScript', 'Constellation AI', 'REVA Microsoft 365'],
        bio: 'Verified REVA University technical innovation fellow authenticated through campus Microsoft SSO.',
        achievements: [
          {
            id: 'ach-reva-01',
            title: 'REVA Microsoft SSO Verified',
            date: 'Oct 2026',
            category: 'technical',
            description: 'Institutional identity credentials authenticated via REVA Cloud Federation.',
            badgeIcon: 'ShieldCheck',
          },
        ],
        activities: [],
      };

      setMembers((prev) => [newMember, ...prev]);
      const newSession: AuthSession = {
        isAuthenticated: true,
        role: 'member',
        email: newMember.email,
        name: newMember.name,
        avatar: newMember.avatar,
        wing: newMember.wing,
        roleTitle: newMember.position,
        memberId: newMember.memberId,
      };
      setSession(newSession);
      logActivity('REVA Microsoft SSO: New Member Onboarded', newMember.name, newMember.wing);
      navigateTo('member/dashboard');
      return true;
    }

    // targetType === 'committee'
    if (raw.includes('discipline') || raw.includes('proctor') || raw.includes('conduct') || cleanId.includes('DISC')) {
      const officer = COMMITTEE_ACCOUNTS.find((c) => c.role === 'discipline_officer') || COMMITTEE_ACCOUNTS[4];
      const newSession: AuthSession = {
        isAuthenticated: true,
        role: 'discipline_officer',
        email: fullEmail,
        name: `Marcus Vance (REVA Chief Proctor - ${cleanId})`,
        avatar: officer.avatar,
        wing: 'discipline',
        roleTitle: 'REVA Chief Proctor & Discipline Marshall',
      };
      setSession(newSession);
      logActivity('REVA Microsoft SSO: Discipline Proctor Clearance Granted', newSession.name, 'discipline');
      navigateTo('discipline');
      return true;
    }

    // Other committee leads or tech admin
    let matchedCommittee = COMMITTEE_ACCOUNTS[0]; // Maya Patel default
    if (raw.includes('cultural') || raw.includes('arts')) matchedCommittee = COMMITTEE_ACCOUNTS[2];
    else if (raw.includes('media') || raw.includes('pr')) matchedCommittee = COMMITTEE_ACCOUNTS[3];
    else if (raw.includes('ie') || raw.includes('affairs') || raw.includes('venue')) matchedCommittee = COMMITTEE_ACCOUNTS[1];

    const newSession: AuthSession = {
      isAuthenticated: true,
      role: matchedCommittee.role,
      email: fullEmail,
      name: `${matchedCommittee.name} (REVA SSO: ${cleanId})`,
      avatar: matchedCommittee.avatar,
      wing: matchedCommittee.wing,
      roleTitle: matchedCommittee.roleTitle,
    };
    setSession(newSession);
    logActivity('REVA Microsoft SSO: Committee Executive Cleared', newSession.name, matchedCommittee.wing);
    navigateTo('committee/dashboard');
    return true;
  };

  const logout = () => {
    logActivity('User Session Ended', session.name);
    setSession({
      isAuthenticated: false,
      role: 'visitor',
      email: '',
      name: 'Guest Explorer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    });
    navigateTo('portal_select');
  };

  const switchRoleQuickly = (role: UserRole) => {
    if (role === 'visitor') {
      logout();
      navigateTo('visitor');
      return;
    }
    if (role === 'member') {
      loginMember('alex.chen@orion.club');
      return;
    }
    const commAccount = COMMITTEE_ACCOUNTS.find((c) => c.role === role);
    if (commAccount) {
      loginCommittee(commAccount.email);
    }
  };

  // Event CRUD
  const createEvent = (data: Omit<EventItem, 'id' | 'registrationsCount'>) => {
    const newEvent: EventItem = {
      ...data,
      id: `evt-${Date.now().toString().slice(-4)}`,
      registrationsCount: 0,
    };
    setEvents((prev) => [newEvent, ...prev]);
    logActivity('Event Created', newEvent.title, newEvent.wing);
  };

  const updateEvent = (id: string, updates: Partial<EventItem>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    const ev = events.find((e) => e.id === id);
    if (ev) {
      logActivity('Event Updated', ev.title, ev.wing);
    }
  };

  const deleteEvent = (id: string) => {
    const ev = events.find((e) => e.id === id);
    if (ev) {
      logActivity('Event Deleted', ev.title, ev.wing);
    }
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const registerForEvent = (eventId: string, studentName: string, studentId: string): boolean => {
    let success = false;
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId && e.registrationsCount < e.maxCapacity) {
          success = true;
          return { ...e, registrationsCount: e.registrationsCount + 1 };
        }
        return e;
      })
    );
    if (success) {
      logActivity('Event Registration', `${studentName} (${studentId}) registered for event ${eventId}`);
    }
    return success;
  };

  // Venue CRUD
  const createVenue = (data: Omit<VenueItem, 'id'>) => {
    const newVenue: VenueItem = {
      ...data,
      id: `ven-${Date.now().toString().slice(-4)}`,
    };
    setVenues((prev) => [...prev, newVenue]);
    logActivity('Venue Added', newVenue.name, 'internal_external');
  };

  const updateVenue = (id: string, updates: Partial<VenueItem>) => {
    setVenues((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)));
    const v = venues.find((item) => item.id === id);
    if (v) {
      logActivity('Venue Updated', v.name, 'internal_external');
    }
  };

  const deleteVenue = (id: string) => {
    const v = venues.find((item) => item.id === id);
    if (v) {
      logActivity('Venue Deleted', v.name, 'internal_external');
    }
    setVenues((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleVenueAvailability = (
    id: string,
    availability: VenueItem['availability'],
    bookedBy?: string,
    reason?: string
  ) => {
    setVenues((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          return {
            ...v,
            availability,
            bookedBy: availability === 'booked' ? bookedBy || 'ORION Management' : undefined,
            bookingReason: availability === 'booked' ? reason || 'Official Event' : undefined,
          };
        }
        return v;
      })
    );
    const target = venues.find((v) => v.id === id);
    if (target) {
      logActivity('Venue Status Changed', `${target.name} set to ${availability}`, 'internal_external');
    }
  };

  // Media CRUD
  const uploadMedia = (data: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    const newMedia: MediaItem = {
      ...data,
      id: `med-${Date.now().toString().slice(-4)}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setMedia((prev) => [newMedia, ...prev]);
    logActivity('Media Asset Uploaded', newMedia.title, 'media_marketing');
  };

  const deleteMedia = (id: string) => {
    const item = media.find((m) => m.id === id);
    if (item) {
      logActivity('Media Deleted', item.title, 'media_marketing');
    }
    setMedia((prev) => prev.filter((m) => m.id !== id));
  };

  // Member profile
  const currentMemberProfile =
    session.role === 'member'
      ? members.find((m) => m.email.toLowerCase() === session.email.toLowerCase()) || members[0]
      : null;

  const updateCurrentMemberProfile = (updates: Partial<MemberProfile>) => {
    if (!currentMemberProfile) return;
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === currentMemberProfile.id) {
          return { ...m, ...updates };
        }
        return m;
      })
    );
    logActivity('Member Profile Updated', currentMemberProfile.name);
  };

  // Discipline Records CRUD
  const createDisciplineRecord = (data: Omit<DisciplineRecord, 'id'>) => {
    const newRecord: DisciplineRecord = {
      ...data,
      id: `dsc-${Date.now().toString().slice(-4)}`,
    };
    setDisciplineRecords((prev) => [newRecord, ...prev]);
    logActivity('Discipline Record Logged', `${data.category} for ${data.memberName}`, 'discipline');
  };

  const updateDisciplineRecord = (id: string, updates: Partial<DisciplineRecord>) => {
    setDisciplineRecords((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
    logActivity('Discipline Record Updated', `Record #${id}`, 'discipline');
  };

  // Announcements CRUD
  const createAnnouncement = (data: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = {
      ...data,
      id: `ann-${Date.now().toString().slice(-4)}`,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    logActivity('Announcement Published', newAnn.title, 'global');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    logActivity('Announcement Removed', `ID ${id}`, 'global');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigateTo,
        selectedWingId,
        setSelectedWingId,
        session,
        loginMember,
        loginCommittee,
        loginWithRevaSSO,
        logout,
        switchRoleQuickly,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isSidebarOpen,
        setIsSidebarOpen,
        events,
        createEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        venues,
        createVenue,
        updateVenue,
        deleteVenue,
        toggleVenueAvailability,
        media,
        uploadMedia,
        deleteMedia,
        members,
        currentMemberProfile,
        updateCurrentMemberProfile,
        leaderboard,
        disciplineRecords,
        createDisciplineRecord,
        updateDisciplineRecord,
        announcements,
        createAnnouncement,
        deleteAnnouncement,
        auditLogs,
        logActivity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
