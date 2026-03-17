'use client';

import { useMemo, useState } from 'react';
import PatternDisplay from '@/components/PatternDisplay';
import { generatePattern } from '@/lib/patterns';
import { useAppState } from '@/lib/use-app-state';
import { NoteId } from '@/data/notes';

const MIN_PATTERNS = 3; // must try this many before marking as done

export default function PracticePage() {
  const { state, setState } = useAppState();
  const [length, setLength] = useState(3);
  const [triedCount, setTriedCount] = useState(0);

  const difficultMap = useMemo(
    () => Object.fromEntries(Object.entries(state.noteStats).map(([k, v]) => [k, v.difficult + 1])) as Record<NoteId, number>,
    [state.noteStats]
  );

  const [pattern, setPattern] = useState(generatePattern(state.activeNotes, length, difficultMap));

  const regenerate = (nextLen = length) => {
    const newPattern = generatePattern(state.activeNotes, nextLen, difficultMap);
    setPattern(newPattern);
    setTriedCount((c) => c + 1);
  };

  const updateLength = (delta: number) => {
    const next = Math.min(5, Math.max(3, length + delta));
    setLength(next);
    regenerate(next);
  };

  const canMark = triedCount >= MIN_PATTERNS;
  const progressPct = Math.min(100, (triedCount / MIN_PATTERNS) * 100);

  const markDone = (difficult: boolean) => {
    setState((prev) => ({
      ...prev,
      practiceStats: {
        ...prev.practiceStats,
        patternsSucceeded: prev.practiceStats.patternsSucceeded + (difficult ? 0 : 1),
        patternsDifficult: prev.practiceStats.patternsDifficult + (difficult ? 1 : 0),
      }
    }));
    // Reset counter for next round
    setTriedCount(0);
    regenerate();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">Oefenen</h1>
        <span className="text-sm text-slate-500">{triedCount} / {MIN_PATTERNS} patronen</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-sky-400 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Pattern display */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-slate-400">
          Speel dit patroon na
        </p>
        <PatternDisplay pattern={pattern} />
        <p className="mt-2 text-xs text-slate-400">Lengte: {length} noten</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => regenerate()}
          className="col-span-2 rounded-2xl bg-sky-200 p-4 text-lg font-bold active:scale-95 transition-transform"
        >
          🔄 Nieuw patroon
        </button>
        <button
          onClick={() => updateLength(-1)}
          disabled={length <= 3}
          className="rounded-2xl bg-slate-100 p-3 font-semibold disabled:opacity-40"
        >
          Korter (−)
        </button>
        <button
          onClick={() => updateLength(1)}
          disabled={length >= 5}
          className="rounded-2xl bg-slate-100 p-3 font-semibold disabled:opacity-40"
        >
          Langer (+)
        </button>
      </div>

      {/* Mark buttons — only enabled after MIN_PATTERNS attempts */}
      {!canMark ? (
        <p className="rounded-2xl bg-slate-50 p-4 text-center text-sm text-slate-500">
          Oefen nog {MIN_PATTERNS - triedCount} patroon{MIN_PATTERNS - triedCount !== 1 ? 'en' : ''} om te markeren
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => markDone(false)}
            className="rounded-2xl bg-emerald-100 p-4 font-bold text-emerald-800 active:scale-95 transition-transform"
          >
            ✅ Dat ging goed!
          </button>
          <button
            onClick={() => markDone(true)}
            className="rounded-2xl bg-amber-100 p-4 font-bold text-amber-800 active:scale-95 transition-transform"
          >
            🤔 Nog lastig
          </button>
        </div>
      )}
    </div>
  );
}
