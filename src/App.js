import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NotesState from './Context/notes/NotesState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';

function App() {

  return (
    <>
      <NotesState >
        <Router>
          <Navbar/>
          <Alert/>
          <div className="container">
            <Routes>
              <Route exact path='/'  element={<Home />}></Route>
              <Route exact path='/about' element={<About/>}></Route>
              <Route exact path='/dashboard' element={<Dashboard/>}></Route>
              <Route exact path='/login'  element={<Login/>}></Route>
              <Route exact path='/signup' element={<SignUp />}></Route>
            </Routes>
          </div>
        </Router>
      </NotesState>
    </>
  );

}

export default App;
