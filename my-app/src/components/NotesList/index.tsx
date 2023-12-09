import { NoteType } from 'src/types/note';
import { Dispatch, SetStateAction } from 'react';
import './index.scss';
import Note from '../Note';

type Props = {
  notes: NoteType[];
  setNotes: Dispatch<SetStateAction<NoteType[]>>;
  setSelectedNote: Dispatch<SetStateAction<NoteType | null>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
};

export default function NotesList({ notes, setNotes, setSelectedNote, setIsModalVisible }: Props): JSX.Element {
  const deleteNote = (key: string) => setNotes((prev) => prev.filter((note) => note.key !== key));

  return (
    <div className='container-notes'>
      {notes.map((note) => (
        <Note
          note={note}
          key={note.key}
          onDelete={() => deleteNote(note.key)}
          onEdit={() => {
            setSelectedNote(note);
            setIsModalVisible((prev) => !prev);
          }}
        />
      ))}
    </div>
  );
}
