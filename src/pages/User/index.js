import React,{useState,useEffect} from 'react';
import './style.css';
import api from '../../services/api'

export default function User(){
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        api.get('users').then(response => {
            setUsers(response.data)
        });

    },[]);
    return(
        <div id="user-container">
            <h1>Lista de usuários</h1>
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
                    </li>
                ))}
            </ul>
        </div>
    );
}