import React, { useEffect, useState } from 'react'
import { Productitem } from './Productitem'
import { collectionAssignation, onFindAll } from '../CRUD/app'

export const Products = ({loggedIn,user,isCatalog, isVendor}) => {

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
        <section id='products' className='mt-1 mb-1'>
            <div className="container">
            <h4 style={{fontWeight:"bold", color:"#5d5e5e"}}>🔥Destacado</h4>
                <div className="row">
                    {products.filter(product => product.category === "Soccer Cleats").slice(0,4).map((product, index) => {
                        return (
                            <div className="responsiveProduct col-lg-3 col-md-6 col-sm-12" key={index}>
                                 <Productitem loggedIn={loggedIn} user={user} product={product} isCatalog={isCatalog} isVendor={isVendor}/>
                            </div>
                        )
                    })

                    }
                </div>
            </div>
        </section>
    )
}
