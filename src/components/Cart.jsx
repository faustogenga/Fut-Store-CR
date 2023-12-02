import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Row, Table} from 'react-bootstrap';
import { BsCartCheck, BsCartX} from 'react-icons/bs';
import { collectionAssignation, onFindinCart, onDeleteFromCart, onClearCart } from '../CRUD/app';
import Swal from 'sweetalert2';
import { auth } from '../CRUD/firebase_conection';
 
export const Cart = ({ user }) => {
  const [products, setProducts] = useState([]);
  const userEmail = auth.currentUser ? auth.currentUser.email : '';

  
  const fetchProducts = async () => {  
        try {
        const result = await onFindinCart(auth.currentUser ? auth.currentUser.email : '');
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

    const quantityDecrease = (index) => {
        const updatedQuantity = [...products];
        if (updatedQuantity[index].quantity > 1) {
            updatedQuantity[index].quantity--;
            updatedQuantity[index].price = updatedQuantity[index].price * updatedQuantity[index].quantity / (updatedQuantity[index].quantity + 1);
            setProducts(updatedQuantity);
        
            let total = 0;
            updatedQuantity.forEach((item) => {
                total += item.price * item.quantity; 
            });
            cartTotal = total;
        }
    };

     const removeItem  = async (index, product_id) => {
        try {
            await onDeleteFromCart('CustomerCart', product_id, userEmail);   
            const updatedCart = [...products];
            updatedCart.splice(index, 1);
            setProducts(updatedCart);
        } catch(error) {
            Swal.fire({
                title: "Error al eliminar el producto del carrito.",
                text: error.message,
                icon: "error"
            });
        }
    }; 

    const clearCart = async () => {
        try {
            await onClearCart('CustomerCart', userEmail);
            setProducts([]);   
            Swal.fire({
                title: "Su carrito se encuentra vacío.",
                icon: "success"
            });
        } catch(error) {
            Swal.fire({
                title: "Error al limpiar el carrito.",
                text: error.message,
                icon: "error"
            });
        }
    }
    const proceedToPayment = async () =>{
        await clearCart();
    }

  return (
    <>
    <Container className="py-4 mt-5">
        <div style={{textAlign:'center', fontWeight:'bold', fontSize:'2rem', paddingBottom:'5px'}}>Mi Carrito</div>
        <br /><br />
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
                                    <td>Cantidad ({item.quantity})</td>
                                    <td>
                                        <Button className="ms-2" onClick={() => quantityDecrease(index)}>-</Button>
                                        <Button className="ms-2" onClick={() => quantityIncrease(index)}>+</Button>
                                        <Button variant="danger" className="ms-2" onClick={() => removeItem(index, item.product_id)}>Eliminar Producto</Button>
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
                        <Col className="py-2">
                            <h4>Total: ₡ {cartTotal}</h4>
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
                                href='/Checkout'
                                onClick={proceedToPayment}
                            >
                                <BsCartCheck size="1.7rem" />
                                Proceder al Pago
                            </Button>
                        </Col>
                    </Row>
            </Row>
        </Container>
    </>
  )
}
