import { NoteType } from 'src/types/note';
import { Dispatch, SetStateAction } from 'react';
import { NotesList } from '../NotesList';

type Props = {
  notes: NoteType[];
  setNotes: Dispatch<SetStateAction<NoteType[]>>;
  setSelectedNote: Dispatch<SetStateAction<NoteType | null>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
};

const filterNotesByType = (notes: NoteType[], type: string) => notes.filter((note) => note.type === type);

export const NotesPage = ({ notes, setNotes, setSelectedNote, setIsModalVisible }: Props): JSX.Element => {
  const regularNotes = filterNotesByType(notes, 'regular');
  const importantNotes = filterNotesByType(notes, 'important');
  const reminderNotes = filterNotesByType(notes, 'reminder');
  const commonProps = { setNotes, setSelectedNote, setIsModalVisible };

  return (
    <>
      <NotesList notes={importantNotes} headerText='Important' {...commonProps} />
      <NotesList notes={reminderNotes} headerText='Reminder' {...commonProps} />
      <NotesList notes={regularNotes} headerText='Regular' {...commonProps} />
    </>
  );
};
