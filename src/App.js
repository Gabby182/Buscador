import {useState} from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import './styles.css';

import api from './services/Api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const cleaning = () => {
    setInput("");
    setCep("");
  }

  const handleSearch = async () => {
    if(input === ''){
    alert("Por gentileza informar um CEP!");
    return;
    }

    try{
      const response = await api.get(`${input}/json`);
      console.log(response);
      setCep(response.data);
      setInput("");
    }
    catch{
      alert('Erro ao buscar CEP!')
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className = "title">Busca CEP</h1>
      <div className="containerInput">
        <input type="text" placeholder="Digite um CEP..."
        value={input}
        onChange={(event)=> setInput(event.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <AiOutlineSearch size={25} color="white"/>
        </button>
      </div>

      {Object.keys(cep).length > 1 && 
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade/UF: {cep.localidade} - {cep.uf}</span>
      </main>
      }

      <button className="buttonCleaner" onClick={cleaning}>
        Limpar
      </button>
      
    </div>
  );
}

export default App;
