'use client';

import { DEFAULT_ACTIVE_NOTES, NoteId, NOTES } from '@/data/notes';

export type DifficultyMode = 'makkelijk' | 'normaal';

export type NoteStats = Record<NoteId, { correct: number; difficult: number; lastSeen: string | null }>;

export type AppState = {
  stars: number;
  streak: number;
  longestStreak: number;
  totalPracticeDays: number;
  completedSessions: number;
  lastPracticedDate: string | null;
  activeNotes: NoteId[];
  sessionDuration: 3 | 5 | 8;
  difficulty: DifficultyMode;
  soundEnabled: boolean;
  noteStats: NoteStats;
  practiceStats: {
    patternsSucceeded: number;
    patternsDifficult: number;
  };
};

const STORAGE_KEY = 'blokfluit-app-state-v1';

const createEmptyNoteStats = (): NoteStats => {
  return NOTES.reduce((acc, note) => {
    acc[note.id] = { correct: 0, difficult: 0, lastSeen: null };
    return acc;
  }, {} as NoteStats);
};

export const DEFAULT_STATE: AppState = {
  stars: 0,
  streak: 0,
  longestStreak: 0,
  totalPracticeDays: 0,
  completedSessions: 0,
  lastPracticedDate: null,
  activeNotes: DEFAULT_ACTIVE_NOTES,
  sessionDuration: 5,
  difficulty: 'makkelijk',
  soundEnabled: false,
  noteStats: createEmptyNoteStats(),
  practiceStats: {
    patternsSucceeded: 0,
    patternsDifficult: 0
  }
};

export const loadState = (): AppState => {
  if (typeof window === 'undefined') return DEFAULT_STATE;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      noteStats: {
        ...createEmptyNoteStats(),
        ...(parsed.noteStats ?? {})
      }
    };
  } catch {
    return DEFAULT_STATE;
  }
};

export const saveState = (state: AppState): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
