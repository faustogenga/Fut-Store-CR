import React, { useState } from 'react';
import '../CSS/Checkout.css';
import { collectionAssignation, onClearCart, onInsertOrder, onUpdate } from '../CRUD/app';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { cart } from './Cart';
import { sendEmail } from '../hooks/sendEmail';

export const Checkout = ({ user }) => {
    const navigate = useNavigate();
    //const sendEmailToUser = sendEmail();
    //shipping//
    const [shippingCountry] = useState('Costa Rica');
    const [shippingEstate, setshippingEstate] = useState('San Jose');
    const [shippingTown, setshippingTown] = useState('');
    const [shippingDireccion, setshippingDireccion] = useState('');


    const [paymentMethod, setPaymentMethod] = useState('Choose');
    const [cardType, setCardType] = useState('Choose');
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const [shippingFee, setShippingFee] = useState(10)
    const salesTax = 0.13;

    const [errorMessage, setErrorMessage] = useState('Algo salió mal, por favor agrega todos los datos necesarios')

    const fetchTotals = () => {
        let subtotal = 0;
        cart?.forEach((item) => {
            subtotal += parseInt(item.price);
        });

        let total = subtotal;
        total += total * salesTax;
        total += shippingFee;

        return { subtotal, total };
    }

    const { subtotal, total } = fetchTotals();

    const inputValidation = () => {
        if (shippingCountry.trim() === '') {
            setErrorMessage('Dirección de entrega vacía', 'error');
            return false;
        } else if (cardNumber.trim() === '') {
            setErrorMessage('Número de tarjeta vacío', 'error');
            return false;
        } else if (expirationDate.trim() === '') {
            setErrorMessage('Fecha de vencimiento vacía', 'error');
            return false;
        } else if (cvv.trim() === '') {
            setErrorMessage('CVV vacío', 'error');
            return false;
        } else if (cvv.length > 4 || cvv.length < 3) {
            setErrorMessage("CVV inválido", "error");
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

    const handleCardType = (event) => {
        setCardType(event.target.value);
    };

    const handleCardNumberChange = ({ target }) => {
        // solo numeros
        const sanitizedValue = target.value.replace(/\D/g, '');
    
        // espacio cada 4 numeros
        const formattedValue = sanitizedValue.replace(/(\d{4})/g, '$1 ').trim();
    
        // Set the state with the formatted value
        setCardNumber(formattedValue);
      };

      const handleExpirationDate = ({ target }) => {
        // solo numeros
        const sanitizedValue = target.value.replace(/\D/g, '');
        // "/ cada 2 numeros
        const formattedValue = sanitizedValue.replace(/(\d{2})/, '$1/').trim();
        // Set the state with the formatted value
        setExpirationDate(formattedValue.length <  6 ? formattedValue : '');
      };

      const handleCvv = ({target}) => {
        // solo numeros
        const sanitizedValue = target.value.replace(/\D/g, '');

        setCvv(sanitizedValue.length < 4 ? sanitizedValue : '')
      }
    const handleProvienceChange = (event) => {
        setshippingEstate(event.target.value); 
        const selectedProvince = event.target.value;
        let fee;

        switch (selectedProvince) {
            case 'San Jose':
                fee = 10;
                break;
            case 'Alajuela':
                fee = 15;
                break;
            case 'Heredia':
                fee = 20;
                break;
            case 'Cartago':
                fee = 25;
                break;
            case 'Puntarenas':
                fee = 30;
                break;
            case 'Guanacaste':
                fee = 35;
                break;
            case 'Limon':
                fee = 40;
                break;
            default:
                fee = 0;
                break;
        }
        setShippingFee(fee);
    };

    const addToOrder = async (event) => {
        event.preventDefault();
        //faltan cambios de EMERSON
        if (true) {
            const orderId = generateOrderId();
            const orderItems = cart.map((cartItem) => ({
                cart_id: cartItem.id,
                product_id: cartItem.product_id,
                orderId: orderId,
                userEmail: user.email,
                vendor: cartItem.vendor,
                shippingCountry: shippingCountry,
                shippingEstate: shippingEstate,
                shippingTown: shippingTown,
                shippingDireccion: shippingDireccion,
                paymentMethod: paymentMethod,
                cardType: cardType,
                cardholderName: cardName,
                cardNumber : cardNumber,
                name: cartItem.name,
                price: cartItem.price,
                quantity: cartItem.quantity,
                stock: cartItem.stock,
                status: "Pendiente",
                shippingInfo: "Ordenado",
                product_img: cartItem.image,
                orderDate: currentDate,
                orderTime: currentTime,
                orderTotal : total
            }));

            try {
                if (inputValidation()) {
                    //mostrar la orden.
                    console.log(orderItems);
                    //agregar la orden a la base de datos.
                    await Promise.all(orderItems.map(onInsertOrder));
                    //Actualizar la base de datos con los nuevos stocks.
                    await Promise.all(
                        orderItems.map(async (orderItem) => {
                            //calcular los nuevos stocks despues de la venta
                            const productStock = parseInt(orderItem.stock);
                            const orderedQuantity = parseInt(orderItem.quantity);
                            if (productStock >= orderedQuantity) {
                                // calcular nuevo stock
                                const newStock = productStock - orderedQuantity;
                                // actualizar el stock en la bd
                                collectionAssignation("Products");
                                await onUpdate(orderItem.product_id, { stock: newStock.toString() });
                            } else {
                                //error catch
                                console.error(`Not enough stock for product with ID ${orderItem.id}`);
                            }
                        }));
                    //limpiar carrito
                    await onClearCart('CustomerCart', user.email);
                    //mandar correo
                    console.log(user.email);
                    console.log(orderItems[0].orderId);
                    await sendEmail(user.email, orderItems[0].orderId);
                    //mensaje
                    Swal.fire({
                        title: '¡Compra Realizada!',
                        text: 'Tu orden se ha completado con éxito',
                        icon: 'success',
                    });
                    navigate('/orders');
                } else {
                    Swal.fire({
                        title: '¡ERROR!',
                        text: errorMessage,
                        icon: 'error',
                    });
                    navigate('/checkout');
                }
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
                                name="shippingEstate"
                                value={shippingEstate}
                                onChange={handleProvienceChange}
                                required
                                className="form-control"
                            >
                                 <option value="San Jose">San José </option>
                                <option value="Limon">Limón</option>
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
                            <label> Calle / Dirección</label>
                            <input
                                value={shippingDireccion}
                                type="text"
                                name="shippingDireccion"
                                placeholder="Dirección"
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
                                <div className="form-group m-2">
                                    <label>Nombre del titular de la tarjeta</label>
                                    <input
                                        value={cardName}
                                        onChange={({ target }) => setCardName(target.value)}
                                        type="text"
                                        name="cardName"
                                        placeholder="Ingresa el nombre del titular de la tarjeta"
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group m-2">
                                    <label>Tipo de tarjeta</label>
                                    <select
                                        name="cardType"
                                        value={cardType}
                                        onChange={handleCardType}
                                        required
                                        className="form-control"
                                    >
                                        <option value="Choose">Selecciona un método de pago</option>
                                        <option value="VISA">VISA</option>
                                        <option value="MasterCard">MasterCard</option>
                                        <option value="AMEX">American Express</option>
                                    </select>
                                </div>
                                <div className="form-group m-2">
                                    <label>Número de tarjeta</label>
                                    <input
                                        value={cardNumber}
                                        onChange={handleCardNumberChange}
                                        type="text"
                                        name="cardNumber"
                                        placeholder="Ingresa tu número de tarjeta"
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group m-2">
                                    <label>Fecha de vencimiento</label>
                                    <input
                                        value={expirationDate}
                                        onChange={handleExpirationDate}
                                        type="text"
                                        name="expirationDate"
                                        placeholder="MM/YY"
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group m-2">
                                    <label>CVV</label>
                                    <input
                                        value={cvv}
                                        onChange={handleCvv}
                                        type="password"
                                        name="cvv"
                                        className="form-control"
                                        required />
                                </div>
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
                        {cart?.map((product) => {
                            return <label>&#10090;{product.quantity}&#10091; - ${product.price} : {product.name} </label>
                        })}
                    </div>
                    <hr />
                    <div>
                        <label htmlFor="Subtotal">Subtotal:.................................................... ${subtotal}</label>
                    </div>
                    <div>
                        <label htmlFor='Impuestos'>Impuesto (I.V.A):..................................... 13%</label>
                    </div>
                    <div>
                        <label htmlFor="Impuestos">Costo de envío:....................................... ${shippingFee}</label>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="Total"> <b>Total a pagar:........................................ ${total}</b></label>
                    </div>
                </div>
            </div>
        </div>
    );
};
