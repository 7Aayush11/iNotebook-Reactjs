import React, { useContext } from 'react'
import noteContext from '../Context/notes/notesContext'

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote, mode } = context
    const { note, updateNote } = props

    return (
        <>
            <div className="col-md-4">
                <div className="card my-3" style={{boxShadow:  mode==='dark'? '0 4px 8px 0 rgba(121, 229, 255, 0.2), 0 6px 20px 0 rgba(121, 229, 255, 0.19)':'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                    <div className="card-header" style={{backgroundColor: mode==='dark'? '#000034':"#f9cf80", color: mode==='dark'? '#8fcbff':"black"}}>
                        <span className="badge rounded-pill text-bg-info">{note.tag}</span>
                        <i className="fa-solid fa-marker mx-3" onClick={() => { updateNote(note) }}></i>
                        <i className="fa-solid fa-hammer mx-3" onClick={() => { deleteNote(note._id) }}></i>
                    </div>
                    <div className="card-body" style={{backgroundColor: mode==='dark'?'#2F2F63': "#fdede2", color: mode==='dark'? '#F2ECFF':'black'}}>
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem
