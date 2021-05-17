import React,{useState,useEffect} from 'react';
import WebServices from '../../services/WebServices';
import {Link, useHistory} from 'react-router-dom';
import './style.css';


export default function User(){
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        WebServices.get('users').then(response => {
            setUsers(response.data)
        });

    },[]);
    async function handleDelete(id){
        try{
            await WebServices.delete(`/users/${id}`)
            setUsers(users.filter(user=>user.id != id))
        }catch(err){
            alert('Erro ao deletar')
        }
    }
    const history = useHistory();
    return(
        <div id="user-container">
            <h1>Lista de usuários</h1>
            <Link onClick={()=>history.push('/create')} className="button" id="create-link">Criar</Link>
            <ul className="user-list">
                {users.map(user => (
                    <div className="col-md-6 col-lg-6 col-sm-12">
                        <li key={user.id}>
                            <strong>Nome</strong>
                            <p>{user.name}</p>
                            <strong>Email</strong>
                            <p>{user.email}</p>
                            <strong>Idade</strong>
                            <p>{user.idade}</p>
                            <strong>Empresa</strong>
                            <p>{user.empresa}</p>
                            <strong>Data da criação</strong>
                            <p>{user.created_at}</p>
                            <div className="actions">
                                <button className="button" type="button" onClick={()=>handleDelete(user.id)}>Deletar</button>
                                <Link className="button"onClick={()=>history.push(`/update/${user.id}`)}>Editar</Link>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
            
        </div>
    );
}