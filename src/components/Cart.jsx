import React, { useState, useEffect } from 'react';
import '../CSS/Cart.css';
import { Button, Container, Col, Row, Table} from 'react-bootstrap';
import { BsCartCheck, BsCartX} from 'react-icons/bs';
import { collectionAssignation, onFindbyEmail, onDeleteFromCart, onClearCart } from '../CRUD/app';
import Swal from 'sweetalert2';
import { auth } from '../CRUD/firebase_conection';
 
export const Cart = ({ user }) => {
  const [products, setProducts] = useState([]);
  const userEmail = auth.currentUser ? auth.currentUser.email : '';
  
  const fetchProducts = async () => {  
    try {
        const result = await onFindbyEmail(userEmail);
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
    <div className='mainCart'>
    <Container className="py-4">
        <div className='container-Div'> 
            <h1 className='titleCart'>Mi Carrito</h1>
        </div>
            <Row className="justify-content-center">
                <Table responsive="sm" className='table table-bordered border-primary align-middle table-success table-sm'>
                    <thead style={{position:'sticky', top:'0'}}>
                        <tr style={{fontSize: '22px', fontFamily:'Times New Roman'}}>
                            <th className='text-center'>Imagen</th>
                            <th className='text-center'>Nombre del Producto</th>
                            <th className='text-center'>Precio</th>
                            <th className='text-center'>Cantidad</th>
                            <th className='text-center'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index)=>{
                            return(
                                <tr key={index} style={{fontFamily:'Times New Roman'}}>
                                    <td>
                                        <div style={{ background: 'white', height: '10rem', overflow: 'hidden', display: 'flex',
                                        justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ padding: '.5rem'}}>
                                                <img src={item.image} style={{ width: '10rem'}} alt={item.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center'>
                                        <h6 style={{ width: '12rem', marginLeft:'150px', fontSize:'20px'}}>
                                            {item.name}
                                        </h6>
                                    </td>
                                    <td className='text-center'style={{fontSize:'18px'}}>₡ {item.price}</td>
                                    <td className='text-center'style={{fontSize:'18px'}}>{item.quantity}</td>
                                    <td className='text-center'>
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
                            <div style={{backgroundColor:'rgba(13,96,76,0.5)', width:'180px'}}>
                            <h4 style={{fontWeight:'bold'}}>Total: ₡ {cartTotal}</h4>
                            </div>
                        </Col>
                        <Col className="p-0" md={4}>
                            <Button variant="warning"
                                className="m-2"
                                style={{fontFamily:'Times New Roman'}}
                                onClick={clearCart}
                            >
                                <BsCartX size="1.7rem" />
                                Limpiar Carrito
                            </Button>
                            <Button variant="success"
                                className="m-2"
                                style={{fontFamily:'Times New Roman'}}
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
    </div>
  )
}
