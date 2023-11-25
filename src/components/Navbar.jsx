import React from 'react';

export const Navbar = ({ loggedIn, user, logOut, isVendor }) => {

  return (
    <div>
      <div>
        <img src="/assets/Banner.png" className="img-fluid" width={'100%'} alt="Banner" />
      </div>
      <nav className="container-fluid navbar-expand-sm navbar" data-bs-theme="dark">
        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active"
                style={{ color: 'whitesmoke', fontSize: 'large' }}
                href="/"
                onMouseOver={(e) => (e.target.style.color = '#3498DB')}
                onMouseOut={(e) => (e.target.style.color = 'whitesmoke')}>
                FutStore
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#products">Productos</a>
            </li>
            <li className="nav-item">
                <a className='nav-link' href="/Cart">Carrito</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#footer">Contáctanos</a>
            </li>
            {isVendor ? (
              <li className="nav-item bg-warning">
                <a className="nav-link" href="/AdminVendor">Tus Productos</a>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/NewVendor">Vende tus productos</a>
              </li>
            )

            }
          </ul>
          <div className="d-flex">
            {loggedIn ? (
              <>
                <i className="bi bi-person-circle mx-2 text-info"></i>
                <i className='text-white'>Bienvenido{user?.email}</i>
                <a className="nav-link mx-3"
                  onMouseOver={(e) => (e.target.style.color = 'red')}
                  onMouseOut={(e) => (e.target.style.color = 'whitesmoke')}
                  href="/"
                  onClick={(e) => {
                    logOut();
                  }}
                >
                  <i className="bi bi-box-arrow-right mx-2 text-info"></i>
                  Cerrar Sesión
                </a>
              </>
            ) : (
              <>
                <a className="nav-link"
                  href="/login"
                  onClick={(e) => {
                    console.log("login");
                  }}
                  onMouseOver={(e) => (e.target.style.color = '#3498DB')}
                  onMouseOut={(e) => (e.target.style.color = 'whitesmoke')}
                >
                  <i className="bi bi-box-arrow-right mx-2 text-info"></i>
                  Iniciar Sesión
                </a>
                <i className="bi  bi-person-add mx-2 text-info"></i>
                <a className="nav-link me-3 -2" href="/Register"
                  onMouseOver={(e) => (e.target.style.color = '#3498DB')}
                  onMouseOut={(e) => (e.target.style.color = 'whitesmoke')}
                >Regístrate</a>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="progress rounded-0">
        <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}></div>
      </div>
    </div>
  );
}