import React from 'react'
import { Productitem } from './Productitem'

export const Catalog = ({products, isCatalog}) => {

    return (
            <div className="">
            <h4 className='m-3'>Catálogo de Productos</h4>
                <div className="row" style={{height:"1%"}}>
                    {products.map((product, index) => {
                        return (
                            <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                                <Productitem product={product} isCatalog={isCatalog}/>
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