import React from 'react'

export const CataloginputPrice = ({priceClicked, handleClickPrice, title, name }) => {
    return (
        <>
        <label className="sidebar-label-container">
            <input 
            checked={priceClicked === name}
            onChange={handleClickPrice} 
            type="radio" 
            name={name} />
            <span className="checkmark" ></span>
            {title}
        </label>
        </>
    )
}

export default CataloginputPrice;
