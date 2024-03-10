import React from 'react'
import '../CSS/Catalogcategories.css';
import { CataloginputCategory } from './CataloginputCategory';

export const Catalogcategories = ({ handleClickCategory, categoryClicked }) => {
    return (
        <>
            <div className=''>
                <h2 className="sidebar-title">Category</h2>
                <div className=''>
                    <label className="sidebar-label-container">
                        <input
                            checked={categoryClicked === 'All'}
                            onChange={handleClickCategory}
                            type="radio"
                            name="All" />
                        <span className="checkmark"></span>All
                    </label>
                    <CataloginputCategory
                        categoryClicked={categoryClicked}
                        handleClickCategory={handleClickCategory}
                        title="Soccer Cleats"
                        name="Cleats"
                    />

                    <CataloginputCategory
                        categoryClicked={categoryClicked}
                        handleClickCategory={handleClickCategory}
                        title="Camisetas"
                        name="Camisetas"
                    />

                    <CataloginputCategory
                        categoryClicked={categoryClicked}
                        handleClickCategory={handleClickCategory}
                        title="Balones de Futbol"
                        name="Balls"
                    />

                </div>
            </div>

        </>
    )
}

export default Catalogcategories;