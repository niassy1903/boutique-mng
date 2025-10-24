import React, { useEffect, useState } from "react";
import Sidebar from "../composants/Sidebar";
import Navbar from "../composants/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaUsers, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import "../css/clients.css";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/clients")
      .then((res) => res.json())
      .then((data) =>
        setClients(data.filter((c) => c.utilisateur?.role === "client"))
      )
      .catch((err) => console.error(err));
  }, []);

  const filteredClients = clients.filter((c) =>
    c.utilisateur?.nom_complet?.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="clients-container">
      {/* Sidebar fixe */}
      <Sidebar />
       <Navbar />

      {/* Contenu principal */}
      <div className="clients-content">
        {/* Navbar fixe */}
       

        {/* --- Carte 1 : En-tête --- */}
        <div className="card clients-header d-flex align-items-center justify-content-between p-4 mb-4">
          <div className="d-flex align-items-center">
            <FaUsers className="header-icon me-3" />
            <div>
              <h5 className="mb-1">Gestion des Clients</h5>
              <p className="text-muted mb-0">Gérez et consultez vos clients ici</p>
            </div>
          </div>
        </div>

        {/* --- Carte 2 : Recherche --- */}
            <div className="card search-card mb-4 p-3 shadow-sm rounded-3">
            <div className="input-group">
                <span className="input-group-text bg-white border-0">
                <FaSearch className="text-muted fs-5" />
                </span>
                <input
                type="text"
                className="form-control border-0 search-input"
                placeholder="Rechercher un client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            </div>


        {/* --- Carte 3 : Liste des clients --- */}
       <div className="clients-list-card mt-4 p-3">
  <div className="table-responsive">
    <table className="table align-middle text-center">
      <thead>
        <tr>
          <th>Nom complet</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Ville</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
  {filteredClients.length > 0 ? (
    filteredClients.map((client, index) => (
        <tr key={index}>
        <td>{client.utilisateur?.nom_complet || "—"}</td>
        <td>{client.utilisateur?.email || "—"}</td>
        <td>{client.utilisateur?.telephone || "—"}</td>
        <td>{client.ville || "—"}</td>
        <td className="actions">
          <button className="btn-action edit me-2"><FaEdit /></button>
          <button className="btn-action delete"><FaTrash /></button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center text-muted">
        Aucun client trouvé.
      </td>
    </tr>
  )}
      </tbody>

    </table>
  </div>

  {/* Pagination */}
  <div className="pagination-container">
    <nav>
      <ul className="pagination">
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
      </ul>
    </nav>
  </div>
</div>

      </div>
    </div>
  );
};

export default Clients;
