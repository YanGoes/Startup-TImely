import "../styles/Geral.css";


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Link } from "react-router-dom";



function Home() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold text-primary" to="/home">
                        <i className="fas fa-clock me-2"></i>Timely
                    </Link>
                </div>
            </nav>

          
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center min-vh-100">
                        <div className="col-lg-6">
                            <div className="hero-content">
                                <h1 className="display-4 fw-bold text-primary mb-4">
                                    Conecte-se com os melhores prestadores de serviço
                                </h1>
                                <p className="lead text-muted mb-5">
                                    A Timely é a plataforma que conecta clientes a empresas prestadoras de serviço de forma rápida, segura e eficiente. Agende seus serviços ou ofereça seus serviços profissionais.
                                </p>

                                <div className="d-flex flex-column flex-md-row gap-3">
                                    <Link to="/Login"className="btn btn-primary btn-lg px-4 py-3">
                                        <i className="fas fa-user me-2"></i>Sou Cliente
                                    </Link>
                                    <Link to="/LoginEmpresa" className="btn btn-outline-primary btn-lg px-4 py-3">
                                        <i className="fas fa-building me-2"></i>Sou Empresa
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-image text-center">
                                <i className="fas fa-handshake hero-icon text-primary"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

         
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col-12">
                            <h2 className="fw-bold text-primary">Como funciona</h2>
                            <p className="text-muted">Simples, rápido e eficiente</p>
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="feature-card text-center p-4">
                                <div className="feature-icon mb-3">
                                    <i className="fas fa-search text-primary"></i>
                                </div>
                                <h5 className="fw-bold">Encontre Serviços</h5>
                                <p className="text-muted">Navegue por centenas de prestadores de serviço qualificados</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="feature-card text-center p-4">
                                <div className="feature-icon mb-3">
                                    <i className="fas fa-calendar-alt text-primary"></i>
                                </div>
                                <h5 className="fw-bold">Agende Online</h5>
                                <p className="text-muted">Marque seus horários de forma prática e conveniente</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="feature-card text-center p-4">
                                <div className="feature-icon mb-3">
                                    <i className="fas fa-star text-primary"></i>
                                </div>
                                <h5 className="fw-bold">Avalie e Seja Avaliado</h5>
                                <p className="text-muted">Sistema de avaliações para garantir qualidade</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-primary text-white py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <p className="mb-0">&copy; 2024 Timely. Todos os direitos reservados.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );

};

export default Home;