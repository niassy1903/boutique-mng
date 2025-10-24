import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../composants/Sidebar";
import Navbar from "../composants/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/produits.css";

import { 
  FaPlus, FaSearch, FaFilter, FaTimes, 
  FaBox, FaExclamationTriangle, FaBan, FaTags 
} from "react-icons/fa";

const Produits = () => {
  const [produits, setProduits] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch API simulé
  useEffect(() => {
    fetch("/api/produits") // endpoint réel
      .then(res => res.json())
      .then(data => setProduits(data))
      .catch(err => console.log(err));
  }, []);

  const statistiques = [
    { icon: <FaBox />, label: "Nombre de produits", value: produits.length, color: "#007bff" },
    { icon: <FaExclamationTriangle />, label: "Stocks faibles", value: produits.filter(p => p.quantite_stock < 5).length, color: "#dc3545" },
    { icon: <FaBan />, label: "Périmés", value: produits.filter(p => p.date_peremption && new Date(p.date_peremption) < new Date()).length, color: "#ffc107" },
    { icon: <FaTags />, label: "Catégories", value: [...new Set(produits.map(p => p.categorie))].length, color: "#28a745" },
  ];

    const navigate = useNavigate();


  return (
    <div className="produits-container">
      <Sidebar />
      <Navbar />

      <div className="produits-content" style={{ marginLeft: "250px", marginTop: "70px", padding: "20px" }}>
        
        {/* Carte de bienvenue avec bouton à droite */}
        <div className="card welcome-card shadow-lg mb-4 p-3 d-flex justify-content-between align-items-center">
          <div>
            <h4 className="fw-bold mb-1">Bienvenue dans nos produits de <b>SAMA BOUTIQUE</b></h4>
            <p className="text-muted mb-0">Gérez facilement vos produits ici</p>
          </div>
          <button
        className="btn btn-success d-flex align-items-center"
        onClick={() => navigate("/ajout-produit")}
      >
        <FaPlus className="me-1" /> Nouveau produit
      </button>
        </div>

        {/* Barre de recherche / filtres / effacer */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          <div className="input-group flex-grow-1" style={{ minWidth: "250px" }}>
            <span className="input-group-text bg-white"><FaSearch /></span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Rechercher un produit..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
          <button className="btn btn-info d-flex align-items-center">
            <FaFilter className="me-1" /> Filtrer
          </button>
          <button className="btn btn-secondary d-flex align-items-center">
            <FaTimes className="me-1" /> Effacer
          </button>
        </div>

        {/* Cartes statistiques */}
        <div className="row g-3 mb-4">
          {statistiques.map((stat, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="stat-card-modern h-100" style={{ borderTop: `4px solid ${stat.color}` }}>
                <div className="d-flex align-items-center justify-content-between h-100">
                  <div>
                    <h6 className="text-muted">{stat.label}</h6>
                    <h4 className="fw-bold">{stat.value}</h4>
                  </div>
                  <div className="icon-wrapper" style={{ background: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tableau des produits */}
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white fw-bold">📦 Liste des produits</div>
          <div className="card-body table-responsive p-0">
            <table className="table table-hover align-middle mb-0 modern-table">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Catégorie</th>
                  <th>Disponible</th>
                </tr>
              </thead>
              <tbody>
                {produits
                  .filter(p => p.nom.toLowerCase().includes(search.toLowerCase()))
                  .map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{p.nom}</td>
                    <td>{p.description || "-"}</td>
                    <td>{p.prix} FCFA</td>
                    <td>{p.quantite_stock}</td>
                    <td>{p.categorie || "-"}</td>
                    <td>{p.disponible ? "Oui" : "Non"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Produits;
