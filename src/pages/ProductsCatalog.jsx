import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Catalogsidebar } from '../components/Catalogsidebar';
import { Catalognavigation } from '../components/Catalognavigation';
import { Catalog } from '../components/Catalog';
import { collectionAssignation, onFindAll } from '../CRUD/app';

export const ProductsCatalog = ({ user, loggedIn, logOut, isCatalog, setIsCatalog, isVendor }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryClicked, setCategoryClicked] = useState('All');
    const [priceClicked, setPriceClicked] = useState('All');

    //get products de firebase
    useEffect(() => {
        const fetchdata = async () => {
            collectionAssignation('Products');
            const docsSnapshot = await onFindAll();
            const filterData = docsSnapshot.docs.map((doc, index) => ({
                key: index,
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(filterData);
        };
        fetchdata();
        setIsCatalog(true);
    }, [setIsCatalog]);

    //filtrar los productos
    useEffect(() => {
        let tempFilteredProducts = [...products];

        if (categoryClicked !== 'All') {
            tempFilteredProducts = tempFilteredProducts.filter((product) => product.category === categoryClicked);
        }

        if (priceClicked !== 'All') {
            let x = 0;
            let y = 0;
            switch (priceClicked) {
                case '0-50':
                    x = 0;
                    y = 50;
                    break;
                case '50-100':
                    x = 50;
                    y = 100;
                    break;
                case '100-150':
                    x = 100;
                    y = 150;
                    break;
                case 'over150':
                    x = 150;
                    y = 10000;
                    break;
                default:
                    x = 0;
                    y = 10000;
            }

            tempFilteredProducts = tempFilteredProducts.filter(
                (product) => {
                    const productPrice = parseInt(product.price, 10);
                    return productPrice >= x && productPrice <= y;
                }
            );
        }

        setFilteredProducts(tempFilteredProducts);
    }, [categoryClicked, priceClicked, products]);


    //Handles cualquier click en los filters y el buscador

    const handleClickCategory = (event) => {
        setCategoryClicked(event.target.name);
    };

    const handleClickPrice = (event) => {
        setPriceClicked(event.target.name);
    };

    const handleSearchInput = (event) => {
        let tempFilteredProducts = [...products];
        if (event.target.value !== '') {
            tempFilteredProducts = tempFilteredProducts.filter((product) => product.name.toLowerCase().includes(event.target.value.toLowerCase()));
        }
        setFilteredProducts(tempFilteredProducts);
    };

    return (
        <>
            <Navbar loggedIn={loggedIn} user={user} logOut={logOut} isVendor={isVendor} />

            <div className='responsiveCategory d-flex'>
                <Catalogsidebar handleClickCategory={handleClickCategory} handleClickPrice={handleClickPrice} categoryClicked={categoryClicked} priceClicked={priceClicked} />
                <div className='container'>
                    <div>
                        <Catalognavigation handleSearchInput={handleSearchInput} />
                    </div>
                    <Catalog loggedIn={loggedIn} user={user} products={filteredProducts} isCatalog={isCatalog} isVendor={isVendor} />
                </div>
            </div>
            <Footer />
        </>
    );
};
