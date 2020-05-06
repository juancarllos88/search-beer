import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

export default function NewIncident({match}) {
    const [beer, setBeer] = useState({});

    useEffect(()=>{
        async function loadBeer() {
          const response = await api.findById(match.params.id);
          const entries = Object.entries(response.data[0].ingredients);
          var sb = [];
          entries.forEach(([key, value], i) => {
            if (i < 2) {
              sb.push(`\n${i+1}.${key}\n`);  
              value.forEach((element) => {
                switch (key) {
                  case "malt":
                    sb.push(
                      ` Name: ${element.name}, Amount: ${element.amount.value} ${element.amount.unit} \n`
                    );
                    break;
                  case "hops":
                    sb.push(
                      ` Name: ${element.name}, Amount: ${element.amount.value} ${element.amount.unit}, Attribute: ${element.attribute}, Add: ${element.add} \n`
                    );
                    break;
                  default:
                      break;  
                }
              });
            } else {
                sb.push(`\n${i+1}.${key}\n ${value}`);
            }
          });
          const data = response.data[0];
          setBeer({...data, all_ingredients: sb.join("")});
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