import React, { useEffect, useState } from 'react';
import { Button, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik } from "formik";
import axios from 'axios';
import * as Yup from 'yup'

const UpdateUser = ({idUpdate, load, setLoad}) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const consultUserById = async (id) => {
        const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/user/consultar-usuario/${id}`)
        setFormData(response.data.user);
    }

    useEffect(() => {
        if(idUpdate) {
            consultUserById(idUpdate);
        }
        setOpen(idUpdate ? true : false);
    }, [idUpdate])

    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >   <Formik
                enableReinitialize
                initialValues={{
                    id: idUpdate,
                    name: formData.name || '',
                    email: formData.email || '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Este campo es obligatorio'),
                    email: Yup.string()
                        .required('Este campo es obligatorio')
                        .email('Direccion de correo invalida'),
                })}

                onSubmit={async(values, { setSubmitting }) => {
                    const response = await axios.put(`${import.meta.env.VITE_URL_SERVER}api/user/actualizar-usuario`, values); 
                    console.log(response);
                    setLoad(!load);
                    setOpen(false);
                }}
            >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogTitle id="alert-dialog-title">
                                {"Editar usuario"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <TextField
                                        sx={{ mt: 1 }}
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="Nombres"
                                        onChange={handleChange}
                                        value={values.name}
                                        error={errors.name}
                                        helperText={errors.name}
                                    />

                                    <TextField
                                        sx={{ mt: 1 }}
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email"
                                        onChange={handleChange}
                                        value={values.email}
                                        error={errors.email}
                                        helperText={errors.email}
                                    />

                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>
                                    Cancelar
                                </Button>
                                <Button type='submit'>
                                    Actualizar
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </Dialog>
        </div >
    )
}

export default UpdateUser;