'use client';

import { NOTES, NoteId } from '@/data/notes';
import { useAppState } from '@/lib/use-app-state';

export default function SettingsPanel() {
  const { state, setState, resetState } = useAppState();

  const toggleNote = (note: NoteId) => {
    setState((prev) => {
      const exists = prev.activeNotes.includes(note);
      const activeNotes = exists ? prev.activeNotes.filter((n) => n !== note) : [...prev.activeNotes, note];
      return { ...prev, activeNotes: activeNotes.length ? activeNotes : prev.activeNotes };
    });
  };

  return (
    <section className="space-y-5 rounded-2xl bg-white p-4 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">Instellingen</h2>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Actieve noten</p>
        <div className="flex flex-wrap gap-2">
          {NOTES.map((note) => {
            const active = state.activeNotes.includes(note.id);
            return (
              <button
                key={note.id}
                onClick={() => toggleNote(note.id)}
                className={`rounded-full px-3 py-2 text-sm ${active ? 'bg-sky-200' : 'bg-slate-100'}`}
              >
                {note.displayName}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Oefenduur</p>
        <div className="flex gap-2">
          {[3, 5, 8].map((mins) => (
            <button
              key={mins}
              onClick={() => setState((prev) => ({ ...prev, sessionDuration: mins as 3 | 5 | 8 }))}
              className={`rounded-full px-3 py-2 ${state.sessionDuration === mins ? 'bg-sky-200' : 'bg-slate-100'}`}
            >
              {mins} min
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Moeilijkheid</p>
        <div className="flex gap-2">
          {(['makkelijk', 'normaal'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setState((prev) => ({ ...prev, difficulty: mode }))}
              className={`rounded-full px-3 py-2 capitalize ${state.difficulty === mode ? 'bg-sky-200' : 'bg-slate-100'}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center justify-between rounded-xl bg-slate-100 p-3">
        <span>Geluid aan</span>
        <input
          type="checkbox"
          checked={state.soundEnabled}
          onChange={(e) => setState((prev) => ({ ...prev, soundEnabled: e.target.checked }))}
        />
      </label>

      <button onClick={resetState} className="w-full rounded-xl bg-rose-100 px-4 py-3 font-semibold">
        Reset voortgang
      </button>
    </section>
  );
}
