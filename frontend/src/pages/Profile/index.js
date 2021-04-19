import React,{useState,useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import './style.css';
import WebServices from '../../services/WebServices';

export default function Profile(){
    const {id} = useParams();
    const history = useHistory();
    const initUser={
        name: '',
        email: '',
        idade: 0,
        empresa: '',
        created_at: '',
    }
    const [user, setUser] = useState(initUser);

    useEffect(()=>{
        if(id){
            WebServices.get(`/users/${id}`).then(response=>{
                //...response (é spread)
                setUser(...response.data)
            })
        }
    },[])

    function onSubmit(e){
        e.preventDefault();
        user.created_at = Date();
        const method = id ? 'put' : 'post';
        const url = id ? `/users/${id}` : '/users/';
        WebServices[method](url, user).then((response)=>{
            history.push('/');
        })
    }

    function onChange(e){
        const{name,value} = e.target
        setUser({...user,[name]:value})        
    }
    return(
        <div id="profile-container">
            <h1>Cadastro</h1>
            <form onSubmit={onSubmit}>
                <strong>Nome:</strong>
                <input name="name" onChange={onChange} value={user.name}/>
                <strong>Email:</strong>
                <input type="email" onChange={onChange} name="email" value={user.email}/>
                <strong>Idade:</strong>
                <input name="idade" onChange={onChange} value={user.idade}/>
                <strong>Empresa:</strong>
                <input name="empresa" onChange={onChange} value={user.empresa}/>
                <input type="hidden" name="created_at" onChange={onChange} value={user.created_at}/>
                <div className="actions">
                    <Link onClick={()=>history.push('/')} className="button">Voltar</Link>
                    <button className="button" type="submit">Salvar</button>
                </div>
            </form>
        </div>
    );
}