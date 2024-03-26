import React from "react";
import { useState } from "react";

function AcessoRapido(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  return (
    <div className='header-acesso-rapido' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <p>Acesso rápido</p>
      <svg className="header-acesso-rapido-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
      {isDropdownOpen && props.children}
    </div>
  );
}

function LinksAcessoRapido(props) {
  return (
    <div className='header-acesso-rapido-links'>
      <p><a href='/'>Gerar imagens</a></p>
      <p><a href='/'>Cadastrar novo usuário</a></p>
    </div>);
}

function Usuario(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOnClick = () => setIsDropdownOpen(!isDropdownOpen);
  return (
    <div className='header-usuario' onClick={handleOnClick}>
      <p>Usuário</p>
      {isDropdownOpen && props.children}
    </div>
  );
}

function OpcoesUsuario(props) {
  return (
    <div className='header-usuario-links'>
      <p><a href='/'>SAIR</a></p>
    </div>
  );
}

function Header(props) {
  return (
    <div className="header">

      <AcessoRapido>
        <LinksAcessoRapido />
      </AcessoRapido>
      <Usuario>
        <OpcoesUsuario></OpcoesUsuario>
      </Usuario>
    </div>
  );
}

export default Header