import { useState } from "react";
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
import SelectCustomer from "./SelectCustomer";
import SelectProduct from "./SelectProduct";



const CreateQuote = ({ Customer, setCustomer, setIdQuote, setOpenProducts, load, setLoad }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpenProducts(false)
    
    setIdQuote(0)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenProducts = () => {
    setOpenProducts(true)
    setOpen(false);
  };

  const handleOpenCustomers = (idQuote) => {
    setIdQuote(idQuote)
  };

  return (
   <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        crear nuevo
      </Button>

      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {" "}
        <Formik
          initialValues={{
            idQuote: ""
          }}
          validationSchema={Yup.object({
            idQuote: Yup.number().required("Este campo es obligatorio"),
            // description: Yup.string().required("Este campo es obligatorio"),
            // price: Yup.string().required("Este campo es obligatorio"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleOpenCustomers(values.idQuote)
            console.log('iiiiiiddddd', values.idQuote)
            setLoad(!load);
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
                {"Crear Cotizacion"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <TextField
                    sx={{ mt: 1 }}
                    fullWidth
                    id="idQuote"
                    name="idQuote"
                    label="Nro. Cotizacion"
                    onChange={handleChange}
                    value={values.idQuote}
                    error={errors.idQuote}
                    helperText={errors.idQuote}
                />
                <Button sx={{ mt: 2 }} type="submit" variant='outlined' >Seleccionar Cliente</Button>
                <p>
                    Cliente: {Customer.name}
                </p>
                </DialogContentText>
              </DialogContent>.
              <DialogActions>
                <Button variant='outlined' onClick={handleClose}>Cancelar</Button>
                <Button variant='outlined' onClick={handleOpenProducts}>Seleccionar Producto </Button>
                
              </DialogActions>
            </form>
          )}
        </Formik>
        </Dialog>
   </div>
  );
};

export default CreateQuote;