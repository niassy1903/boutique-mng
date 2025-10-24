import React, { useEffect, useState } from "react";
import Sidebar from "../composants/Sidebar";
import Navbar from "../composants/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaTruck, FaSearch, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "../css/fournisseurs.css"; // ✅ ton futur fichier CSS pour les fournisseurs

const Fournisseurs = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/fournisseurs")
      .then((res) => res.json())
      .then((data) =>
        setFournisseurs(data.filter((f) => f.utilisateur?.role === "fournisseur"))
      )
      .catch((err) => console.error("Erreur chargement fournisseurs :", err));
  }, []);

  const filteredFournisseurs = fournisseurs.filter((f) =>
    f.utilisateur?.nom_complet?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fournisseurs-container">
      {/* Sidebar + Navbar */}
      <Sidebar />
      <Navbar />

      {/* Contenu principal */}
      <div className="fournisseurs-content">
        {/* --- Carte 1 : En-tête --- */}
        <div className="card fournisseurs-header d-flex align-items-center justify-content-between p-4 mb-4">
          <div className="d-flex align-items-center">
            <FaTruck className="header-icon me-3" />
            <div>
              <h5 className="mb-1">Gestion des Fournisseurs</h5>
              <p className="text-muted mb-0">
                Consultez et gérez vos fournisseurs ici
              </p>
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
              placeholder="Rechercher un fournisseur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* --- Carte 3 : Liste des Fournisseurs --- */}
        <div className="fournisseurs-list-card mt-4 p-3">
          <div className="table-responsive">
            <table className="table align-middle text-center">
              <thead>
                <tr>
                  <th>Nom complet</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFournisseurs.length > 0 ? (
                  filteredFournisseurs.map((fournisseur, index) => (
                    <tr key={index}>
                      <td>{fournisseur.utilisateur?.nom_complet || "—"}</td>
                      <td>{fournisseur.utilisateur?.email || "—"}</td>
                      <td>{fournisseur.utilisateur?.telephone || "—"}</td>
                      <td className="actions">
                        <button className="btn-action edit me-2">
                          <FaEdit />
                        </button>
                        <button className="btn-action delete">
                          <FaTrash />
                        </button>
                        <button className="btn-action view">
                            <FaEye />
                        </button>

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      Aucun fournisseur trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- Pagination --- */}
          <div className="pagination-container">
            <nav>
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">3</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fournisseurs;
