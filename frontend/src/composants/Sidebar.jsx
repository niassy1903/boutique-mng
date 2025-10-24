import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/sidebar.css";
import {
  House,
  BoxSeam,
  People,
  Truck,
  FileText,
  Cart,
  Layers,
  BarChart,
  Globe,
  Gear,
  PersonBadge,
  List,
  X,
} from "react-bootstrap-icons";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: "Accueil", icon: <House />, path: "/dashboard" },
    { name: "Utilisateurs", icon: <PersonBadge />, path: "/utilisateurs" },
    { name: "Produits", icon: <BoxSeam />, path: "/produits" },
    { name: "Clients", icon: <People />, path: "/clients" },
    { name: "Fournisseurs", icon: <Truck />, path: "/fournisseurs" },
    { name: "Factures", icon: <FileText />, path: "/factures" },
    { name: "Ventes", icon: <Cart />, path: "/ventes" },
    { name: "Stocks", icon: <Layers />, path: "/stocks" },
    { name: "Rapports", icon: <BarChart />, path: "/rapports" },
    { name: "Marketplace", icon: <Globe />, path: "/marketplace" },
    { name: "Paramètres", icon: <Gear />, path: "/parametres" },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-logo">{!isCollapsed && "SAMA"}</h2>
        <button
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <List size={22} /> : <X size={22} />}
        </button>
      </div>

      <ul>
        {menuItems.map((item) => (
          <li key={item.name} onClick={() => navigate(item.path)}>
            {item.icon}
            {!isCollapsed && <span>{item.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
