import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import { Navbar } from '../components/Navbar'
import { collectionAssignation, onInsert } from '../CRUD/app';
import { productInformation } from './Productitem'
import { useNavigate } from "react-router-dom";
import { Footer } from './Footer';


const ViewProductItem = ({ loggedIn, user, logOut, isVendor }) => {
  const navigate = useNavigate();

  const [Availability, setAvailability] = useState('');

  useEffect(() => {
    if (user && user.email) {
      availabilityCheck();
    }
  }, [user]);


  const availabilityCheck = () => {
    if (productInformation.stock > 0) {
      setAvailability("Disponible");
    }
    else {
      setAvailability("No Disponible");
    }
  }

  const addToFirebaseCart = async () => {
    collectionAssignation('CustomerCart');
    const product = {
      image: productInformation.img,
      name: productInformation.name,
      price: productInformation.price,
      quantity: 1,
      userEmail: user.email,
      stock: productInformation.stock,
      product_id: productInformation.id
    };

    try {
      await onInsert(product);
      Swal.fire({
        title: "¡Buena elección!",
        text: "Producto agregado correctamente a tu carrito.",
        icon: "success"
      });
      navigate("/productscatalog");

    } catch (error) {
      Swal.fire({
        title: "Tu producto no ha podido ser agregado a tu carrito.",
        text: error.message,
        icon: "Error"
      });
    };
  }

  const onClickAddShoppingCart = () => {
    if (Availability === "Disponible") {
      addToFirebaseCart();
    }
    else {
      Swal.fire({
        title: "Error",
        text: "El producto seleccionado no se encuentra disponible",
        icon: "error"
      })
    }
  }


  return (
    <>
      <Navbar
        loggedIn={loggedIn}
        user={user}
        logOut={logOut}
        isVendor={isVendor}
      />
      <div style={{
        display: "flex",
        backgroundImage: "url(https://c1.wallpaperflare.com/path/56/434/430/background-photos-grass-green-33d94cf5f7ef88102f0d4710b4b2c840.jpg)",
        backgroundSize: "cover"
      }}>
        <div className='container bg-white mt-5 mb-5' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div className='position-relative'>
            <button
              type='button'
              style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
              className='btn btn-warning m-1'
              onClick={(() => navigate("/productscatalog"))}
            >
              Volver
            </button>
            <img alt='Produt_Image' style={{ width: '90%', height: '100%' }} src={productInformation.img}></img>
          </div>
          <div style={{ marginTop: "30px" }}>
            <p style={{ marginTop: "30px", fontSize: '33px' }}><strong>{productInformation.name}</strong></p>
            <p style={{ marginTop: "30px" }}>Descripción: {productInformation.description}</p>
            <p style={{ marginTop: "30px" }}>Precio ₡{productInformation.price}</p>
            <p style={{ marginTop: "30px" }}>Talla {productInformation.size}</p>
            <p style={{ marginTop: "30px" }}>Correo registrado del vendedor: {productInformation.vendor}</p>
            <p style={{ marginTop: "30px" }}>Estado: {Availability}</p>
            <p style={{ marginTop: "30px" }}>Cantidad: {productInformation.stock}</p>
            <button type='button' style={{ marginTop: "30px" }} className='btn btn-info'
              onClick={onClickAddShoppingCart}>Agregar al carrito</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ViewProductItem