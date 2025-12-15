import React from 'react'

export const Footer = () => {
    return (
        <section id='footer' style={{ marginTop: '0', marginBottom: '0' }}>
            <div className='container-fluid' style={{ 
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                padding: '4rem 0 0 0',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
                <div className='container'>
                    <div className='row g-4'>
                        <div className='col-12 text-center mb-4'>
                            <h3 className='text-light mb-2' style={{ fontWeight: '700', letterSpacing: '0.5px', marginTop: '2rem' }}>
                                <i className="bi bi-shop me-2" style={{ color: '#60a5fa' }}></i>
                                FutStore CR
                            </h3>
                            <p className='text-muted' style={{ fontSize: '0.95rem' }}>
                                Tu tienda de confianza para equipamiento de fútbol
                            </p>
                        </div>
                        
                        <div className='responsiveFooter col-md-4 text-center text-md-start'>
                            <h5 className='text-light mb-3' style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                                <i className="bi bi-person-rolodex me-2" style={{ color: '#60a5fa' }}></i>
                                Contacto
                            </h5>
                            <div className='mb-3'>
                                <a href="mailto:futstorecr@gmail.com" className='text-decoration-none text-light d-flex align-items-center justify-content-center justify-content-md-start' 
                                   style={{ transition: 'color 0.3s ease' }}
                                   onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                                   onMouseLeave={(e) => e.target.style.color = '#f8fafc'}>
                                    <i className="bi bi-envelope me-2"></i>
                                    futstorecr@gmail.com
                                </a>
                            </div>
                            <div className='mb-3'>
                                <a href="https://wa.me/506876552656" className='text-decoration-none text-light d-flex align-items-center justify-content-center justify-content-md-start'
                                   style={{ transition: 'color 0.3s ease' }}
                                   onMouseEnter={(e) => e.target.style.color = '#25D366'}
                                   onMouseLeave={(e) => e.target.style.color = '#f8fafc'}>
                                    <i className="bi bi-whatsapp me-2"></i>
                                    (506) 87655-2656
                                </a>
                            </div>
                            <div className='mb-3'>
                                <a href="tel:+50626532342" className='text-decoration-none text-light d-flex align-items-center justify-content-center justify-content-md-start'
                                   style={{ transition: 'color 0.3s ease' }}
                                   onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                                   onMouseLeave={(e) => e.target.style.color = '#f8fafc'}>
                                    <i className="bi bi-telephone me-2"></i>
                                    (506) 2653-2342
                                </a>
                            </div>
                        </div>
                        
                        <div className='responsiveFooter col-md-4 text-center text-md-start'>
                            <h5 className='text-light mb-3' style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                                <i className="bi bi-info-circle me-2" style={{ color: '#60a5fa' }}></i>
                                Información
                            </h5>
                            <div className='mb-3'>
                                <a href="/#footer" className='text-decoration-none text-light d-flex align-items-center justify-content-center justify-content-md-start'
                                   style={{ transition: 'color 0.3s ease' }}
                                   onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                                   onMouseLeave={(e) => e.target.style.color = '#f8fafc'}>
                                    <i className="bi bi-balloon-heart-fill me-2"></i>
                                    Sobre FutStore
                                </a>
                            </div>
                            <div className='mb-3'>
                                <a href="/#footer" className='text-decoration-none text-light d-flex align-items-center justify-content-center justify-content-md-start'
                                   style={{ transition: 'color 0.3s ease' }}
                                   onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                                   onMouseLeave={(e) => e.target.style.color = '#f8fafc'}>
                                    <i className="bi bi-people-fill me-2"></i>
                                    Nosotros
                                </a>
                            </div>
                            <div className='mb-3'>
                                <a href="/#footer" className='text-decoration-none text-light d-flex align-items-center justify-content-center justify-content-md-start'
                                   style={{ transition: 'color 0.3s ease' }}
                                   onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                                   onMouseLeave={(e) => e.target.style.color = '#f8fafc'}>
                                    <i className="bi bi-file-text me-2"></i>
                                    Política de Privacidad
                                </a>
                            </div>
                        </div>
                        
                        <div className='responsiveFooter col-md-4 text-center text-md-start'>
                            <h5 className='text-light mb-3' style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                                <i className="bi bi-globe me-2" style={{ color: '#60a5fa' }}></i>
                                Redes Sociales
                            </h5>
                            <div className='mb-3'>
                                <a className='text-decoration-none text-light d-flex align-items-center justify-content-center justify-content-md-start'
                                   rel="noreferrer" target="_blank" href="https://www.facebook.com"
                                   style={{ transition: 'color 0.3s ease' }}
                                   onMouseEnter={(e) => e.target.style.color = '#1877F2'}
                                   onMouseLeave={(e) => e.target.style.color = '#f8fafc'}>
                                    <i className="bi bi-facebook me-2"></i>
                                    Facebook
                                </a>
                            </div>
                            <div className='mb-3'>
                                <a className='text-decoration-none text-light d-flex align-items-center justify-content-center justify-content-md-start'
                                   rel="noreferrer" target="_blank" href="https://www.instagram.com"
                                   style={{ transition: 'color 0.3s ease' }}
                                   onMouseEnter={(e) => e.target.style.color = '#E4405F'}
                                   onMouseLeave={(e) => e.target.style.color = '#f8fafc'}>
                                    <i className="bi bi-instagram me-2"></i>
                                    Instagram
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className='row mt-4 pt-4 mb-0' style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1.5rem' }}>
                        <div className='col-12 text-center'>
                            <p className='text-muted mb-0' style={{ fontSize: '0.9rem' }}>
                                © {new Date().getFullYear()} FutStore CR. Todos los derechos reservados.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
