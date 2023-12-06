import React from 'react'

export const CataloginputCategory = ({categoryClicked, handleClickCategory, title, name }) => {
    return (
        <>
        <label className="sidebar-label-container">
            <input 
            checked={categoryClicked === name}
            onChange={handleClickCategory} 
            type="radio" 
            name={name} />
            <span className="checkmark" ></span>
            {title}
        </label>
        </>
    )
}

export default CataloginputCategory;
