import React, { useState, useEffect } from "react";
import './cadastros.css'

import X from '../assets/X.png';
import V from '../assets/V.png';

const PERMISSOES = {
  'estilista': 16384,
  'avaliador': 32768,
  'admin': 65536,
};

function TabelaUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("/usuarios")
    // .then((response) => {console.log(response); return response})
    .then((response) => response.json()).then((data) => { setUsers(data) }).catch((error) => console.log(error))
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
                <td className="tbl-user-right"><a href="/">Histórico</a> <a href="/">Permissões</a></td>
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

function TabelaUserPerms() {
  // const [userperms, setUserperms] = useState([]);

  // useEffect(() => {
  //   fetch("/usuarios/gabriel.castelan").then((response) => response.json()).then((data) => { setUserperms(data) }).catch((error) => console.log(error))
  // }, []);

  return (
    <>
    {/* { userperms && userperms !== 0 ? (
      <p>Yes {userperms}</p>
    ) : (
      <p>No {userperms}</p>
    )} */}
    </>
  );
}

function Cadastros() {
  return (
    <div className="cadastros">
      <div className="card card-cadastros">
        <div className="cdstro-header">
          <div className="cdstro-usuario">
            <h2>Usuários</h2>
            <p className="cdstro-small-t">Mostrando 1 de 50 usuários</p>
          </div>
          <div className="cdstro">
            <form>
              <input className="cdstro-small-t" type="textarea" id="pesquisa" placeholder="Pesquisar" />
              <svg className="cdstro-usuario-icon w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </form>
          </div>
        </div>
        <TabelaUsers />
      </div>
      <div className="card card-cadastros card-cadastros-user">
        <div className="card-user-header">
          <h2>Gabriel Castelan</h2>
          <p>Permissões detalhadas de usuário</p>
        </div>
        {/* <p>Permissões de usuário detalhada</p> */}
        <TabelaUserPerms />
      </div>

    </div>
  );
}

export default Cadastros