import './App.scss';
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { NoteType } from './types/note';
import { AddButton } from './components/AddButton';
import { Modal } from './components/Modal';
import { StorageButton } from './components/StorageButton';
import { isNotesArray } from './utils/guards';
import { NOTE_TYPES, NotesList } from './components/NotesList';

type GlobalContextType = {
  notes: NoteType[];
  isDrag: boolean;
  draggedNoteKey: string | null;
  setNotes: Dispatch<SetStateAction<NoteType[]>>;
  setSelectedNote: Dispatch<SetStateAction<NoteType | null>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  onDrop: (notes: NoteType[]) => void;
  onDragStart: (note: NoteType) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  notes: [],
  isDrag: false,
  draggedNoteKey: null,
  setNotes: () => {
    throw new Error('Global context is not initialized');
  },
  setSelectedNote: () => {
    throw new Error('Global context is not initialized');
  },
  setIsModalVisible: () => {
    throw new Error('Global context is not initialized');
  },
  onDrop: () => {
    throw new Error('Global context is not initialized');
  },
  onDragStart: () => {
    throw new Error('Global context is not initialized');
  },
});

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

  return (
    <GlobalContext.Provider
      value={{ setSelectedNote, notes, setNotes, setIsModalVisible, onDrop, onDragStart, isDrag, draggedNoteKey }}
    >
      <div className='container'>
        {!isModalVisible ? (
          <>
            <AddButton />
            <StorageButton />
          </>
        ) : (
          <Modal selectedNote={selectedNote} />
        )}
        {NOTE_TYPES.map((type) => (
          <NotesList type={type} key={`notes-${type}`} />
        ))}
      </div>
    </GlobalContext.Provider>
  );
};
