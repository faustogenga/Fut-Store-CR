import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Row, Table} from 'react-bootstrap';
import { BsCartCheck, BsCartX} from 'react-icons/bs';
import Swal from 'sweetalert2';
import { collectionAssignation, onFindbyEmail } from '../CRUD/app';
import { auth } from '../CRUD/firebase_conection';


export const Orders = ({user}) => {
const [orders, setOrders] = useState([])
const userEmail = auth.currentUser ? auth.currentUser.email : '';

const fetchOrders = async () => {
    try {
        const result = await onFindbyEmail(userEmail);
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
    useEffect(() => {
        collectionAssignation('OrderPlaced');
        fetchOrders();
    }, [user.email]); 

const hideOrder = async (index, order_id) => {

}


  return (
    <>
    <Container className="py-4 mt-5">
        <div style={{textAlign:'center', fontWeight:'bold', fontSize:'2rem', paddingBottom:'5px'}}>Tus Pedidos</div>
        <br /><br />
            <Row className="justify-content-center">
                <Table responsive="sm"  className="mb-5">
                    <thead>
                        <tr style={{fontSize: '20px'}}>
                            <th className='text-center'>Imagen</th>
                            <th>Número de Pedido</th>
                            <th>Nombre del Producto</th>
                            <th className='text-center'>Precio</th>
                            <th className='text-center'>Fecha y Hora del Pedido</th>
                            <th className='text-center'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item, index)=>{
                            return(
                                <tr key={index} style={{fontSize:'18px'}}>
                                    <td className='text-center'>
                                        <div style={{ background: 'white', height: '8rem', overflow: 'hidden', display: 'flex',
                                        justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ padding: '.5rem'}}>
                                                <img src={item.product_img} style={{ width: '10rem'}} alt={item.product_img} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center'>
                                        <h6 style={{ whiteSpace: 'nowrap', width: '5rem', overflow: 'hidden', textOverFlow: 'ellipsis', fontSize:'18px'}}>
                                            {item.orderId}
                                        </h6>
                                    </td>
                                    <td>
                                        <h6 style={{ whiteSpace: 'nowrap', width: '10rem', overflow: 'hidden', textOverFlow: 'ellipsis', fontSize:'18px'}} className='text-center'>
                                            {item.name}
                                        </h6>
                                    </td>
                                    <td className='text-center'>₡ {item.price}</td>
                                    <td className='text-center'> {item.orderDate} {item.orderTime}</td>
                                    <td className='text-center'>
                                        <Button variant="danger" className="ms-2" onClick={() => hideOrder(index, item.order_id)}>Ocultar Pedido</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                    <Row 
                        style={{ position: 'inherit', bottom: 0}}
                        className={`justify-content-center w-100`}
                    >
                    </Row>
            </Row>
        </Container>
    </>
  )
}
