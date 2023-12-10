import { NoteType } from 'src/types/note';
import { generateKey } from 'src/utils/generateKey';
import { useState } from 'react';

type Props = {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNote: NoteType | null;
  onSave: (note: NoteType) => void;
};

export const Modal = ({ setIsModalVisible, onSave, selectedNote }: Props): JSX.Element => {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const [currentNote, setCurrentNote] = useState(
    selectedNote ?? {
      title: '',
      description: '',
      key: generateKey(16),
      date: currentDate,
      type: 'regular',
    }
  );

  const isFormValid = currentNote.description.length && currentNote.title.length;

  const handleClick = (): void => setIsModalVisible((prev) => !prev);

  const handleInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    setCurrentNote((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };

  return (
    <div className='overlay' onClick={handleClick}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <div className='header'>
          <h2>{selectedNote ? 'Edit note' : 'Add new note'}</h2>
          <div className='close-button' onClick={handleClick}>
            x
          </div>
        </div>
        <div className='main'>
          <div className='block'>
            <p>Title</p>
            <input placeholder='*Type title here' onChange={handleInput} value={currentNote.title} name='title'></input>
          </div>

          <div className='block'>
            <p>Description</p>
            <textarea
              placeholder='*Type description here'
              onChange={handleInput}
              value={currentNote.description}
              name='description'
            ></textarea>
          </div>

          <div className='block'>
            <p>Type</p>
            <select name='type' onChange={handleInput} value={currentNote.type}>
              <option value='regular'>Regular</option>
              <option value='important'>Important</option>
              <option value='reminder'>Reminder</option>
            </select>
          </div>

          <div className={`add-note-wrapper ${!isFormValid ? 'disabled' : ''}`}>
            <button className='add-note-button' onClick={() => onSave(currentNote)}>
              {selectedNote ? 'Edit note' : 'Add note'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
