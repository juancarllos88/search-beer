import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form'; //useEffect serve para disparar alguma função em algum determinado momento do componente
import { Link, useHistory } from 'react-router-dom';
import { FiPower,FiSearch } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import api from '../../services/api';
import {getUser} from '../../services/auth';

import './style.css';
import logoImg from '../../assets/logo.png';

export default function Profile() {
    const [beers, setBeers] = useState([]);
    const [page, setPage] = useState(2);
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(true);
    const { register, handleSubmit, getValues } = useForm();

    const history = useHistory();
    const userName = getUser();

    useEffect(() => {
      async function loadBeers() {
        try {
          setLoad(true);
          const response = await api.findByName(1, 10);
          setBeers(response.data);
        } catch (err) {
          alert("Ocorreu um erro");
        } finally {
          setTimeout(() => {
            setLoad(false);
          }, 500);
        }
      }
      loadBeers();
    }, []);

    const handleLogout = () => {
      localStorage.clear();
      history.push("/");
    };

    const pagination = async () => {
      try {
        const nome = getParameter();
        setLoad(true);
        const response = await api.findByName(page, 10, nome);
        setBeers((values) => [...values, ...response.data]);
        setPage(page+1);
        showButtonPagination(response.data);
      } catch (err) {
        alert("Ocorreu um erro");
      } finally {
        setTimeout(() => {
          setLoad(false);
        }, 500);
      }
    };

    const getParameter = () => {
      const value = getValues("nome");
      return value === '' ? '_' : value;
    }

    const showButtonPagination = (value) => {
      if(value.length < 10){
        setShow(false);
      }else{
        setShow(true);
      }
    }

    const search = async (data) => {
      try {
        const nome = getParameter();
        setLoad(true);
        const response = await api.findByName(1, 10, nome);
        setBeers([]);
        setBeers((values) => [...values, ...response.data]);
        setPage(2);
        showButtonPagination(response.data);
      } catch (err) {
        alert("Ocorreu um erro");
      } finally {
        setTimeout(() => {
          setLoad(false);
        }, 500);
      }
    };


    return (
        <div className="home-container">
            <header>
                   
                <img src={logoImg} alt="Logo" className="imgLogo" />
                
                <span>Bem vindo(a), {userName}</span>

                <Link to="/" />
                
                <form onSubmit={handleSubmit(search)}>
                    <input placeholder="nome da cerveja" className="inputSearch" name="nome" ref={register}/>
                    <button type="submit">
                        <FiSearch size={18} color="#E02041" />
                    </button>
                </form>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            

            <h1>Catálogo de Cervejas</h1>
            {load ? 
            (<div className="loading"><FontAwesomeIcon icon={faSpinner} spin /></div>) 
            :(<>
            <ul>
                {beers.map(beer => (
                    <li key={beer.id}>
                        <img src={beer.image_url} alt="Cerveja"/>
                        <div>
                        <strong>Nome: </strong>
                        <p>{beer.name}</p>

                        <strong>Slogan: </strong>
                        <p>{beer.tagline}</p>

                        <Link to={`/detail/${beer.id}`}>
                        <button type="button">
                            <FiSearch size={35} color="#e9d208" />
                        </button>
                        </Link>
                        </div>
                    </li>
                ))}

            </ul>
            {show ? 
            (<button className="button" type="button" onClick={pagination}>Carregar ...</button>)
             :''}
            </>)}
        </div>
    );
}