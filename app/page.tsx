'use client';

import NavigationButtons from '@/components/NavigationButtons';
import ProgressCard from '@/components/ProgressCard';
import { useAppState } from '@/lib/use-app-state';

export default function HomePage() {
  const { state } = useAppState();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black">Blokfluit Buddies</h1>
        <p className="mt-2 text-slate-600">
          Oefenen in kleine stapjes helpt. Fouten maken hoort erbij — elke oefening maakt je sterker!
        </p>
      </section>

      <NavigationButtons
        items={[
          { href: '/learn', label: 'Noten leren', tone: 'blue' },
          { href: '/practice', label: 'Oefenen', tone: 'green' },
          { href: '/progress', label: 'Voortgang', tone: 'sand' }
        ]}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <ProgressCard title="Sterren" value={state.stars} />
        <ProgressCard title="Huidige streak" value={state.streak} />
        <ProgressCard title="Laatst geoefend" value={state.lastPracticedDate ?? 'Nog niet'} />
      </div>
    </div>
  );
}
