import React from "react";
import { getUser } from "../../services/auth";

import { Link } from "react-router-dom";
import { FiPower, FiSearch } from "react-icons/fi";
import logoImg from "../../assets/logo.png";
import { useForm } from "react-hook-form";

function Header({handleSearch, handleLogout}) {
  const { register, handleSubmit} = useForm();
  const userName = getUser();

  return (
    <header>
      <img src={logoImg} alt="Logo" className="imgLogo" />

      <span>Bem vindo(a), {userName}</span>

      <Link to="/" />

      <form onSubmit={handleSubmit(handleSearch)}>
        <input
          placeholder="nome da cerveja"
          className="inputSearch"
          name="nome"
          ref={register}
        />
        <button type="submit">
          <FiSearch size={18} color="#E02041" />
        </button>
      </form>

      <button onClick={handleLogout} type="button">
        <FiPower size={18} color="#E02041" />
      </button>
    </header>
  );
}

export default Header;
