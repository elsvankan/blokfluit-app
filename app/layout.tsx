import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { AppStateProvider } from '@/lib/use-app-state';

export const metadata: Metadata = {
  title: 'Blokfluit Buddies',
  description: 'Leer spelenderwijs blokfluit oefenen in kleine stapjes.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <AppStateProvider>
          <Header />
          <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
        </AppStateProvider>
      </body>
    </html>
  );
}
