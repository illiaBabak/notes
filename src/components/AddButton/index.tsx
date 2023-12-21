type Props = {
  handleClick: () => void;
};

export const AddButton = ({ handleClick }: Props): JSX.Element => {
  return (
    <div className='add-note' onClick={handleClick}>
      <img />
    </div>
  );
};
