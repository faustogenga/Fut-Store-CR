import React from 'react'

export const Productitem = ({product}) => {
  return (
    <div className='product'>
      <img alt='Produt_Image' src='https://i.pinimg.com/originals/06/f6/d6/06f6d667574555163c0ca7a7701ad5eb.jpg'></img>
      <div className='descripcion m-2'>
        <h5>{product.name}</h5>
        <p className='m-0'><strong>{product.price}</strong></p>
        <button type="button" className="btn btn-link m-0 p-0 text-info">Comprar</button>
      </div>
    </div>
  )
}
