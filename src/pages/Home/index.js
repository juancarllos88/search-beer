import React, {useState, useEffect} from 'react';
import { useHistory,useLocation,useParams } from 'react-router-dom';

import Load from '../../components/Load';
import Header from '../../components/Header';
import ListBeer from '../../components/ListBeer';
import Pagination from '../../components/Pagination';

import api from '../../services/api';

import './style.css';

export default function Home({match}) {
    const [beers, setBeers] = useState([]);
    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(true);
    const [show, setShow] = useState(true);
    const [searchField, setSearchField] = useState('');


    const history = useHistory();
    // const state = useLocation();
    // const params = useParams();
    //useEffect serve para disparar alguma função em algum determinado momento do componente
    useEffect(() => {
      // console.log(match);
      // console.log(state);
      // console.log(params);
      loadBeers();
    }, []);

    const loadBeers = async (pageIndex = 1) => {
      try {
        const nome = searchField === '' ? '_' : searchField;
        setLoad(true);
        const response = await api.findByName(pageIndex, 10, nome);
        setBeers(response.data);
        showButtonPagination(response.data);
      } catch (err) {
        alert("Ocorreu um erro");
      } finally {
        setTimeout(() => {
          setLoad(false);
        }, 250);
      }
    }

    const handleLogout = () => {
      localStorage.clear();
      history.push("/");
    };

    const next = async () => {
      try {
        loadBeers(page+1);
        setPage(page+1);
      } catch (err) {
        alert("Ocorreu um erro");
      }
    };

    const previous = async () => {
      try {
        loadBeers(page-1);
        setPage(page-1);
      } catch (err) {
        alert("Ocorreu um erro");
      }
    };


    const showButtonPagination = (value) => {
      if(value.length < 10){
        setShow(false);
      }else{
        setShow(true);
      }
    }

    const handleSearch = async (data) => {
      try {
        const nome = data.nome === '' ? '_' : data.nome;
        setSearchField(nome);
        setLoad(true);
        const response = await api.findByName(1, 10, nome);
        //setBeers([]);
        setBeers(response.data);
        setPage(1);
        showButtonPagination(response.data);
      } catch (err) {
        alert("Ocorreu um erro");
      } finally {
        setTimeout(() => {
          setLoad(false);
        }, 250);
      }
    };


    return (
        <div className="home-container">
            <Header handleSearch={handleSearch} handleLogout={handleLogout}/> 
            <h1>Catálogo de Cervejas</h1>
            {load ? <Load/> 
            :(<>
            <ListBeer beers={beers}/>
            {show ? <Pagination handlePrevious={previous} handlerNext={next} page={page}/>:''}
            </>)}
        </div>
    );
}