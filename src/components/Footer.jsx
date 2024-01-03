import React from 'react'

export const Footer = () => {
    return (
        <section id='footer'>
            <div className='container-fluid bg-black d-flex justify-content-center'>
                <div className='container-fluid row text-info'>
                    <h4 className='text-center text-light p-4 pe-none'>
                        FutStore CR <i className="bi bi-shop m-2"></i>
                    </h4>
                    <div className='responsiveFooter col-4 text-center'>
                        <h4 className='pe-none'>Contact <i className="bi bi-person-rolodex m-2"></i> </h4>
                        <div className=' mb-2' href="#">
                            <i className="bi bi-envelope m-2"></i>
                            futstorecr@gmail.com
                        </div>
                        <div className=' mb-2' href="#">
                            <i className="bi bi-whatsapp m-2"></i>
                            (506) 87655-2656
                        </div>
                        <div className=' mb-5' href="#">
                            <i className="bi bi-telephone m-2"></i>
                            (506) 2653-23ee42
                        </div>
                    </div>
                    <div className='responsiveFooter col-4 text-center'>
                        <h4>About Us <i className="bi bi-file-person m-2"></i></h4>
                        <div className=' mb-2' href="#">
                            <i className="bi bi-balloon-heart-fill m-2"></i>
                            FutStore
                        </div>
                        <div className=' mb-2' href="#">
                            <i className="bi bi-people-fill m-2"></i>
                            Nosotros
                        </div>
                        <div className='mb-5' href="#">
                            <i className="bi bi-newspaper m-2"></i>
                            Politica
                        </div>
                    </div>
                    <div className='responsiveFooter col-4 text-center'>
                        <h4 className='pe-none'>Social Media <i className="bi bi-globe m-2"></i></h4>
                        <div className='m-2'>
                            <a className='text-success' rel="noreferrer" target="_blank" href="https://www.facebook.com">
                                <i className="bi bi-facebook m-2"></i>
                                Facebook
                            </a>
                        </div>
                        <div className='m-2'>
                            <a rel="noreferrer" target="_blank" href="https://www.instagram.com">
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
