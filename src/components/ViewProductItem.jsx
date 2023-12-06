import React, { useState } from 'react'
import Swal from "sweetalert2";
import '../CSS/ViewProductItem.css';
import { Navbar } from '../components/Navbar'
import { collectionAssignation, onInsert } from '../CRUD/app';
import { productInformation, productAvailability, userInformation } from './Productitem'


const ViewProductItem = ({ loggedIn, user, logOut, isVendor }) => {

    console.log("GTA6");
    const [cart, setCart] = useState([]);

  const addToCart = () => {
    setCart([...cart, productInformation.data]);
    addToFirebaseCart(productInformation);
  }

  const addToFirebaseCart = async (productInformation) => {
    collectionAssignation('CustomerCart');
    const cartItem = {
      image: productInformation.img,
      name: productInformation.name,
      price: productInformation.price,
      quantity: 1,
      userEmail: userInformation.email,
      cart: false,
      stock: productInformation.stock,
      product_id: productInformation.id
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
    };
  }

    const onClickAddShoppingCart = ()=> {
        if(productAvailability==="Disponible"){
            addToCart();
        }
        else{
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
        loggedIn = {loggedIn}
        user = {user}
        logOut = {logOut}
        isVendor = {isVendor}
        />
    
        <>
            <div className='container' style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
                <div>
                    <img alt='Produt_Image' style={{width: '90%', height: '100%'}} src={productInformation.img}></img>
                </div>
                <div style={{marginTop:"30px"}}>
                    <p style={{marginTop:"30px", fontSize:'33px'}}><strong>{productInformation.name}</strong></p>   
                    <p style={{marginTop:"30px"}}>Descripción: {productInformation.description}</p>
                    <p style={{marginTop:"30px"}}>Precio ₡{productInformation.price}</p>
                    <p style={{marginTop:"30px"}}>Talla {productInformation.size}</p>
                    <p style={{marginTop:"30px"}}>Correo registrado del vendedor: {productInformation.vendor}</p>
                    <p style={{marginTop:"30px"}}>Estado: {productAvailability}</p>
                    <button type='button' style={{marginTop:"30px"}} className='btn_AddShoppingCart' onClick={onClickAddShoppingCart}>Agregar al carrito</button>
                </div>

            </div>
            
        </>
    </>
  )
}

export default ViewProductItem