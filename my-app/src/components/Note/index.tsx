import { NoteType } from 'src/types/note';

type Props = {
  note: NoteType;
  onDelete: () => void;
  onEdit: () => void;
};

export const Note = ({ note, onDelete, onEdit }: Props): JSX.Element => {
  return (
    <div className='note'>
      <div className='header'>
        <h3 className={note.type}>{note.title}</h3>
        <p>{note.description}</p>
      </div>

      <div className='footer'>
        <p>{note.date}</p>
        <div className='container-buttons'>
          <div className='note-button' onClick={onEdit}>
            <img src='content/edit.png' />
          </div>
          <div className='note-button' onClick={onDelete}>
            <img src='content/delete.png' />
          </div>
        </div>
      </div>
    </div>
  );
};
