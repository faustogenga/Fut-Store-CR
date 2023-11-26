import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Row, Table} from 'react-bootstrap';
import { BsCartCheck, BsCartX} from 'react-icons/bs';
import { collectionAssignation, onFindinCart } from '../CRUD/app';
import { auth } from '../CRUD/firebase_conection';
import Swal from 'sweetalert2';
 
export const Cart = ({ user, loggedIn, logOut, isVendor }) => {

  const [products, setProducts] = useState([]);
  
  const fetchProducts = async () => {  
        try {
        const result = await onFindinCart(user.email);
        if (result) {
            const productsData = result.map((doc) => doc.data());
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

    useEffect(() => {
        collectionAssignation('CustomerCart');
        fetchProducts();
    }, [user.email]); 


    let cartTotal = 0;
    products.forEach((item) =>{
        const uPrice = parseInt(item.price);
        cartTotal += uPrice;
    });

    const quantityIncrease = (index) =>  {
        const updatedQuantity = [...products];
        updatedQuantity[index].quantity++;
        updatedQuantity[index].price = updatedQuantity[index].price * updatedQuantity[index].quantity / (updatedQuantity[index].quantity - 1);
        setProducts(updatedQuantity);

        let total = 0;
        updatedQuantity.forEach((item) =>{
            total += item.price * item.quantity;
        });
        cartTotal = total;
    }
    
  return (
    <>
    <h1>Cart</h1>
    <Container className="py-4 mt-5">
            <Row className="justify-content-center">
                <Table responsive="sm"  className="mb-5">
                    <tbody>
                        {products.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <td>
                                        <div style={{ background: 'white', height: '8rem', overflow: 'hidden', display: 'flex',
                                        justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ padding: '.5rem'}}>
                                                <img src={item.image} style={{ width: '4rem'}} alt={item.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h6 style={{ whiteSpace: 'nowrap', width: '14rem', overflow: 'hidden', textOverFlow: 'ellipsis'}}>
                                            {item.name}
                                        </h6>
                                    </td>
                                    <td>₡ {item.price}</td>
                                    <td>Quantity ({item.quantity})</td>
                                    <td>
                                        <Button className="ms-2">-</Button>
                                        <Button className="ms-2" onClick={quantityIncrease}>+</Button>
                                        <Button className="ms-2">Remove Item</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                
                    <Row 
                        style={{ position: 'fixed', bottom: 0}}
                        className={`justify-content-center w-100`}
                    >
                        <Col className="py-2">
                            <h4>Total Price: ₡ {cartTotal}</h4>
                        </Col>
                        <Col className="p-0" md={4}>
                            <Button variant="danger"
                                className="m-2"
                                
                            >
                                <BsCartX size="1.7rem" />
                                Clear Cart
                            </Button>
                            <Button variant="success"
                                className="m-2"
                            >
                                <BsCartCheck size="1.7rem" />
                                Clear Cart
                            </Button>
                        </Col>
                    </Row>
            </Row>
        </Container>
    </>
  )
}
