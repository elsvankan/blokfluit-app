import { NoteItem } from '@/data/notes';

export default function NoteCard({ note, showFingering }: { note: NoteItem; showFingering: boolean }) {
  return (
    <section className="rounded-3xl bg-white p-6 text-center shadow-sm">
      <p className="text-xs uppercase text-slate-500">Noot</p>
      <h2 className="mt-2 text-7xl font-black tracking-tight">{note.displayName}</h2>
      {showFingering ? (
        <p className="mt-5 rounded-xl bg-mintsoft p-3 text-base font-medium">Vingerzetting: {note.fingering}</p>
      ) : (
        <p className="mt-5 text-sm text-slate-500">Tik op "toon vingerzetting".</p>
      )}
    </section>
  );
}
