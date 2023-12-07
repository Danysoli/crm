import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { numberFormat } from '@lib/numberFormat';

const UpdateProduct = ({ idUpdate, load, setLoad }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultProductById = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_URL_SERVER}api/product/consultar-producto/${id}`
    );
    setFormData(response.data.product);
  };

  useEffect(() => {
    if (idUpdate) {
        consultProductById(idUpdate);
    }
    setOpen(idUpdate ? true : false);
  }, [idUpdate]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {" "}
        <Formik
          enableReinitialize
          initialValues={{
            id: idUpdate,
            name: formData.name || "",
            description: formData.description || "",
            price: formData.price|| "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Este campo es obligatorio"),
            description: Yup.string().required("Este campo es obligatorio"),
            price: Yup.string().required("Este campo es obligatorio"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const response = await axios.put(
              `${import.meta.env.VITE_URL_SERVER}api/product/actualizar-producto`,
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
                {"Editar usuario"}
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
                    type="number"
                    id="price"
                    name="price"
                    label="Precio en $"
                    onChange={handleChange}
                    value={values.price}
                    error={errors.price}
                    helperText={errors.price}
                  />

                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Actualizar</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default UpdateProduct;
