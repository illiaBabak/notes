import { useContext } from 'react';
import { Note } from '../Note';
import { Props } from 'src/App';
import { NoteType } from 'src/types/note';

type PropsType = {
  notes: NoteType[];
  headerText: string;
};

export const NotesList = ({ notes, headerText }: PropsType): JSX.Element => {
  const contextValue = useContext(Props);
  if (!contextValue) return <div>Error</div>;

  const { onDrop, draggedNoteKey, isDrag } = contextValue;

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
                className={note.key === draggedNoteKey ? 'hidden' : ''}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
