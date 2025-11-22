import "../styles/Geral.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate(); // para redirecionar após login

    const handleSubmit = async (e) => {
        e.preventDefault(); // evita reload da página

        try {
            const response = await axios.post("http://localhost:8080/cliente/login", {
                email,
                senha
            });

            if (response.data.sucesso) {
                // Salva cliente logado no localStorage
                localStorage.setItem("cliente", JSON.stringify(response.data.cliente));

                alert("Login realizado com sucesso!");
                console.log("Cliente logado:", response.data.cliente);

                // Redireciona para a home
                navigate("/home");
            } else {
                alert(senha)

                alert(response.data.mensagem || "Credenciais inválidas");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao conectar ao servidor.");
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold text-primary" to="/home">
                        <i className="fas fa-clock me-2"></i>Timely
                    </Link>
                </div>
            </nav>

            <section className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-5">
                            <div className="form-container">
                                <div className="text-center mb-4">
                                    <i
                                        className="fas fa-user-circle text-primary mb-3"
                                        style={{ fontSize: "4rem" }}
                                    ></i>
                                    <h2 className="fw-bold text-primary">Login Cliente</h2>
                                    <p className="text-muted">Entre na sua conta para agendar serviços</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            <i className="fas fa-envelope me-2"></i>E-mail
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="senha" className="form-label">
                                            <i className="fas fa-lock me-2"></i>Senha
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="senha"
                                            value={senha}
                                            onChange={(e) => setSenha(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100 py-3 mb-3">
                                        <i className="fas fa-sign-in-alt me-2"></i>Entrar
                                    </button>
                                </form>

                                <div className="text-center">
                                    <p className="text-muted mb-0">
                                        Não tem uma conta?
                                        <Link
                                            to="/cadastroCliente"
                                            className="text-primary text-decoration-none fw-bold"
                                        >
                                            {" "}Cadastre-se aqui
                                        </Link>
                                    </p>
                                </div>

                                <hr className="my-4" />

                                <div className="text-center">
                                    <p className="text-muted mb-0">
                                        É uma empresa?
                                        <Link
                                            to="/loginEmpresa"
                                            className="text-primary text-decoration-none fw-bold"
                                        >
                                            Faça login como empresa
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
