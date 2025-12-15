import React, { useEffect, useState } from 'react'
import { Productitem } from './Productitem'
import { collectionAssignation, onFindAll } from '../CRUD/app'

export const Products = ({loggedIn,user,isCatalog, isVendor, imgsProducts}) => {

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
        <section id='products' className='py-5 position-relative'>
            <div className="container position-relative" style={{ zIndex: 1 }}>
                <div className="text-center mb-5" style={{ marginTop: '1rem', paddingBottom: '2rem' }}>
                    <div className="d-inline-flex align-items-center justify-content-center mb-4" style={{ gap: '1.25rem' }}>
                        <div style={{ 
                            width: '4px', 
                            height: '60px', 
                            background: 'linear-gradient(135deg, #2563eb 0%, #f59e0b 100%)', 
                            borderRadius: '2px',
                            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
                        }}></div>
                        <div>
                            <h2 style={{ 
                                fontWeight: "800", 
                                color: "#0f172a", 
                                margin: 0, 
                                fontSize: '2.75rem', 
                                letterSpacing: '-0.05em',
                                lineHeight: '1.1'
                            }}>
                                Productos Destacados
                            </h2>
                            <div style={{
                                width: '80px',
                                height: '3px',
                                background: 'linear-gradient(90deg, #2563eb 0%, #f59e0b 100%)',
                                margin: '1rem auto 0',
                                borderRadius: '2px'
                            }}></div>
                        </div>
                        <div style={{ 
                            width: '4px', 
                            height: '60px', 
                            background: 'linear-gradient(135deg, #2563eb 0%, #f59e0b 100%)', 
                            borderRadius: '2px',
                            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
                        }}></div>
                    </div>
                    <p style={{ 
                        color: '#64748b', 
                        fontSize: '1.15rem', 
                        fontWeight: '400',
                        marginTop: '1.5rem',
                        letterSpacing: '0.02em',
                        maxWidth: '600px',
                        margin: '1.5rem auto 0'
                    }}>
                        Selección exclusiva de los mejores productos para destacar en el campo
                    </p>
                </div>
                <div className="row g-4 justify-content-center" style={{ marginTop: '3rem' }}>
                    {products.filter(product => product.category === "Cleats").slice(0,4).map((product, index) => {
                        return (
                            <div className="responsiveProduct col-lg-3 col-md-6 col-sm-12 mb-4" key={index}>
                                 <Productitem loggedIn={loggedIn} user={user} product={product} isCatalog={isCatalog} isVendor={isVendor} imgsProducts={imgsProducts}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
