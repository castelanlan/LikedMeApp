import React from "react";

import { Controller, useForm } from 'react-hook-form';
import { useState } from "react";
// import { useEffect } from "react";
import Modal from 'react-modal';
import './gerar.css'

import R from '../assets/R.png';
import V from '../assets/V.png';

Modal.setAppElement(document.getElementById('root'));

function Gerar(props) {
  
  const [responseData, setResponseData] = useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useState([]);
  
  const afterOpenModal = () => {}
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function updateUnselected(imagem) {
    setSelected(selected.filter((id) => id !== imagem));
  }
  
  function updateSelected(imagem) {
    if (selected.includes(imagem)) {
      return;
    }

    setSelected([...selected, imagem]);
  }

  const updateImages = (images) => {
    const data = structuredClone(responseData)
    console.log(`Atualizar imagens`)
    data.imagem = [...selected, ...images.imagem]
    setResponseData(data);
  }

  const [inputFormData, setInputFormData] = useState([]);
  
  const reprocessarSelecionados = () => {
    const remainingDataSet = new Set(responseData.imagem).difference(new Set(selected));
    const remainingData = Array.from(remainingDataSet);
    const formData = new FormData();
    
    const { marca, colecao, descricao, } = inputFormData
    
    console.log(`Reprocessar selecionados | ${responseData.imagem.length} - ${selected.length} = ${remainingData.length}`)

    if (remainingData.length === 0) {
      return;
    }
    
    formData.append('arquivo', remainingData);
    formData.append('reprocessar', true);
    formData.append('count', remainingData.length);
    formData.append('marca', marca);
    formData.append('colecao', colecao);
    formData.append('descricao', descricao);

    fetch('/img2img', {
      method: 'POST',
      body: formData 
    })
      .then((response) => response.json()).then((data) => {
        // console.log(data);
        // console.log(data.imagem)
        updateImages(data)
      })
      .catch((error) => {console.log(error)});
  }

  const confirmarSelecionados = () => {

    // console.log(`\`selected.lenght\` -> ${selected.length}`)
    // console.log(`\`remaining\` -> ${remainingData.length}`)
    return;
  }

  async function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const { control, register, handleSubmit, formState: { errors } } = useForm();
  
  const submitHandler = (data, e) => {
    e.preventDefault();
    
    const { marca, colecao, descricao, arquivo } = data
    setInputFormData(data);
  
    toBase64(arquivo[0]).then(imagemBase64 => {
      const formData = new FormData();
      formData.append('arquivo', imagemBase64); // Append base64 string
      formData.append('marca', marca);
      formData.append('colecao', colecao);
      formData.append('descricao', descricao);
    
      fetch('/img2img', {
          method: 'POST',
          body: formData,
      })
        .then((response) => response.json()).then((data) => {
            setResponseData(data);
          })
          .catch((error) => { console.error(error) } ); // erros da api, conexão com ela, resposta dela, etc estarão aqui 
      }
    )
  }
  
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

                  <div className="modal-success-header">
                    <h1>Por favor avalie as imagens</h1>
                  </div>

                  <div className="modal-success-row">
                    <div>
                      <p>{responseData.marca}</p>
                      <p>{responseData.colecao}</p>
                      <p>{responseData.descricao}</p>
                    </div>

                    <div className="modal-success-gallery">
                      {responseData.imagem.map((image_data, index) => (

                        <div key={index} className="modal-success-img-wrapper">
                          <img key={index} alt={`Resultado da geração ${index + 1}`}
                            className="modal-success-img"
                            src={`${image_data}`} />

                          <div className="indica-aprovacao">
                            {selected.includes(image_data) ? (<img src={V} height={24} alt="Imagem marcada como aprovada"/>) : (<img src={R} height={24} alt="Imagem marcada para reprocessamento"/>)}
                          </div>

                          <div className="modal-success-control">
                            <button className="modal-control" onClick={() => updateSelected(image_data)}><img src={V} height="32" alt="Marcar como aprovada" /></button>
                            <button className="modal-control" onClick={() => updateUnselected(image_data)}><img src={R} height="32" alt="Marcar para reprocessamento" /></button>
                          </div>

                        </div>)
                      )
                      }
                    </div> {/*  galeria */}
                  </div>
                  <div className="modal-success-actions">
                    <button onClick={() => confirmarSelecionados()}>Confirmar seleção</button>
                    <button onClick={() => reprocessarSelecionados() }>Reprocessar</button>
                  </div>
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
            <input className='card-submit-button' type="submit" value="Gerar imagem" onClick={openModal} />
            <p>Créditos restantes: R$50.000</p>
            <input className='card-submit-button' type="submit" value="Gerar imagem por excel" id="excel"/>
          </div>

        </form>
      </div>
      {selected.map((image, index) => {
      return (<div key={index} className="card">
        <img key={index} alt={`Imagem selecionada ${index}`} src={image} />
      </div>)
      })}
    </div>
  );
}

export default Gerar