import React from 'react';
import { Routes, Route } from "react-router-dom";

import './App.css';

import Acessos from './components/Acessos';
import Gerar from './components/Gerar.tsx';
import Nav from './components/Nav';
import AdmImagens from './components/AdmImagens';
import Cadastros from './components/Cadastros';
import Segurança from './components/Segurança';
import Treinamento from './components/Treinamento';
import Tendencias from './components/Tendencias';
import Header from './components/Header'

function Main(props) {
  return (<div className='main'>{props.children}</div>);
}

function Content() {
  return (
    <main>
      <Routes>
        <Route path='/acessos' element={<Acessos />} exact />
        <Route path='/cadastros' element={<Cadastros />} exact />
        <Route path='/adm-imagens' element={<AdmImagens />} exact />
        <Route path='/segurança' element={<Segurança />} exact />
        <Route path='/carga' element={<Gerar />} exact />
        <Route path='/treinamento' element={<Treinamento />} exact />
        <Route path='/tendencias' element={<Tendencias />} exact />
      </Routes>
    </main>
  );
}

function App() {
  return (
    <div className="App" id="app-component">
      <Nav>
      </Nav>
      <Main>
        <Header>
        </Header>
        <Content />
      </Main>
    </div>
  );
}

export default App;