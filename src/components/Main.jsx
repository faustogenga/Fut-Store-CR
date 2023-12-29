
import React from 'react'
import { useNavigate } from "react-router-dom";

export const Main = () => {

    const navigate = useNavigate();

    const comprarAhora = () => {
        navigate('/productscatalog');
    }
    return (
        <>
        <div className="container-fluid main-box mx-auto p-0 d-flex">
            <div className='m-4 col-11'>
                <div className="top-content">
                    <p className='responsiveTitle'> FUTSTORE </p>
                    <p className='responsiveSubTitle'>¡Marca la diferencia en el campo con estilo!</p>
                    <button className='btn btn-outline-info main-boton' onClick={comprarAhora}>Compra Ahora</button>
                </div>
                <p className="main-info position-absolute bottom-0">
                    <strong className='responsiveText'>El fútbol es la cosa más importante de las cosas menos importantes. - Arrigo Sacchi</strong>
                    <br />
                </p>
            </div>
        </div>
    </>
    )
}
