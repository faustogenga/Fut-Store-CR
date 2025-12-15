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
    <div className='product h-100 d-flex flex-column'>
      <div style={{ overflow: 'hidden', borderRadius: '8px 8px 0 0', backgroundColor: '#f8fafc' }}>
        <img alt={product.name}
          src={imgUrl}
          loading='lazy'
          style={{ 
            height: "280px", 
            width: "100%", 
            objectFit: "cover",
            transition: 'transform 0.3s ease'
          }}
          className="product-image"
        />
      </div>
      <div className='descripcion d-flex flex-column flex-grow-1 p-3'>
        <h5 style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#1e293b', minHeight: '3rem' }}>
          {product.name}
        </h5>
        <p className='mb-3' style={{ fontSize: "1.5rem", fontWeight: "700", color: "#2563eb" }}>
          ${product.price}
        </p>
        <div className="mt-auto">
          <IconButton 
            disabled={isVendor ? true : false} 
            color="primary" 
            aria-label="add to shopping cart"
            onClick={() => (loggedIn ? onButtonClickViewProduct() : Swal.fire({
              title: 'Ingresa para poder comprar',
              text: 'Inscríbete / Regístrate en la mejor página',
              icon: 'warning',
            }))}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              background: isVendor ? '#e2e8f0' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: 'white',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            onMouseEnter={(e) => {
              if (!isVendor) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isVendor) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
              }
            }}
          >
            <AddShoppingCartIcon style={{ marginRight: '0.5rem' }} />
            <span style={{ fontSize: "0.95rem" }}>Comprar</span>
          </IconButton>
        </div>
      </div>
    </div>
  )
}