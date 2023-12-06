import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
//import { auth } from "../CRUD/firebase_conection";

export let productInformation;

export const Productitem = ({product, isCatalog, isVendor }) => {

  const navigate = useNavigate();

  const onButtonClickViewProduct = () => {
    productInformation = product;
    navigate('/ViewProductItem');
  }

  return (
    <div className='product'>
      <img alt='Produt_Image'
        src={product.img}
        style={{ height: "280px", width: "270px", position: "relative"}}
        >
      </img>
      <div className='descripcion m-1'>
        <h5>{product.name}</h5>
        <p className='m-0'><strong>${product.price}</strong></p>
        <IconButton disabled={isVendor ? true : false} color="primary" aria-label="add to shopping cart" onClick={onButtonClickViewProduct}>
          <AddShoppingCartIcon />
          <div className='' style={{ fontSize: "20px" }}>Comprar</div>
        </IconButton>
      </div>
    </div>
  )
}