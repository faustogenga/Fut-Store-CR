import React, { useEffect, useState } from 'react'
import { Productitem } from './Productitem'
import { onFindAll } from '../CRUD/app'
import { doc } from 'firebase/firestore';

export const Products = () => {

    const [products, setproducts] = useState([]);

    useEffect(() => {

        const fetchdata = async () => {
        
            const docsSnapshot = await onFindAll();
            const filterData = docsSnapshot.docs.map((doc) => (
                {
                    ...doc.data(),
                    
                }
            ));
            setproducts(filterData);
            console.log(filterData);
        }

        fetchdata();
    }, []);

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
