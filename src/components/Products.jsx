import React from 'react'
import { Productitem } from './Productitem'

export const Products = () => {
    return (
        <section id='products'>
        <div className="container mt-5 mb-5">
            <div className="row main-products">
                <div className="col-lg-3 col-md-4 col-sm-6">
                    <Productitem />
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                    <Productitem />
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                    <Productitem />
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6">
                    <Productitem />
                </div>
            </div>
        </div>
        </section>
    )
}
