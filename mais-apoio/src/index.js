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
import ConteudoApresentacao from './pages/ConteudoApresentacao/ConteudoApresentacao';
import ConteudoQuemSomos from './pages/ConteudoQuemSomos/ConteudoQuemSomos';
import ConteudoAreaParaAjudar from './pages/ConteudoAreaParaAjudar/ConteudoAreaParaAjudar';
import ConteudoAreaBeneficiario from './pages/ConteudoAreaBeneficiario/ConteudoAreaBeneficiario';
import ConteudoTodosCadastros from './pages/ConteudoTodosCadastros/ConteudoTodosCadastros';
import CadastroDoador from './pages/CadastroDoadorPage/CadastroDoador';
import CadastroEmpresa from './pages/CadastroEmpresaPage/CadastroEmpresa';
import CadastroVoluntario from './pages/CadastroVoluntarioPage/CadastroVoluntario';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}>
          <Route path="apresentacao" element={<ConteudoApresentacao />} />
          <Route path="quem-somos" element={<ConteudoQuemSomos />} />
          <Route path="quero-ajudar" element={<ConteudoAreaParaAjudar />} />
          <Route path="preciso-de-ajuda" element={<ConteudoAreaBeneficiario />} />
          <Route path="todos-cadastros" element={<ConteudoTodosCadastros />} />
          <Route path="cadastro-beneficiario" element={<CadastroBeneficiario />} />
          <Route path="cadastro-doador" element={<CadastroDoador />} />
          <Route path="cadastro-empresa" element={<CadastroEmpresa />} />
          <Route path="cadastro-voluntario" element={<CadastroVoluntario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
>>>>>>> 446259f3b0b8deb5f2d75cc0ec93e0e98929605e
