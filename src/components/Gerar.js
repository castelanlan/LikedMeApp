import React from "react";
// import fileTypeChecker from "file-type-checker";
import { Controller, useForm } from 'react-hook-form';
import { useState } from "react";
import { useEffect } from "react";
import Modal from 'react-modal';
import './gerar.css'

import R from '../assets/R.png';
import V from '../assets/V.png';

Modal.setAppElement(document.getElementById('root'));

function Gerar(props) {

  /**
   *  @type {useState<boolean>}
   */
  const [modalIsOpen, setIsOpen] = React.useState(false);
  /**
   *  @type {useState<list>}
   */
  const [selected, setSelected] = useState([]);
  /**
   *  @type {useState<list>}
   */
  const [responseData, setResponseData] = useState(null);

  function submit() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    console.log(selected)
  }

  function closeModal() {
    setIsOpen(false);
  }

  function updateUnselected(imagem) {
    // console.log(imagem.slice(40, 60));
    setSelected(selected.filter((id) => id !== imagem));
  }

  function updateSelected(imagem) {
    if (selected.includes(imagem)) {
      return;
    }
    setSelected([...selected, imagem]);
    // console.log(imagem.slice(40, 60));
  }

  function printarSelected() {
    console.log(selected)
  }

  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = (data, e) => {
    e.preventDefault();

    const { marca, colecao, descricao, arquivo } = data

    const formData = new FormData();
    formData.append('arquivo', arquivo[0]);
    formData.append('marca', marca);
    formData.append('colecao', colecao);
    formData.append('descricao', descricao);

    fetch('/img2img', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json()).then((data) => setResponseData(data))
      .catch((error) => { console.error(error) } // erros da api, conexão com ela, resposta dela, etc
      );
  };

  useEffect(() => {
    if (responseData) {
      setResponseData(responseData)
    }
  }, [responseData]);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Modal"
      >
        <div className="modal-main">
          <button onClick={closeModal} id="modal-close">X</button>
          {Object.keys(errors).length ? ( // https://stackoverflow.com/questions/32615713/tobetrue-vs-tobetruthy-vs-tobetrue#32767435
            <div className="modal-errors">
              <h1>Erros</h1>
              {errors.marca && <p className="error">Por favor, insira uma marca para a peça</p>}
              {errors.colecao && <p className="error">Por favor, digite uma coleção para a peça</p>}
              {errors.arquivo && <p className="error">Por favor, envie um arquivo da peça</p>}
              {errors.descricao && <p className="error">Por favor, digite uma descrição da peça</p>}
            </div>
          ) : (
            <div className="modal-result-wrapper">
              {responseData ? (
                <div className="modal-success">

                  <div className="modal-result-info">
                    <h1>Geração concluída, por favor avalie as imagens</h1>
                    <p>{responseData.marca}</p>
                    <p>{responseData.colecao}</p>
                    <p>{responseData.descricao}</p>
                  </div>

                  <div className="modal-success-gallery">
                    {responseData.imagem.map((image_data, index) => (
                      <div key={index} className="modal-result-img-wrapper">
                        <img
                          key={index}
                          className="modal-result-img"
                          width="200px"
                          src={`data:image/jpeg;base64,${image_data}`}
                          alt={`Resultado da geração ${index + 1}`} />
                        <div className="indica-aprovacao">
                          {selected.includes(image_data) ? (
                            <img src={V} height={24}/>
                          ) : (
                            <img src={R} height={24}/>
                          )}
                        </div>

                        <div className="modal-result-control">
                          <button className="modal-control" onClick={() => updateSelected(image_data)}><img src={V} height="32" alt="Ícone de verificado" /></button>
                          <button className="modal-control" onClick={() => updateUnselected(image_data)}><img src={R} height="32" alt="Ícone de refazer" /></button>
                        </div>
                      </div>
                    ))
                    }
                  </div> {/*  galeria */}
                  <button onClick={() => printarSelected()}>Printar selected</button>
                </div> // sucesso
              ) : (
                <div className="modal-wait">
                  <h1>Gerando imagem, por favor aguarde</h1>
                </div>
              )}
            </div> // modal
          )
          }
        </div>
      </Modal>
      <div className='card card-gerar'>
        <h2>Gerar imagem</h2>
        <form className='card-form' onSubmit={handleSubmit(submitHandler)}>
          <div className='card-marca-e-colecao'>

            <div>
              <label>
                <p>Marca:</p>
                <select id="marca" className='card-select' {...register('marca', { required: true })}>
                  <option value=""></option>
                  <option value="My Favorite Things">My Favorite Things</option>
                  <option value="Lança Perfume">Lança Perfume</option>
                  <option value="Amarante do Brasil">Amarante do Brasil</option>
                </select>
              </label>
            </div>

            <div>
              <label id="lbl-colecao">
                <p>Coleção:</p>
                <select id="colecao" className='card-select' {...register('colecao', { required: true })}>
                  <option value=""></option>
                  <option value="MY24">MY24</option>
                  <option value="MY23">MY23</option>
                  <option value="LP24">LP24</option>
                  <option value="LP23">LP23</option>
                </select>
              </label>
            </div>
          </div>

          <div className='card-descricao'>
            <label>
              <p>Descrição do produto:</p>
              <input type='textarea' id='descricao' placeholder='Insira aqui a descrição do produto' {...register('descricao', { required: true })} />
            </label>
          </div>

          <div className='card-upload'>
            <label>
              <p>Upload do esboço</p>
              <Controller
                name="arquivo"
                control={control}
                defaultValue={"sem-arquivo"}
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <input type='file'
                      {...field}
                      value={value?.fileName}
                      onChange={
                        event => {
                          onChange(event.target.files[0])
                        }}
                      {...register('arquivo', { required: true, type: 'file' })} />
                  );
                }} />
            </label>
          </div>

          <div className='card-submit'>
            <input className='card-submit-button' type="submit" value="Gerar imagem" onClick={submit} />
            <p>Créditos restantes: R$50.000</p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Gerar