export type NoteId = 'c' | 'd' | 'e' | 'f' | 'g' | 'a' | 'b' | 'c_high';

export type HoleState = 'closed' | 'open' | 'half';

// Fingering holes for Deutsche Griffweise (Duits) soprano recorder
// Layout: thumb | h1 h2 h3 | h4 h5 | h6L h6R | h7L h7R
export type FingeringHoles = {
  thumb: HoleState;
  h1: HoleState;
  h2: HoleState;
  h3: HoleState;
  h4: HoleState;
  h5: HoleState;
  h6L: HoleState;
  h6R: HoleState;
  h7L: HoleState;
  h7R: HoleState;
};

export type NoteItem = {
  id: NoteId;
  name: string;
  displayName: string;
  fingering: string;
  difficulty: 1 | 2 | 3 | 4;
  order: number;
  // Staff position: 0 = E4 (bottom line), 2 = G4, 4 = B4, 6 = D5, 8 = F5 (top line)
  // Odd = space, Even = line. Above staff: 9=G5, 10=A5, 11=B5, 12=C6
  staffPosition: number;
  holes: FingeringHoles;
};

// Deutsche Griffweise (Duits) soprano recorder fingerings
// Reading from: Sopraan/Duits charts (standard German-system soprano)
const CLOSED = 'closed' as const;
const OPEN = 'open' as const;
const HALF = 'half' as const;

export const NOTES: NoteItem[] = [
  {
    id: 'b',
    name: 'B',
    displayName: 'B',
    fingering: 'duim + 1',
    difficulty: 1,
    order: 1,
    staffPosition: 11, // B5 = 1 space above first ledger line above staff
    holes: { thumb: CLOSED, h1: CLOSED, h2: OPEN, h3: OPEN, h4: OPEN, h5: OPEN, h6L: OPEN, h6R: OPEN, h7L: OPEN, h7R: OPEN }
  },
  {
    id: 'a',
    name: 'A',
    displayName: 'A',
    fingering: 'duim + 1–2',
    difficulty: 1,
    order: 2,
    staffPosition: 10, // A5 = first ledger line above staff
    holes: { thumb: CLOSED, h1: CLOSED, h2: CLOSED, h3: OPEN, h4: OPEN, h5: OPEN, h6L: OPEN, h6R: OPEN, h7L: OPEN, h7R: OPEN }
  },
  {
    id: 'g',
    name: 'G',
    displayName: 'G',
    fingering: 'duim + 1–2–3',
    difficulty: 1,
    order: 3,
    staffPosition: 9, // G5 = space above top staff line
    holes: { thumb: CLOSED, h1: CLOSED, h2: CLOSED, h3: CLOSED, h4: OPEN, h5: OPEN, h6L: OPEN, h6R: OPEN, h7L: OPEN, h7R: OPEN }
  },
  {
    id: 'f',
    name: 'F',
    displayName: 'F',
    fingering: 'duim + 1–2–3–4 (Duits)',
    difficulty: 2,
    order: 4,
    staffPosition: 8, // F5 = top staff line
    holes: { thumb: CLOSED, h1: CLOSED, h2: CLOSED, h3: CLOSED, h4: CLOSED, h5: OPEN, h6L: CLOSED, h6R: OPEN, h7L: OPEN, h7R: OPEN }
  },
  {
    id: 'e',
    name: 'E',
    displayName: 'E',
    fingering: 'duim + 1–2–3–4–5',
    difficulty: 2,
    order: 5,
    staffPosition: 7, // E5 = 4th space
    holes: { thumb: CLOSED, h1: CLOSED, h2: CLOSED, h3: CLOSED, h4: CLOSED, h5: CLOSED, h6L: OPEN, h6R: OPEN, h7L: OPEN, h7R: OPEN }
  },
  {
    id: 'd',
    name: 'D',
    displayName: 'D',
    fingering: 'duim + 1–2–3–4–5–6',
    difficulty: 3,
    order: 6,
    staffPosition: 6, // D5 = 4th line
    holes: { thumb: CLOSED, h1: CLOSED, h2: CLOSED, h3: CLOSED, h4: CLOSED, h5: CLOSED, h6L: CLOSED, h6R: CLOSED, h7L: OPEN, h7R: OPEN }
  },
  {
    id: 'c',
    name: 'C',
    displayName: 'C',
    fingering: 'alle gaten dicht',
    difficulty: 3,
    order: 7,
    staffPosition: 5, // C5 = 3rd space
    holes: { thumb: CLOSED, h1: CLOSED, h2: CLOSED, h3: CLOSED, h4: CLOSED, h5: CLOSED, h6L: CLOSED, h6R: CLOSED, h7L: CLOSED, h7R: CLOSED }
  },
  {
    id: 'c_high',
    name: "C'",
    displayName: "C'",
    fingering: 'duim half + 1',
    difficulty: 4,
    order: 8,
    staffPosition: 12, // C6 = 2nd ledger line above staff
    holes: { thumb: HALF, h1: CLOSED, h2: OPEN, h3: OPEN, h4: OPEN, h5: OPEN, h6L: OPEN, h6R: OPEN, h7L: OPEN, h7R: OPEN }
  }
];

export const DEFAULT_ACTIVE_NOTES: NoteId[] = ['b', 'a', 'g'];
