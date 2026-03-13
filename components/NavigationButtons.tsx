import Link from 'next/link';

type NavButton = { href: string; label: string; tone?: 'blue' | 'green' | 'sand' };

const toneClass: Record<NonNullable<NavButton['tone']>, string> = {
  blue: 'bg-sky-200',
  green: 'bg-mintsoft',
  sand: 'bg-sand'
};

export default function NavigationButtons({ items }: { items: NavButton[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`rounded-2xl px-5 py-4 text-center text-lg font-semibold shadow-sm ${toneClass[item.tone ?? 'blue']}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
