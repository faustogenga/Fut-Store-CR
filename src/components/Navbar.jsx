import React from 'react';

export const Navbar = () => {
  return (
    <div>
      <div className='.container-fluid'>
        <img src="/assets/Banner.png" className="img-fluid rounded mt-1" alt="Banner" />
      </div>
      <nav class="navbar navbar-expand-sm rounded-2 navbar" data-bs-theme="dark">
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
                <a class="nav-link" href="#">Inicia Sesion</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Vende Con Nosotros</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contactanos</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>     
      </div>
  );
} 
