'use client';

import { useMemo, useState } from 'react';
import { NOTES } from '@/data/notes';
import { generatePattern } from '@/lib/patterns';
import { useAppState } from '@/lib/use-app-state';
import { calculateStreak } from '@/lib/streak';
import { maybeUnlockNextNote } from '@/lib/learning';
import PatternDisplay from './PatternDisplay';

const noteMap = Object.fromEntries(NOTES.map((n) => [n.id, n.displayName]));

export default function DailyPracticeFlow() {
  const { state, setState } = useAppState();
  const [step, setStep] = useState(0);
  const [doneMessage, setDoneMessage] = useState('');

  const difficultMap = useMemo(
    () => Object.fromEntries(Object.entries(state.noteStats).map(([k, v]) => [k, v.difficult + 1])),
    [state.noteStats]
  );

  const recognition = useMemo(() => generatePattern(state.activeNotes, 3, difficultMap), [state.activeNotes, difficultMap]);
  const pattern = useMemo(() => generatePattern(state.activeNotes, 4, difficultMap), [state.activeNotes, difficultMap]);
  const miniMelody = useMemo(() => generatePattern(state.activeNotes, 5, difficultMap), [state.activeNotes, difficultMap]);

  const finish = () => {
    setState((prev) => {
      const streakInfo = calculateStreak(prev.lastPracticedDate, prev.streak, prev.totalPracticeDays, prev.longestStreak);
      let next = {
        ...prev,
        stars: prev.stars + (streakInfo.gainedStar ? 1 : 0),
        streak: streakInfo.streak,
        longestStreak: streakInfo.longestStreak,
        totalPracticeDays: streakInfo.totalPracticeDays,
        completedSessions: prev.completedSessions + (streakInfo.gainedStar ? 1 : 0),
        lastPracticedDate: streakInfo.todayKey
      };
      next = maybeUnlockNextNote(next);
      return next;
    });
    setDoneMessage('Top gedaan! Je hebt je dagelijkse oefening afgerond ⭐');
  };

  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-500">Stap {step + 1} van 3</p>
        {step === 0 && (
          <div>
            <h2 className="text-xl font-semibold">3 noten herkennen</h2>
            <p className="mt-2 text-2xl font-bold">{recognition.map((n) => noteMap[n]).join(' · ')}</p>
          </div>
        )}
        {step === 1 && (
          <div>
            <h2 className="mb-3 text-xl font-semibold">1 patroon oefenen</h2>
            <PatternDisplay pattern={pattern} />
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="mb-3 text-xl font-semibold">1 mini melodie</h2>
            <PatternDisplay pattern={miniMelody} />
          </div>
        )}
      </section>

      {step < 2 ? (
        <button onClick={() => setStep((s) => s + 1)} className="w-full rounded-2xl bg-sky-200 px-4 py-4 text-lg font-bold">
          Volgende stap
        </button>
      ) : (
        <button onClick={finish} className="w-full rounded-2xl bg-mintsoft px-4 py-4 text-lg font-bold">
          Klaar
        </button>
      )}

      {doneMessage && <p className="rounded-xl bg-white p-3 text-center font-medium">{doneMessage}</p>}
    </div>
  );
}
