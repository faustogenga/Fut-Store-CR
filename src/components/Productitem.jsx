import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';
import { collectionAssignation, onInsert } from '../CRUD/app';
//import { auth } from "../CRUD/firebase_conection";

export let productInformation;
export let userInformation;
export let productAvailability;

export const Productitem = ({user, product, isCatalog, isVendor }) => {

  const navigate = useNavigate();

  const availabilityCheck = ()=> {
    if (product.stock > 0){
        productAvailability = "Disponible";
    }
    else{
      productAvailability = "No Disponible";
    }
}
  
  const onButtonClickViewProduct = () => {
    productInformation = product;
    userInformation = user;
    availabilityCheck();
    navigate('./ViewProductItem');
  }

  return (
    <div className='product'>
      <img alt='Produt_Image'
        src={product.img}
        style={isCatalog
          ? { height: "280px", width: "280px", position: "relative"}
          : { height:"300px", width: "250px", position: "relative" }}
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