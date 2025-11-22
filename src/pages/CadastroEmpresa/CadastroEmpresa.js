import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Geral.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function CadastroEmpresa() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nomeFantasia: "",
        cnpj: "",
        email: "",
        telefone: "",
        tipoServico: "",
        descricao: "",
        senha: "",
        confirmarSenha: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validação básica de senha
        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        // converter o tipoServico para o ENUM do backend
        const mapEnum = {
            "Beleza e Estética": "Beleza_Estética",
            "Saúde e Bem-estar": "Saúde_Bem_estar",
            "Manutenção e Reparos": "Manutenção_Reparos",
            "Consultoria": "Consultoria",
            "Educação": "Educação",
            "Tecnologia": "Tecnologia",
            "Limpeza": "Limpeza",
            "Alimentação": "Alimentação",
            "Transporte": "Transporte",
            "Outros": "Outros",
        };

        const payload = {
            nome: formData.nomeFantasia,
            email: formData.email,
            cnpj: formData.cnpj,
            tipoServico: mapEnum[formData.tipoServico],
            descServico: formData.descricao,
            senha: formData.senha
        };

        try {
            const response = await fetch("http://localhost:8080/empresa/criar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                alert("Erro ao cadastrar empresa!");
                return;
            }

            alert("Empresa cadastrada com sucesso!");
            navigate("/loginEmpresa");

        } catch (error) {
            console.error(error);
            alert("Erro ao conectar com o servidor.");
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
                        <div className="col-md-8 col-lg-6">
                            <div className="form-container">
                                <div className="text-center mb-4">
                                    <i className="fas fa-store text-primary mb-3" style={{ fontSize: "4rem" }}></i>
                                    <h2 className="fw-bold text-primary">Cadastro Empresa</h2>
                                    <p className="text-muted">Cadastre sua empresa e comece a receber clientes</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label"><i className="fas fa-store me-2"></i>Nome Fantasia</label>
                                            <input type="text" name="nomeFantasia" className="form-control" required onChange={handleChange} />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label"><i className="fas fa-id-card me-2"></i>CNPJ</label>
                                            <input type="text" name="cnpj" className="form-control" required onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label"><i className="fas fa-envelope me-2"></i>E-mail</label>
                                            <input type="email" name="email" className="form-control" required onChange={handleChange} />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label"><i className="fas fa-phone me-2"></i>Telefone</label>
                                            <input type="tel" name="telefone" className="form-control" required onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label"><i className="fas fa-tags me-2"></i>Tipo de Serviço</label>
                                        <select name="tipoServico" className="form-control" required onChange={handleChange}>
                                            <option value="">Selecione o tipo de serviço</option>
                                            <option value="Beleza e Estética">Beleza e Estética</option>
                                            <option value="Saúde e Bem-estar">Saúde e Bem-estar</option>
                                            <option value="Manutenção e Reparos">Manutenção e Reparos</option>
                                            <option value="Consultoria">Consultoria</option>
                                            <option value="Educação">Educação</option>
                                            <option value="Tecnologia">Tecnologia</option>
                                            <option value="Limpeza">Limpeza</option>
                                            <option value="Alimentação">Alimentação</option>
                                            <option value="Transporte">Transporte</option>
                                            <option value="Outros">Outros</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label"><i className="fas fa-align-left me-2"></i>Descrição</label>
                                        <textarea name="descricao" rows="3" className="form-control" required onChange={handleChange}></textarea>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label"><i className="fas fa-lock me-2"></i>Senha</label>
                                            <input type="password" name="senha" className="form-control" required onChange={handleChange} />
                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <label className="form-label"><i className="fas fa-lock me-2"></i>Confirmar Senha</label>
                                            <input type="password" name="confirmarSenha" className="form-control" required onChange={handleChange} />
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100 py-3 mb-3">
                                        <i className="fas fa-store me-2"></i> Cadastrar Empresa
                                    </button>
                                </form>

                                <div className="text-center">
                                    <p className="text-muted mb-0">
                                        Já tem uma conta?
                                        <Link to="/loginEmpresa" className="text-primary fw-bold ms-2">Faça login aqui</Link>
                                    </p>
                                </div>

                                <hr className="my-4" />

                                <div className="text-center">
                                    <p className="text-muted mb-0">
                                        É um cliente?
                                        <Link to="/cadastroCliente" className="text-primary fw-bold ms-2">Cadastre-se aqui</Link>
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

export default CadastroEmpresa;
