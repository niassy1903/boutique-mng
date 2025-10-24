import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Produits from "./pages/Produits";
import AjouterProduit from "./pages/AjouterProduit";
import Clients from "./pages/Clients";
import Utilisateurs from "./pages/Utilisateurs";
import AjouterUtilisateur from "./pages/AjoutUtilisateur";  
import Fournisseurs from "./pages/Fournisseurs";
import Factures from "./pages/Factures";
import Ventes from "./pages/Ventes";
import Stocks from "./pages/Stocks";
import Rapports from "./pages/Rapports";
import Marketplace from "./pages/Marketplace";
import Parametres from "./pages/Parametres";


function App() {
  return (
    <Router>
      <Routes>
        {/* Page de connexion */}
        <Route path="/" element={<Login />} />

        {/* Dashboard accessible à tous */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Page des produits */}
        <Route path="/produits" element={<Produits />} />
        <Route path="/ajout-produit" element={<AjouterProduit />} />
        {/* Page des clients */}
        <Route path="/clients" element={<Clients />} />
        {/* Page des utilisateurs */}
        <Route path="/utilisateurs" element={<Utilisateurs />} />
        <Route path="/ajout-utilisateur" element={<AjouterUtilisateur />} />
        {/* Page des fournisseurs */}
        <Route path="/fournisseurs" element={<Fournisseurs />} />
        {/* Page des factures */}
        <Route path="/factures" element={<Factures />} />
        {/* Page des ventes */}
        <Route path="/ventes" element={<Ventes />} />
        {/* Page des stocks */}
        <Route path="/stocks" element={<Stocks />} />
        {/* Page des rapports */}
        <Route path="/rapports" element={<Rapports />} />
        {/* Page du marketplace */}
        <Route path="/marketplace" element={<Marketplace />} />
        {/* Page des paramètres */}
        <Route path="/parametres" element={<Parametres />} />

     
      
      </Routes>
    </Router>
  );
}

export default App;