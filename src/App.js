/*CSS */
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import 'bootswatch/dist/flatly/bootstrap.min.css'; // Import Bootswatch theme
import './components/ComStyle.css'; // Import the CSS file

/**FONT */
import 'react-google-fonts';

/**Components */
import { Navbar } from './components/Navbar.jsx';
import { Main } from './components/Main.jsx';

function App() {
  return (
   <>
    <div className='container-fluid'>
      <Navbar/>
      <Main/>
    </div>
   </>
  );
}

export default App;
