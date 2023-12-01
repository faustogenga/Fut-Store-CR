import React, { useEffect, useState } from 'react'
import { Productitem } from './Productitem'
import { collectionAssignation, onFindAll } from '../CRUD/app'

export const Catalog = (user) => {

        const [products, setproducts] = useState([]);
    
        useEffect(() => {
            const fetchdata = async () => {
                collectionAssignation('Products');
                const docsSnapshot = await onFindAll();
                const filterData = docsSnapshot.docs.map((doc, index) => (
                    {
                        key: index,
                        id: doc.id,
                        ...doc.data(),
    
                    }
                ));
                setproducts(filterData);
            }
    
            fetchdata();
        }, []);
    
    
    return (
        <section id='products' className='mt-5 mb-5'>
            <div className="container">
            <h4>Catálogo de Productos</h4>
                <div className="row main-products">
                    {products.map((product, index) => {
                        return (
                            <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                                <Productitem product={product}/>
                                
                                <br/><br/><br/>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </section>
    )
}
export default Catalog;
