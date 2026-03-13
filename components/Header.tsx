import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/learn', label: 'Noten leren' },
  { href: '/practice', label: 'Oefenen' },
  { href: '/daily', label: 'Dagelijks' },
  { href: '/progress', label: 'Voortgang' },
  { href: '/settings', label: 'Instellingen' }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-sky-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-3 py-3 text-sm">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap rounded-full bg-sky-100 px-3 py-1 font-medium">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
