import { NoteType } from 'src/types/note';
import { Dispatch, SetStateAction } from 'react';
import { NotesList } from '../NotesList';

type Props = {
  notes: NoteType[];
  setNotes: Dispatch<SetStateAction<NoteType[]>>;
  setSelectedNote: Dispatch<SetStateAction<NoteType | null>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  onDrop: (notes: NoteType[]) => void;
  onDragStart: (note: NoteType) => void;
  isDrag: boolean;
  draggedNoteKey: string | null;
};

const filterNotesByType = (notes: NoteType[], type: string) => notes.filter((note) => note.type === type);

export const NotesPage = ({
  notes,
  isDrag,
  setNotes,
  setSelectedNote,
  setIsModalVisible,
  onDrop,
  onDragStart,
  draggedNoteKey,
}: Props): JSX.Element => {
  const regularNotes = filterNotesByType(notes, 'regular');
  const importantNotes = filterNotesByType(notes, 'important');
  const reminderNotes = filterNotesByType(notes, 'reminder');
  const commonProps = { setNotes, setSelectedNote, setIsModalVisible, onDrop, onDragStart, draggedNoteKey };

  return (
    <>
      <NotesList notes={importantNotes} headerText='Important' {...commonProps} isDrag={isDrag} />
      <NotesList notes={reminderNotes} headerText='Reminder' {...commonProps} isDrag={isDrag} />
      <NotesList notes={regularNotes} headerText='Regular' {...commonProps} isDrag={isDrag} />
    </>
  );
};
