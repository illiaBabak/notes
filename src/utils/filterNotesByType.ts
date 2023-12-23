import { NoteType } from 'src/types/note';

export const filterNotesByType = (notes: NoteType[], type: string): NoteType[] =>
  notes.filter((note) => note.type === type);
