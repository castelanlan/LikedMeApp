import React from "react";

import Masonry from "react-responsive-masonry";
import { Controller, useForm } from 'react-hook-form';
import { useState } from "react";
import { useEffect } from "react";
import Modal from 'react-modal';
import './gerar.css';

import R from '../assets/R.png';
import V from '../assets/V.png';
import loading from '../assets/loading.gif';

Modal.setAppElement(document.getElementById('root'));

async function toBase64(file: any): Promise<string | any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

async function getImageDimensions(file: string[]) {
  return new Promise(function (resolved, reject) {
    var i: any = new Image()
    i.onload = function () {
      resolved({ w: i.naturalWidth, h: i.naturalHeight })
    };
    i.src = file
    i.onerror = (error: any) => reject(error)
  })
}

function WaitingImage({ progressObj }) {
  const progress = Number(parseFloat(progressObj["progress"]?.toFixed(2))) * 100;
  const eta = parseFloat(progressObj["eta_relative"]).toFixed(2);
  const currentImage = progressObj["current_image"];

  return (
    <>
      <h1>Gerando imagem, por favor aguarde</h1>
    <div className="modal-wait">
      {currentImage && (<img className="parcial-image" key="parcial_image" alt="Resultado parcial da geração" src={`data:image/jpeg;base64,${currentImage}`} />)}
      <p className="progress">{!Number.isNaN(progress) ? (parseInt(progress.toString())) : ('')}<span style={{"fontWeight": "normal"}}>%</span></p>
      <p className="eta">Sua imagem está quase pronta.</p>
      <p className="eta">{!Number.isNaN(parseFloat(eta)) ? (eta) : ('')} segundos restantes</p>
    </div>
    </>
  );
}

function Gerar() {

  const [responseData, setResponseData] = useState<SdApiResponse>({} as SdApiResponse);
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const [progressObj, setProgressObj] = useState<any>({});

  const afterOpenModal = () => { }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!waitingResponse) {
        return 0
      }
      fetch("/sdapi/v1/progress").then(res => res.json()).then(res => {
        setProgressObj(res)
      }
      )
    }, 3000)

    return () => clearInterval(intervalId)
  }, [waitingResponse])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function updateUnselected(imagem: string) {
    setSelected(selected.filter((id) => id !== imagem));
  }

  function updateSelected(imagem: string) {
    if (selected.includes(imagem)) {
      return;
    }

    setSelected([...selected, imagem]);
  }

  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = (data: any, e: any) => {
    e.preventDefault();

    const { marca, colecao, descricao, arquivo } = data
    console.log(arquivo);

    toBase64(arquivo[0]).then(imagemBase64 => {
      setWaitingResponse(true);
      getImageDimensions(imagemBase64).then((a: any) => {
        imagemBase64 = imagemBase64.replace("data:image/jpeg;base64,", "")
        // Gerando com todos os parâmetros fazia a imagem voltar somente um quadrado sólido sem desenho algum
        var req_json = {
          "prompt": descricao,
          "negative_prompt": "illustration, painting, drawing, art, sketch, deformed, ugly, mutilated, disfigured, text, extra limbs, face cut, head cut, extra fingers, extra arms, poorly drawn face, mutation, bad proportions, cropped head, malformed limbs, mutated hands, fused fingers, long neck, lowres, error, cropped, worst quality, low quality, jpeg artifacts, out of frame, watermark, signature",
          "sampler_name": "DPM++ 2M",
          "scheduler": "Karras",
          "batch_size": 4,
          "steps": 50,
          "cfg_scale": 15,
          "width": a.w,
          "height": a.h,
          "tiling": false,
          "init_images": [
            imagemBase64
          ],
          "sampler_index": "Euler",
          "enable_hr": true,
          "hr_scale": 2,
          "denoising_strength": 0.7,
          "hr_second_pass_steps": 10,
          "hr_upscaler": "R-ESRGAN"
        }

        let bod = JSON.stringify(req_json);

        fetch(`/sdapi/v1/img2img`, {
          method: 'POST',
          headers: new Headers({
            'Method': 'POST',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }),
          referrerPolicy: "unsafe-url",

          body: bod
        })
          .then((response) => response.json()).then((data) => {
            data.filled = true;
            data.imagem = data["images"].map((item: string) => "data:image/jpeg;base64," + item)
            data.marca = marca
            data.colecao = colecao
            data.descricao = descricao

            if (data["error"] | data["errors"]) {
              console.error(`Erro ${data["error"]}\n${data["errors"]}`)
            }

            setResponseData(data);
            setWaitingResponse(false);
          })
          .catch((error) => { console.error(error) });
      })
    })
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
              {responseData.filled ? (
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
                      {responseData.imagem.length > 0 ? (
                        responseData.imagem.map((image_data, index) => (
                          <div key={index} className="modal-success-img-wrapper">
                            <img key={index} alt={`Resultado da geração ${index + 1}`}
                              className="modal-success-img"
                              src={image_data} />

                            <div className="indica-aprovacao">
                              {selected.includes(image_data) ? (<img src={V} height={24} alt="Imagem marcada como aprovada" />) : (<img src={R} height={24} alt="Imagem marcada para reprocessamento" />)}
                            </div>

                            <div className="modal-success-control">
                              <button className="modal-control" onClick={() => updateSelected(image_data)}><img src={V} height="32" alt="Marcar como aprovada" /></button>
                              <button className="modal-control" onClick={() => updateUnselected(image_data)}><img src={R} height="32" alt="Marcar para reprocessamento" /></button>
                            </div>

                          </div>
                        )
                        )
                      ) : (
                        Object.values(responseData.result_ids).map((id, index: number) => (
                          <div key={index} className="modal-success-img-wrapper">
                            <img key={index} alt={`Imagem ${id} está carregando`}
                              className="modal-success-img modal-waiting-img"
                              src={loading} />
                          </div>
                        )
                        )
                      )}
                    </div> {/* galeria */}
                  </div>
                  {/* <div className="modal-success-actions"> */}
                    {/* <button onClick={() => confirmarSelecionados()}>Confirmar seleção</button> */}
                    {/* <button onClick={() => reprocessarSelecionados()}>Reprocessar</button> */}
                  {/* </div> */}
                </div> // sucesso
              ) : (
                <div className="modal-wait">
                  <WaitingImage progressObj={progressObj}/>
                </div>
              )}
            </div> // modal
          )
          }
        </div>
      </Modal>
      {/* <ResponsiveMasonry columnsCountBreakPoints={{ 1200: 3, 700: 2, 300: 1 }}> */}
      <Masonry gutter="1.5rem" className="masonry">
        <div className='card card-gerar'>
          <h2>Gerar imagem</h2>
          <form className='card-form' onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data">
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
                        {...register('arquivo', { required: true })} />
                    );
                  }} />
              </label>
            </div>

            <div className='card-submit'>
              <input className='card-submit-button' type="submit" value="Gerar imagem" onClick={openModal} />
              {/* <>
               {creditos ? (<p>Créditos restantes: {creditos}</p>) : (<></>)}
              </> */}
              <input className='card-submit-button' type="submit" value="Gerar imagem por excel" id="excel" />
            </div>

          </form>
        </div>
        {selected.map((image, index) => {
          return (<div key={index} className="card card-image">
            <img key={index} alt={`Imagem selecionada ${index}`} src={image} />
          </div>)
        })}
      </Masonry>
    </div>
  );
}

export default Gerar