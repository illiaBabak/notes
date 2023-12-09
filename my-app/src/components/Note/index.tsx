import { NoteType } from 'src/types/note';
import './index.scss';

type Props = {
  note: NoteType;
  onDelete: () => void;
  onEdit: () => void;
};

export default function Note({ note, onDelete, onEdit }: Props): JSX.Element {
  const currentDate = new Date();

  return (
    <div className='note'>
      <div className='header'>
        <h3>{note.title}</h3>
        <p>{note.description}</p>
      </div>

      <div className='footer'>
        <p>{currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
}
