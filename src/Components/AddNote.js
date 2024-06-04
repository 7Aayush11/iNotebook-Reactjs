import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/notesContext';
import { Link } from 'react-router-dom';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote, mode } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "default" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input style={{backgroundColor: mode==='dark'?'#F2ECFF':"white"}} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>

                <Link onClick={handleClick} disabled={note.title.length < 3 || note.description.length < 5} className="addbtn">Add Note</Link>
                
            </form>
        </div>
    )
}
export default AddNote