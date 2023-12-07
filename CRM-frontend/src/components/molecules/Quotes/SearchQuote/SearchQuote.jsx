import React from 'react';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Yup from "yup";
import axios from "axios";


const SearchQuote = ({ setCotizaciones, load, setLoad }) => {

  return (
 
<Formik
initialValues={{
  idQuote: ''
}}
validationSchema={Yup.object({
  idQuote: Yup.string().required("Este campo es obligatorio"),
})}
onSubmit={async (values, { setSubmitting }) => {
  const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/quote/consultar-cotizacion/${values.idQuote}`);
  response
  setCotizaciones(response.data);
  setLoad(!load);
}}
>
{({
  values,
  errors,
  handleChange,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
        <TextField
          sx={{ mt: 1 }}
          fullWidth
          id="idQuote"
          name="idQuote"
          label="Nro. de Cotizacion"
          onChange={handleChange}
          value={values.idQuote}
          error={errors.idQuote}
          helperText={errors.idQuote}
        />

      <Button type="submit"> Buscar </Button>

  </form>
)}
</Formik>
  );
};

export default SearchQuote;

