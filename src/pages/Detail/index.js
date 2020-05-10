import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

export default function Detail({match}) {
    const [beer, setBeer] = useState({});

    useEffect(()=>{
        async function loadBeer() {
          const response = await api.findById(match.params.id);
          const beer = response.data[0];
          var sb = [];
          sb.push(`1. Malt:\n\n`)
          sb.push(beer.ingredients?.malt?.map(malt => (
             `${malt.name} - ${malt.amount.value} ${malt.amount.unit} \n`
          )));
          sb.push(`\n2. Hops:\n\n`)
          sb.push(beer.ingredients?.hops?.map(hop => (
             `${hop.name} - ${hop.amount.value} ${hop.amount.unit} - ${hop.attribute} - ${hop.add} \n`
          )));
          sb.push(`\n3. Yeast:\n\n`);
          sb.push(beer.ingredients?.yeast);
          setBeer({...beer, all_ingredients: sb.join("")});
        }
        loadBeer();
    },[match.params.id]);

    return (
      <div className="detail-container">
        <div className="content">
          <section>
            <img src={beer.image_url} alt="cerveja" />
          </section>
          
          <form >
          <h1>Características da Cerveja</h1>
            <label>Nome:</label>
            <input value={beer.name || ''} readOnly={true}/>
            <label>Slogan:</label>
            <input value={beer.tagline || ''} readOnly={true}/>
            <label>Ano Fabricação:</label>
            <input value={beer.first_brewed || ''} readOnly={true}/>
            <label>Descrição:</label>
            <textarea value={beer.description || ''} readOnly={true}/>
            <label>Ingredientes:</label>
            <textarea value={beer.all_ingredients|| ''} readOnly={true}/>
            <Link to="/home">
            <button className="button" type="button">
              Voltar
            </button>
            </Link>
          </form>
        </div>
      </div>
    );
}