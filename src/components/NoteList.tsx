import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NoteList.css"; // Ensure the CSS file is imported
import { MdDelete } from "react-icons/md";

interface Note {
  id: number;
  content: string;
}

interface NoteListProps {
  refresh: number;
}

const NoteList: React.FC<NoteListProps> = ({ refresh }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    
    
    try {
      const response = await axios.get("http://localhost:3090/notes");
       console.log(response);
      setNotes(response.data);
    } catch (error) {
      console.error("Failed to fetch notes", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3090/notes/${id}`);
      fetchNotes(); // Re-fetch notes after deletion
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [refresh]);

  return (
    <div className="note-list-container">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className="note">
               <a  className="styled-block">
                    <h5 className="note-content">{note.content}</h5>
               </a>
            <MdDelete fontSize={30} onClick={() => handleDelete(note.id)} />
          </div>
        ))
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};

export default NoteList;
