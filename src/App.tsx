import React, { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

const App: React.FC = () => {
  const [notesUpdated, setNotesUpdated] = useState<number>(0);
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const handleSave = () => {
    setNotesUpdated((prev) => prev + 1); // Refresh notes list
  };

  const toggleNotes = () => {
    setShowNotes((prev) => !prev);
  };

  return (
    <div className="app-container">
      <div>
      <h1> Welcome to <br/>
        Note App</h1>
      <NoteForm onSave={handleSave} />
      </div>
      
 <hr className="hrdesign"/>

      <div>
      <button className="list-notes-button" onClick={toggleNotes}>
        {showNotes ? "Hide Notes" : "Show Notes"}
      </button>
      {showNotes && <NoteList refresh={notesUpdated} />}
      </div>
    
    </div>
  );
};

export default App;
