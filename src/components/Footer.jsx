import React from 'react'

export const Footer = () => {
    return (
        <section id='footer'>
            <div className='container-fluid footer-modern d-flex justify-content-center pt-5 pb-4'>
                <div className='container-fluid row text-info'>
                    <div className='col-12 text-center mb-3'>
                        <h4 className='text-light fw-bold pe-none d-flex align-items-center justify-content-center gap-2'>
                            <span className='brand-pill mb-0'>⚽ FutStore CR</span>
                            <span className='text-muted small'>Equipamiento premium para cada partido</span>
                        </h4>
                    </div>
                    <div className='responsiveFooter col-12 col-md-4 text-center text-md-start'>
                        <h4 className='pe-none mb-3'>Contacto <i className="bi bi-person-rolodex m-2"></i> </h4>
                        <div className='mb-2'>
                            <i className="bi bi-envelope m-2"></i>
                            futstorecr@gmail.com
                        </div>
                        <div className='mb-2'>
                            <i className="bi bi-whatsapp m-2"></i>
                            (506) 87655-2656
                        </div>
                        <div className='mb-5'>
                            <i className="bi bi-telephone m-2"></i>
                            (506) 2653-23ee42
                        </div>
                    </div>
                    <div className='responsiveFooter col-12 col-md-4 text-center text-md-start'>
                        <h4 className='mb-3'>Nosotros <i className="bi bi-file-person m-2"></i></h4>
                        <div className='mb-2'>
                            <i className="bi bi-balloon-heart-fill m-2"></i>
                            FutStore
                        </div>
                        <div className='mb-2'>
                            <i className="bi bi-people-fill m-2"></i>
                            Equipo apasionado
                        </div>
                        <div className='mb-5'>
                            <i className="bi bi-newspaper m-2"></i>
                            Política y soporte
                        </div>
                    </div>
                    <div className='responsiveFooter col-12 col-md-4 text-center text-md-start'>
                        <h4 className='pe-none mb-3'>Redes sociales <i className="bi bi-globe m-2"></i></h4>
                        <div className='m-2'>
                            <a className='text-success text-decoration-none' rel="noreferrer" target="_blank" href="https://www.facebook.com">
                                <i className="bi bi-facebook m-2"></i>
                                Facebook
                            </a>
                        </div>
                        <div className='m-2'>
                            <a className='text-decoration-none' rel="noreferrer" target="_blank" href="https://www.instagram.com">
                                <i className="bi bi-instagram m-2"></i>
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
