
import React from 'react'
import { useNavigate } from "react-router-dom";

export const Main = () => {

    const navigate = useNavigate();

    const comprarAhora = () => {
        navigate('/productscatalog');
    }
    return (
        <>
            <div className="container-fluid hero-wrapper">
                <div className="container-fluid main-box mx-auto p-0 d-flex align-items-center">
                    <div className="hero-overlay"></div>
                    <div className='m-4 col-11 d-flex flex-column flex-lg-row align-items-start justify-content-between gap-4'>
                        <div className="top-content">
                            <p className='responsiveTitle mb-2 brand-pill'>
                                ⚽ <span>FutStore</span> Experience
                            </p>
                            <p className='responsiveSubTitle display-5 fw-bold mb-2 text-light'>
                                Eleva tu juego con equipamiento de élite
                            </p>
                            <p className="text-light opacity-75 mb-3" style={{ maxWidth: '540px' }}>
                                Botines, jerseys y accesorios diseñados para rendir, inspirar y destacar en cada partido.
                            </p>
                            <div className="d-flex flex-wrap align-items-center gap-3">
                                <button className='btn main-boton' onClick={comprarAhora}>Explorar catálogo</button>
                                <div className="badge-soft">Colecciones 2024</div>
                            </div>
                        </div>
                        <div className="main-info text-end d-none d-lg-block">
                            <strong className='responsiveText text-muted'>
                                "El fútbol es la cosa más importante de las cosas menos importantes." – Arrigo Sacchi
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
