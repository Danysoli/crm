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

const UpdateCustomer = ({ idUpdate, load, setLoad }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultCustomerById = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_URL_SERVER}api/customer/consultar-cliente/${id}`
    );
    console.log(response.data.customer);
    setFormData(response.data.customer);
  };

  useEffect(() => {
    if (idUpdate) {
      consultCustomerById(idUpdate);
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
            email: formData.email || "",
            adress: formData.adress || "",
            phone: formData.phone || "",
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
            const response = await axios.put(
              `${import.meta.env.VITE_URL_SERVER}api/customer/actualizar-cliente`,
              values
            );
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
                <Button type="submit">Actualizar</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default UpdateCustomer;
