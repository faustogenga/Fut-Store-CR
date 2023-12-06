
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
                <div className='main-left container-fluid '>
                    <div className="top-content">
                        <p> FUTSTORE </p>
                        <p>¡Marca la diferencia en el campo con estilo!</p>
                        <button className='btn btn-outline-info main-boton' onClick={comprarAhora}>Compra Ahora</button>
                    </div>
                    <p className="main-info fixed-bottom">
                        <strong>El fútbol es la cosa más importante de las cosas menos importantes.</strong>
                        <br />
                    </p>
                </div>
            </div>
        </>
    )
}
