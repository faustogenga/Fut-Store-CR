import React, { useState, useEffect } from 'react';
import '../CSS/Checkout.css';
import { auth } from '../CRUD/firebase_conection';
import { collectionAssignation, onDeleteFromCart, onFindinCart, onInsertOrder } from '../CRUD/app';
import Swal from 'sweetalert2';


export const Checkout = ({ user }) => {
  const userEmail =  auth.currentUser ? auth.currentUser.email : '';
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Choose');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const fetchCartData = async () => {
      try {
        const result = await onFindinCart(userEmail);
        if (result) {
            const productsData = result.map((doc) => doc.data());
            setCart(productsData);  
        } else {
            console.log("Error")
        }
        
        } catch (error) {
        Swal.fire({
            title: "Error al mostrar los productos en tu carrito.",
            text: error.message,
            icon: "error"
            });
        }
   };

    useEffect(() => {
      collectionAssignation('CustomerCart');
      fetchCartData();
    }, [userEmail]); 

  function sendErrorMessage(txt, icon) {
    Swal.fire({
      title: '¡ERROR!',
      text: txt,
      icon: icon,
    });
  }
  const inputValidation = () => {
    if(shippingAddress.trim() === '') {
        sendErrorMessage('Dirección de entrega vacía', 'error');
        return false;
    } else if (cardNumber.trim() === '') {
        sendErrorMessage('Número de tarjeta vacío', 'error');
        return false;
    } else if (cardNumber.length !== 16) {
        sendErrorMessage("Número de tarjeta inválido", "error");
        return false;
    } else if(expirationDate.trim() === '') {
        sendErrorMessage('Fecha de vencimiento vacía', 'error');
        return false;
    } else if (expirationDate.length !== 5) {
        sendErrorMessage("Fecha de vencimiento inválida", "error");
        return false;
    } else if (cvv.trim() === '') {
        sendErrorMessage('CVV vacío', 'error');
        return false;
    } else if (cvv.length > 4 || cvv.length < 3)  {
        sendErrorMessage("CVV inválido", "error");
        return false;
    } else {
        return true;
    }
  } 

  const generateOrderId = () => {
      let randomId = Math.floor(Math.random() * 1000000000);
      randomId = randomId.toString();
      return randomId;
  }
  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const addToOrder = async (event) => {
    event.preventDefault();
    if (inputValidation()) {
     const orderId = generateOrderId();
      const orderItems = cart.map((cartItem) => ({
        orderId: orderId,
        userEmail: userEmail,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        product_id: cartItem.product_id,
        name: cartItem.name,
        price: cartItem.price,
        quantity: cartItem.quantity,
        product_img: cartItem.image,
        orderDate: currentDate,
        orderTime: currentTime,
      }));

    try {
      await Promise.all(orderItems.map(onInsertOrder));
      await Promise.all(cart.map((cartItem) => onDeleteFromCart('CustomerCart', cartItem.product_id)));
      Swal.fire({
        title: '¡Compra Realizada!',
        text: 'Tu orden se ha completado con éxito',
        icon: 'success',
      });
      setCart([]);

    } catch (error) {
      Swal.fire({
        title: 'ERROR',
        text: error.message,
        icon: 'error',
      });
      console.log(error.message)
    }
  }    
  }; 

  return (
    <>
    <div className='MainCheckout'>
        <div className="divForms">
            <div className="containerCheckout">
                <h1>Finaliza tu compra</h1>
                <div className="checkout-form">
                        <form action="">
                            <div className="form-group">
                                <label >Correo del usuario</label>
                                <input type="text" name="Email" placeholder="" value={auth.currentUser ? auth.currentUser.email : ''} disabled />
                            </div>
                            <div className="form-group">
                                <label>Dirección de entrega</label>
                                <input
                                value={shippingAddress} 
                                type="text" 
                                name="shippingAddress" 
                                placeholder="Ingresa tu dirección" 
                                onChange={({target}) => setShippingAddress(target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Método de pago</label>
                                <select name="paymentMethod" value={paymentMethod} onChange={handlePaymentChange} required>
                                    <option value="Choose">Selecciona un método de pago</option>
                                    <option value="CreditCard">Tarjeta de Crédito</option>
                                    <option value="PayPal">PayPal</option>
                                </select>
                            </div>
                            {paymentMethod === 'CreditCard' && (
                                <>
                                    <div className="form-group">
                                        <label>Numero de tarjeta</label>
                                        <input 
                                            value={cardNumber}
                                            onChange={({ target }) => setCardNumber(target.value)}
                                            type="text"
                                            name="cardNumber"
                                            placeholder="Ingresa tu número de tarjeta"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Fecha de vencimiento</label>
                                        <input
                                            value={expirationDate}
                                            onChange={({ target }) => setExpirationDate(target.value)}
                                            type="text"
                                            name="expirationDate"
                                            placeholder="MM/YY"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input
                                        value={cvv}
                                        onChange={({ target }) => setCvv(target.value)}
                                        type="password" 
                                        name="cvv" 
                                        required />
                                    </div>
                                </>
                            )}
                            {paymentMethod === 'paypal' && (
                                <div className="form-group">
                                    <a style={{textAlign:'center'}} href="https://www.paypal.com/signin">
                                        <div className="paypal-box">
                                            <img src='https://th.bing.com/th/id/R.412a36731b19d80e1c3ff491801a38fe?rik=QV3joL4mTMX4QQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fPayPal-Logo-PNG-Free-Image-180x180.png&ehk=gubkVoplkRIZOZuax8liANshPYhuick0yp3FgqMcNtU%3d&risl=&pid=ImgRaw&r=0' alt="PayPal Logo" />
                                            <p>Iniciar Sesión en Paypal</p>
                                        </div>
                                    </a>
                                </div>
                            )}
                            <button type="submit" onClick={addToOrder}>Realizar Compra</button>
                        </form>
                </div>
            </div>
            <div className="checkoutSummary">
                <div className='summaryCont'>
                    <hr />
                    <div>
                        <label htmlFor="Subtotal">Subtotal: ............................................ ₡</label>
                    </div>
                    <div>
                        <label htmlFor="Impuestos">Impuestos: ......................................... ₡</label>
                    </div>
                    <div>
                        <label htmlFor="Total">Total a pagar: ..................................... ₡</label>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
