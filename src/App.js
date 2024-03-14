import React, { useState, useEffect } from 'react';
import './App.css';


function Title() {
  return (
    <h1 className='title'><span style={{ color: 'red' }}>L</span>iked<span style={{ color: 'red' }}>M</span>e</h1>
  )
}
function Nav() {
  return (
    <nav>

      <Title />
      <ul>
        <li>Acessos</li>
        <li>Cadastros</li>
      </ul>
    </nav>
  )
}

function Main(props) {
  return (<div>Main: { props.children }</div>);
}

function Header(props) {
  return (<div>Header: { props.children }</div>);
}

function AcessoRapido(props) {
  return (<div>AcessoRapido: { props.children }</div>);
}

function LinksAcessoRapido(props) {
  return (<div>LinksAcessoRapido: { props.children }</div>);
}

function Usuario(props) {
  return (<div>Usuario: { props.children }</div>);
}

function OpcoesUsuario(props) {
  return (<div>OpcoesUsuario: { props.children }</div>);
}

function Card(props) {
  return (<div>Card: { props.children }</div>);
}

function App() {
  // const [currentTime, setCurrentTime] = useState([]);

  // useEffect(() => {
  //   const updateTime = async () => {
  //     const response = await fetch('/time'); // Assuming your API endpoint is at '/time'
  //     const data = await response.json();
  //     // setCurrentTime(prevTimes => [...prevTimes, data.time]); // Append new time to the array
  //     setCurrentTime(data.time)
  //   };

  //   const intervalId = setInterval(updateTime, 5000);

  //   return () => clearInterval(intervalId)
  // }, []);

  return (
    <div className="App">
      <Nav />
      <Main className="main">
        <Header className="Header">
          <AcessoRapido>
            <LinksAcessoRapido />
          </AcessoRapido>
          <Usuario>
            <OpcoesUsuario></OpcoesUsuario>
          </Usuario>
        </Header>
        <Card>

        </Card>
      </Main>
    </div>
  );
}

export default App;