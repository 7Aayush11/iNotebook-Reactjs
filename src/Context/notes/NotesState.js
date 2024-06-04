import notesContext from "./notesContext";
import { useState } from "react";

const NotesState = (props) => {

  
  const host = "http://localhost:4000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const [name, setName] = useState(null)

  const [mode, setMode] = useState('light')
  const [alert, setAlert] = useState(null)
   
  const toggleMode = () => {
    if (mode === 'light') {
      setMode("dark");
      document.body.style.backgroundColor = "#000032";
      document.body.style.color = "#badcff";
      showAlert("Dark mode active", "success");
      
    }
    else {
      setMode("light")
      document.body.style.backgroundColor = "#FFF8E6";
      document.body.style.color = "#B68A1B";
      showAlert("Light mode active", "success");
    }
  }

  const showAlert = (message, type)=>{
    setAlert({
        msg: message,
        type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1600);
  }

  if (mode === 'dark') {
    document.body.style.backgroundColor = "#000032";
    document.body.style.color = "#badcff";
  } else {
    document.body.style.backgroundColor = "#FFF8E6";
    document.body.style.color = "#B68A1B";
  }

  // Get user Data
  
  const getUser = async () => {
    // API Call 
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setName(json.name)
    const details = [json.name, json.email, json.username, json.DOB]
    return details
  }

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
  
    let newNotes = JSON.parse(JSON.stringify(notes))
    
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break; 
      }
    }  
    setNotes(newNotes);
  }

  return (
    <notesContext.Provider value={{ name, getUser, notes, addNote, deleteNote, editNote, getNotes, mode, alert, showAlert, toggleMode }}>
      {props.children}
    </notesContext.Provider>
  )
}
export default NotesState;