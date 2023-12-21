import { NoteType } from 'src/types/note';
import { useContext } from 'react';
import { NotesList } from '../NotesList';
import { Props } from 'src/App';

const filterNotesByType = (notes: NoteType[], type: string) => notes.filter((note) => note.type === type);

export const NotesPage = (): JSX.Element => {
  const contextValue = useContext(Props);
  if (!contextValue) return <div>Error</div>;

  const { notes } = contextValue;

  const regularNotes = filterNotesByType(notes, 'regular');
  const importantNotes = filterNotesByType(notes, 'important');
  const reminderNotes = filterNotesByType(notes, 'reminder');

  return (
    <>
      <NotesList notes={importantNotes} headerText='Important' />
      <NotesList notes={reminderNotes} headerText='Reminder' />
      <NotesList notes={regularNotes} headerText='Regular' />
    </>
  );
};
