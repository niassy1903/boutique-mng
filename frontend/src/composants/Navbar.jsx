import React, { useEffect, useState } from "react";
import "../css/navbar.css";
import { PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ nom_complet: "", role: "" });

  useEffect(() => {
    // 🔹 Récupération depuis localStorage
    const storedUser = localStorage.getItem("utilisateur");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo({
        nom_complet: parsedUser.nom_complet || "Utilisateur",
        role: parsedUser.role || "Admin",
      });
    }
  }, []);

  const handleLogout = () => {
    // Supprime les infos utilisateur du localStorage
    localStorage.removeItem("utilisateur");
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo192.png" alt="Logo" className="navbar-logo" />
        <span className="app-title">SAMA BOUTIQUE</span>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <PersonCircle className="user-icon" />
          <span className="username">{userInfo.nom_complet}</span>
          <span className={`role-badge ${userInfo.role.toLowerCase()}`}>{userInfo.role}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <BoxArrowRight /> Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
