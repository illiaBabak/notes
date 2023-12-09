import { useState } from 'react';
import './App.scss';
import NotesList from './components/NotesList';
import { NoteType } from './types/note';
import { AddButton } from './components/AddButton';
import Modal from './components/Modal';

export function App(): JSX.Element {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);

  const handleSave = (note: NoteType) => {
    setIsModalVisible((prev) => !prev);
    setSelectedNote(null);
    setNotes((prev) => [...prev.filter((note) => note.key !== selectedNote?.key), note]);
  };

  return (
    <div className='container'>
      {!isModalVisible ? (
        <AddButton handleClick={() => setIsModalVisible(!isModalVisible)} />
      ) : (
        <Modal onSave={handleSave} setIsModalVisible={setIsModalVisible} selectedNote={selectedNote} />
      )}
      <NotesList
        setSelectedNote={setSelectedNote}
        notes={notes}
        setNotes={setNotes}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
}
