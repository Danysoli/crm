import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
} from '@mui/material';
import { numberFormat } from '@lib/numberFormat';
import axios from "axios";
import { Formik, Field, Form } from "formik";

const ListQuote = ({cotizaciones, setCotizaciones , load, setLoad}) => {
  const [cotizacion, setCotizacion] = useState(null);
  
  
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);
  setLoad(!load);
  useEffect(() => {
    handleTransformed(cotizaciones)
}, [load])

  const handleTransformed = async (cot) => {
    console.log(cot)
    const transformedData = await cot.quotes.map(quote => ({ 
      idQuote: quote.idQuote.toString(),
      products: [{
        name: quote.Product.name.toLowerCase(),
        quantity: quote.quantity,
        price: parseInt(quote.Product.price)
      }],
      customer: quote.Customer.name,
      user: quote.User.name,
      discount: quote.discount
    }));
    
    const result = transformedData.reduce((acc, curr) => {
      const existingQuote = acc.find(q => q.idQuote === curr.idQuote);
      if (existingQuote) {
        existingQuote.products.push(...curr.products);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
    setCotizacion(result[0])
  };
  

    const handleDialogOpen = () => {
      setDialogOpen(true);
    };
  
    const handleDialogClose = () => {
      setDialogOpen(false);
      setSelectedCotizacion(null);
    };
  
    const calcularSubtotalProducto = (producto) => {
      return producto.cantidad * producto.precio;
    };
    
    
    const calcularTotales = (cotizacion) => {
      const subtotal = cotizacion.products.reduce((total, product) => total + product.quantity * product.price, 0);
      const totalAntesEnvio = subtotal - cotizacion.discount;
      
      return { subtotal, totalAntesEnvio, total };
    };
    
    return (
    <div>
<TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nro. Cotizacion</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Detalles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                <TableRow >
                  <TableCell>{cotizacion?.idQuote}  </TableCell>
                  <TableCell>{cotizacion?.customer}</TableCell>
                  <TableCell>{cotizacion?.user}</TableCell>
                  {/* <TableCell>${subtotal}</TableCell>
                  <TableCell>${total}</TableCell> */}
                  <TableCell>
                    <Button onClick={() => handleDialogOpen()} variant="outlined">
                      Ver Detalles
                    </Button>
                  </TableCell>
                </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Detalles de la Cotización</DialogTitle>
        <DialogContent>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Precio Unitario</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {cotizacion.products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{numberFormat(product.price) }</TableCell>
                      <TableCell>{numberFormat(product.price * product.quantity) }</TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
    );
  };
  
   export default ListQuote;
  