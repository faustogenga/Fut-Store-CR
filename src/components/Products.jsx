import React, { useEffect, useState } from 'react'
import { Productitem } from './Productitem'
import { collectionAssignation, onFindAll } from '../CRUD/app'

export const Products = () => {

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
            console.log(products);
        }

        fetchdata();
    }, []);

    return (
        <section id='products'>
            <div className="container mt-5 mb-5">
                <div className="row main-products">

                    {products.map((product, index) => {
                        return (
                            <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                                 <Productitem product={product}/>
                            </div>

                        )
                    })

                    }
                </div>
            </div>
        </section>
    )
}
