import React, { useState, useEffect } from 'react';
import '../CSS/Orders.css';
import { Button, Container, Row, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { collectionAssignation, onFindOrderById, onFindbyEmail } from '../CRUD/app';

export const Orders = ({ user }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user && user.email) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            collectionAssignation('OrderPlaced');
            const result = await onFindbyEmail(user.email);
            if (result) {
                const orderData = result.map((doc) => doc.data());
                setOrders(orderData);
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
    }
    const showOrderDetails = async (orderId) => {
        try {
            collectionAssignation('OrderPlaced');
            console.log(orderId);
            const result = await onFindOrderById(orderId);
            if (!result.empty) {
                console.log(result);
                const orderDetails = result
                const swalContent = `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="font-weight: bold;">Tu pedido incluye:</h4> 
                            ${orderDetails.map((product, index) => `
                                <div key=${index} style="display: flex; align-items: center;">
                                    <img src="${product.data().product_img}" style="width: 12rem; height: 12rem; margin-right: 2rem; margin-left: 2rem;"/>
                                    <div>
                                        <div style="font-weight: bold;">Nombre del producto:</div>
                                        <div>${product.data().name}</div>
                                        <div style="font-weight: bold;">Cantidad: ${product.data().quantity}</div>
                                        <div style="font-weight: bold;">Precio: $${product.data().price}</div>
                                        
                                    </div>
                                </div> <br />
                            `).join('')}
                            <div style="align-items: center;" >
                            <h4 style="font-weight: bold;">Información general de tu pedido:</h4>
                                <div>Número de pedido: ${orderDetails[0].data().orderId}</div> <br />
                                <div>Estado: ${orderDetails[0].data().status}</div> <br />
                                <div>Informacion de Envio:</div>
                                <div>${orderDetails[0].data().shippingInfo}</div> <br />
                                <div>Vendedor: ${orderDetails[0].data().vendor}</div> <br />
                                <div>Pedido realizado el: ${orderDetails[0].data().orderDate} ${orderDetails[0].data().orderTime}</div> <br />
                                <div>Pais: ${orderDetails[0].data().shippingCountry}</div> <br />
                                <div>Provincia: ${orderDetails[0].data().shippingEstate} / Ciudad: ${orderDetails[0].data().shippingTown}</div> <br />
                                <div>Direccion:</div> 
                                <div>${orderDetails[0].data().shippingDireccion}</div> <br />
                                <div>Método de pago: ${orderDetails[0].data().paymentMethod}</div> <br />
                            </div>    
                        </div>
                    </div>
                 </div>
            `;
                Swal.fire({
                    title: 'Detalles de tu pedido',
                    html: swalContent,
                    showConfirmButton: true,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Confirmar',
                    showCloseButton: true,
                });
            } else {
                console.log("No se encontró la orden con el ID proporcionado o no hay productos.");
            }
        } catch (error) {
            Swal.fire({
                title: "Error al mostrar los detalles de tu pedido.",
                text: error.message,
                icon: "error"
            });
        }
    }
    return (
        <div className='mainOrders'>
            <Container className="py-4">
                <div className='container-div'>
                    <div className='text-center'>
                        <h1 className='titleOrders'>Mis Pedidos</h1>
                    </div>
                </div>
                <Row className="justify-content-center">
                    <Table responsive="sm" className='table table-bordered border-primary align-middle table-info table-sm'>
                        <thead style={{ position: 'sticky', top: '0' }}>
                            <tr style={{ fontSize: '22px', fontFamily: 'Times New Roman' }}>
                                <th className='text-center'>Imagen</th>
                                <th className='text-center'>Número de Pedido</th>
                                <th className='text-center'>Cantidad</th>
                                <th className='text-center'>Nombre del Producto</th>
                                <th className='text-center'>Precio</th>
                                <th className='text-center'>Fecha y Hora del Pedido</th>
                                <th className='text-center'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) => {
                                return (
                                    <tr key={index} style={{ fontSize: '18px'}}>
                                        <td className='text-center'>
                                            <div style={{
                                                background: 'white', height: '8rem', overflow: 'hidden', display: 'flex',
                                                justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <div style={{ padding: '.5rem' }}>
                                                    <img src={item.product_img} style={{ width: '7rem' }} alt={item.product_img} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center'>
                                            <h6 style={{ whiteSpace: 'nowrap', width: '10rem', overflow: 'hidden', textOverFlow: 'ellipsis', fontSize: '18px' }}>
                                                {item.orderId}
                                            </h6>
                                        </td>
                                        <td className='text-center'>
                                            <h6 style={{ whiteSpace: 'nowrap', width: '10rem', overflow: 'hidden', textOverFlow: 'ellipsis', fontSize: '18px' }}>
                                                {item.quantity}
                                            </h6>
                                        </td>
                                        <td>
                                            <h6 style={{ width: '15rem', fontSize: '18px', marginLeft: '35px' }} className='text-center'>
                                                {item.name}
                                            </h6>
                                        </td>
                                        <td className='text-center'>$ {item.price}</td>
                                        <td className='text-center'> {item.orderDate} {item.orderTime}</td>
                                        <td className='text-center'>
                                            <Button className="btn btn-info" onClick={() => showOrderDetails(item.orderId)}>Ver más detalles</Button>
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
                    </Row>
                </Row>
            </Container>
        </div>
    )
};