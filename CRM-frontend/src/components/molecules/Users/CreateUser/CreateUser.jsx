import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const CreateUser = ({ load, setLoad }) => {
  const [open, setOpen] = useState(false);
  

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
            role: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Este campo es obligatorio"),
            role: Yup.string().required("Este campo es obligatorio"),
            email: Yup.string()
              .required("Este campo es obligatorio")
              .email("Direccion de correo invalida"),
            password: Yup.string()
              .required("Este campo es obligatorio")
              .min(8, "La contraseña debe contener como minimo 8 caracteres"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const response = await axios.post(
              `${import.meta.env.VITE_URL_SERVER}api/user/guardar-usuario`,
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

                  <FormControl sx={{ mx: 1, mt: 1 }} >
                    <FormLabel >Rol</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="radioRole"
                      id="role"
                      name="role"
                      value={values.role}
                      onChange={handleChange}
                      error={errors.role}
                      helperText={errors.role}
                    >
                      <FormControlLabel 
                        value="Administrador"
                        control={<Radio />}
                        label="Administrador"
                      />
                      <FormControlLabel 
                        value="Gestor"
                        control={<Radio />}
                        label="Gestor"
                      />
                    </RadioGroup>
                  </FormControl>

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
                    type="password"
                    id="password"
                    name="password"
                    label="Contraseña"
                    onChange={handleChange}
                    value={values.password}
                    error={errors.password}
                    helperText={errors.password}
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

export default CreateUser;
