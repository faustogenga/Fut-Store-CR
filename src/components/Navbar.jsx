import React from 'react';
import { useNavigate } from "react-router-dom";


export const Navbar = ({loggedIn, email}) => {

  const navigate = useNavigate();

  const HandleSession = () => {
    navigate("/login")
  }

  return (
    <div>
      <div>
        <img src="/assets/Banner.png" className="img-fluid rounded mt-1" alt="Banner" />
      </div>
      <nav className="container-fluid navbar navbar-expand-sm rounded-top-2 navbar" data-bs-theme="dark">
        <div className="container-fluid">
          <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active"
                  style={{ color: 'whitesmoke', fontSize: 'large' }}
                  //href="#"
                  onMouseOver={(e) => (e.target.style.color = 'yellow')}
                  onMouseOut={(e) => (e.target.style.color = 'whitesmoke')}>
                  FutStore
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Productos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Vende Con Nosotros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contactanos</a>
              </li>
            </ul>
            <div className="d-flex">
            {(loggedIn ? <a>Bienvenido {email}</a> : '')}
              <i className="bi bi-person-circle mx-2 text-success"></i>
              <a className="nav-link" onClick={HandleSession}>{loggedIn ? "Cerrar Sesion" : "Iniciar Sesion"}</a>
              <i className="bi  bi-person-add mx-2 text-success"></i>
              <a className="nav-link me-3 -2" href="#">Registrate</a>
            </div>
          </div>
        </div>
      </nav>
      <div className="progress rounded-top-0">
        <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}></div>
      </div>
    </div>
  );
}