import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

export const Productitem = ({product}) => {
  return (
    <div className='product'>
      <img alt='Produt_Image' src={product.img}></img>
      <div className='descripcion m-2'>
        <h5>{product.name}</h5>
        <p className='m-0'><strong>{product.price}</strong></p>
        <IconButton color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>
        <button type="button" className="btn btn-link m-0 p-0 text-info">Comprar ahora</button>
      </div>
    </div>
  )
}
