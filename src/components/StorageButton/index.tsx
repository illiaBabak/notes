import { NoteType } from 'src/types/note';

type Props = {
  notes: NoteType[];
};

export const StorageButton = ({ notes }: Props): JSX.Element => {
  const handleClick = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
  };

  return (
    <div className='add-storage' onClick={handleClick}>
      <img alt='' />
    </div>
  );
};
