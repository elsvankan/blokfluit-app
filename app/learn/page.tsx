'use client';

import { useMemo, useState } from 'react';
import NoteCard from '@/components/NoteCard';
import { NOTES, NoteId } from '@/data/notes';
import { markNoteResult, maybeUnlockNextNote } from '@/lib/learning';
import { useAppState } from '@/lib/use-app-state';

export default function LearnPage() {
  const { state, setState } = useAppState();
  const [showFingering, setShowFingering] = useState(false);
  const [index, setIndex] = useState(0);

  const activeNotes = useMemo(
    () => NOTES.filter((n) => state.activeNotes.includes(n.id)).sort((a, b) => a.order - b.order),
    [state.activeNotes]
  );

  const currentNote = activeNotes[index % activeNotes.length];

  const next = () => {
    setShowFingering(false);
    setIndex((prev) => (prev + 1) % activeNotes.length);
  };

  const mark = (difficult: boolean) => {
    setState((prev) => maybeUnlockNextNote(markNoteResult(prev, currentNote.id as NoteId, difficult)));
    next();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black">Noten leren</h1>

      <div className="flex flex-wrap gap-2 rounded-2xl bg-white p-4 shadow-sm">
        {NOTES.map((note) => {
          const active = state.activeNotes.includes(note.id);
          return (
            <button
              key={note.id}
              onClick={() =>
                setState((prev) => {
                  if (active) {
                    const filtered = prev.activeNotes.filter((n) => n !== note.id);
                    return { ...prev, activeNotes: filtered.length ? filtered : prev.activeNotes };
                  }
                  return { ...prev, activeNotes: [...prev.activeNotes, note.id] };
                })
              }
              className={`rounded-full px-3 py-2 ${active ? 'bg-sky-200' : 'bg-slate-100'}`}
            >
              {note.displayName}
            </button>
          );
        })}
      </div>

      <NoteCard note={currentNote} showFingering={showFingering} />

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => setShowFingering(true)} className="rounded-2xl bg-sky-200 p-4 font-semibold">
          Toon vingerzetting
        </button>
        <button onClick={next} className="rounded-2xl bg-slate-200 p-4 font-semibold">
          Volgende noot
        </button>
        <button onClick={() => mark(false)} className="rounded-2xl bg-mintsoft p-4 font-semibold">
          Ik wist hem
        </button>
        <button onClick={() => mark(true)} className="rounded-2xl bg-amber-100 p-4 font-semibold">
          Nog lastig
        </button>
      </div>
    </div>
  );
}
