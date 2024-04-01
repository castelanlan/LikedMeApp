import React, { useState, useEffect } from "react";
import './cadastros.css'

import X from '../assets/X.png';
import V from '../assets/V.png';

const PERMISSOES = {
  'estilista': 16384,
  'avaliador': 32768,
  'admin': 65536,
};

function TabelaUser() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("/users").then((response) => response.json()).then((data) => { setUsers(data); console.log(data) }).catch((error) => console.log(error))
  }, []);


  // const usuarios = 
  return (<div>
    <div className="tbl-user-wrapper">
      {/* {users && <div>{JSON.stringify(users)}</div>} */}
      <table>
        <thead>
          <tr>
            <th style={{ 'width': '15%' }} className="tbl-first-col">Nome</th>
            <th style={{ 'width': '15%' }}>Login</th>
            <th style={{ 'width': '10%' }} className="tbl-user-center">Admin</th>
            <th style={{ 'width': '10%' }} className="tbl-user-center">Estilista</th>
            <th style={{ 'width': '10%' }} className="tbl-user-center">Avaliador</th>
            <th style={{ 'width': '40%' }} className="tbl-user-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td className="tbl-first-col">{user.nome}</td>
                <td>{user.login}</td>
                <td className="tbl-user-center">
                  {user.permissão & PERMISSOES.admin /* condition for Admin */ ?
                    (<img src={V} height="16" alt="Ícone de verificado" />) :
                    (<img src={X} height="16" alt="Ícone de proibido" />)}
                </td>
                <td className="tbl-user-center">
                  {user.permissão & PERMISSOES.estilista /* condition for Estilista */ ? (
                    <img src={V} height="16" alt="Ícone de verificado" />
                  ) : (
                    <img src={X} height="16" alt="Ícone de proibido" />
                  )}
                </td>
                <td className="tbl-user-center">
                  {user.permissão & PERMISSOES.avaliador /* condition for Avaliador */ ? (
                    <img src={V} height="16" alt="Ícone de verificado" />
                  ) : (
                    <img src={X} height="16" alt="Ícone de proibido" />
                  )}
                </td>
                <td className="tbl-user-right">Histórico Permissões</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="tbl-user-center">
                {/* Message to display when no users are found */}
                Nenhum usuário encontrado
              </td>
            </tr>
          )}
          <tr id="tbl-ultimo-tr">
            <td className="tbl-first-col">...</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>)
}

function Cadastros() {
  return (
    <div>
      <div className="card card-cadastros">
        <div className="cdstro-header">
          <div className="cdstro-usuario">
            <h2>Usuários</h2>
            <p>Mostrando 1 de 50 usuários</p>
          </div>
          <div className="cdstro">
            <form>
              <input type="textarea" id="pesquisa" placeholder="Pesquisar" />
              <svg className="cdstro-usuario-icon w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </form>
          </div>
        </div>
        <TabelaUser />
      </div>
      <div className="card card-cadastros">
        <h2>Gabriel Castelan</h2>
        <p>Permissões de usuário</p>
      </div>

    </div>
  );
}

export default Cadastros