import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Import Bootstrap JavaScript
import { Navbar } from "./components/Navbar";


function App() {
  return (
   <>
   <Navbar/>
   <h1>Proyecto Final Grupo 3 REACT</h1>
   <h1 className="text-primary">Bootstrap Test</h1>
   <button className="btn btn-primary">Click Me</button>
   </>
  );
}

export default App;
