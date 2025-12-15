import { Tooltip } from 'react-tooltip'
import { collectionAssignation, onFindbyEmail } from '../CRUD/app';
import Swal from 'sweetalert2';
import { useCallback, useEffect, useState } from 'react';

export const Navbar = ({ loggedIn, user, logOut, isVendor }) => {

  const [number, setNumber] = useState(0);

  const getCartNumber = async () => {
    try {
      collectionAssignation('CustomerCart');
      const result = await onFindbyEmail(user.email);
      if (result) {
        let total = 0;
        result.map((doc) =>
          total += doc.data().quantity
        );
        setNumber(total);
      } else {
        console.log("Error")
      }
    } catch (error) {
      Swal.fire({
        title: "Error al mostrar los productos en tu carrito.",
        text: error.message,
        icon: "error"
      });
    }
  };

  const getCartNumberCallBack = useCallback(getCartNumber, [user?.email]);

  useEffect(() => {
    if (user && user.email) {
      getCartNumberCallBack();
    }
  }, [user, getCartNumberCallBack]);

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: '#ffffff',
        padding: '0.5rem 0',
        textAlign: 'center',
        fontSize: '0.85rem',
        fontWeight: '500',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1001,
        position: 'relative'
      }}>
        <i className="bi bi-exclamation-triangle-fill me-2" style={{ fontSize: '0.9rem' }}></i>
        <strong>Prototipo Universitario:</strong> Este es un proyecto académico, no una tienda en línea real.
      </div>
      <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item active">
              <a className="nav-link active"
                href="/"
                style={{ marginLeft: '1.5rem' }}>
                <i className="bi bi-shop me-2"></i>FutStore
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/productscatalog">Catálogo de Productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#footer">Contáctanos</a>
            </li>
            {isVendor ? (
              <li className="nav-item">
                <a className="nav-link" href="/AdminVendor">
                  <i className="bi bi-gear-fill me-1"></i>Gestionar
                </a>
              </li>
            ) : (
              loggedIn ? (
                <li className="nav-item">
                  <a className="nav-link" href="/cart">
                    <i className="bi bi-cart3 me-1"></i>Carrito
                    {number > 0 && <span className="badge bg-primary ms-2">{number}</span>}
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/NewVendor">
                    <i className="bi bi-bag-check me-1"></i>Vende tus productos
                  </a>
                </li>
              )
            )}
          </ul>
          <div className="d-flex">
            {loggedIn ? (
              <>
                <a className="nav-link mx-2" href="/inbox">
                  <i className="bi bi-inbox me-1"></i>Inbox
                </a>
                {!isVendor && (
                  <a className="nav-link mx-2" href="/orders">
                    <i className="bi bi-bag-check me-1"></i>Pedidos
                  </a>
                )}
                <div className="d-flex align-items-center mx-3">
                  <i className="bi bi-person-circle me-2" style={{ fontSize: '1.5rem', color: '#60a5fa' }}></i>
                  <span className='text-white' id="my-anchor-element" style={{ cursor: 'pointer' }}>
                    {user?.email.split("@")[0]}
                  </span>
                </div>
                <Tooltip anchorSelect="#my-anchor-element" place='bottom'>
                  <div>
                    <strong>Email:</strong> {user?.email}
                    <br />
                    <strong>Miembro desde:</strong> {user.metadata.creationTime.substring(5, 16)}
                  </div>
                </Tooltip>
                <a className="nav-link mx-2"
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    logOut();
                  }}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Cerrar Sesión
                </a>
              </>
            ) : (
              <>
                <a className="nav-link mx-2" href="/login">
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Inicia Sesión
                </a>
                <a className="nav-link mx-2 btn btn-outline-light" href="/Register" style={{ borderRadius: '6px', padding: '0.5rem 1rem' }}>
                  <i className="bi bi-person-add me-1"></i>Regístrate
                </a>
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