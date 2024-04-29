import React from "react";
// import fileTypeChecker from "file-type-checker";
import { Controller, useForm } from 'react-hook-form';
import { useState } from "react";
import { useEffect } from "react";
import Modal from 'react-modal';
import './gerar.css'

Modal.setAppElement(document.getElementById('root'));

function Gerar(props) {

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    console.log(errors)
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [responseData, setResponseData] = useState(null);
  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = (data, e) => {
    e.preventDefault();
    // console.log(data)

    const { marca, colecao, descricao, arquivo } = data

    const formData = new FormData();
    formData.append('arquivo', arquivo[0]);
    formData.append('marca', marca);
    formData.append('colecao', colecao);
    formData.append('descricao', descricao);

    fetch('/form', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json()).then((data) => setResponseData(data))
      .catch((error) => { console.error(error) }
      );
  };

  useEffect(() => {
    if (responseData) {
      // console.log(responseData); // Optional: log the response data
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
          {Object.keys(errors).length ? ( // https://stackoverflow.com/questions/32615713/tobetrue-vs-tobetruthy-vs-tobetrue#32767435
            <div className="modal-errors">
              <h1>Erros</h1>
              {errors.marca && <p className="error">Por favor, insira uma marca para a peça</p>}
              {errors.colecao && <p className="error">Por favor, digite uma coleção para a peça</p>}
              {errors.arquivo && <p className="error">Por favor, envie um arquivo da peça</p>}
              {errors.descricao && <p className="error">Por favor, digite uma descrição da peça</p>}
            </div>
          ) : (
            <div className="card-result-wrapper">
              {/* <h1 id="modal-title">Gerando imagens...</h1> */}
              {responseData &&
                <div className="modal-success">
                  {responseData.imagem.map((imagem, index) => (
                    <div className="modal-result-img-wrapper">
                      <img
                        key={index}
                        className="modal-result-img"
                        width="200px"
                        src={`data:image/jpeg;base64,${imagem}`}
                        alt={`Resultado da geração ${index + 1}`}
                      />
                      <div className="modal-result-control">
                        <button className="modal-control">Aprovar</button>
                        <button className="modal-control">Negar</button>
                      </div>
                    </div>
                  ))}
                  {/* <div className="card-result-info">
                    <p>{responseData.marca}</p>
                    <p>{responseData.colecao}</p>
                  </div>
                  <p>{responseData.descricao}</p> */}
                </div>
              }
            </div>
          )
          }
          <button onClick={closeModal} id="modal-close">Fechar</button>
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
          </div>

        </form>
      </div>
    </div>
  );
}

export default Gerar