import React from 'react'

export const Banner = () => {
    return (
        <div className='container-fluid mx-auto d-flex justify-content-center align-items-center m-5' style={{ height: '250px', backgroundColor: '#f4f4f4' }}>
            <div className='col-8 mx-auto bg-white text-center' style={{ height: '80%' }}>
                <h3 className='m-4'>Vende tus Articulos con Nosotros</h3>
                <figure className='m-3'>
                    <blockquote class="blockquote">
                        <p class="mb-0">Tus productos en nuestra pagina a solo un click</p>
                    </blockquote>
                    <button type="button" class="btn btn-secondary">Inscribete</button>
                </figure>
            </div>
        </div>
    )
}
