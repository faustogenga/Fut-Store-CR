/*CSS */
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import 'bootswatch/dist/flatly/bootstrap.min.css'; // Import Bootswatch theme
import './CSS/ComStyle.css'; // Import the ComponentCSS file
import './CSS/Login.css' //Login CSS 
import "bootstrap-icons/font/bootstrap-icons.css";


/**Components */
import { Navbar } from './components/Navbar.jsx';
import { Main } from './components/Main.jsx';
import { Products } from './components/Products';
import { Footer } from './components/Footer';
import { Banner } from './components/Banner';

/**Routing */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

function App() {
  return (
   <>
    <div className='container-fluid'>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
   </>
  );
}

export default App;
