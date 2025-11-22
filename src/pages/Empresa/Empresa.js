import "../styles/Geral.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";


import { Link } from "react-router-dom";


function Empresa() {
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
                                <i className="fas fa-building me-2"></i>
                                <span id="companyName">Empresa</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-sign-out-alt me-2"></i>Sair
                                    </a>
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
                                <i className="fas fa-chart-line me-3"></i>Painel da Empresa
                            </h1>
                            <p className="mb-0 opacity-75">
                                Gerencie seus agendamentos e clientes
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-3">
                            <div className="stats-card">
                                <div className="stats-number" id="totalAgendamentos">0</div>
                                <div className="stats-label">Total de Agendamentos</div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="stats-card">
                                <div className="stats-number" id="agendamentosPendentes">0</div>
                                <div className="stats-label">Pendentes</div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="stats-card">
                                <div className="stats-number" id="agendamentosConfirmados">0</div>
                                <div className="stats-label">Confirmados</div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="stats-card">
                                <div className="stats-number" id="totalClientes">0</div>
                                <div className="stats-label">Clientes Atendidos</div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">
                                        <i className="fas fa-calendar-check me-2"></i>Agendamentos Recebidos
                                    </h5>

                                    <div className="btn-group" role="group">
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="statusFilter"
                                            id="filterAll"
                                            value="all"
                                            defaultChecked
                                        />
                                        <label className="btn btn-outline-primary btn-sm" htmlFor="filterAll">
                                            Todos
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="statusFilter"
                                            id="filterPending"
                                            value="pending"
                                        />
                                        <label className="btn btn-outline-warning btn-sm" htmlFor="filterPending">
                                            Pendentes
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="statusFilter"
                                            id="filterConfirmed"
                                            value="confirmed"
                                        />
                                        <label className="btn btn-outline-success btn-sm" htmlFor="filterConfirmed">
                                            Confirmados
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="statusFilter"
                                            id="filterCancelled"
                                            value="cancelled"
                                        />
                                        <label className="btn btn-outline-danger btn-sm" htmlFor="filterCancelled">
                                            Cancelados
                                        </label>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div id="appointmentsList"></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">
                                        <i className="fas fa-users me-2"></i>Clientes Atendidos
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <div id="clientsList"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modais */}
            <div className="modal fade" id="appointmentModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <i className="fas fa-edit me-2"></i>Gerenciar Agendamento
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <div id="appointmentAlert"></div>
                            <div id="appointmentDetails"></div>

                            <form id="appointmentActionForm" className="mt-4">
                                <input type="hidden" id="appointmentId" />

                                <div className="mb-3">
                                    <label className="form-label">
                                        <i className="fas fa-cog me-2"></i>Ação
                                    </label>
                                    <select className="form-control" id="actionType" required>
                                        <option value="">Selecione uma ação</option>
                                        <option value="confirm">Confirmar</option>
                                        <option value="cancel">Cancelar</option>
                                        <option value="reschedule">Remarcar</option>
                                    </select>
                                </div>

                                <div id="rescheduleFields" style={{ display: "none" }}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-calendar me-2"></i>Nova Data
                                            </label>
                                            <input type="date" className="form-control" id="newDate" />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-clock me-2"></i>Novo Horário
                                            </label>
                                            <select className="form-control" id="newTime">
                                                <option value="">Selecione</option>
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
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        <i className="fas fa-comment me-2"></i>Observações
                                    </label>
                                    <textarea className="form-control" id="actionNotes" rows="3"></textarea>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button className="btn btn-primary">
                                <i className="fas fa-check me-2"></i>Confirmar Ação
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Cliente */}
            <div className="modal fade" id="clientModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                <i className="fas fa-user me-2"></i>Detalhes do Cliente
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <div id="clientDetails"></div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Empresa;
