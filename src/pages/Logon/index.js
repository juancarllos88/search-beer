import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';


import {setUSer} from '../../services/auth';

import './style.css';

import logoImg from '../../assets/logo.png';
import beerImg from '../../assets/beer.png';

export default function Logon() {
    const [id, setId] = useState(''); 
    const history = useHistory();


    async function handleLogin(e) {
        e.preventDefault();

        try {
            setUSer(id);
            // const carro  = {
            //     valor: 1,
            //     valor2: 2
                
            // }
            // history.push('/home/1',carro)
            history.push('/home');

        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
        <section className="form">
            

            <form onSubmit={handleLogin}>
            <div className="logo">    
                <img src={logoImg} alt="Logo" className="imgLogo" />Search Beer
            </div>

                <input 
                    placeholder="Seu Nome" 
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button> 

            
            </form>
        </section>

    
        <img src={beerImg} alt="Beer"  className="imgBanner"/>
        </div>
    );
}