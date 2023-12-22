/*CSS */
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import 'bootswatch/dist/flatly/bootstrap.min.css'; // Import Bootswatch theme
import './CSS/ComStyle.css'; // Import the ComponentCSS file
import './CSS/Login.css' //Login CSS 
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-tooltip/dist/react-tooltip.css'


/*Routing */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { useEffect, useState } from 'react';
import {useAuth} from './hooks/useAuth'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './CRUD/firebase_conection';
import { Register } from './pages/Register';
import ViewProductItem from './components/ViewProductItem.jsx'
import { Reviews } from './components/Reviews';

/*Firebase */
import { collectionAssignation, onFindByVendor } from './CRUD/app'
import { AdminVendor } from './pages/AdminVendor';
import { AddVendor } from './pages/AddVendor';
import AddProducts from './components/AddProducts';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProductsCatalog } from './pages/ProductsCatalog';
import { OrdersPage } from './pages/OrdersPage';
import { InboxPage } from './pages/InboxPage.jsx';


function App() {

  //main APP control center

  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [isCatalog, setIsCatalog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);

  const authfunctions = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (currentuser) => {
        setUser(currentuser);

        if (currentuser !== null) {
          setLoggedIn(true); 
          collectionAssignation('Vendors');
          const Result = await onFindByVendor(currentuser.email);
          if(Result.empty) {
            setIsVendor(false);
          } else {
            setIsVendor(true);
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
            <Route path="/" element={<Home user={user} loggedIn={loggedIn} logOut={authfunctions.logOut} isVendor={isVendor} isCatalog={isCatalog} setIsCatalog={setIsCatalog}/>} />
            <Route path="/login" element={<Login setUser={setUser} setLoggedIn={setLoggedIn}/>} />
            <Route path="/Register" element={<Register setLoggedIn={setLoggedIn}/>} />
            <Route path='/AdminVendor' element={<AdminVendor user={user} loggedIn={loggedIn} logOut={authfunctions.logOut} isVendor={isVendor} />}/>
            <Route path="/NewVendor" element={<AddVendor setLoggedIn={setLoggedIn}/>} />
            <Route path="/products" element={<AddProducts setLoggedIn={setLoggedIn} />} />
            <Route path='/cart' element={<CartPage user={user} loggedIn={loggedIn} logOut={authfunctions.logOut} isVendor={isVendor} />}/>
            <Route path='/inbox' element={<InboxPage user={user} loggedIn={loggedIn} logOut={authfunctions.logOut} isVendor={isVendor} />}/>
            <Route path='/Checkout' element={<CheckoutPage user={user} loggedIn={loggedIn} logOut={authfunctions.logOut} isVendor={isVendor} />}/>
            <Route path='/orders' element={<OrdersPage user={user} loggedIn={loggedIn} logOut={authfunctions.logOut} isVendor={isVendor} />}/>
            <Route path='/productscatalog' element={<ProductsCatalog user={user} loggedIn={loggedIn} logOut={authfunctions.logOut} isVendor={isVendor} isCatalog={isCatalog} setIsCatalog={setIsCatalog}/>}/>
            <Route path="/ViewProductItem" element={<ViewProductItem user={user} loggedIn={loggedIn} logOut={authfunctions.logOut} isVendor={isVendor} isCatalog={isCatalog} setIsCatalog={setIsCatalog}/>} />          
            <Route path='/reviews' element={<Reviews user={user} loggedIn={loggedIn} logOut={authfunctions.logOut} isVendor={isVendor} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>}/>    
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
