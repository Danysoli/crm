import { useState } from "react";
import { Container } from "@mui/material";
import CreateUser from "@components/molecules/Users/CreateUser/CreateUser";
import ListUser from "@components/molecules/Users/ListUser/ListUser";
import UpdateUser from "@components/molecules/Users/UpdateUser/UpdateUser";
import DeleteUser from "@components/molecules/Users/DeleteUser/DeleteUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Users = () => {
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
            <h1>USUARIOS</h1>
            <Container sx = {{ mt: 5}}>
                {user.idRol == 2  && <CreateUser load={load} setLoad={setLoad}/>}
                <ListUser load={load} setIdUpdate={setIdUpdate} setIdDelete={setIdDelete}/>
                <UpdateUser idUpdate={idUpdate} load={load} setLoad={setLoad} />
                <DeleteUser idDelete={idDelete} load={load} setLoad={setLoad} />
            </Container>
        </div>
    )
}
export default Users;