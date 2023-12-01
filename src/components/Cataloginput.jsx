import React from 'react'

export const Cataloginput = ({ handleChange, value, title, name, color }) => {
    return (
        <>
        <label className="sidebar-label-container">
            <input onChange={handleChange} type="radio" value={value} name={name} />
            <span className="checkmark" style={{ backgroundColor: color }}></span>
            {title}
        </label>
        </>
    )
}

export default Cataloginput;
