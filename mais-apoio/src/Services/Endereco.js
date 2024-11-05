<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';

export default async function AcharCep(cepDigitado){
  console.log('chegou')
  return axios.get(`https://viacep.com.br/ws/${cepDigitado}/json/`)
=======
import axios from 'axios';

export default async function AcharCep(cepDigitado){
  return axios.get(`https://viacep.com.br/ws/${cepDigitado}/json/`)
>>>>>>> 446259f3b0b8deb5f2d75cc0ec93e0e98929605e
}