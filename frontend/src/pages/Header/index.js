import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header(props){
    return(
        <header title="Meu App" id="main-header">
            <h1>{props.title}</h1>
        </header>
    );
}