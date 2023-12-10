import React, { useState, useEffect } from 'react';
import '../CSS/Cart.css';
import { Button, Container, Col, Row, Table } from 'react-bootstrap';
import { BsCartCheck, BsCartX } from 'react-icons/bs';
import { collectionAssignation, onFindbyEmail, onDeleteFromCart, onClearCart } from '../CRUD/app';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export let cart;

export const Cart = ({ user }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (user && user.email) {
            fetchProducts();
        }
    }, [user]);


    const fetchProducts = async () => {
        try {            
            collectionAssignation('CustomerCart');
            const result = await onFindbyEmail(user.email);
            if (result) {
                const productsData = result.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
            }));
                setProducts(productsData);
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

    let cartTotal = 0;
    products.forEach((item) => {
        const uPrice = parseInt(item.price);
        cartTotal += uPrice;
    });

    const updateCartItemQuantity = (index, increase) => {
        const updatedQuantity = [...products];
        const productStock = parseInt(products[index].stock);

        if ((updatedQuantity[index].quantity === 1 && !increase) || (updatedQuantity[index].quantity === productStock && increase)) {
            return;
        }
        if (increase) {
            updatedQuantity[index].quantity++;
        } else if (updatedQuantity[index].quantity > 1) {
            updatedQuantity[index].quantity--;
        }
        updatedQuantity[index].price =
            (updatedQuantity[index].price * updatedQuantity[index].quantity) /
            (updatedQuantity[index].quantity + (increase ? -1 : 1));

        setProducts(updatedQuantity);

        let total = 0;

        updatedQuantity.forEach((item) => {
            total += item.price * item.quantity;
        });
        cartTotal = total;
        if (cartTotal < 0) {
            cartTotal = 0;
        }
        return cartTotal;
    };


    const removeItem = async (index, paramId) => {
        try {
            console.log(paramId);
            await onDeleteFromCart('CustomerCart', paramId);
            const updatedCart = [...products];
            updatedCart.splice(index, 1);
            setProducts(updatedCart);
            Swal.fire({
                title: "Producto Eliminado",
                text: "Eliminaste este producto de tu carrito",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Error al eliminar el producto del carrito.",
                text: error.message,
                icon: "error"
            });
        }
    };

    const clearCart = async () => {
        try {
            await onClearCart('CustomerCart', user.email);
            setProducts([]);
            Swal.fire({
                title: "Su carrito ahora esta vacío.",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Error al limpiar el carrito.",
                text: error.message,
                icon: "error"
            });
        }
    };

    const proceedToPayment = async () => {
        try {
            console.log(products);
            if(products.length > 0) {
                cart = [...products];
                console.log(cart);
                navigate('/Checkout');
            } else {
                Swal.fire({
                    title: "Carrito Vacio",
                    text: "Porfavor agrega productos al carrito",
                    icon: "error"
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Error al proceder al pago.",
                text: error.message,
                icon: "error"
            });
        }
    }

    return (
        <div className='mainCart'>
            <Container className="py-4">
                <div className='col-12 d-flex justify-content-center'>
                    <h4 className='col-2 text-center bg-white rounded-2 p-1'>Mi Carrito 🛒</h4>
                </div>
                    <Table responsive="sm" className='table align-middle opacity-80'>
                        <thead>
                            <tr style={{ fontSize: '20px' }}>
                                <th className='text-center'>Imagen</th>
                                <th className='text-center'>Nombre del Producto</th>
                                <th className='text-center'>Precio</th>
                                <th className='text-center'>Cantidad</th>
                                <th className='text-center'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item, index) => {
                                return (
                                    <tr key={index} >
                                        <td>
                                            <div style={{
                                                background: 'white', height: '7rem', overflow: 'hidden', display: 'flex',
                                                justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <div style={{ padding: '.5rem' }}>
                                                    <img src={item.image} style={{ width: '7rem' }} alt={item.name} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center'>
                                            <h6 style={{ width: '12rem', marginLeft: '150px', fontSize: '20px' }}>
                                                {item.name}
                                            </h6>
                                        </td>
                                        <td className='text-center' style={{ fontSize: '18px' }}>$ {item.price}</td>
                                        <td className='text-center' style={{ fontSize: '18px' }}>{item.quantity}</td>
                                        <td className='text-center'>
                                            <Button className="btn-info ms-2" onClick={() => updateCartItemQuantity(index, false)}>-</Button>
                                            <Button className="btn-success ms-2" onClick={() => updateCartItemQuantity(index, true)}>+</Button>
                                            <Button variant="danger" className="ms-2" onClick={() => removeItem(index, item.id)}>Eliminar Producto</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    <Row
                        style={{ position: 'inherit', bottom: 0 }}
                        className={`justify-content-center w-100`}
                    >
                        <Col className="py-2">
                            <div style={{ width: '200px' }}>
                                <h4 className='bg-white p-1 rounded-2 text-black'>Total: $ {cartTotal}</h4>
                            </div>
                        </Col>
                        <Col className="p-0" md={4}>
                            <Button variant="warning"
                                className="m-2"
                                onClick={clearCart}
                            >
                                <BsCartX size="1.7rem" />
                                Limpiar Carrito
                            </Button>
                            <Button variant="success"
                                className="m-2"
                                onClick={proceedToPayment}
                            >
                                <BsCartCheck size="1.7rem" />
                                Proceder al Pago
                            </Button>
                        </Col>
                    </Row>
            </Container>
        </div>
    )
}
