'use client';

import { useMemo, useState } from 'react';
import FingeringDiagram from '@/components/FingeringDiagram';
import NoteOnStaff from '@/components/NoteOnStaff';
import { NOTES, NoteId } from '@/data/notes';
import { markNoteResult, maybeUnlockNextNote } from '@/lib/learning';
import { useAppState } from '@/lib/use-app-state';

const MIN_NOTES_REQUIRED = 5;

type Phase = 'question' | 'reveal';

export default function LearnPage() {
  const { state, setState } = useAppState();
  const [phase, setPhase] = useState<Phase>('question');
  const [index, setIndex] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);

  // Only show active notes, sorted by order
  const activeNotes = useMemo(
    () => NOTES.filter((n) => state.activeNotes.includes(n.id)).sort((a, b) => a.order - b.order),
    [state.activeNotes]
  );

  const currentNote = activeNotes[index % activeNotes.length];

  const nextNote = () => {
    setPhase('question');
    setIndex((prev) => (prev + 1) % activeNotes.length);
  };

  const mark = (difficult: boolean) => {
    setState((prev) => maybeUnlockNextNote(markNoteResult(prev, currentNote.id as NoteId, difficult)));
    setSessionCount((c) => c + 1);
    nextNote();
  };

  const progressPct = Math.min(100, (sessionCount / MIN_NOTES_REQUIRED) * 100);
  const sessionDone = sessionCount >= MIN_NOTES_REQUIRED;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">Noten leren</h1>
        <span className="text-sm text-slate-500">{sessionCount} / {MIN_NOTES_REQUIRED} geoefend</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-sky-400 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      {sessionDone && (
        <p className="text-center text-sm font-semibold text-emerald-600">
          🌟 Goed gedaan! Blijf oefenen of ga terug.
        </p>
      )}

      {/* Flashcard */}
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
        {/* Question phase: show note on staff, hide name */}
        <div className="flex flex-col items-center gap-2 p-6">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Welke noot is dit?
          </p>

          {/* Note on staff */}
          <div className="my-2">
            <NoteOnStaff staffPosition={currentNote.staffPosition} />
          </div>

          {/* Reveal area */}
          {phase === 'question' ? (
            <div className="flex h-24 w-full items-center justify-center rounded-xl bg-slate-50">
              <span className="text-4xl font-black text-slate-300">?</span>
            </div>
          ) : (
            <div className="flex w-full items-center gap-4 rounded-xl bg-sky-50 p-4">
              {/* Fingering diagram */}
              <div className="flex-shrink-0">
                <FingeringDiagram holes={currentNote.holes} size="sm" />
              </div>
              {/* Note info */}
              <div className="flex-1">
                <p className="text-4xl font-black text-sky-700">{currentNote.displayName}</p>
                <p className="mt-1 text-sm text-slate-600">{currentNote.fingering}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      {phase === 'question' ? (
        <button
          onClick={() => setPhase('reveal')}
          className="w-full rounded-2xl bg-sky-200 p-4 text-lg font-bold active:scale-95 transition-transform"
        >
          Laat de noot zien 👀
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => mark(false)}
            className="rounded-2xl bg-emerald-100 p-4 font-bold text-emerald-800 active:scale-95 transition-transform"
          >
            ✅ Ik wist hem!
          </button>
          <button
            onClick={() => mark(true)}
            className="rounded-2xl bg-amber-100 p-4 font-bold text-amber-800 active:scale-95 transition-transform"
          >
            🤔 Nog lastig
          </button>
        </div>
      )}

      {/* Active notes selector (collapsible) */}
      <details className="rounded-2xl bg-white p-4 shadow-sm">
        <summary className="cursor-pointer text-sm font-semibold text-slate-500">
          Noten instellen ▾
        </summary>
        <div className="mt-3 flex flex-wrap gap-2">
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
                className={`rounded-full px-3 py-2 text-sm font-medium ${
                  active ? 'bg-sky-200 text-sky-800' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {note.displayName}
              </button>
            );
          })}
        </div>
      </details>
    </div>
  );
}
