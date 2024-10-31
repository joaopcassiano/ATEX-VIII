import axios from 'axios';

export default async function AcharCep(cepDigitado){
  return axios.get(`https://viacep.com.br/ws/${cepDigitado}/json/`)
}