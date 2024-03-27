import React, { useState, useEffect } from "react";


import './cadastros.css'

function TabelaUser() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("/users").then((response) => response.json()).then((data) => {setUsers(data); console.log(data)}).catch((error) => console.log(error))
  }, []);


  // const usuarios = 
  return (<div>
    <div className="tbl-user-wrapper">
      {/* {users && <div>{JSON.stringify(users)}</div>} */}
      <table>
        <thead>
          <tr>
            <th style={{'width': '15%'}} className="tbl-first-col">Nome</th>
            <th style={{'width': '15%'}}>Login</th>
            <th style={{'width': '10%'}} className="tbl-user-center">Estilista</th>
            <th style={{'width': '10%'}} className="tbl-user-center">Avaliador</th>
            <th style={{'width': '10%'}} className="tbl-user-center">Admin</th>
            <th style={{'width': '40%'}} className="tbl-user-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tbl-first-col">Gabriel Castelan</td>
            <td>gabriel.castelan</td>
            <td className="tbl-user-center">Não</td>
            <td className="tbl-user-center">Sim</td>
            <td className="tbl-user-center">Sim</td>
            <td className="tbl-user-right">Histórico Permissões</td>
          </tr>
          <tr>
            <td className="tbl-first-col">Alexandre Buratto</td>
            <td>xande.buratto</td>
            <td className="tbl-user-center">Sim</td>
            <td className="tbl-user-center">Não</td>
            <td className="tbl-user-center">Sim</td>
            <td className="tbl-user-right">Histórico Permissões</td>
          </tr>
          {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td className="tbl-first-col">{user.nome}</td>
                  <td>{user.login}</td>
                  <td className="tbl-user-center">
                    {/* Replace with logic to determine "Sim" or "Não" based on user data */}
                    {user.permissão > 1 /* condition for Estilista */ ? (
                      "Sim"
                    ) : (
                      "Não"
                    )}
                  </td>
                  <td className="tbl-user-center">
                    {/* Replace with logic to determine "Sim" or "Não" based on user data */}
                    {user.permissão > 9 /* condition for Avaliador */ ? (
                      "Sim"
                    ) : (
                      "Não"
                    )}
                  </td>
                  <td className="tbl-user-center">
                    {/* Replace with logic to determine "Sim" or "Não" based on user data */}
                    {user.permissão > 99 /* condition for Admin */ ? (
                      "Sim"
                    ) : (
                      "Não"
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