import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { collectionAssignation, onFindAll } from '../CRUD/app';
import { useState } from 'react';
import { Edit } from './Edit';



export const BasicTable = () => {

    const [products, setproducts] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            collectionAssignation('Products');
            const docsSnapshot = await onFindAll();
            const filterData = docsSnapshot.docs.map((doc, index) => (
                {
                    key: index,
                    id: doc.id,
                    ...doc.data(),
    
                }
            ));
            setproducts(filterData);
            console.log(products);
        }
        fetchdata();
    }, []);


    return (
        <div className='container-fluid justify-content-center d-flex'>
            <TableContainer component={Paper} style={{width: '80%'}} className='m-5 ' >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell align="right">Categoria</TableCell>
                            <TableCell align="right">Descripcion</TableCell>
                            <TableCell align="right">Precio</TableCell>
                            <TableCell align="right">Talla</TableCell>
                            <TableCell align="right">Cantidad</TableCell>
                            <TableCell align="right"></TableCell>
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
                                <TableCell align="right">{row.category}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">$ {row.price}</TableCell>
                                <TableCell align="right">{row.size}</TableCell>
                                <TableCell align="right">{row.stock}</TableCell>
                                <TableCell align="right"><Edit item={row}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
