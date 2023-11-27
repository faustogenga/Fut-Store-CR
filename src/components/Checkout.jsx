import React, { useState } from 'react';
import '../CSS/Checkout.css';
import { auth } from '../CRUD/firebase_conection';

export const Checkout = ({ user }) => {

    const [paymentMethod, setPaymentMethod] = useState('Choose');

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

  return (
    <>
        <div class="containerCheckout">
        <h1>Checkout</h1>
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
    </>
  )
}
