import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from "./pages/home/Home.js"
import Login from './pages/Login/Login.js'
import LoginEmpresa from "./pages/LoginEmpresa/LoginEmpresa.js"
import CadastroCliente from './pages/CadastroCliente/CadastroCliente.js';
import CadastroEmpresa from './pages/CadastroEmpresa/CadastroEmpresa.js';
import Cliente from './pages/cliente/Cliente.js';
import Empresa from './pages/Empresa/Empresa.js';
import Planos from "./pages/Planos/Planos.js";
import CheckoutAssinatura from "./pages/CheckoutAssinatura/CheckoutAssinatura.js";


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Navigate to="/home"/>} />

          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={(<Login/>)}/>
          <Route path="/loginEmpresa" element={(<LoginEmpresa/>)}/>
          <Route path="/cadastroCliente" element={(<CadastroCliente/>)}/>
          <Route path="/cadastroEmpresa" element={(<CadastroEmpresa/>)}/>
          <Route path="/cliente" element={(<Cliente/>)}/>
          <Route path="/empresa" element={(<Empresa/>)}/>
          <Route path="/planos" element={<Planos />} />
          <Route path="/checkout" element={<CheckoutAssinatura />} />
      </Routes>
    </Router>
    
  );
}

export default App;
