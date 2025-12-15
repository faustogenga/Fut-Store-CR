import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';

export let productInformation;
export let productImgUrl;

export const Productitem = ({ loggedIn, product, isVendor, imgsProducts }) => {
  const [imgUrl, setImgUrl] = useState('https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e473aenm3b0zfslnm4r53orwrwmvrxxn2j924rsh8ar&ep=v1_gifs_search&rid=giphy.gif&ct=g');
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

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
      <div style={{ 
        overflow: 'hidden', 
        borderRadius: '12px 12px 0 0', 
        backgroundColor: '#ffffff',
        position: 'relative',
        padding: '1rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '320px'
      }}>
        <div 
          onClick={handleHeartClick}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <i 
            className={isFavorited ? "bi bi-heart-fill" : "bi bi-heart"} 
            style={{ 
              color: isFavorited ? '#ef4444' : '#64748b', 
              fontSize: '1.1rem',
              transition: 'color 0.2s ease'
            }}
          ></i>
        </div>
        <img alt={product.name}
          src={imgUrl}
          loading='lazy'
          style={{ 
            maxHeight: "280px", 
            maxWidth: "100%", 
            width: "auto",
            height: "auto",
            objectFit: "contain",
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            borderRadius: '8px'
          }}
          className="product-image"
        />
      </div>
      <div className='descripcion d-flex flex-column flex-grow-1 p-4' style={{ background: '#ffffff' }}>
        <div className="mb-2">
          <span style={{ 
            fontSize: '0.75rem', 
            fontWeight: '600', 
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Cleats
          </span>
        </div>
        <h5 style={{ 
          fontWeight: '700', 
          marginBottom: '1rem', 
          color: '#0f172a', 
          minHeight: '3rem',
          fontSize: '1.15rem',
          lineHeight: '1.4',
          letterSpacing: '-0.01em'
        }}>
          {product.name}
        </h5>
        <div className="d-flex align-items-baseline mb-3" style={{ gap: '0.5rem' }}>
          <p style={{ fontSize: "1.75rem", fontWeight: "800", color: "#2563eb", margin: 0 }}>
            ${product.price}
          </p>
          <span style={{ fontSize: "0.9rem", color: "#94a3b8", textDecoration: 'line-through' }}>
            ${parseInt(product.price) + 20}
          </span>
        </div>
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
              padding: '1rem',
              borderRadius: '10px',
              background: isVendor ? '#e2e8f0' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: 'white',
              fontWeight: '600',
              textTransform: 'none',
              letterSpacing: '0.3px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              if (!isVendor) {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.4)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isVendor) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';
              }
            }}
          >
            <AddShoppingCartIcon style={{ marginRight: '0.75rem', fontSize: '1.2rem' }} />
            <span style={{ fontSize: "1rem" }}>Agregar al Carrito</span>
          </IconButton>
        </div>
      </div>
    </div>
  )
}