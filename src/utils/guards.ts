import { NoteType, PossibleNote } from 'src/types/note';

const isPossibleNote = (data: unknown): data is PossibleNote => {
  return !!data && typeof data === 'object' && 'title' in data && 'description' in data && 'key' in data;
};

export const isNotesArray = (data: unknown): data is NoteType[] => {
  return (
    Array.isArray(data) &&
    data.every((el) => {
      return (
        isPossibleNote(el) &&
        typeof el.title === 'string' &&
        typeof el.description === 'string' &&
        typeof el.key === 'string'
      );
    })
  );
};
