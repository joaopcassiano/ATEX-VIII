import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/HomePage/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CadastroBeneficiario from './pages/CadastroBeneficiarioPage/CadastroBeneficiario';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<CadastroBeneficiario />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
