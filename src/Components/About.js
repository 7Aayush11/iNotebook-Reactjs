import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import noteContext from '../Context/notes/notesContext'


export const About = () => {

  const {mode} = useContext(noteContext);

  return (
    <div>
      <h1>About us</h1>
      <p>This is a notes app which is used to store your notes and perform operations like adding new note, deleting a note or modifying a note. The app has easy login and signup system that checks credential and then allows the user to enter the main page. I have built this app using mern along with thunderclient to manage the api's. The interface is quite simple as it is a small application and so can be updated in future.</p>
      <div className="card" style={{boxShadow:  mode==='dark'? '0 4px 8px 0 rgba(121, 229, 255, 0.2), 0 6px 20px 0 rgba(121, 229, 255, 0.19)':'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
        <div className="card-header" style={{backgroundColor: mode==='dark'? '#000034':"#f9cf80", color: mode==='dark'? '#8fcbff':"black"}}>
          Find me on
        </div>
        <div className="card-body" style={{backgroundColor: mode==='dark'?'#2F2F63': "#fdede2", color: mode==='dark'? '#F2ECFF':'black'}}>
          <h5 className="card-title">Github</h5>
          <p className="card-text">Explore my other projects/repositories if you liked this one.</p>
          <Link to="https://github.com/7Aayush11"><i className="fa-brands fa-github fa-2xl fa-bounce"></i></Link>
          <hr />
          <h5 className="card-title">LinkedIn</h5>
          <p className="card-text">You can also find me on LinkedIn.</p>
          <Link to="https://www.linkedin.com/in/aayush-nisar-b71715184/"><i className="fa-brands fa-linkedin fa-2xl fa-bounce"></i></Link>
        </div>
      </div>
    </div>
  )
}

export default About
