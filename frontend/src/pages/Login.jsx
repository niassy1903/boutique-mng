import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // pour redirection
import "../css/login.css";
import { login } from "../Api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook React Router

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, mot_de_passe: password }); // Correspond à Laravel
      localStorage.setItem("token", res.data.token);

      // 🔹 Rediriger vers le dashboard après connexion réussie
      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>SAMA BOUTIQUE</h1>
        <p>Système de gestion intégré</p>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error">{error}</div>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">SE CONNECTER</button>
        </form>
      </div>

      <div className="login-image">{/* Illustration optionnelle */}</div>
    </div>
  );
}

export default Login;
