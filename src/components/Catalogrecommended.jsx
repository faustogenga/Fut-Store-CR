import React from 'react'
import { Catalogbutton } from './Catalogbutton';
import '../CSS/Catalogrecommended.css'
export const Catalogrecommended = ({ handleClick }) => {
    return (
        <>
        <div>
                <h2 className="recommended-title">Recommended</h2>
                <div className="recommended-flex">
                    <Catalogbutton className="recommended-button" onClickHandler={handleClick} value="" title="Todas las Marcas" />
                    <Catalogbutton className="recommended-button" onClickHandler={handleClick} value="Nike" title="Nike" />
                    <Catalogbutton className="recommended-button" onClickHandler={handleClick} value="Adidas" title="Adidas" />
                    <Catalogbutton className="recommended-button" onClickHandler={handleClick} value="Puma" title="Puma" />
                    <Catalogbutton className="recommended-button" onClickHandler={handleClick} value="Otras" title="Otras Marcas" />
                </div>
            </div>
        
        </>
    )
}

export default Catalogrecommended;
