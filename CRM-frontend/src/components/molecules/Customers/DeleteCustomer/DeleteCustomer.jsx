import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2'

const DeleteCustomer = ({idDelete, load, setLoad}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        const response = await axios.delete(`${import.meta.env.VITE_URL_SERVER}api/customer/eliminar-cliente/${idDelete}`);
        console.log(response.data.msg)
        Swal.fire(response.data.msg);
        setLoad(!load);
        setOpen(false);
    };

    useEffect(() => {
        setOpen(idDelete ? true : false);
    }, [idDelete])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Esta seguro de eliminar este cliente?"}
            </DialogTitle>
            <DialogActions>
                <Button type='submit' variant='contained' onClick={handleClose}>
                    No
                </Button>
                <Button type='submit' variant='contained' color='error' onClick={handleDelete}>
                    Si
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteCustomer;