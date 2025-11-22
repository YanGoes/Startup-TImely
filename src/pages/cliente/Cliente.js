import "../styles/Geral.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";


import { Link } from "react-router-dom";


function Cliente() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold text-primary" to="/home">
                        <i className="fas fa-clock me-2"></i>Timely
                    </Link>
                    <div className="navbar-nav ms-auto">
                        <div className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle text-primary fw-bold"
                                href="#"
                                id="userDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                <i className="fas fa-user-circle me-2"></i>
                                <span id="userName">Cliente</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <button className="dropdown-item" onClick={() => {}}>
                                        <i className="fas fa-sign-out-alt me-2"></i>Sair
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="dashboard-header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="mb-0">
                                <i className="fas fa-tachometer-alt me-3"></i>Painel do Cliente
                            </h1>
                            <p className="mb-0 opacity-75">
                                Encontre e agende serviços com facilidade
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-4">
                            <div className="stats-card">
                                <div className="stats-number" id="totalAgendamentos">0</div>
                                <div className="stats-label">Total de Agendamentos</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="stats-card">
                                <div className="stats-number" id="agendamentosPendentes">0</div>
                                <div className="stats-label">Pendentes</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="stats-card">
                                <div className="stats-number" id="agendamentosConfirmados">0</div>
                                <div className="stats-label">Confirmados</div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">
                                        <i className="fas fa-building me-2"></i>Empresas Disponíveis
                                    </h5>
                                    <div className="input-group" style={{ width: "300px" }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="searchCompanies"
                                            placeholder="Buscar empresas..."
                                        />
                                        <button className="btn btn-outline-primary" type="button">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="companiesList"></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">
                                        <i className="fas fa-calendar-alt me-2"></i>Meus Agendamentos
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <div id="myAppointments"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Modal */}
            <div className="modal fade" id="bookingModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <i className="fas fa-calendar-plus me-2"></i>Agendar Serviço
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <div id="bookingAlert"></div>
                            <form id="bookingForm">
                                <input type="hidden" id="companyId" name="companyId" />

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Empresa:</label>
                                    <p id="companyName" className="text-muted mb-0"></p>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="serviceDate" className="form-label">
                                        <i className="fas fa-calendar me-2"></i>Data do Serviço
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="serviceDate"
                                        name="serviceDate"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="serviceTime" className="form-label">
                                        <i className="fas fa-clock me-2"></i>Horário
                                    </label>
                                    <select
                                        className="form-control"
                                        id="serviceTime"
                                        name="serviceTime"
                                        required
                                    >
                                        <option value="">Selecione um horário</option>
                                        <option value="08:00">08:00</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="observations" className="form-label">
                                        <i className="fas fa-comment me-2"></i>Observações
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="observations"
                                        name="observations"
                                        rows="3"
                                        placeholder="Descreva detalhes sobre o serviço desejado..."
                                    ></textarea>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => {}}>
                                <i className="fas fa-check me-2"></i>Confirmar Agendamento
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Company Details Modal */}
            <div className="modal fade" id="companyModal" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <i className="fas fa-info-circle me-2"></i>Detalhes da Empresa
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <div id="companyDetails"></div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Fechar
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => {}}>
                                <i className="fas fa-calendar-plus me-2"></i>Agendar Serviço
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cliente;
