import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Sidebar from "../composants/Sidebar";
import Navbar from "../composants/Navbar";
import "../css/dashboard.css";

import {
  FaChartBar,
  FaBox,
  FaUsers,
  FaBell,
  FaFileInvoice,
  FaMoneyBill,
  FaClipboardList,
} from "react-icons/fa";

const Dashboard = () => {
  const ventes = [
    { id: 1, client: "Alpha SARL", sousTotal: "150000", taxes: "3000", total: "153000", paiement: "Espèces", date: "20/10/2025", vendeur: "Soda" },
    { id: 2, client: "Beta Corp", sousTotal: "200000", taxes: "4000", total: "204000", paiement: "Carte", date: "19/10/2025", vendeur: "Niassy" },
  ];

  const notifications = [
    "📦 Stock faible : Ordinateur portable HP",
    "🛒 Nouvelle commande client : Alpha SARL",
    "💰 Facture payée : Facture N°123",
    "🔔 Mise à jour disponible du système",
  ];

  // ✅ 8 cartes statistiques
  const stats = [
    { icon: <FaBox />, title: "Produits", value: "125", color: "#007bff" },
    { icon: <FaMoneyBill />, title: "Ventes du Jour", value: "450 000 FCFA", color: "#28a745" },
    { icon: <FaUsers />, title: "Clients", value: "82", color: "#ffc107" },
    { icon: <FaBell />, title: "Alertes", value: "5 Produits", color: "#dc3545" },
    { icon: <FaClipboardList />, title: "Devis", value: "12", color: "#6f42c1" },
    { icon: <FaFileInvoice />, title: "Factures Proformat", value: "9", color: "#20c997" },
    { icon: <FaFileInvoice />, title: "Factures Définitives", value: "14", color: "#fd7e14" },
    { icon: <FaMoneyBill />, title: "Factures Payées", value: "1 200 000 FCFA", color: "#6610f2" },
  ];

  return (
    <div>
      <Sidebar />
      <Navbar />

      <div className="dashboard-content" style={{ marginLeft: "250px", marginTop: "70px", padding: "20px" }}>
        {/* --- Carte de bienvenue --- */}
        <div className="welcome-card card shadow-lg border-0 mb-4 text-white">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div>
              <h4 className="fw-bold">Bienvenue dans votre logiciel <b>SAMA</b></h4>
              <p className="text-light mb-0">Tableau de bord général</p>
            </div>
            <FaChartBar className="fs-1 text-white opacity-75" />
          </div>
        </div>

        {/* --- Cartes statistiques --- */}
        <div className="row g-3 mb-4">
          {stats.map((item, index) => (
            <div className="col-md-3" key={index}>
              <div className="stat-card-modern" style={{ borderTop: `4px solid ${item.color}` }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="text-muted">{item.title}</h6>
                    <h4 className="fw-bold">{item.value}</h4>
                  </div>
                  <div className="icon-wrapper" style={{ background: item.color }}>
                    {item.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      {/* Tableau + Notifications */}
<div className="row mt-4 align-items-start">
  {/* Tableau */}
  <div className="col-lg-8 mb-3">
    <div className="card shadow-lg border-0">
      <div className="card-header bg-gradient text-white fw-bold">
        📈 Ventes Récentes
      </div>
      <div className="card-body p-0">
        <table className="table table-hover align-middle mb-0 modern-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Client</th>
              <th>Total</th>
              <th>Paiement</th>
              <th>Date</th>
              <th>Vendeur</th>
            </tr>
          </thead>
          <tbody>
            {ventes.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.client}</td>
                <td><b>{v.total} FCFA</b></td>
                <td>
                  <span className="badge bg-success">{v.paiement}</span>
                </td>
                <td>{v.date}</td>
                <td>{v.vendeur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  {/* Notifications */}
  <div className="col-lg-4 mb-3">
    <div className="card shadow-lg border-0 notifications-card h-100">
      <div className="card-header bg-gradient-info text-white fw-bold">
        🔔 Notifications
      </div>
      <div className="card-body">
        {notifications.map((note, index) => (
          <div key={index} className="notification-item">
            <span className="dot"></span>
            <p className="mb-0">{note}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default Dashboard;
