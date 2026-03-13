import { NOTES, NoteId } from '@/data/notes';

const labelById = Object.fromEntries(NOTES.map((n) => [n.id, n.displayName])) as Record<NoteId, string>;

export default function PatternDisplay({ pattern }: { pattern: NoteId[] }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">Speel dit patroon</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {pattern.map((item, idx) => (
          <span key={`${item}-${idx}`} className="rounded-xl bg-sand px-4 py-2 text-2xl font-bold">
            {labelById[item]}
          </span>
        ))}
      </div>
    </section>
  );
}
