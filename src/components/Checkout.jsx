import React, { useState, useEffect } from 'react';
import '../CSS/Checkout.css';
import { collectionAssignation, onClearCart, onFindbyEmail, onInsertOrder } from '../CRUD/app';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export const Checkout = ({ user }) => {
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    //shipping//
    const [shippingCountry, setshippingCountry] = useState('Costa Rica');
    const [shippingProvience, setshippingProvience] = useState('');
    const [shippingTown, setshippingTown] = useState('');
    const [shippingDireccion, setshippingDireccion] = useState('');


    const [paymentMethod, setPaymentMethod] = useState('Choose');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    useEffect(() => {
        if (user && user.email) {
            console.log(user.email);
            collectionAssignation('CustomerCart');
            fetchCartData();
        }
    }, [user]);

    const fetchCartData = async () => {
        try {
            const result = await onFindbyEmail(user.email);
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

    const fetchTotal = () => {
        let total = 0;

        cart.forEach((item) => {
            total += item.price * item.quantity;
        });

        return total;
    }

    function sendErrorMessage(txt, icon) {
        Swal.fire({
            title: '¡ERROR!',
            text: txt,
            icon: icon,
        });
    }
    const inputValidation = () => {
        if (shippingCountry.trim() === '') {
            sendErrorMessage('Dirección de entrega vacía', 'error');
            return false;
        } else if (cardNumber.trim() === '') {
            sendErrorMessage('Número de tarjeta vacío', 'error');
            return false;
        } else if (cardNumber.length !== 16) {
            sendErrorMessage("Número de tarjeta inválido", "error");
            return false;
        } else if (expirationDate.trim() === '') {
            sendErrorMessage('Fecha de vencimiento vacía', 'error');
            return false;
        } else if (expirationDate.length !== 5) {
            sendErrorMessage("Fecha de vencimiento inválida", "error");
            return false;
        } else if (cvv.trim() === '') {
            sendErrorMessage('CVV vacío', 'error');
            return false;
        } else if (cvv.length > 4 || cvv.length < 3) {
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
        if (true) {
            const orderId = generateOrderId();
            const orderItems = cart.map((cartItem) => ({
                orderId: orderId,
                userEmail: user.email,
                shippingCountry: shippingCountry,
                shippingProvience : shippingProvience,
                shippingTown : shippingTown,
                shippingDireccion : shippingDireccion,
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
                await onClearCart('CustomerCart', user.email);
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
            navigate('/orders');
        }
    };

    return (
        <div className='MainCheckout d-flex justify-content-center align-items-center'>
            <div className="containerCheckout col-5 m-4 bg-light p-5 rounded">
                <h1 className="text-primary mb-4">Finaliza tu compra</h1>
                <div className="checkout-form">
                    <form>
                        <div className="form-group m-2">
                            <label>Correo del usuario</label>
                            <input
                                type="text"
                                name="Email"
                                placeholder=""
                                value={user?.email}
                                disabled
                                className="form-control"
                            />
                        </div>
                        <div className="form-group m-2">
                            <label>Pais</label>
                            <input
                                value={shippingCountry}
                                type="text"
                                name="shippingCountry"
                                disabled
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group m-2">
                            <label>Provincia</label>
                            <select
                                name="shippingProvience"
                                value={shippingProvience}
                                onChange={({ target }) => setshippingProvience(target.value)}
                                required
                                className="form-control"
                            >
                                <option value="San Jose">San Jose</option>
                                <option value="Limon">Limon</option>
                                <option value="Alajuela">Alajuela</option>
                                <option value="Guanacaste">Guanacaste</option>
                                <option value="Heredia">Heredia</option>
                                <option value="Puntarenas">Puntarenas</option>
                                <option value="Cartago">Cartago</option>
                            </select>
                        </div>
                        <div className="form-group m-2">
                            <label>Ciudad</label>
                            <input
                                value={shippingTown}
                                type="text"
                                name="shippingTown"
                                placeholder="Ciudad"
                                onChange={({ target }) => setshippingTown(target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group m-2">
                            <label> Calle / Direccion</label>
                            <input
                                value={shippingDireccion}
                                type="text"
                                name="shippingDireccion"
                                placeholder="Direccion"
                                onChange={({ target }) => setshippingDireccion(target.value)}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group m-2">
                            <label>Método de pago</label>
                            <select
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={handlePaymentChange}
                                required
                                className="form-control"
                            >
                                <option value="Choose">Selecciona un método de pago</option>
                                <option value="CreditCard">Tarjeta de Crédito</option>
                                <option value="PayPal">PayPal</option>
                            </select>
                        </div>
                        {paymentMethod === 'CreditCard' && (
                            <>
                                {/* Credit card details input fields */}
                            </>
                        )}
                        {paymentMethod === 'PayPal' && (
                            <div className="form-group">
                                <a href="https://www.paypal.com/signin" className="text-center">
                                    <div className="paypal-box">
                                        <img
                                            src="https://th.bing.com/th/id/R.412a36731b19d80e1c3ff491801a38fe?rik=QV3joL4mTMX4QQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fPayPal-Logo-PNG-Free-Image-180x180.png&ehk=gubkVoplkRIZOZuax8liANshPYhuick0yp3FgqMcNtU%3d&risl=&pid=ImgRaw&r=0"
                                            alt="PayPal Logo"
                                            className="img-fluid"
                                        />
                                        <p>Iniciar Sesión en Paypal</p>
                                    </div>
                                </a>
                            </div>
                        )}
                        <button type="submit" className="btn btn-success m-2" onClick={addToOrder}>
                            Realizar Compra
                        </button>
                    </form>
                </div>
            </div>
            <div className="checkoutSummary col-4 bg-light p-4 rounded">
                <div className='summaryCont p-3'>
                    <label>Productos :</label>
                    <div>
                        {cart.map((product) => {
                            return <label> - {product.price} : {product.name} </label>
                        })}
                    </div>
                    <hr/>
                    <div>
                        <label htmlFor="Impuestos">Impuestos: ...........................................</label>
                    </div>
                    <div> 
                        <label htmlFor="Total">Total a pagar:............................ ${fetchTotal()}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};
