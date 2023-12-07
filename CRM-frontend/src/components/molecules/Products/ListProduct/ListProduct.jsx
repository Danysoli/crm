import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { numberFormat } from '@lib/numberFormat';

const ListProduct = ({load, setIdUpdate, setIdDelete}) => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/product/consultar-producto`);
            console.log(response);
            setRows(response.data.products);
        }
        fetchData();
    }, [load])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleUpdate = async (id) => {
        setIdUpdate(id);
    }
    
    const handleDelete = async (id) => {
        setIdDelete(id);
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripcion</TableCell>
                            <TableCell>Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>{numberFormat(row.price)}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary" aria-label="editar" onClick={() => {handleUpdate(row.id)}}> 
                                                    <EditIcon /> 
                                                </IconButton>    
                                                <IconButton color="primary" aria-label="eliminar" onClick={() => {handleDelete(row.id)}}> 
                                                    <DeleteIcon /> 
                                                </IconButton>    
                                            </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
export default ListProduct;