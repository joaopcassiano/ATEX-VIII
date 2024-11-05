// import React, { useState } from 'react';
// import axios from 'axios';

// const EnderecoForm = () => {
//   const [cep, setCep] = useState('');
//   const [temRua, setTemRua] = useState(true);
//   const [temBairro, setTemBairro] = useState(true);
//   const [endereco, setEndereco] = useState({
//     rua: '',
//     bairro: '',
//     numero: '',
//     complemento: '',
//     cidade: '',
//     estado: '',
//     cep: ''
//   });

//   const [erroCep, setErroCep] = useState('');

//   const handleCepChange = async (e) => {
//     const cepDigitado = e.target.value.replace(/\D/g, '');
//     setCep(cepDigitado);

//     if (cepDigitado.length === 8) {
//       try {
//         const response = await axios.get(`https://viacep.com.br/ws/${cepDigitado}/json/`);
//         if (response.data.erro) {
//           setErroCep('CEP inválido.');
//           setTemRua(true);
//           setTemBairro(true);
//           setEndereco({
//             rua: '',
//             bairro: '',
//             cidade: '',
//             estado: '',
//             numero: '',
//             complemento: ''
//           });
//         } else {
//           setErroCep('');
//           setEndereco({
//             ...endereco,
//             rua: response.data.logradouro || setTemRua(false),
//             bairro: response.data.bairro || setTemBairro(false),
//             cidade: response.data.localidade || '',
//             estado: response.data.uf,
//             numero: '',
//             complemento: '',
//             cep: cepDigitado
//           });
//         }
//       } catch (error) {
//         setErroCep('Erro ao buscar o CEP.');
//         setTemRua(true);
//         setTemBairro(true);
//         console.error('Erro na consulta do CEP:', error);
//       }
//     } else {
//       setEndereco({
//         rua: '',
//         bairro: '',
//         cidade: '',
//         estado: '',
//         numero: '',
//         complemento: ''
//       });
//       setErroCep('');
//       setTemRua(true);
//       setTemBairro(true);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEndereco({ ...endereco, [name]: value });
//   };

//   return (
//     <div>
//       <h3>Cadastro de Endereço</h3>

//       <div className="form-group">
//         <label>CEP:</label>
//         <input
//           type="text"
//           className="form-control"
//           value={cep}
//           onChange={handleCepChange}
//           placeholder="Digite seu CEP"
//           maxLength="8"
//         />
//         {erroCep && <small className="text-danger">{erroCep}</small>}
//       </div>

//       <div className="form-group">
//         <label>Rua:</label>
//         <input
//           type="text"
//           className="form-control"
//           value={endereco.rua}
//           name="rua"
//           onChange={handleInputChange}
//           readOnly={(temRua === true && endereco.cep !== '')}   
//         />
//       </div>

//       <div className="form-group">
//         <label>Bairro:</label>
//         <input
//           type="text"
//           className="form-control"
//           value={endereco.bairro}
//           name="bairro"
//           onChange={handleInputChange}
//           readOnly={( temBairro === true && endereco.cep !== '')}    
//         />
//       </div>

//       <div className="form-group">
//         <label>Cidade:</label>
//         <input
//           type="text"
//           className="form-control"
//           value={endereco.cidade}
//           name="cidade"
//           readOnly
//         />
//       </div>

//       <div className="form-group">
//         <label>Estado:</label>
//         <input
//           type="text"
//           className="form-control"
//           value={endereco.estado}
//           name="estado"
//           readOnly
//         />
//       </div>

//       <div className="form-group">
//         <label>Número:</label>
//         <input
//           type="text"
//           className="form-control"
//           value={endereco.numero}
//           name="numero"
//           onChange={handleInputChange}
//           placeholder="Número"
//         />
//       </div>

//       <div className="form-group">
//         <label>Complemento:</label>
//         <input
//           type="text"
//           className="form-control"
//           value={endereco.complemento}
//           name="complemento"
//           onChange={handleInputChange}
//           placeholder="Complemento"
//         />
//       </div>

//       <button className="btn btn-primary">Cadastrar Endereço</button>
//     </div>
//   );
// };

// export default EnderecoForm;

const Teste = () => {

    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Valida tamanho e repetição
      
        let soma = 0, resto;
      
        // Calcula o primeiro dígito verificador
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[9])) return false;
      
        soma = 0;
        // Calcula o segundo dígito verificador
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
      
        return resto === parseInt(cpf[10]);
      }
      
      const cpf = "111.111.111-12";
      console.log(validarCPF(cpf) ? "CPF válido" : "CPF inválido");
      console.log("sssssssssssssssssssssssssssssss")

      return (
        <div>
            casa
        </div>
      )

}


export default Teste;