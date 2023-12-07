import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import axios from "axios";

const SelectCustomer = ({ idQuote, setCustomer, load, setLoad }) => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);


  const fetchData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_URL_SERVER}api/customer/consultar-cliente`
    );
    console.log(response);
    setRows(response.data.customers);
  };

  useEffect(() => {
    if (idQuote) {
      fetchData();
      setOpen(true);
    }
  }, [idQuote]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCustomer = async (value) => {
    setCustomer(value);
    setOpen(false);
  };

  return (
    <div>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Selecciona el cliente</DialogTitle>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <Button onClick={() => {handleCustomer(row)}}>Seleccionar</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </div>
  );
};
export default SelectCustomer;
