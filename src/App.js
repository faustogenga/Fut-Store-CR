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
import { AddProducts } from './components/AddProducts';

/*Firebase */
import { collectionAssignation, onFindById } from './CRUD/app'
import { AdminVendor } from './pages/AdminVendor';


function App() {

  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isVendor, setIsVendor] = useState(false);

  const authfunctions = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (currentuser) => {
        setUser(currentuser);
  
        if (currentuser !== null) {
          setLoggedIn(true);

          collectionAssignation('Vendors');
          const docsSnapshot = await onFindById(currentuser.email);
          console.log(docsSnapshot);
          if(docsSnapshot !== undefined && docsSnapshot !== null) {
            setIsVendor(true);
          } else {
            setIsVendor(false);
          }
        } else {
          setLoggedIn(false);
        }
      });
    };
  
    fetchData();
  }, []); 
  


  return (
    <>
      <div className='container-fluid'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home user={user} loggedIn={loggedIn} logOut={authfunctions.logOut} isVendor={isVendor}/>} />
            <Route path="/login" element={<Login setUser={setUser} setLoggedIn={setLoggedIn}/>} />
            <Route path="/Register" element={<Register setUser={setUser} setLoggedIn={setLoggedIn}/>} />
            <Route path='/AdminVendor' element={<AdminVendor user={user} loggedIn={loggedIn} logOut={authfunctions.logOut} isVendor={isVendor} />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
