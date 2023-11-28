import React, { useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';
import { collectionAssignation, onInsert } from '../CRUD/app';
import { auth } from "../CRUD/firebase_conection";

export const Productitem = ({ product }) => {
  
  const [cart, setCart] = useState([]);

  const addToCart = () => {
    setCart([...cart, product.data]);
    addToFirebaseCart(product);
  }

  const addToFirebaseCart = async (product) => {
    collectionAssignation('CustomerCart');
  

    const cartItem = {
      image: product.img,
      name: product.name,
      price: product.price,
      quantity: 1,
      customer_email: auth.currentUser.email,
      cart: false, 
      product_id: product.id
    };

    try {
        await onInsert(cartItem);
        Swal.fire({
        title: "¡Buena elección!",
        text: "Producto agregado correctamente a tu carrito.",
        icon: "success"
      });

    } catch (error) {
      Swal.fire({
        title: "Tu producto no ha podido ser agregado a tu carrito.",
        text: error.message,
        icon: "Error"
      });
    }
  };


  return (
    <div className='product user'>
      <img alt='Produt_Image' src={product.img}></img>
      <div className='descripcion m-2'>
        <h5>{product.name}</h5>
        <p className='m-0'><strong>{product.price}</strong></p>
        <IconButton color="primary" aria-label="add to shopping cart" onClick={addToCart}>
        <AddShoppingCartIcon />
        </IconButton>
      </div>
    </div>
  )
}