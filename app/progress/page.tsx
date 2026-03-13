'use client';

import ProgressCard from '@/components/ProgressCard';
import { NOTES } from '@/data/notes';
import { useAppState } from '@/lib/use-app-state';

export default function ProgressPage() {
  const { state } = useAppState();

  const difficultNotes = NOTES.filter((note) => state.noteStats[note.id].difficult > state.noteStats[note.id].correct)
    .map((n) => n.displayName)
    .join(', ');

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black">Voortgang</h1>
      <div className="grid grid-cols-2 gap-3">
        <ProgressCard title="Sterren" value={state.stars} />
        <ProgressCard title="Huidige streak" value={state.streak} />
        <ProgressCard title="Langste streak" value={state.longestStreak} />
        <ProgressCard title="Sessies afgerond" value={state.completedSessions} />
      </div>
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-semibold">Actieve noten</h2>
        <p>{state.activeNotes.map((id) => NOTES.find((n) => n.id === id)?.displayName).join(' · ')}</p>
      </section>
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="font-semibold">Vaak lastig</h2>
        <p>{difficultNotes || 'Nog geen lastige noten. Super! 🎉'}</p>
      </section>
    </div>
  );
}
