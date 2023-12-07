import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useSelector } from "react-redux";

const CreateCustomer = ({ load, setLoad }) => {
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.auth.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        crear nuevo
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {" "}
        <Formik
          initialValues={{
            name: "",
            email: "",
            adress: "",
            phone: "",
            idUser: user.id
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Este campo es obligatorio"),
            email: Yup.string()
              .required("Este campo es obligatorio")
              .email("Direccion de correo invalida"),
            adress: Yup.string().required("Este campo es obligatorio"),
            phone: Yup.string().required("Este campo es obligatorio"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}api/customer/guardar-cliente`, values);
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
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogTitle id="alert-dialog-title">
                {"Crear nuevo usuario"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="name"
                    name="name"
                    label="Nombre"
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

                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="adress"
                    name="adress"
                    label="Direccion"
                    onChange={handleChange}
                    value={values.adress}
                    error={errors.adress}
                    helperText={errors.adress}
                  />

                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Nro. celular"
                    onChange={handleChange}
                    value={values.phone}
                    error={errors.phone}
                    helperText={errors.phone}
                  />

                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Crear</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default CreateCustomer;