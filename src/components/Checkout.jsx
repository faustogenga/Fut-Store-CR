import React, { useState, useEffect } from 'react';
import '../CSS/Checkout.css';
import { auth } from '../CRUD/firebase_conection';
import { collectionAssignation, onInsert, onFindinCart } from '../CRUD/app';
import Swal from 'sweetalert2';

export const Checkout = ({ user }) => {

    const initialValues = {shippingAddress:''}
    const [cart, setCart] = useState([])
    const [paymentMethod, setPaymentMethod] = useState('Choose');
    const [value, setValue] = useState(initialValues);
    const [order, setOrder] = useState([]);  

    useEffect(() => {
        const fetchdata = async () => {
            collectionAssignation('CustomerCart');
            const result = await onFindinCart(auth.currentUser ? auth.currentUser.email : '');
            console.log(result);
            const productsData = result.map((doc) => doc.data());
            setCart(productsData);
        }
    fetchdata();
    }, []);

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const addToOrder = () => {
        console.log(cart.length);
        if (cart.length > 0) {
            setOrder(cart[0]);
            addToFirebaseOrder(cart[0]);
        } else {
            Swal.fire({
                title: "Aviso",
                text: "El carrito está vacío.",
                icon: "warning"
              });
        }
        
      }
    
      const addToFirebaseOrder = async (cartItem) => {
        collectionAssignation('PlacedOrder');

            const orderItem = {
                userEmail: auth.currentUser.email,
                shippingAddress: value.shippingAddress,
                paymentMethod: paymentMethod,
                price: cartItem.price,
                name: cartItem.name,
               quantity: cartItem.quantity
          }
          try {
            await onInsert(orderItem);
            Swal.fire({
              title: "Compra Realizada",
              text: "Tu orden se ha completado",
              icon: "success"
            });
      
          } catch (error) {
            console.log(error.message);
            Swal.fire({
              title: "ERROR",
              text: error.message,
              icon: "Error"
            });
          }
    };

    const onChangeValues = ({ target }) => {
        const { name, value } = target;
        setValue({ ...value, [name]: value });
    }

  return (
    <>
    <div className='MainCheckout'>
        <div className="divForms">
            <div class="containerCheckout">
                <h1>Finaliza tu compra</h1>
                <div class="checkout-form">
                        <form action="">
                            <div class="form-group">
                                <label >Correo del usuario</label>
                                <input type="text" name="Email" placeholder="" value={auth.currentUser ? auth.currentUser.email : ''} disabled />
                            </div>
                            <div class="form-group">
                                <label>Dirección de entrega</label>
                                <input type="text" name="shippingAddress" placeholder="Ingresa tu dirección" required />
                            </div>
                            <div class="form-group">
                                <label>Método de pago</label>
                                <select name="paymentMethod" value={paymentMethod} onChange={handlePaymentChange} required>
                                    <option value="Choose">Selecciona un método de pago</option>
                                    <option value="creditCard">Tarjeta de Crédito</option>
                                    <option value="paypal">PayPal</option>
                                </select>
                            </div>
                            {paymentMethod === 'creditCard' && (
                                <>
                                    <div className="form-group">
                                        <label>Numero de tarjeta</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            placeholder="Ingresa tu número de tarjeta"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Fecha de vencimiento</label>
                                        <input
                                            type="text"
                                            name="expirationDate"
                                            placeholder="MM/YY"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input type="password" name="cvv" required />
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
                            <button type="submit">Realizar Compra</button>
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
