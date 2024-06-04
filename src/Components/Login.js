import React, { useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../Context/notes/notesContext'

const Login = () => {

    const context = useContext(noteContext)
    const { getUser, showAlert, mode } = context

    const [cred, setCred] = useState({ username: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: cred.username, password: cred.password }),
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
                    showAlert(`Welcome back ${cred.username}`, "success")
                    getUser()
                    navigate("/")
                }
                else {
                    //Show alert
                    showAlert("Something went wrong try again with correct credintials", "warning")
                }
            })
            .catch((err) => console.log(err));
                 
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} type="text" className="form-control" value={cred.username} onChange={onChange} id="username" name="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} type="password" className="form-control" value={cred.password} onChange={onChange} id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
