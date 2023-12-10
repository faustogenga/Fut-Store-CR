import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { collectionAssignation, onDelete, onFindAll, onInsert, onUpdate } from '../CRUD/app';
import { useState } from 'react';
import { Edit } from './Edit';
import { Delete } from './Delete'
import { Agregar } from './Agregar';
import { AproveVendorBtn } from './AproveVendorBtn';
import { Status } from './Status';



export const BasicTable = ({ user }) => {
    const [products, setproducts] = useState([]);
    const [orders, setorders] = useState([]);


    const fetchDataProducts = async (email) => {
        collectionAssignation('Products');
        const docsSnapshot = await onFindAll();
        let filterData = docsSnapshot.docs.map((doc, index) => (
            {
                key: index,
                id: doc.id,
                ...doc.data(),
            }
        ));

        if (user.email !== 'admin@gmail.com') {
            filterData = filterData.filter(item => item.vendor === email);
        }

        filterData.sort((a, b) => a.name.localeCompare(b.name));
        setproducts(filterData);
    };

    const fetchDataOrders = async (email) => {
        collectionAssignation('OrderPlaced');
        const docsSnapshot = await onFindAll();
        let filterData = docsSnapshot.docs.map((doc, index) => (
            {
                key: index,
                id: doc.id,
                ...doc.data(),
            }
        ));

        if (user.email !== 'admin@gmail.com') {
            filterData = filterData.filter(item => item.vendor === email);
        }

        filterData.sort((a, b) => a.name.localeCompare(b.name));
        setorders(filterData);
    };

    useEffect(() => {
        if (!user) {
            return;
        } else {
            fetchDataProducts(user.email);
            fetchDataOrders(user.email);
            console.log(orders);
        }
    }, [user]);


    const handleEditProduct = async (currentId, values) => {
        collectionAssignation('Products');
        await onUpdate(currentId, values);
        fetchDataProducts(user.email);
    };

    const handleEditOrder = async (currentId, estado) => {
        collectionAssignation('OrderPlaced');
        await onUpdate(currentId, {status : estado });
        fetchDataOrders(user.email);
    };

    const handleAdd = async (values) => {
        collectionAssignation('Products');
        await onInsert(values);
        fetchDataProducts(user.email);
    }

    const handleDeleteProduct = async (currentId) => {
        collectionAssignation('Products');
        await onDelete(currentId);
        fetchDataProducts(user.email);
    }

    const handleDeleteOrder = async (currentId) => {
        collectionAssignation('OrderPlaced');
        await onDelete(currentId);
        fetchDataOrders(user.email);
    }


    return (
        <div style={{
            backgroundImage: "url(https://i.pinimg.com/originals/cb/e8/23/cbe8230004b895b545b61337f8d0ff99.jpg)",
            backgroundSize: "cover"
        }}>
            {user && user.email === "admin@gmail.com" && (
                <div className='container-fluid justify-content-center d-flex'>
                    <AproveVendorBtn user={user} />
                </div>
            )
            }
            {/*Tabla productos */}
            <div className='container-fluid justify-content-center d-flex'>
                <TableContainer component={Paper} style={{ width: '80%' }} className='m-4' >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bolder" }} >Producto</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Categoria</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Descripcion</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Precio</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Talla</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Cantidad</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="center" className='bg-light'>
                                    <Agregar handleAdd={handleAdd} user={user} />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((row) => (
                                <TableRow
                                    key={row.id}  // Assuming each product id
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell className="p-0" align="left">{row.category}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">$ {row.price}</TableCell>
                                    <TableCell align="right">{row.size}</TableCell>
                                    <TableCell align="right">{row.stock}</TableCell>
                                    <TableCell align="right">
                                        <Edit user={user} item={row} currentId={row.id} handleEdit={handleEditProduct} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Delete currentId={row.id} handleDelete={handleDeleteProduct} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {/*Tabla ordenes*/}
            <div className='container-fluid justify-content-center d-flex'>
                <TableContainer component={Paper} style={{ width: '80%' }} className='m-4' >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right" style={{ fontWeight: "bolder" }} >#Orden</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Producto</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Imagen</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Fecha</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>MetodoPago</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Cantidad</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Direccion</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Usuario</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Total</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Estatus</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.orderId}
                                    </TableCell>
                                    <TableCell className="p-0" align="left">{row.name}</TableCell>
                                    <TableCell className="p-0" align="center">
                                        <img src={row.product_img} alt="Product" width="60"/>
                                    </TableCell>
                                    <TableCell align="center">{row.orderDate} {row.orderTime}</TableCell>
                                    <TableCell align="right">{row.paymentMethod}</TableCell>
                                    <TableCell align="right">{row.quantity}</TableCell>
                                    <TableCell align="right">{row.shippingTown}</TableCell>
                                    <TableCell align="right">{row.userEmail}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">
                                        <Status user={user} item={row} currentId={row.id} handleEdit={handleEditOrder} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Delete currentId={row.id} handleDelete={handleDeleteOrder} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
