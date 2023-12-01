import React from 'react'
import '../CSS/Catalogcategories.css';
import Cataloginput from './Cataloginput'

export const Catalogcategories = ({ handleChange }) => {
    return (
        <>
        <div>
            <h2 className="sidebar-title">Category</h2>
        <div>
            <label className="sidebar-label-container">
                <input onChange={handleChange} type="radio" value="" name="test" />
                <span className="checkmark"></span>All
            </label>
            <Cataloginput
            handleChange={handleChange}
            value="soccercleats"
            title="Soccer Cleats"
            name="test"
            />

            <Cataloginput
            handleChange={handleChange}
            value="Camisetas"
            title="Camisetas"
            name="test"
            />

            <Cataloginput
            handleChange={handleChange}
            value="soccerballs"
            title="Balones de Futbol"
            name="test"
            />
            
        </div>
    </div>
        
        </>
    )
}

export default Catalogcategories;