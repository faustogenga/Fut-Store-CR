import React from 'react'
import { Catalogcategories } from './Catalogcategories'
import { Catalogprices } from './Catalogprices'
import '../CSS/Catalogsidebar.css'

export const Catalogsidebar = ({ handleClickPrice, handleClickCategory, categoryClicked, priceClicked, loggedIn }) => {
    return (
        <>
            <section className="responsiveCategory sidebar col-2">
                <div className="logo-container justify-content-left d-flex">
                    <a
                        href={loggedIn ? '/cart' : '/'} style={{ textDecoration: 'none' }}>
                        <h1 className='d-flex'>🛒</h1>
                    </a>
                </div>
                <Catalogcategories handleClickCategory={handleClickCategory} categoryClicked={categoryClicked} />
                <Catalogprices handleClickPrice={handleClickPrice} priceClicked={priceClicked} />
            </section>
        </>
    )
}
export default Catalogsidebar;