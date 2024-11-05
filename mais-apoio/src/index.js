<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/HomePage/Home';
import Teste from './Componentes/teste/Teste';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
=======
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
>>>>>>> 446259f3b0b8deb5f2d75cc0ec93e0e98929605e
