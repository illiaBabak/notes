import { useContext } from 'react';
import { GlobalContext } from 'src/App';

export const AddButton = (): JSX.Element => {
  const { setIsModalVisible } = useContext(GlobalContext);

  return (
    <div className='add-note' onClick={() => setIsModalVisible((prev) => !prev)}>
      <img alt='' />
    </div>
  );
};
