import { useContext } from 'react';
import { Props } from 'src/App';
import { NoteType } from 'src/types/note';

type PropsType = {
  note: NoteType;
  className?: string;
};

export const Note = ({ note, className }: PropsType): JSX.Element => {
  const contextValue = useContext(Props);
  if (!contextValue) return <div>Error</div>;

  const { onDragStart, setNotes, setSelectedNote, setIsModalVisible } = contextValue;

  const deleteNote = (key: string) => setNotes((prev) => prev.filter((note) => note.key !== key));

  const editNote = () => {
    setSelectedNote(note);
    setIsModalVisible((prev) => !prev);
  };

  return (
    <div className={`note ${className ?? ''}`} draggable onDragStart={() => onDragStart(note)}>
      <div className='header'>
        <h3 className={note.type}>{note.title}</h3>
        <p>{note.description}</p>
      </div>

      <div className='footer'>
        <p>{note.date}</p>
        <div className='container-buttons'>
          <div className='note-button' onClick={editNote}>
            <img alt='' />
          </div>
          <div className='note-button' onClick={() => deleteNote(note.key)}>
            <img alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};
