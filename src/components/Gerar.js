import React from "react";
import fileTypeChecker from "file-type-checker";
import { Controller, useForm } from 'react-hook-form';
import { useState } from "react";

import './gerar.css'

function Gerar(props) {

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

  const [responseData, setResponseData] = useState(null);
  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = (data, e) => {
    e.preventDefault();
    console.log(data)

    const { marca, colecao, descricao, arquivo } = data
    // const file = arquivo[0]

    const formData = new FormData();
    formData.append('arquivo', arquivo[0]);
    // data = { ...data, picture: data.picture[0].name };
    formData.append('marca', marca);
    formData.append('colecao', colecao);
    formData.append('descricao', descricao);

    fetch('/form', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        response = response.json();
        setResponseData(response)
        console.log(response)
      })
      .catch((error) => {
        // Handle request errors
      });
  };
  return (
    <div>
      <div className='card'>
        <h2>Gerar imagem</h2>
        <form className='card-form' onSubmit={handleSubmit(submitHandler)}>
          <div className='card-marca-e-colecao'>
            <div>
              <label>
                <p>Marca:</p>
                {errors.marca && <p className="error">Marca is required</p>}
                <select id="marca" className='card-select' {...register('marca', { required: true })}>
                  <option>-</option>
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
                  <option>-</option>
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
              {errors.descricao && <p className="error">Descrição is required</p>}
              {errors.descricao && <span className="error" style={{ color: 'red', marginTop: '.5em' }}>Por favor, digite uma descrição do produto</span>}
            </label>

          </div>
          <div className='card-upload'>
            <label>
              <p>Upload do esboço</p>
              <Controller name="arquivo"
                control={control}
                defaultValue={"sem-arquivo"}
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <input type='file'
                      {...field}
                      value={value?.fileName}
                      onChange={
                        event => { onChange(event.target.files[0]) 
                      }}
                      {...register('arquivo', { required: true, type: 'file' })} />
                  );
                }}
              />
            </label>
            {errors.file && <span className="error" style={{ color: 'red', paddingTop: '.5em' }}>Por favor, envie um arquivo do produto</span>}
          </div>
          <div className='card-submit'>
            <input className='card-submit-button' type="submit" value="Gerar imagem" />
            {/* <button>Salvar</button> */}
            <p>Créditos restantes: R$50.000</p>
          </div>
        </form>
      </div>
      {responseData && <div className="card">Resposta!!</div>}
    </div>
  );
}

export default Gerar