import { useState } from "react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListProduct from "@components/molecules/Products/ListProduct/ListProduct";
import CreateProduct from "@components/molecules/Products/CreaterProduct/CreateProduct";
import UpdateProduct from "@components/molecules/Products/UpdateProduct/UpdateProduct";
import DeleteProduct from "@components/molecules/Products/DeleteProduct/DeleteProduct";


const Products = () => {
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
            <h1>PRODUCTOS</h1>
            <Container sx = {{ mt: 5}}>
                <CreateProduct load={load} setLoad={setLoad} />
                <ListProduct load={load} setIdUpdate={setIdUpdate} setIdDelete={setIdDelete}/>
                <UpdateProduct idUpdate={idUpdate} load={load} setLoad={setLoad}/>
                <DeleteProduct idDelete={idDelete} load={load} setLoad={setLoad}/>                     
            </Container>
        </div>
    )
}
export default Products;