
import React from 'react'
import { useNavigate } from "react-router-dom";

export const Main = () => {

    const navigate = useNavigate();

    const comprarAhora = () => {
        navigate('/productscatalog');
    }
    return (
        <>
        <div className="container-fluid main-box mx-auto p-0">
            <div className='container h-100 d-flex flex-column justify-content-center align-items-center position-relative' style={{ zIndex: 2, minHeight: '95vh', padding: '6rem 1rem' }}>
                <div className="top-content text-center" style={{ maxWidth: '900px' }}>
                    <div className="mb-5">
                        <h1 className='responsiveTitle mb-4'>FUTSTORE</h1>
                        <div className="d-flex justify-content-center align-items-center mb-4" style={{ gap: '1rem' }}>
                            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent 0%, #60a5fa 100%)' }}></div>
                            <div style={{ width: '8px', height: '8px', background: '#60a5fa', borderRadius: '50%' }}></div>
                            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, #60a5fa 0%, transparent 100%)' }}></div>
                        </div>
                    </div>
                    <p className='responsiveSubTitle mb-5'>¡Marca la diferencia en el campo con estilo!</p>
                    <div className="d-flex justify-content-center mt-4">
                        <button className='btn main-boton' onClick={comprarAhora}>
                            <span style={{ marginRight: '0.75rem' }}>Explorar Catálogo</span>
                            <i className="bi bi-arrow-right" style={{ fontSize: '1.2rem' }}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
