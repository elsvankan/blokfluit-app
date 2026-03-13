export type NoteId = 'c' | 'd' | 'e' | 'f' | 'g' | 'a' | 'b' | 'c_high';

export type NoteItem = {
  id: NoteId;
  name: string;
  displayName: string;
  fingering: string;
  difficulty: 1 | 2 | 3 | 4;
  order: number;
};

export const NOTES: NoteItem[] = [
  { id: 'b', name: 'B', displayName: 'B', fingering: 'duim half open', difficulty: 1, order: 1 },
  { id: 'a', name: 'A', displayName: 'A', fingering: 'duim', difficulty: 1, order: 2 },
  { id: 'g', name: 'G', displayName: 'G', fingering: 'duim + 1', difficulty: 1, order: 3 },
  { id: 'f', name: 'F', displayName: 'F', fingering: 'duim + 1–2–3–4', difficulty: 2, order: 4 },
  { id: 'e', name: 'E', displayName: 'E', fingering: 'duim + 1–2', difficulty: 2, order: 5 },
  { id: 'd', name: 'D', displayName: 'D', fingering: 'duim + 1–2–3', difficulty: 3, order: 6 },
  { id: 'c', name: 'C', displayName: 'C', fingering: 'alle gaten dicht', difficulty: 3, order: 7 },
  { id: 'c_high', name: "C'", displayName: "C'", fingering: 'duim half + 1–2–3', difficulty: 4, order: 8 }
];

export const DEFAULT_ACTIVE_NOTES: NoteId[] = ['b', 'a', 'g'];
