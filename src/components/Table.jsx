import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { BarChart } from '@mui/x-charts/BarChart';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Swal from 'sweetalert2';
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

    //pagenavigation

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
        }
    }, [user]);


    const handleEditProduct = async (currentId, values) => {
        collectionAssignation('Products');
        await onUpdate(currentId, values);
        fetchDataProducts(user.email);
    };

    const handleEditOrder = async (currentId, estado, infoEnvio) => {
        collectionAssignation('OrderPlaced');
        await onUpdate(currentId,
            {
                status: estado,
                shippingInfo: infoEnvio,
            });
        fetchDataOrders(user.email);
    };

    const openShippingInfo = (obj) => {
        const swalContent =
            ` 
        <div style="font-weight: bold;">Orden :</div> 
        <div>${obj.orderId}</div>
        <div>${obj.name}</div> <br />
        <div style="font-weight: bold;">País :</div> 
        <div>${obj.shippingCountry}</div> <br />
        <div style="font-weight: bold;">Provincia :</div> 
        <div>${obj.shippingEstate}</div> <br />
        <div style="font-weight: bold;">Ciudad :</div> 
        <div>${obj.shippingTown}</div> <br />
        <div style="font-weight: bold;">Dirección :</div> 
        <div>${obj.shippingDireccion}</div> <br />
        `;
        Swal.fire({
            title: 'Detalles de Envío',
            html: swalContent,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Listo',
            showCloseButton: true,
        });
    }

    const openShippingStatus = (obj) => {
        const swalContent =
            ` 
        <div style="font-weight: bold;">Orden :</div> 
        <div>${obj.orderId}</div>
        <div>${obj.name}</div> <br />
        <div style="font-weight: bold;">Estado : ${obj.status}</div> <br/>
        <div style="font-weight: bold;">Información :</div> 
        <div>${obj.shippingInfo}</div> <br />
        `;
        Swal.fire({
            title: 'Estado de Envío',
            html: swalContent,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Listo',
            showCloseButton: true,
        });
    }

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0); 
    };

    console.log(orders);
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
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Categoría</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }}>Descripción</TableCell>
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
                            {products?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
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
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={products?.length} // Use the actual total count of orders
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </div>
            {/*Tabla ordenes*/}
            <div className='container-fluid justify-content-center d-flex'>
                <TableContainer component={Paper} style={{ width: '85%' }} className='m-4' >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ fontWeight: "bolder" }} >#Orden</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bolder" }}>Producto</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bolder" }}>Imagen</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bolder" }}>Fecha</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bolder" }}>MétodoPago</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bolder" }} className='p-0'>Cantidad</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bolder" }}>Dirección</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bolder" }}>Usuario</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bolder" }}>Total</TableCell>
                                <TableCell align="right" style={{ fontWeight: "bolder" }} >Estatus</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.orderId}
                                        </TableCell>
                                        <TableCell className="p-0" align="left">{row.name}</TableCell>
                                        <TableCell className="p-0" align="center">
                                            <img src={row.product_img} alt="Product" width="60" />
                                        </TableCell>
                                        <TableCell align="center">{row.orderDate} {row.orderTime}</TableCell>
                                        <TableCell align="right">{row.paymentMethod}</TableCell>
                                        <TableCell align="center" className='p-0'>{row.quantity}</TableCell>
                                        <TableCell align="center" colSpan={1} className='p-0'>
                                            <button type="button" className="btn btn-link p-0" onClick={() => openShippingInfo(row)}>{row.shippingTown}</button>
                                        </TableCell>
                                        <TableCell align="right">{row.userEmail}</TableCell>
                                        <TableCell align="right">{row.price}</TableCell>
                                        <TableCell align="center" colSpan={2} className='p-0'>
                                            <button type="button" className="btn btn-link p-0" onClick={() => openShippingStatus(row)}>{row.status}</button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Status user={user} item={row} currentId={row.id} handleEdit={handleEditOrder} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Delete currentId={row.id} handleDelete={handleDeleteOrder} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={orders?.length} // Use the actual total count of orders
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </div>
            <div className='container-fluid justify-content-center d-flex'>
                <div className='bg-white rounded m-3'>
                    <h5 className='text-center'>Ventas</h5>
                    <BarChart
                        xAxis={[
                            {
                                label: 'Ordenes',
                                data: orders.length > 0 ? orders.map(order => order.orderId) : [0],
                                scaleType: 'band',
                            },
                        ]}
                        yAxis={[
                            {
                                label: 'USD',
                            },
                        ]}
                        series={[
                            {
                                data: orders.length > 0 ? orders.map(order =>
                                    orders.filter(o => o.orderId === order.orderId).reduce((sum, o) => sum + parseInt(o.price), 0)
                                ) : [0],
                                color: '#34d5eb',
                            },
                        ]}
                        width={500}
                        height={300}
                    />
                </div>
            </div>
        </div>
    );
}
