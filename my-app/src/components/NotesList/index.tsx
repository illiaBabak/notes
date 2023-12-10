import { NoteType } from 'src/types/note';
import { Note } from '../Note';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  notes: NoteType[];
  headerText: string;
  setNotes: Dispatch<SetStateAction<NoteType[]>>;
  setSelectedNote: Dispatch<SetStateAction<NoteType | null>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
};

export const NotesList = ({ notes, headerText, setNotes, setSelectedNote, setIsModalVisible }: Props): JSX.Element => {
  const deleteNote = (key: string) => setNotes((prev) => prev.filter((note) => note.key !== key));

  return (
    <>
      {notes.length && (
        <div className='col'>
          <h2>{headerText}</h2>
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
        </div>
      )}
    </>
  );
};
