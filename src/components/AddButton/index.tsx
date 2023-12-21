type Props = {
  handleClick: () => void;
};

export const AddButton = ({ handleClick }: Props): JSX.Element => {
  return (
    <div className='add-note' onClick={handleClick}>
      <img src='content/add_note.png' />
    </div>
  );
};
