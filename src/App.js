/*CSS */
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import 'bootswatch/dist/flatly/bootstrap.min.css'; // Import Bootswatch theme
import './components/ComStyle.css'; // Import the CSS file
import "bootstrap-icons/font/bootstrap-icons.css";

/**Components */
import { Navbar } from './components/Navbar.jsx';
import { Main } from './components/Main.jsx';
import { Products } from './components/Products';
import { Footer } from './components/Footer';
import { Banner } from './components/Banner';

function App() {
  return (
   <>
    <div className='container-fluid'>
      <Navbar/>
      <Main/>
      <Products/>
      <Banner/>
      <Footer/>
    </div>
   </>
  );
}

export default App;
