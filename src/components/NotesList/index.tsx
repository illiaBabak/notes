import { useContext } from 'react';
import { Note } from '../Note';
import { GlobalContext } from 'src/App';
import { capitalize } from 'src/utils/capitalize';
import { filterNotesByType } from 'src/utils/filterNotesByType';

export const NOTE_TYPES = ['reminder', 'important', 'regular'] as const;

type Props = {
  type: (typeof NOTE_TYPES)[number];
};

export const NotesList = ({ type }: Props): JSX.Element => {
  const { onDrop, draggedNoteKey, isDrag, notes } = useContext(GlobalContext);
  const selectedNotes = filterNotesByType(notes, type);

  return (
    <>
      {!!selectedNotes.length && (
        <div className='col' onDrop={() => onDrop(selectedNotes)} onDragOver={(e) => e.preventDefault()}>
          <h2>{capitalize(type)}</h2>
          <div className={`container-notes ${isDrag ? 'dragged' : ''}`}>
            {selectedNotes.map((note) => (
              <Note note={note} key={note.key} className={note.key === draggedNoteKey ? 'hidden' : ''} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
