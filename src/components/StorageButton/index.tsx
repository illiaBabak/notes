import { useContext } from 'react';
import { GlobalContext } from 'src/App';

export const StorageButton = (): JSX.Element => {
  const { notes } = useContext(GlobalContext);

  const handleClick = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
  };

  return (
    <div className='add-storage' onClick={handleClick}>
      <img alt='' />
    </div>
  );
};
