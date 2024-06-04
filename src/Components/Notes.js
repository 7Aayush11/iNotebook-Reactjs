import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/notesContext'
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom'

const Notes = () => {
    const context = useContext(noteContext)
    let navigate = useNavigate()
    const { notes, getNotes, editNote, showAlert, mode } = context;
    const ref = useRef(null)
    const closeref = useRef(null)

    useEffect(() => {
        if(localStorage.getItem('token') !== null){
            getNotes()
        }
        else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const [note, setNote] = useState({ etitle: '', edescription: '', etag: "default" })
    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        closeref.current.click()
        showAlert("Note updated successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} type="text" className="form-control" id="etitle" value={note.etitle} minLength={3} required name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} type="text" className="form-control" id="edescription" value={note.edescription} minLength={5} required name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeref} className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h1>Your Note</h1>
                <div className='container mx-2'>
                    {notes.length === 0 && "No notes Available"}
                </div>
                {notes.map((notes) => {
                    return <NoteItem key={notes._id} updateNote={updateNote} note={notes} />
                })}
            </div>
        </>
    )
}

export default Notes
