import { useState } from "react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListCustomer from "@components/molecules/Customers/ListCustomer/ListCustomer";
import CreateCustomer from "@components/molecules/Customers/CreateCustomer/CreateCustomer";
import UpdateCustomer from "@components/molecules/Customers/UpdateCustomer/UpdateCustomer";
import DeleteCustomer from "@components/molecules/Customers/DeleteCustomer/DeleteCustomer";
import Cotizacion from "../../components/molecules/Quotes/CreateQuote/CreateQuote";

const Customers = () => {
    const [load, setLoad] = useState(false);
    const [idUpdate, setIdUpdate] = useState('');
    const [idDelete, setIdDelete] = useState('');
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    if(loading){
        return <>Cargando</>;
    }

    if(!user){
        return navigate("/login");
    }

    
    return (
        <div>
            <h1>CLIENTES</h1>
            <Container sx = {{ mt: 5}}>
                <CreateCustomer load={load} setLoad={setLoad} />
                <ListCustomer load={load} setIdUpdate={setIdUpdate} setIdDelete={setIdDelete}/>
                <UpdateCustomer idUpdate={idUpdate} load={load} setLoad={setLoad}/>                     
                <DeleteCustomer idDelete={idDelete} load={load} setLoad={setLoad}/>              
            </Container>
        </div>
    )
}
export default Customers;