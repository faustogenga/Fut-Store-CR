import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';

export let productInformation;
export let productImgUrl;

export const Productitem = ({ loggedIn, product, isVendor, imgsProducts }) => {
  const [imgUrl, setImgUrl] = useState('https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e473aenm3b0zfslnm4r53orwrwmvrxxn2j924rsh8ar&ep=v1_gifs_search&rid=giphy.gif&ct=g');
  const navigate = useNavigate();

  const onButtonClickViewProduct = () => {
    productInformation = product;
    productImgUrl = imgUrl;
    console.log(productInformation);
    navigate('/ViewProductItem');
  }


  const loadImg = () => {
    const productNameTrim = product.name.trim();
    const foundImg = imgsProducts.find((img) => img.name.replace(/\.jpg$/i, '').trim() === productNameTrim);
    if (foundImg) {
      return foundImg.url
    } else {
      return "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";
    }
  };

  const loadImgCallBack = useCallback(loadImg, [imgsProducts, product.name]);
  
  useEffect(() => {
    const imgUrl = loadImgCallBack();
    setImgUrl(imgUrl);
  }, [loadImgCallBack]);

  return (
    <div className='product'>
      <img alt='Produt_Image'
        src={imgUrl}
        loading='lazy'
        style={{ height: "280px", width: "270px", position: "relative" }}
      >
      </img>
      <div className='descripcion m-1'>
        <h5>{product.name}</h5>
        <p className='m-0'><strong>${product.price}</strong></p>
        <IconButton disabled={isVendor ? true : false} color="primary" aria-label="add to shopping cart"
          onClick={() => (loggedIn ? onButtonClickViewProduct() : Swal.fire({
            title: 'Ingresa para poder comprar',
            text: 'Inscribete / Registrate en la mejor pagina',
            icon: 'warning',
          }))}>
        <AddShoppingCartIcon />
        <div className='' style={{ fontSize: "20px" }}>Comprar</div>
      </IconButton>
    </div>
    </div >
  )
}