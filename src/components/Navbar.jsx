import React from 'react';

export const Navbar = () => {
  return (
    <div>
      <div>
        <img src="/assets/Banner.png" className="img-fluid rounded mt-1" alt="Banner" />
      </div>
      <nav class="container-fluid navbar navbar-expand-sm rounded-top-2 navbar" data-bs-theme="dark">
        <div class="container-fluid">
          <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-collapse collapse">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link active"
                  style={{ color: 'whitesmoke', fontSize: 'large' }}
                  href="#"
                  onMouseOver={(e) => (e.target.style.color = 'yellow')}
                  onMouseOut={(e) => (e.target.style.color = 'whitesmoke')}>
                  FutStore
                  <span class="visually-hidden">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Productos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Vende Con Nosotros</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contactanos</a>
              </li>
            </ul>
            <div className="d-flex">
                <i class="bi bi-person-circle mx-2 text-success"></i>
                <a class="nav-link" href="#">Inicia Sesion</a>
                <i class="bi  bi-person-add mx-2 text-success"></i>
                <a class="nav-link me-3 -2" href="#">Registrate</a>
            </div>
          </div>
        </div>
      </nav>
      <div class="progress rounded-top-0">
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}></div>
      </div>
    </div>
  );
}