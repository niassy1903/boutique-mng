import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../composants/Sidebar";
import Navbar from "../composants/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/ajout-utilisateur.css";

import { FaUser, FaEnvelope, FaLock, FaBuilding, FaCity, FaPhone } from "react-icons/fa";

const AjoutUtilisateur = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [utilisateurData, setUtilisateurData] = useState({
    nom_complet: "",
    nom_utilisateur: "",
    email: "",
    mot_de_passe: "",
    role: "",
  });
  const [clientData, setClientData] = useState({
    entreprise: "",
    ville: "",
    adresse: "",
    telephone: "",
    pays: "",
    code_postal: "",
    points_fidelite: 0
  });
  const [fournisseurData, setFournisseurData] = useState({
    entreprise: "",
    adresse: "",
    contact_personne: "",
    telephone_contact: "",
    email_contact: "",
  });
  const [alertMsg, setAlertMsg] = useState({ type: "", text: "" });

  const handleUtilisateurChange = (e) => {
    setUtilisateurData({ ...utilisateurData, [e.target.name]: e.target.value });
  };

  const handleClientChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleFournisseurChange = (e) => {
    setFournisseurData({ ...fournisseurData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setUtilisateurData({ ...utilisateurData, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMsg({ type: "", text: "" });

    try {
      const resUser = await fetch("http://localhost:8000/api/utilisateurs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(utilisateurData),
      });
      const userResult = await resUser.json();

      if (!resUser.ok) {
        setAlertMsg({ type: "danger", text: userResult.message || "Erreur lors de la création de l'utilisateur" });
        return;
      }

      const userId = userResult.data.id;

      if (role === "client") {
        await fetch("http://localhost:8000/api/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...clientData, utilisateur_id: userId }),
        });
      }

      if (role === "fournisseur") {
        await fetch("http://localhost:8000/api/fournisseurs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...fournisseurData, utilisateur_id: userId }),
        });
      }

      setAlertMsg({ type: "success", text: "Utilisateur créé avec succès ✅" });
      setTimeout(() => navigate("/utilisateurs"), 1500);

    } catch (error) {
      console.error(error);
      setAlertMsg({ type: "danger", text: "Erreur lors de la création de l'utilisateur" });
    }
  };

  return (
    <div className="utilisateurs-container">
      <Sidebar />
      <Navbar />

      <div className="utilisateurs-content">
        <h3 className="mb-4">Ajouter un nouvel utilisateur</h3>

        {alertMsg.text && (
          <div className={`alert alert-${alertMsg.type} alert-dismissible fade show`} role="alert">
            {alertMsg.text}
          </div>
        )}

        <form className="card shadow-lg p-4" onSubmit={handleSubmit}>
          {/* --- Utilisateur général --- */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label>Nom complet <span className="text-danger">*</span></label>
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input
                  type="text"
                  name="nom_complet"
                  value={utilisateurData.nom_complet}
                  onChange={handleUtilisateurChange}
                  className="form-control"
                  placeholder="Nom complet"
                  required
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Nom utilisateur <span className="text-danger">*</span></label>
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input
                  type="text"
                  name="nom_utilisateur"
                  value={utilisateurData.nom_utilisateur}
                  onChange={handleUtilisateurChange}
                  className="form-control"
                  placeholder="Nom utilisateur"
                  required
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Email <span className="text-danger">*</span></label>
              <div className="input-group">
                <span className="input-group-text"><FaEnvelope /></span>
                <input
                  type="email"
                  name="email"
                  value={utilisateurData.email}
                  onChange={handleUtilisateurChange}
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Mot de passe <span className="text-danger">*</span></label>
              <div className="input-group">
                <span className="input-group-text"><FaLock /></span>
                <input
                  type="password"
                  name="mot_de_passe"
                  value={utilisateurData.mot_de_passe}
                  onChange={handleUtilisateurChange}
                  className="form-control"
                  placeholder="Mot de passe"
                  required
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Rôle <span className="text-danger">*</span></label>
              <select
                className="form-select"
                value={role}
                onChange={handleRoleChange}
                required
              >
                <option value="">Sélectionner un rôle</option>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
                <option value="fournisseur">Fournisseur</option>
              </select>
            </div>
          </div>

          {/* --- Client spécifique --- */}
          {role === "client" && (
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label>Entreprise</label>
                <div className="input-group">
                  <span className="input-group-text"><FaBuilding /></span>
                  <input
                    type="text"
                    name="entreprise"
                    value={clientData.entreprise}
                    onChange={handleClientChange}
                    className="form-control"
                    placeholder="Entreprise"
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label>Ville</label>
                <div className="input-group">
                  <span className="input-group-text"><FaCity /></span>
                  <input
                    type="text"
                    name="ville"
                    value={clientData.ville}
                    onChange={handleClientChange}
                    className="form-control"
                    placeholder="Ville"
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label>Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  value={clientData.adresse}
                  onChange={handleClientChange}
                  className="form-control"
                  placeholder="Adresse"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Téléphone</label>
                <div className="input-group">
                  <span className="input-group-text"><FaPhone /></span>
                  <input
                    type="text"
                    name="telephone"
                    value={clientData.telephone}
                    onChange={handleClientChange}
                    className="form-control"
                    placeholder="Téléphone"
                  />
                </div>
              </div>
            </div>
          )}

          {/* --- Fournisseur spécifique --- */}
          {role === "fournisseur" && (
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label>Entreprise <span className="text-danger">*</span></label>
                <div className="input-group">
                  <span className="input-group-text"><FaBuilding /></span>
                  <input
                    type="text"
                    name="entreprise"
                    value={fournisseurData.entreprise}
                    onChange={handleFournisseurChange}
                    className="form-control"
                    placeholder="Entreprise"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label>Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  value={fournisseurData.adresse}
                  onChange={handleFournisseurChange}
                  className="form-control"
                  placeholder="Adresse"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Contact</label>
                <div className="input-group">
                  <span className="input-group-text"><FaUser /></span>
                  <input
                    type="text"
                    name="contact_personne"
                    value={fournisseurData.contact_personne}
                    onChange={handleFournisseurChange}
                    className="form-control"
                    placeholder="Personne contact"
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label>Téléphone</label>
                <div className="input-group">
                  <span className="input-group-text"><FaPhone /></span>
                  <input
                    type="text"
                    name="telephone_contact"
                    value={fournisseurData.telephone_contact}
                    onChange={handleFournisseurChange}
                    className="form-control"
                    placeholder="Téléphone"
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label>Email contact</label>
                <div className="input-group">
                  <span className="input-group-text"><FaEnvelope /></span>
                  <input
                    type="email"
                    name="email_contact"
                    value={fournisseurData.email_contact}
                    onChange={handleFournisseurChange}
                    className="form-control"
                    placeholder="Email contact"
                  />
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-success mt-3">
            Créer l'utilisateur
          </button>
        </form>
      </div>
    </div>
  );
};

export default AjoutUtilisateur;
