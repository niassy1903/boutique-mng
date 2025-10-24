import axios from "axios";

// Base URL de ton API Laravel
const API_URL = "http://localhost:8000/api"; // change le port si nécessaire

// Instance Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================
// ===== UTILISATEURS ======
// ==========================

export const getUtilisateurs = () => api.get("/utilisateurs");
export const createUtilisateur = (data) => api.post("/utilisateurs", data);
export const getUtilisateur = (id) => api.get(`/utilisateurs/${id}`);
export const updateUtilisateur = (id, data) => api.put(`/utilisateurs/${id}`, data);
export const deleteUtilisateur = (id) => api.delete(`/utilisateurs/${id}`);
export const login = (data) => api.post("/utilisateurs/login", data);
export const logout = (token) =>
api.post("/utilisateurs/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
export const me = (token) =>
  api.get("/utilisateurs/moi", { headers: { Authorization: `Bearer ${token}`   } });



// ==========================
// ===== CLIENTS ============
// ==========================

export const getClients = () => api.get("/clients");
export const createClient = (data) => api.post("/clients", data);
export const getClient = (id) => api.get(`/clients/${id}`);
export const updateClient = (id, data) => api.put(`/clients/${id}`, data);
export const deleteClient = (id) => api.delete(`/clients/${id}`);

// ==========================
// ===== FOURNISSEURS =======
// ==========================

export const getFournisseurs = () => api.get("/fournisseurs");
export const createFournisseur = (data) => api.post("/fournisseurs", data);
export const getFournisseur = (id) => api.get(`/fournisseurs/${id}`);
export const updateFournisseur = (id, data) => api.put(`/fournisseurs/${id}`, data);
export const deleteFournisseur = (id) => api.delete(`/fournisseurs/${id}`);

// ==========================
// ===== PRODUITS ===========
// ==========================

export const getProduits = () => api.get("/produits");
export const createProduit = (data) => api.post("/produits", data);
export const getProduit = (id) => api.get(`/produits/${id}`);
export const updateProduit = (id, data) => api.put(`/produits/${id}`, data);
export const deleteProduit = (id) => api.delete(`/produits/${id}`);

// ==========================
// ===== VENTES =============
// ==========================

export const getVentes = () => api.get("/ventes");
export const createVente = (data) => api.post("/ventes", data);
export const getVente = (id) => api.get(`/ventes/${id}`);
export const updateVente = (id, data) => api.put(`/ventes/${id}`, data);
export const deleteVente = (id) => api.delete(`/ventes/${id}`);

// ==========================
// ===== STOCKS =============
// ==========================

export const getStocks = () => api.get("/stocks");
export const createStock = (data) => api.post("/stocks", data);
export const getStock = (id) => api.get(`/stocks/${id}`);
export const updateStock = (id, data) => api.put(`/stocks/${id}`, data);
export const deleteStock = (id) => api.delete(`/stocks/${id}`);

// ==========================
// ===== PANIERS ============
// ==========================

export const getPaniers = () => api.get("/paniers");
export const createPanier = (data) => api.post("/paniers", data);
export const getPanier = (id) => api.get(`/paniers/${id}`);
export const updatePanier = (id, data) => api.put(`/paniers/${id}`, data);
export const deletePanier = (id) => api.delete(`/paniers/${id}`);

// ==========================
// ===== PAIEMENTS =========
// ==========================

export const getPaiements = () => api.get("/paiements");
export const createPaiement = (data) => api.post("/paiements", data);
export const getPaiement = (id) => api.get(`/paiements/${id}`);
export const updatePaiement = (id, data) => api.put(`/paiements/${id}`, data);
export const deletePaiement = (id) => api.delete(`/paiements/${id}`);

// ==========================
// ===== LIVRAISONS =========
// ==========================

export const getLivraisons = () => api.get("/livraisons");
export const createLivraison = (data) => api.post("/livraisons", data);
export const getLivraison = (id) => api.get(`/livraisons/${id}`);
export const updateLivraison = (id, data) => api.put(`/livraisons/${id}`, data);
export const deleteLivraison = (id) => api.delete(`/livraisons/${id}`);

// ==========================
// ===== AVIS ===============
// ==========================

export const getAvis = () => api.get("/avis");
export const createAvis = (data) => api.post("/avis", data);
export const getAvisById = (id) => api.get(`/avis/${id}`);
export const updateAvis = (id, data) => api.put(`/avis/${id}`, data);
export const deleteAvis = (id) => api.delete(`/avis/${id}`);

// ==========================
// ===== NOTIFICATIONS ======
// ==========================

export const getNotifications = () => api.get("/notifications");
export const createNotification = (data) => api.post("/notifications", data);
export const getNotification = (id) => api.get(`/notifications/${id}`);
export const updateNotification = (id, data) => api.put(`/notifications/${id}`, data);
export const deleteNotification = (id) => api.delete(`/notifications/${id}`);

// ==========================
// ===== FACTURES ===========
// ==========================

export const getFactures = () => api.get("/factures");
export const createFacture = (data) => api.post("/factures", data);
export const getFacture = (id) => api.get(`/factures/${id}`);
export const updateFacture = (id, data) => api.put(`/factures/${id}`, data);
export const deleteFacture = (id) => api.delete(`/factures/${id}`);

