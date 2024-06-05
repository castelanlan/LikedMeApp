import React from "react";
import { Link } from 'react-router-dom';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import './nav.css'

function Title() {
  return (
    <h1 className='title'><span style={{ color: 'red' }}>L</span>iked<span style={{ color: 'red' }}>M</span>e</h1>
  )
}

function NavLinkSection(props) {
  return (<div>{props.children} </div>)
}

function NavLinkSectionTitle(props) {
  return (<div className='nav-link-section-title'>{props.children}</div>)
}

function NavDropDown(props) {
  return (<div>{props.children} </div>)
}

function Nav(props) {
  const [active, setActive] = useState('');
  const navigate = useNavigate();

  const handleActive = (path) => {
    // console.log(123)
    setActive(path)
    navigate(path)
  }

  return (
    <div className='nav'>
      <Title />
      <NavLinkSection>
        <NavLinkSectionTitle>ADMIN</NavLinkSectionTitle>

        <Link to="/acessos">
          <button className={'nav-link-item ' + (active === "acessos" ? "active" : "")} onClick={() => handleActive('acessos')}>
            <svg className="nav-link-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" /></svg>
            <p>Acessos</p>
          </button>
        </Link>

        <Link to="/cadastros">
          <button className={'nav-link-item ' + (active === 'cadastros' ? 'active' : '')} onClick={() => handleActive('cadastros')}>
            <svg className="nav-link-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
            <p>Cadastros</p>
          </button>
        </Link>

        <Link to="/adm-imagens">
          <button className={'nav-link-item ' + (active === 'adm-imagens' ? 'active' : '')} onClick={() => handleActive('adm-imagens')}>
            <svg className="nav-link-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
            <p>ADM Imagens</p>
          </button>
        </Link>

        <Link to="/segurança">
          <button className={'nav-link-item ' + (active === 'segurança' ? 'active' : '')} onClick={() => handleActive('segurança')}>
            <svg className="nav-link-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" /></svg>
            <p>Segurança</p>
          </button>
        </Link>

      </NavLinkSection>
      <NavLinkSection>
        <NavLinkSectionTitle>UPLOAD</NavLinkSectionTitle>
        <Link to="/carga">
          <button className={'nav-link-item ' + (active === 'carga' ? 'active' : '')} onClick={() => handleActive('carga')}>
            <svg className="nav-link-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" /></svg>
            <p>Carga</p>
          </button>
        </Link>
        <Link to="/treinamento">
          <button className={'nav-link-item ' + (active === 'treinamento' ? 'active' : '')} onClick={() => handleActive('treinamento')}>
            <svg className="nav-link-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" /></svg>
            <p>Treinamento</p>
          </button>
        </Link>
      </NavLinkSection>
      <NavLinkSection>
        <NavLinkSectionTitle>AVALIADOR</NavLinkSectionTitle>
        <button className={'nav-link-item ' + (active === 'tendencias' ? 'active' : '')} onClick={() => handleActive('tendencias')}>
          <svg className="nav-link-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>
          <p>Tendências</p>
        </button>
        {/* <NavDropDown> */}
        <button className={'nav-link-item ' + (active === 'marcas' ? 'active' : '')} onClick={() => handleActive('marcas')}>
          <svg className="nav-link-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
          <p>Marcas</p>
        </button>
        {/* </NavDropDown> */}
      </NavLinkSection>
      {props.children}
    </div>
  );
}

export default Nav