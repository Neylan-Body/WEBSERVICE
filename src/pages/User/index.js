import React,{useState,useEffect} from 'react';
import api from '../../services/api';
import {Link, useHistory} from 'react-router-dom';
import './style.css';

export default function User(){
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        api.get('users').then(response => {
            setUsers(response.data)
        });

    },[]);
    async function handleDelete(id){
        try{
            await api.delete(`/users/${id}`)
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
                    <li key={user.id}>
                        <strong>Nome</strong>
                        <p>{user.name}</p>
                        <strong>Email</strong>
                        <p>{user.email}</p>
                        <strong>Idade</strong>
                        <p>{user.idade}</p>
                        <strong>Empresa</strong>
                        <p>{user.empresa}</p>
                        <div className="actions">
                            <button className="button" type="button" onClick={()=>handleDelete(user.id)}>Deletar</button>
                            <Link className="button"onClick={()=>history.push(`/update/${user.id}`)}>Acessar</Link>
                        </div>
                    </li>
                ))}
            </ul>
            
        </div>
    );
}