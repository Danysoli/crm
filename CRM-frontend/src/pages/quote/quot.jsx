import { useState } from "react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateQuote from "@components/molecules/Quotes/CreateQuote/CreateQuote";
import SelectCustomer from "@components/molecules/Quotes/CreateQuote/SelectCustomer";
import SelectProduct from "../../components/molecules/Quotes/CreateQuote/SelectProduct";
import ListQuote from "../../components/molecules/Quotes/ListQuote/ListQuote";
import SearchQuote from "../../components/molecules/Quotes/SearchQuote/SearchQuote";


const Quotes = () => {
    const [load, setLoad] = useState(false);
    const [cotizaciones, setCotizaciones] = useState([])
    const [idQuote, setIdQuote] = useState('');
    const [Customer, setCustomer] = useState({});
    const [openProducts, setOpenProducts] = useState(false);
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
            <h1>PRODUCTOS</h1>
            <Container sx = {{ mt: 5}}>
                <CreateQuote Customer={Customer} setCustomer={setCustomer} setIdQuote={setIdQuote} setOpenProducts={setOpenProducts} load={load} setLoad={setLoad}/>  
                <SelectCustomer idQuote={idQuote} setCustomer={setCustomer} load={load} setLoad={setLoad}/>  
                <SelectProduct idQuote={idQuote} Customer={Customer} openProducts={openProducts} load={load} setLoad={setLoad}/>  
                <SearchQuote setCotizaciones={setCotizaciones} load={load} setLoad={setLoad}/>
                <ListQuote cotizaciones={cotizaciones} setCotizaciones={setCotizaciones} load={load} setLoad={setLoad}/>

            </Container>
        </div>
    )
}
export default Quotes;