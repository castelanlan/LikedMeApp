import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Routes, Route } from "react-router-dom";
import fileTypeChecker from "file-type-checker";

import './App.css';

import Acessos from './components/Acessos';
import Gerar from './components/Gerar';
import Nav from './components/Nav';
import AdmImagens from './components/AdmImagens';
import Cadastros from './components/Cadastros';
import Segurança from './components/Segurança';
import Treinamento from './components/Treinamento';
import Tendencias from './components/Tendencias';

// function NavButAcessos(props) {
//   return()
// }

function Main(props) {
  return (<div className='main'>{props.children}</div>);
}

function Header(props) {
  return (<div className='header'>{props.children}</div>);
}

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

function Card(props) {

  const handleFileInputChange = (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      const types = ["jpeg", "png", "gif"];

      reader.onload = () => {
        const isImage = fileTypeChecker.validateFileType(reader.result, types);
        console.log(isImage); // Returns true if the file is an image from the accepted list
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error("Error: ", err.message);
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = (data, e) => {
    e.preventDefault();
    console.log(data)

    const { marca, colecao, descricao, arquivo } = data
    // const file = arquivo[0]

    const formData = new FormData();
    formData.append('marca', marca);
    formData.append('colecao', colecao);
    formData.append('descricao', descricao);
    formData.append('arquivo', arquivo);

    fetch('/form', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        // Handle request errors
      });
  };
  return (
    <div className='card'>
      <h2>Gerar imagem</h2>
      <form className='card-form' onSubmit={handleSubmit(submitHandler)}>
        <div className='card-marca-e-colecao'>
          <div>
            <label>
              <p>Marca:</p>
              {errors.marca && <p className="error">Marca is required</p>}
              <select id="marca" className='card-select' {...register('marca', { required: true })}>
                <option value="my">My Favorite Things</option>
                <option value="lp">Lança Perfume</option>
                <option value="am">Amarante do Brasil</option>
              </select>

            </label>
          </div>
          <div>
            <label id="lbl-colecao">
              <p>Coleção:</p>
              <select id="colecao" className='card-select' {...register('colecao', { required: true })}>
                <option value="my24">MY24</option>
                <option value="my23">MY23</option>
                <option value="lp24">LP24</option>
                <option value="lp23">LP23</option>
              </select>
              {errors.colecao && <p className="error">Coleção is required</p>}
            </label>
          </div>
        </div>
        <div className='card-descricao'>
          <label>
            <p>Descrição do produto:</p>
            <input type='textarea' id='descricao' placeholder='Insira aqui a descrição do produto' {...register('descricao', { required: true })} />
            {errors.descricao && <span className="error" style={{ color: 'red', marginTop: '.5em' }}>Por favor, digite uma descrição do produto</span>}
          </label>

        </div>
        <div className='card-upload'>
          <label>
            <p>Upload do esboço</p>
            <input type='file' onChange={handleFileInputChange} {...register('arquivo', { required: true, type: 'file' })} />
          </label>
          {errors.file && <span className="error" style={{ color: 'red', paddingTop: '.5em' }}>Por favor, envie um arquivo do produto</span>}
        </div>
        <div className='card-submit'>
          <input className='card-submit-button' type="submit" value="Gerar imagem" />
          <p>Créditos restantes: R$50.000</p>
        </div>
      </form>
    </div>
  );
}

function Content() {
  return(
    <main>
      <Routes>
        <Route path='/acessos' element={<Acessos/>} exact />
        <Route path='/cadastros' element={<Cadastros/>} exact />
        <Route path='/adm-imagens' element={<AdmImagens/>} exact />
        <Route path='/segurança' element={<Segurança/>} exact />
        <Route path='/carga' element={<Gerar/>} exact />
        <Route path='/treinamento' element={<Treinamento/>} exact />
        <Route path='/tendencias' element={<Tendencias/>} exact />
      </Routes>
    </main>
  );
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
      <Nav>
      </Nav>
      <Main>
        <Header>
          <AcessoRapido>
            <LinksAcessoRapido />
          </AcessoRapido>
          <Usuario>
            <OpcoesUsuario></OpcoesUsuario>
          </Usuario>
        </Header>
        <Content />
      </Main>
    </div>
  );
}

export default App;