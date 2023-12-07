import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import axios from "axios";
import { numberFormat } from "@lib/numberFormat";

const SelectProduct = ({ idQuote, Customer, openProducts, load, setLoad }) => {
  const [rows, setRows] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.auth.user);


  const fetchData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_URL_SERVER}api/product/consultar-producto`
    );
    console.log(response);
    setRows(response.data.products);
  };

  useEffect(() => {
    if (openProducts == true) {
      fetchData();
      setOpen(true);
    }
    
  }, [openProducts]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Selecciona el producto</DialogTitle>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{numberFormat(row.price)}</TableCell>
                    <TableCell>
                      <Formik
                        initialValues={{
                          idQuote: idQuote,
                          idUser: user.id,
                          idCustomer: Customer.id,
                          idProduct: row.id,
                          quantity: "",
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                          const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}api/quote/guardar-cotizacion`, values);
                          
                          console.log('funcionaaa', values);
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
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <TextField
                              sx={{ mt: 1 }}
                              fullWidth
                              id="quantity"
                              name="quantity"
                              onChange={handleChange}
                              value={values.quantity}
                              error={errors.quantity}
                              helperText={errors.quantity}
                            />
                            <DialogActions>
                      <Button type="submit" >Añadir</Button>
                      </DialogActions>
                          </form>
                        )}
                      </Formik>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button >Listo!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SelectProduct;
