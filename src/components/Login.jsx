import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/", { replace: true });
  }, [navigate]);

  const handleLogin = async () => {
    setError("");
    try {
      const res = await api.post("/sign-in", { email, password });

      if (res.status === 200) {
        const { token } = res.data; // token recebido
        const username = email.split("@")[0];   // nome de usuario email
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        navigate("/", { replace: true });
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) setError("Senha incorreta");
        else if (err.response.status === 422) setError("Dados inválidos");
        else setError("Erro inesperado");
      } else {
        setError("Erro de conexão");
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "auto" }}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}