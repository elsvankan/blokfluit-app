import { NoteId } from '@/data/notes';

export const pickWeightedNote = (
  activeNotes: NoteId[],
  difficultMap: Record<NoteId, number>
): NoteId => {
  const bag: NoteId[] = [];
  activeNotes.forEach((note) => {
    const weight = Math.max(1, difficultMap[note] || 0);
    for (let i = 0; i < weight; i += 1) bag.push(note);
  });

  return bag[Math.floor(Math.random() * bag.length)];
};

export const generatePattern = (
  activeNotes: NoteId[],
  length: number,
  difficultMap: Record<NoteId, number>
): NoteId[] => {
  const safeLength = Math.min(5, Math.max(3, length));
  return Array.from({ length: safeLength }, () => pickWeightedNote(activeNotes, difficultMap));
};
