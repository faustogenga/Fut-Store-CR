import React from 'react';

export const Navbar = () => {
  return (
    <>
      <div className='.container-fluid'>
        <img src="/assets/Banner.png" className="img-fluid rounded" alt="Banner" />
      </div>
      <nav class="navbar navbar-expand-lg rounded-2 navbar">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor04" aria-controls="navbarColor04" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarColor04">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link active " style={{color : 'whitesmoke', fontSize: 'large'}} href="#">FutStore
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

    </>
  );
}
