import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { AuthContainer, AuthBox } from "./styles";

export default function Signin() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) navigate("/", { replace: true });
	}, [navigate]);

	const handleSignin = async () => {
		setError("");
		try {
		const res = await api.post("/sign-in", { email, password });

		if (res.status === 200) {
			const { token, user_name } = res.data; // token recebido
			localStorage.setItem("token", token);
			localStorage.setItem("username", user_name);
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
		<AuthContainer>
		<AuthBox>
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
			<button onClick={handleSignin}>Entrar</button>
			<p className="redirect">
				Não tem conta?{" "}
				<span onClick={() => navigate("/signup")}>Cadastrar</span>
			</p>
		</AuthBox>
		</AuthContainer>
	);
}