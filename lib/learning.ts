import { NoteId, NOTES } from '@/data/notes';
import { AppState } from './storage';

export const getNextNoteToUnlock = (activeNotes: NoteId[]): NoteId | null => {
  const sorted = [...NOTES].sort((a, b) => a.order - b.order);
  const next = sorted.find((note) => !activeNotes.includes(note.id));
  return next?.id ?? null;
};

export const markNoteResult = (state: AppState, noteId: NoteId, difficult: boolean): AppState => {
  const current = state.noteStats[noteId];
  return {
    ...state,
    noteStats: {
      ...state.noteStats,
      [noteId]: {
        correct: current.correct + (difficult ? 0 : 1),
        difficult: current.difficult + (difficult ? 1 : 0),
        lastSeen: new Date().toISOString()
      }
    }
  };
};

export const maybeUnlockNextNote = (state: AppState): AppState => {
  const threshold = 4;
  const allStrong = state.activeNotes.every((noteId) => {
    const stats = state.noteStats[noteId];
    return stats.correct - stats.difficult >= threshold;
  });

  if (!allStrong) return state;

  const next = getNextNoteToUnlock(state.activeNotes);
  if (!next) return state;

  return {
    ...state,
    activeNotes: [...state.activeNotes, next]
  };
};
