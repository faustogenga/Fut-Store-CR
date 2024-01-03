import React from 'react'
import { Productitem } from './Productitem'

export const Catalog = ({loggedIn, user, products, isCatalog, isVendor, imgsProducts}) => {

    return (
            <div className="">
            <h4 className='m-3'>Catálogo de Productos</h4>
                <div className="row" style={{height:"1%"}}>
                    {products.map((product, index) => {
                        return (
                            <div className="responsiveProduct col-lg-3 col-md-6 col-sm-12" key={index}>
                                <Productitem loggedIn={loggedIn} user={user} product={product} isCatalog={isCatalog} isVendor={isVendor} imgsProducts={imgsProducts}/>
                                <br/><br/><br/>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
    )
}
export default Catalog;