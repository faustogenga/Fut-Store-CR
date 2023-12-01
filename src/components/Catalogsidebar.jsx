import React from 'react'
import { Catalogcategories } from './Catalogcategories'
import { Catalogprices } from './Catalogprices'
import '../CSS/Catalogsidebar.css'

export const Catalogsidebar = ({ handleChange }) => {
    return (
        <>
        <div className="border">
            <section className="sidebar">
                <div className="logo-container">
                    <h1>🛒</h1>
                </div>
                <Catalogcategories handleChange={handleChange} />
                <Catalogprices handleChange={handleChange} />
            </section>
        </div>
        </>
    )
}
export default Catalogsidebar;