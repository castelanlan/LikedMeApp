declare module '*.png';

declare module 'react-responsive-masonry';

declare module 'react-modal';

interface SdApiResponse {
  imagem: string[],
  marca: string[],
  colecao: string[],
  descricao: string[],
  filled: boolean
}
  
interface InputFormData {
  arquivo: string[],
  reprocessar: 'true' | 'false',
  count: Int16Array,
  marca: string,
  colecao: string,
  descricao: string
}

interface Imagem {
  imagem: string[]
}