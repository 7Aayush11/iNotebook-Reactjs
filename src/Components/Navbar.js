import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import noteContext from '../Context/notes/notesContext';

export const Navbar = () => {
    
    let pathname = null;
    if (window.location.pathname==="/login") {
        pathname = "Login"
    } else {
        pathname = "Signup"
    }

    const context = useContext(noteContext)
    const { name, mode, showAlert, toggleMode } = context

    let location = useLocation();
    useEffect(() => {
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token')
        showAlert("Logged out successfully", "success")
    }

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-${mode}`} style={{ backgroundColor: mode === 'light' ? "#C29F5E" : "black" }}>
                <div className="container" style={{ fontWeight: 600 }}>
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to='/about'>About</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown ms-auto">
                                <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {!localStorage.getItem('token') ? pathname : name}
                                </Link>
                                <ul className="dropdown-menu">
                                    {!localStorage.getItem('token') ?
                                        null :
                                        <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                                    }
                                    {!localStorage.getItem('token') ?
                                        <li><Link className="dropdown-item" to={pathname==="Login"?"/signup":"/login"}>{pathname==="Login"?"Signup":"Login"}</Link></li> :
                                        <li><Link className="dropdown-item" to="/login" onClick={handleLogout}>Logout</Link></li>
                                    }
                                </ul>
                            </li>
                            <label className='ms-3'>
                                <input style={{backgroundColor: mode==='dark'?'#F2ECFF':'white'}} className="toggle-checkbox" type="checkbox" onClick={()=>{toggleMode()}}/>
                                <div className="toggle-slot">
                                    <div className="sun-icon-wrapper">
                                        <div className="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div>
                                    </div>
                                    <div className="toggle-button"></div>
                                    <div className="moon-icon-wrapper">
                                        <div className="iconify moon-icon" data-icon="feather-moon" data-inline="false"></div>
                                    </div>
                                </div>
                            </label>
                        </ul>
                    </div>
                </div>

            </nav>
        </>
    )
}

export default Navbar;
