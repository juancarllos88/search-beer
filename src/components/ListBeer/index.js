import React from "react";

// import { Container } from './styles';
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

function ListBeer({ beers }) {
  return (
    <ul>
      {beers.map((beer) => (
        <li key={beer.id}>
          <img src={beer.image_url} alt="Cerveja" />
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
  );
}

export default ListBeer;
