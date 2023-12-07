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



const CreateProduct = ({ load, setLoad }) => {
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
            description: "",
            price: "",
            idUser: user.id
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Este campo es obligatorio"),
            description: Yup.string().required("Este campo es obligatorio"),
            price: Yup.string().required("Este campo es obligatorio"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const response = await axios.post(
              `${import.meta.env.VITE_URL_SERVER}api/product/guardar-producto`,
              values
            );
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
                    id="description"
                    name="description"
                    label="Descripcion"
                    onChange={handleChange}
                    value={values.description}
                    error={errors.description}
                    helperText={errors.description}
                  />

                  <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="price"
                    name="price"
                    label="Precio"
                    onChange={handleChange}
                    value={values.price}
                    error={errors.price}
                    helperText={errors.price}
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

export default CreateProduct;