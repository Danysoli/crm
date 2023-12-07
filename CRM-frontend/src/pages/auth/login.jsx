import { Container } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup'
import { fetchLogin } from "@lib/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    if(loading){
        return <>Cargando</>;
    }

    if(user){
        return navigate("/usuarios");
    }

    return (
        <>
            <Container>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .required('Este campo es obligatorio')
                            .email('Direccion de correo invalida'),
                        password: Yup.string()
                            .required('Este campo es obligatorio')
                            .min(8, 'La contraseña debe contener como minimo 8 caracteres')
                    })}

                    onSubmit={async (values, { setSubmitting }) => {
                        const response = await dispatch(fetchLogin(values));
                        if(response.payload.user){
                            return navigate("/usuarios")
                        }
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

                            <Button type="submit">
                                Iniciar Sesion
                            </Button>
                        </form>
                    )}
                </Formik>
            </Container >
        </>
    )
}

export default Login;