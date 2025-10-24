import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../composants/Sidebar";
import Navbar from "../composants/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/ajout-produit.css";
import { FaCalendarAlt, FaSave, FaTimes, FaDollarSign, FaBox, FaTag, FaImage, FaClipboardList } from "react-icons/fa";

const AjouterProduit = () => {
  const [formData, setFormData] = useState({
    fournisseur_id: "",
    nom: "",
    description: "",
    prix: "",
    prix_ancien: "",
    prix_achat: "",
    tva: "",
    unite: "",
    quantite_stock: "",
    stock_minimum: "",
    date_fabrication: "",
    date_peremption: "",
    date_limite_conso: "",
    disponible: true,
    categorie: "",
    tags: [],
    rating: "",
    historique_prix: [],
    image: null,
    images: []
  });

  const [fournisseurs, setFournisseurs] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/fournisseurs")
      .then(res => res.json())
      .then(data => setFournisseurs(data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      if(name === "image") {
        setFormData({ ...formData, image: files[0] });
      } else {
        setFormData({ ...formData, images: Array.from(files) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map(v => v.trim());
    setFormData({ ...formData, [field]: values });
  };

  const handleSubmit = async () => {
    setMessage("");
    setErrors({});
    try {
      const fd = new FormData();
      for(const key in formData){
        if(key === "tags" || key === "historique_prix") {
          fd.append(key, JSON.stringify(formData[key]));
        } else if(key === "images") {
          formData.images.forEach(img => fd.append("images[]", img));
        } else {
          fd.append(key, formData[key]);
        }
      }

      const res = await fetch("/api/produits", {
        method: "POST",
        body: fd
      });

      const data = await res.json();
      if(res.ok){
        setMessage(data.message);
        setFormData({
          fournisseur_id: "",
          nom: "",
          description: "",
          prix: "",
          prix_ancien: "",
          prix_achat: "",
          tva: "",
          unite: "",
          quantite_stock: "",
          stock_minimum: "",
          date_fabrication: "",
          date_peremption: "",
          date_limite_conso: "",
          disponible: true,
          categorie: "",
          tags: [],
          rating: "",
          historique_prix: [],
          image: null,
          images: []
        });
      } else if(res.status === 422){
        setErrors(data.errors || {});
      } else {
        setMessage(data.message || "Une erreur est survenue");
      }
    } catch(err){
      console.log(err);
      setMessage("Erreur réseau");
    }
  };

  return (
    <div className="produits-container">
      <Sidebar />
      <Navbar />

      <div className="produits-content">

        {message && <div className="alert alert-success">{message}</div>}

        {/* Carte Informations produit */}
        <div className="card shadow-lg mb-4 p-3">
          <h5 className="fw-bold mb-3"><FaClipboardList className="me-2"/> Informations produit</h5>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label>Fournisseur</label>
              <select className="form-control" name="fournisseur_id" value={formData.fournisseur_id} onChange={handleChange}>
                <option value="">Sélectionnez un fournisseur</option>
                {fournisseurs.map(f => (
                  <option key={f.id} value={f.id}>{f.nom}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label>Nom</label>
              <input type="text" className="form-control" name="nom" value={formData.nom} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3">
            <label>Description</label>
            <textarea className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>
        </div>

        {/* Carte Prix et TVA */}
        <div className="card shadow-lg mb-4 p-3">
          <h5 className="fw-bold mb-3"><FaDollarSign className="me-2"/> Prix & TVA</h5>
          <div className="row g-3 mb-3">
            <div className="col-md-3">
              <label>Prix d'achat</label>
              <input type="number" className="form-control" name="prix_achat" value={formData.prix_achat} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label>Prix de vente</label>
              <input type="number" className="form-control" name="prix" value={formData.prix} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label>Prix ancien</label>
              <input type="number" className="form-control" name="prix_ancien" value={formData.prix_ancien} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label>TVA (%)</label>
              <input type="number" className="form-control" name="tva" value={formData.tva} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3">
            <label>Historique des prix (séparés par des virgules)</label>
            <input type="text" className="form-control" value={formData.historique_prix.join(", ")} onChange={(e)=>handleArrayChange(e,"historique_prix")} />
          </div>
        </div>

        {/* Carte Stock et Unité */}
        <div className="card shadow-lg mb-4 p-3">
          <h5 className="fw-bold mb-3"><FaBox className="me-2"/> Stock & Unité</h5>
          <div className="row g-3 mb-3">
            <div className="col-md-3">
              <label>Unité</label>
              <input type="text" className="form-control" name="unite" value={formData.unite} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label>Stock actuel</label>
              <input type="number" className="form-control" name="quantite_stock" value={formData.quantite_stock} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label>Stock minimum</label>
              <input type="number" className="form-control" name="stock_minimum" value={formData.stock_minimum} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <label>Statut</label>
              <input type="text" className="form-control" value={formData.quantite_stock < formData.stock_minimum ? "Faible" : "OK"} readOnly />
            </div>
          </div>
        </div>

        {/* Carte Dates */}
        <div className="card shadow-lg mb-4 p-3">
          <h5 className="fw-bold mb-3"><FaCalendarAlt className="me-2"/> Dates</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label>Date de fabrication</label>
              <input type="date" className="form-control" name="date_fabrication" value={formData.date_fabrication} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label>Date de péremption</label>
              <input type="date" className="form-control" name="date_peremption" value={formData.date_peremption} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label>Date limite consommation</label>
              <input type="date" className="form-control" name="date_limite_conso" value={formData.date_limite_conso} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Carte Disponibilité et Catégorie */}
        <div className="card shadow-lg mb-4 p-3">
          <h5 className="fw-bold mb-3"><FaTag className="me-2"/> Disponibilité & Catégorie</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <label>Disponible</label><br/>
              <input type="checkbox" className="form-check-input" name="disponible" checked={formData.disponible} onChange={handleChange} />
            </div>
            <div className="col-md-9">
              <label>Catégorie</label>
              <input type="text" className="form-control" name="categorie" value={formData.categorie} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Carte Tags et Rating */}
        <div className="card shadow-lg mb-4 p-3">
          <h5 className="fw-bold mb-3"><FaTag className="me-2"/> Tags & Rating</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label>Tags (séparés par des virgules)</label>
              <input type="text" className="form-control" value={formData.tags.join(", ")} onChange={(e)=>handleArrayChange(e,"tags")} />
            </div>
            <div className="col-md-6">
              <label>Rating (0-5)</label>
              <input type="number" className="form-control" name="rating" value={formData.rating} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Carte Images */}
        <div className="card shadow-lg mb-4 p-3">
          <h5 className="fw-bold mb-3"><FaImage className="me-2"/> Images</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label>Image principale</label>
              <input type="file" className="form-control" name="image" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Images secondaires (plusieurs)</label>
              <input type="file" className="form-control" name="images" onChange={handleChange} multiple />
            </div>
          </div>
        </div>

        {/* Boutons */}
        <div className="d-flex justify-content-end gap-2 mb-5">
          <button className="btn btn-secondary d-flex align-items-center" onClick={() => navigate("/produits")}><FaTimes className="me-1" /> Annuler</button>
          <button className="btn btn-success d-flex align-items-center" onClick={handleSubmit}><FaSave className="me-1" /> Enregistrer</button>
        </div>

      </div>
    </div>
  );
};

export default AjouterProduit;
