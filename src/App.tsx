import './App.scss';
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { NotesPage } from './components/NotesPage';
import { NoteType } from './types/note';
import { AddButton } from './components/AddButton';
import { Modal } from './components/Modal';
import { StorageButton } from './components/StorageButton';
import { isNotesArray } from './utils/guards';

export const Props = createContext<{
  notes: NoteType[];
  isDrag: boolean;
  draggedNoteKey: string | null;
  setNotes: Dispatch<SetStateAction<NoteType[]>>;
  setSelectedNote: Dispatch<SetStateAction<NoteType | null>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  onDrop: (notes: NoteType[]) => void;
  onDragStart: (note: NoteType) => void;
} | null>(null);

export const App = (): JSX.Element => {
  const storageNotesData = localStorage.getItem('notes');
  const parsedNotes: unknown = storageNotesData ? JSON.parse(storageNotesData) : [];
  const existingNotes = isNotesArray(parsedNotes) ? parsedNotes : [];

  const [notes, setNotes] = useState<NoteType[]>(existingNotes);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [draggedNoteKey, setDraggedNoteKey] = useState<string | null>(null);
  const [isDrag, setIsDrag] = useState(false);

  const onDragStart = (note: NoteType) => {
    setDraggedNoteKey(note.key);
    setIsDrag((prev) => !prev);
  };

  const onDrop = (dropList: NoteType[]) => {
    if (!draggedNoteKey) return;

    setNotes((prev) => prev.map((note) => (note.key === draggedNoteKey ? { ...note, type: dropList[0].type } : note)));
    setIsDrag((prev) => !prev);
    setDraggedNoteKey(null);
  };

  const handleSave = (note: NoteType) => {
    setIsModalVisible((prev) => !prev);
    setSelectedNote(null);
    setNotes((prev) => [...prev.filter((note) => note.key !== selectedNote?.key), note]);
  };

  return (
    <div className='container'>
      {!isModalVisible ? (
        <>
          <AddButton handleClick={() => setIsModalVisible(!isModalVisible)} />
          <StorageButton notes={notes} />
        </>
      ) : (
        <Modal onSave={handleSave} setIsModalVisible={setIsModalVisible} selectedNote={selectedNote} />
      )}
      <Props.Provider
        value={{ setSelectedNote, notes, setNotes, setIsModalVisible, onDrop, onDragStart, isDrag, draggedNoteKey }}
      >
        <NotesPage />
      </Props.Provider>
    </div>
  );
};
