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



export const BasicTable = ({user}) => {
    const [products, setproducts] = useState([]);


    const fetchData = async (email) => {
        collectionAssignation('Products');
        const docsSnapshot = await onFindAll();
        let filterData = docsSnapshot.docs.map((doc, index) => (
            {
                key: index,
                id: doc.id,
                ...doc.data(),
            }
        ));

        if(user.email !== 'admin@gmail.com') {
            filterData = filterData.filter(item => item.vendor === email);
        }

        filterData.sort((a, b) => a.name.localeCompare(b.name));
        setproducts(filterData);
    };

    useEffect(() => {
        if (!user) {
            return;
        } else {
            fetchData(user.email);
        }
    },[user]);


    const handleEdit = async (currentId, values) => {
        collectionAssignation('Products');
        await onUpdate(currentId, values);
        fetchData(user.email);
    };

    const handleAdd = async (values) => {
        collectionAssignation('Products');
        await onInsert(values);
        fetchData(user.email);
    }

    const handleDelete = async(currentId) => {
        collectionAssignation('Products');
        await onDelete(currentId);
        fetchData(user.email);
    }

    return (
        <div className='container-fluid justify-content-center d-flex'
            style={{ backgroundImage: "url(https://i.pinimg.com/originals/cb/e8/23/cbe8230004b895b545b61337f8d0ff99.jpg)" }}
        >
            <TableContainer component={Paper} style={{ width: '80%' }} className='m-5 ' >
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
                                <Agregar handleAdd={handleAdd} user={user}/>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row) => (
                            <TableRow
                                key={row.id}  // Assuming each product has a unique id
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
                                    <Edit user={user} item={row} currentId={row.id} handleEdit={handleEdit}/>
                                </TableCell>
                                <TableCell align="right">
                                    <Delete currentId={row.id} handleDelete={handleDelete} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
