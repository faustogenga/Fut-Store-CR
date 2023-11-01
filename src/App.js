import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import 'bootswatch/dist/flatly/bootstrap.min.css'; // Import Bootswatch theme
import { Navbar } from './components/Navbar.jsx';
import './components/ComStyle.css'; // Import the CSS file
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
