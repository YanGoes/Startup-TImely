import "../styles/Geral.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function CadastroCliente() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        senha: "",
        confirmarSenha: ""
    });

    const [mensagem, setMensagem] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // valida senha
        if (form.senha !== form.confirmarSenha) {
            setMensagem("As senhas não coincidem!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/cliente/criar", {
                nome: form.nome,
                email: form.email,
                telefone: form.telefone,
                senha: form.senha
            });

            setMensagem("Cadastro realizado com sucesso!");

            // redireciona após 1.5s
            setTimeout(() => navigate("/login"), 1500);

        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            setMensagem("Erro ao conectar ao servidor.");
        }
    }

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
                                        className="fas fa-user-plus text-primary mb-3"
                                        style={{ fontSize: "4rem" }}
                                    ></i>
                                    <h2 className="fw-bold text-primary">Cadastro Cliente</h2>
                                    <p className="text-muted">Crie sua conta para agendar serviços</p>
                                </div>

                                {mensagem && (
                                    <div className="alert alert-info text-center">{mensagem}</div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label">
                                            <i className="fas fa-user me-2"></i>Nome Completo
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nome"
                                            name="nome"
                                            value={form.nome}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            <i className="fas fa-envelope me-2"></i>E-mail
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="telefone" className="form-label">
                                            <i className="fas fa-phone me-2"></i>Telefone
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="telefone"
                                            name="telefone"
                                            placeholder="(11) 99999-9999"
                                            value={form.telefone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="senha" className="form-label">
                                            <i className="fas fa-lock me-2"></i>Senha
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="senha"
                                            name="senha"
                                            value={form.senha}
                                            onChange={handleChange}
                                            required
                                            minLength="6"
                                        />
                                        <div className="form-text">Mínimo de 6 caracteres</div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="confirmarSenha" className="form-label">
                                            <i className="fas fa-lock me-2"></i>Confirmar Senha
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmarSenha"
                                            name="confirmarSenha"
                                            value={form.confirmarSenha}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100 py-3 mb-3">
                                        <i className="fas fa-user-plus me-2"></i>Criar Conta
                                    </button>
                                </form>

                                <div className="text-center">
                                    <p className="text-muted mb-0">
                                        Já tem uma conta?
                                        <Link
                                            to="/login"
                                            className="text-primary text-decoration-none fw-bold"
                                        >
                                            Faça login aqui
                                        </Link>
                                    </p>
                                </div>

                                <hr className="my-4" />

                                <div className="text-center">
                                    <p className="text-muted mb-0">
                                        É uma empresa?
                                        <Link
                                            to="/cadastroEmpresa"
                                            className="text-primary text-decoration-none fw-bold"
                                        >
                                            Cadastre sua empresa
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

export default CadastroCliente;
