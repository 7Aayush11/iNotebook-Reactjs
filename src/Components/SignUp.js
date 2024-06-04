import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../Context/notes/notesContext'


const SignUp = () => {

  const [cred, setCred] = useState({ name: "", email: "", username: "", password: "", cpass: "", DOB: {Date}})
  let navigate = useNavigate();

  const context = useContext(noteContext);
  const {showAlert, mode} = context;

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const { name, email, username, password, DOB } = cred
    
    const response = await fetch("http://localhost:4000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, username, password, DOB }),
    });
    const json = response.json()

    const promiseThen = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(json);
      }, 100);
    });

    promiseThen
      .then((val) => {
        if (val.success) {
          //Save the auth token and redirect
          localStorage.setItem('token', val.authtoken)
          navigate("/")
          showAlert(`Hello ${name} have your notes in one place`, "success")
        }
        else {
          //Show alert
          showAlert("Something went wrong check whether user already exist", "warning")
        }
      })
      .catch((err) => console.log(err));
  }

  const onChange = (e) => {
    if (e.target.name === "DOB") {
      const date = e.target.value;
      setCred({ ...cred, [e.target.name]: date });
    } else {
      setCred({ ...cred, [e.target.name]: e.target.value });
    }
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} type="text" className="form-control" value={cred.name} minLength={3} required onChange={onChange} id="name" name="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} type="text" className="form-control" value={cred.email} required onChange={onChange} id="email" name="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date of Birth</label>
            <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} type="date" pattern="\d{4}-\d{2}-\d{2}" className="form-control" value={cred.DOB} onChange={onChange} id="DOB" name="DOB" />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} type="text" className="form-control" value={cred.username} minLength={5} onChange={onChange} id="username" name="username" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} type="password" className="form-control" value={cred.password} minLength={8} onChange={onChange} id="password" name="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="cpass" className="form-label">Confirm Password</label>
            <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} type="cpass" className="form-control" value={cred.cpass} onChange={onChange} id="cpass" name="cpass" />
          </div>
          <button type="submit" className="btn btn-primary" >Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
