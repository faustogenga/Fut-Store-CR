/*CSS */
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import 'bootswatch/dist/flatly/bootstrap.min.css'; // Import Bootswatch theme
import './CSS/ComStyle.css'; // Import the ComponentCSS file
import './CSS/Login.css' //Login CSS 
import "bootstrap-icons/font/bootstrap-icons.css";


/**Routing */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { useEffect, useState } from 'react';
import {useAuth} from './hooks/useAuth'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './CRUD/firebase_conection';
import { Register } from './pages/Register';


function App() {

  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const authfunctions = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth,(currentuser) => {
      setUser(currentuser);
      if(user !== null) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })
  })


  return (
    <>
      <div className='container-fluid'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home user={user} loggedIn={loggedIn} logOut={authfunctions.logOut} />} />
            <Route path="/login" element={<Login setUser={setUser} setLoggedIn={setLoggedIn}/>} />
            <Route path="/Register" element={<Register setUser={setUser} setLoggedIn={setLoggedIn}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
