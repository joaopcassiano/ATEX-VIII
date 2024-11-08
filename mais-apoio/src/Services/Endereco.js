import React, { useState } from 'react';
import axios from 'axios';

export default async function AcharCep(cepDigitado){
  console.log('chegou')
  return axios.get(`https://viacep.com.br/ws/${cepDigitado}/json/`)
}