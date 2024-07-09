import React from "react";

import Masonry from "react-responsive-masonry";
import { Controller, useForm } from 'react-hook-form';
import { useState } from "react";
// import { useEffect } from "react";
import Modal from 'react-modal';
import './gerar.css';

import R from '../assets/R.png';
import V from '../assets/V.png';
import loading from '../assets/loading.gif';

Modal.setAppElement(document.getElementById('root'));

function Gerar() {

  const [responseData, setResponseData] = useState<SdApiResponse>({} as SdApiResponse);
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  // const [creditos, setCreditos] = useState<number>(0);

  const afterOpenModal = () => { }

  // useEffect(() => {
  //   try {
  //     fetch('http://localhost:5000/credits').then((response) => response.json()).then((data) => {
  //       setCreditos(data["credits"]);
  //     })
  //   } catch (error) { }
  // }, [])

  // useEffect(() => {
  //   try {
  //     const interval = setInterval(() => {
  //       fetch('http://localhost:5000/results').then((response) => response.json()).then((data) => {
  //         // console.log(data)
  //         // console.log(responseData)

  //         if (data.length < 1) {
  //           return
  //         }
        
  //         // console.log("passemo")
  //         // var newResponseData = responseData;
  //         // var imagens = [...data.map((obj: any) => obj.result_img)];
  //         updateImages(data)
  //         // newResponseData["imagem"] = imagens;
  //         // setResponseData(newResponseData);
  //       })
  //     }, 2000)
  //     return () => clearInterval(interval)

  //   } catch (error) {
  //     console.log(error)
  //   }

  // }
  // )

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

  // const updateImages = (data_a: any) => {
  //   const data = structuredClone(responseData)
  //   console.log(`Atualizar imagens`)
  //   console.log(data_a)
  //   console.log(data_a.imagem)
  //   data.imagem = [...selected, ...Object.values(data_a).map(((d: any) => d.result_img))]
  //   setResponseData(data);
  // }

  // const [inputFormData, setInputFormData] = useState<InputFormData | any>([]); // todo: `any`

  // const reprocessarSelecionados = () => {

  //   const remainingDataSet: [] = (new Set(responseData.imagem) as any).difference(new Set(selected));
  //   const remainingData: string[] | any = Array.from(remainingDataSet);
  //   const formData = new FormData();

  //   const { marca, colecao, descricao, } = inputFormData

  //   console.log(`Reprocessar selecionados | ${responseData.imagem.length} - ${selected.length} = ${remainingData.length}`)

  //   if (remainingData.length === 0) {
  //     return;
  //   }

  //   formData.append('arquivo', remainingData.toString());
  //   formData.append('reprocessar', 'true');
  //   formData.append('count', remainingData.length);
  //   formData.append('marca', marca);
  //   formData.append('colecao', colecao);
  //   formData.append('descricao', descricao);

  //   fetch('http://10.100.35.23:7860/sdapi/v1/img2img', {
  //     method: 'POST',
  //     body: formData
  //   })
  //     .then((response) => response.json()).then((data) => {
  //       updateImages(data)
  //     })
  //     .catch((error) => { console.log(error) });
  // }

  // const confirmarSelecionados = () => {

  //   // console.log(`\`selected.lenght\` -> ${selected.length}`)
  //   // console.log(`\`remaining\` -> ${remainingData.length}`)
  //   return;
  // }

  async function toBase64(file: any): Promise<string | any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = (data: any, e: any) => {
    e.preventDefault();

    const { marca, colecao, descricao, arquivo } = data
    // setInputFormData(data);

    toBase64(arquivo[0]).then(imagemBase64 => {
      imagemBase64 = imagemBase64.replace("data:image/jpeg;base64,", "")
      // Gerando com todos os parâmetros fazia a imagem voltar somente um quadrado sólido sem desenho algum
      var req_json = {
        "prompt": descricao,
        // "negative_prompt": "",
        // "styles": [],
        // "seed": -1,
        // "subseed": -1,
        // "subseed_strength": 0,
        // "seed_resize_from_h": -1,
        // "seed_resize_from_w": -1,
        "sampler_name": "DPM++ 2M",
        "scheduler": "Karras",
        // "batch_size": 1,
        // "n_iter": 1,
        "steps": 50,
        "cfg_scale": 7,
        "width": 512,
        "height": 512,
        // "restore_faces": true,
        "tiling": true,
        // "do_not_save_samples": false,
        // "do_not_save_grid": false,
        // "eta": 0,
        "denoising_strength": 0.75,
        // "s_min_uncond": 0,
        // "s_churn": 0,
        // "s_tmax": 0,
        // "s_tmin": 0,
        // "s_noise": 0,
        // "override_settings": {},
        // "override_settings_restore_afterwards": true,
        // "refiner_checkpoint": "string",
        // "refiner_switch_at": 0,
        // "disable_extra_networks": false,
        // "firstpass_image": "string",
        // "comments": {},
        "init_images": [
            imagemBase64
        ],
        // "resize_mode": 0,
        // "image_cfg_scale": 0,
        // "mask": "",
        // "mask_blur_x": 4,
        // "mask_blur_y": 4,
        // "mask_blur": 0,
        // "mask_round": true,
        // "inpainting_fill": 0,
        // "inpaint_full_res": true,
        // "inpaint_full_res_padding": 0,
        // "inpainting_mask_invert": 0,
        // "initial_noise_multiplier": 0,
        // "latent_mask": "",
        // "force_task_id": "",
        "sampler_index": "Euler",
        // "include_init_images": false,
        // "script_name": "",
        // "script_args": [],
        // "send_images": true,
        // "save_images": false,
        // "alwayson_scripts": {},
        // "infotext": "string"
    }

      let bod = JSON.stringify(req_json);
      console.log(bod)

      fetch(`/sdapi/v1/img2img`, {
        method: 'POST',
        headers: new Headers({
          'Method': 'POST',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
        }),
        referrerPolicy: "unsafe-url",

        body: bod
      })
        .then((response) => response.json()).then((data) => {
          // console.log(data);
          data["filled"] = true;
          data["imagem"] = data["images"].map((item: string) => "data:image/jpeg;base64," + item)
          data["marca"] = marca
          data["colecao"] = colecao
          data["descricao"] = descricao
          
          setResponseData(data);
        })
        .catch((error) => { console.error(error) });
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
                    </div> {/*  galeria */}
                  </div>
                  <div className="modal-success-actions">
                    {/* <button onClick={() => confirmarSelecionados()}>Confirmar seleção</button> */}
                    {/* <button onClick={() => reprocessarSelecionados()}>Reprocessar</button> */}
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
      {/* </ResponsiveMasonry> */}
    </div>
  );
}

export default Gerar