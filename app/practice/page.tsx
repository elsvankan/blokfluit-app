'use client';

import { useMemo, useState } from 'react';
import PatternDisplay from '@/components/PatternDisplay';
import { generatePattern } from '@/lib/patterns';
import { useAppState } from '@/lib/use-app-state';
import { NoteId } from '@/data/notes';

export default function PracticePage() {
  const { state, setState } = useAppState();
  const [length, setLength] = useState(3);
  const difficultMap = useMemo(
    () => Object.fromEntries(Object.entries(state.noteStats).map(([k, v]) => [k, v.difficult + 1])) as Record<NoteId, number>,
    [state.noteStats]
  );
  const [pattern, setPattern] = useState(generatePattern(state.activeNotes, length, difficultMap));

  const regenerate = (nextLen = length) => {
    const newPattern = generatePattern(state.activeNotes, nextLen, difficultMap);
    setPattern(newPattern);
  };

  const updateLength = (delta: number) => {
    const next = Math.min(5, Math.max(3, length + delta));
    setLength(next);
    regenerate(next);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black">Oefenen</h1>
      <PatternDisplay pattern={pattern} />
      <p className="text-sm text-slate-600">Patroonlengte: {length}</p>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => regenerate()} className="rounded-2xl bg-sky-200 p-4 font-semibold">
          Nieuw patroon
        </button>
        <button onClick={() => updateLength(-1)} className="rounded-2xl bg-slate-200 p-4 font-semibold">
          Makkelijker
        </button>
        <button onClick={() => updateLength(1)} className="rounded-2xl bg-slate-200 p-4 font-semibold">
          Moeilijker
        </button>
        <button
          onClick={() =>
            setState((prev) => ({
              ...prev,
              practiceStats: { ...prev.practiceStats, patternsSucceeded: prev.practiceStats.patternsSucceeded + 1 }
            }))
          }
          className="rounded-2xl bg-mintsoft p-4 font-semibold"
        >
          Markeer als gelukt
        </button>
        <button
          onClick={() =>
            setState((prev) => ({
              ...prev,
              practiceStats: { ...prev.practiceStats, patternsDifficult: prev.practiceStats.patternsDifficult + 1 }
            }))
          }
          className="col-span-2 rounded-2xl bg-amber-100 p-4 font-semibold"
        >
          Markeer als lastig
        </button>
      </div>
    </div>
  );
}
