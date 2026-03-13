export default function ProgressCard({
  title,
  value,
  description
}: {
  title: string;
  value: string | number;
  description?: string;
}) {
  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="text-sm text-slate-500">{title}</h3>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
    </article>
  );
}
