import { Button } from 'bootstrap'
import React from 'react'

export const Main = () => {
    return (
        <>
            <div className="container main-box mx-auto p-5 mt-5 rounded">
                <div className='main-left col-md-6'>
                <div className="top-content">
                    <p> FUTBOL </p>
                    <p> Deporte que Llena el Alma</p>
                    <button className='btn btn-outline-success main-boton'>Ver Coleccion</button>
                </div>
                <p className="main-info">
                    A new era in eco friendly furniture with Avelon, the French luxury retail brand
                    <br />
                    with nice fonts, tasteful colors and a beautiful way to display things digitally <br />
                    using modern web technologies.
                </p>
                </div>
                <div className="main-right"/>
            </div>
        </>
    )
}
