import React from "react";

import './cadastros.css'

function Table() {
  // const usuarios = 
  return(<></>)
}

function Cadastros() {
  return (
    <div>
      <div className="card card-cadastros">
        <h2>Usuários</h2>
        <p>Mostrando 1 de 50 usuários</p>
        <Table />
      </div>
      <div className="card card-cadastros">
        <h2>Gabriel Castelan</h2>
        <p>Permissões de usuário</p>
      </div>
    </div>
  );
}

export default Cadastros