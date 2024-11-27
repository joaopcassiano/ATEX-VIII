import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/HomePage/Home';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import CadastroBeneficiario from './pages/CadastroBeneficiarioPage/CadastroBeneficiario';
import ConteudoApresentacao from './pages/ConteudoApresentacao/ConteudoApresentacao';
import ConteudoQuemSomos from './pages/ConteudoQuemSomos/ConteudoQuemSomos';
import ConteudoAreaParaAjudar from './pages/ConteudoAreaParaAjudar/ConteudoAreaParaAjudar';
import ConteudoAreaBeneficiario from './pages/ConteudoAreaBeneficiario/ConteudoAreaBeneficiario';
import ConteudoTodosCadastros from './pages/ConteudoTodosCadastros/ConteudoTodosCadastros';
import CadastroDoador from './pages/CadastroDoadorPage/CadastroDoador';
import CadastroEmpresa from './pages/CadastroEmpresaPage/CadastroEmpresa';
import CadastroVoluntario from './pages/CadastroVoluntarioPage/CadastroVoluntario';
import Beneficiario from './pages/BeneficiarioPage/Beneficiario';
import Perfil from './Componentes/Perfil/Perfil';
import ConsultarDoacoes from './pages/ConsultarDoacoesPage/ConsultarDoacoes';
import ConsultaGeralBeneficiario from './pages/ConsultaGeralBeneficiario/ConsultaGeralBeneficiario';
import Voluntario from './pages/VoluntarioPage';
import Voluntariar from './pages/Voluntariar';
import ConsultarHistorico from './pages/ConsultarVoluntarioPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home/apresentacao" />} />
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
        <Route path="/beneficiario" element={<Beneficiario />}>
          <Route path="perfil" element={<Perfil tipoUsuario='Beneficiario' />} />
          <Route path="consultar-doacoes" element={<ConsultarDoacoes />} />
          <Route path="consulta-geral" element={<ConsultaGeralBeneficiario />} />
          <Route path="informacoes" element={<informacoesBeneficiario />} />
        </Route>
        <Route path="/Voluntario" element={<Voluntario />}>
          <Route path="perfil" element={<Perfil tipoUsuario="Voluntario" />} />
          <Route path="voluntariar-se" element={<Voluntariar />} />
          <Route path="consulta" element={<ConsultarHistorico />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
