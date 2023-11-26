import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

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
      </div>
    </div>
  )
}
