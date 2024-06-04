import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../Context/notes/notesContext'

const Dashboard = () => {
    const context = useContext(noteContext)
    const { getUser, mode } = context
    const [details, setDetails] = useState({ name: null, email: null, username: null, DOB: null })

    useEffect(() => {
        getUser().then((details) => setDetails(details));
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className="dashboard">
                <div className="card" style={{ marginTop: "85px", boxShadow: mode === 'dark' ? '0 4px 8px 0 rgba(121, 229, 255, 0.2), 0 6px 20px 0 rgba(121, 229, 255, 0.19)' : '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                    <div className="card-header" style={{ backgroundColor: mode === 'dark' ? '#000034' : "#f9cf80", color: mode === 'dark' ? '#8fcbff' : "black" }}>
                        {details[2]}
                    </div>
                    <div className="card-body" style={{ backgroundColor: mode === 'dark' ? '#2F2F63' : "#fdede2", color: mode === 'dark' ? '#F2ECFF' : 'black' }}>
                        <h5 className="card-title">Name</h5>
                        <p className="card-text">{details[0]}</p>
                        <hr />
                        <h5 className="card-title">DOB</h5>
                        <p className="card-text">{details[3]}</p>
                        <hr />
                        <h5 className="card-title">Email</h5>
                        <p className="card-text">{details[1]}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard