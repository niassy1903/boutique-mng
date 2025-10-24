import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../composants/Sidebar";
import Navbar from "../composants/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/produits.css"; // on garde le même style

import { FaPlus, FaSearch, FaFilter, FaTimes, FaUserEdit, FaEye } from "react-icons/fa";

const Utilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch API utilisateurs
  useEffect(() => {
    fetch("http://localhost:8000/api/utilisateurs") // endpoint réel Laravel
      .then(res => res.json())
      .then(data => setUtilisateurs(data))
      .catch(err => console.error(err));
  }, []);

  const filteredUtilisateurs = utilisateurs.filter((u) =>
    u.nom_complet.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="utilisateurs-container">
      <Sidebar />
      <Navbar />

      <div className="utilisateurs-content" style={{ marginLeft: "250px", marginTop: "70px", padding: "20px" }}>
        
        {/* Carte de bienvenue avec bouton */}
        <div className="card welcome-card shadow-lg mb-4 p-3 d-flex justify-content-between align-items-center">
          <div>
            <h4 className="fw-bold mb-1">Bienvenue dans vos utilisateurs</h4>
            <p className="text-muted mb-0">Gérez et consultez vos utilisateurs ici</p>
          </div>
          <button
            className="btn btn-success d-flex align-items-center"
            onClick={() => navigate("/ajout-utilisateur")}
          >
            <FaPlus className="me-1" /> Nouvel utilisateur
          </button>
        </div>

        {/* Barre de recherche / filtres / effacer */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          <div className="input-group flex-grow-1" style={{ minWidth: "250px" }}>
            <span className="input-group-text bg-white"><FaSearch /></span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Rechercher un utilisateur..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
          <button className="btn btn-info d-flex align-items-center">
            <FaFilter className="me-1" /> Filtrer
          </button>
          <button className="btn btn-secondary d-flex align-items-center" onClick={() => setSearch("")}>
            <FaTimes className="me-1" /> Effacer
          </button>
        </div>

        {/* Tableau des utilisateurs */}
        <div className="utilisateurs-list-card mt-4 p-3">
          <div className="table-responsive">
            <table className="table align-middle text-center">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Nom complet</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUtilisateurs.length > 0 ? (
                  filteredUtilisateurs.map((u, index) => (
                    <tr key={u.id}>
                      <td>{u.code || "_"}</td>
                      <td>{u.nom_complet || "—"}</td>
                      <td>{u.email || "—"}</td>
                      <td>{u.role || "—"}</td>
                      <td className="actions">
                        <button className="btn-action edit me-2">
                          <FaUserEdit />
                        </button>
                        <button className="btn-action view">
                          <FaEye />
                        </button>
                        <button className="btn-action delete ms-2">
                            <FaTimes />
                            
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-container mt-3">
            <nav>
              <ul className="pagination justify-content-center">
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

export default Utilisateurs;
