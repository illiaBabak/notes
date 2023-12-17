import { NoteType } from 'src/types/note';
import { Note } from '../Note';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  notes: NoteType[];
  headerText: string;
  isDrag: boolean;
  draggedNoteKey: string | null;
  setNotes: Dispatch<SetStateAction<NoteType[]>>;
  setSelectedNote: Dispatch<SetStateAction<NoteType | null>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  onDrop: (notes: NoteType[]) => void;
  onDragStart: (note: NoteType) => void;
};

export const NotesList = ({
  notes,
  headerText,
  isDrag,
  setNotes,
  setSelectedNote,
  setIsModalVisible,
  onDrop,
  onDragStart,
  draggedNoteKey,
}: Props): JSX.Element => {
  const deleteNote = (key: string) => setNotes((prev) => prev.filter((note) => note.key !== key));

  return (
    <>
      {!!notes.length && (
        <div className='col' onDrop={() => onDrop(notes)} onDragOver={(e) => e.preventDefault()}>
          <h2>{headerText}</h2>
          <div className={`container-notes ${isDrag ? 'dragged' : ''}`}>
            {notes.map((note) => (
              <Note
                note={note}
                key={note.key}
                onDelete={() => deleteNote(note.key)}
                onEdit={() => {
                  setSelectedNote(note);
                  setIsModalVisible((prev) => !prev);
                }}
                onDragStart={() => onDragStart(note)}
                className={note.key === draggedNoteKey ? 'hidden' : ''}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
