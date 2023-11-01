import { Button } from 'bootstrap'
import React from 'react'

export const Main = () => {
    return (
        <>
            <div className="container main-box mx-auto mt-4 p-0 rounded d-flex">
                <div className='main-left container-fluid p-5'>
                <div className="top-content">
                    <p> FUTSTORE </p>
                    <p>¡Marca la diferencia en el campo con estilo!</p>
                    <button className='btn btn-outline-success main-boton'>Compra Ahora</button>
                </div>
                <p className="main-info mt-5 ">
                    <strong>El fútbol es la cosa más importante de las cosas menos importantes.</strong>
                    <br /><br/>
                    Equípate como un campeón y vive el espíritu del fútbol en cada partida. 
                    Descubre nuestra colección de productos de primera calidad para los amantes del deporte.
                </p>
                </div>
                <div className="main-right rounded"/>
            </div>
        </>
    )
}
