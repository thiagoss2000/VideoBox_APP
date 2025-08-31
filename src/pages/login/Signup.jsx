import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { AuthContainer, AuthBox } from "./styles";

export default function Signup() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) navigate("/", { replace: true });
	}, [navigate]);

	const handleSignup = async () => {
		setError("");
		try {
		const res = await api.post("/sign-up", {
			name,
			email,
			password,
			confirmPassword,
		});

		if (res.status === 201) {
			navigate("/signin", { replace: true });
		}
		} catch (err) {
		if (err.response) {
			if (err.response.status === 409) setError("Usuário já cadastrado");
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
			<h1>Criar Conta</h1>

			<input
			type="text"
			placeholder="Digite seu nome"
			value={name}
			onChange={(e) => setName(e.target.value)}
			/>
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
			<input
			type="password"
			placeholder="Confirme sua senha"
			value={confirmPassword}
			onChange={(e) => setConfirmPassword(e.target.value)}
			/>

			{error && <p className="error">{error}</p>}

			<button onClick={handleSignup}>Confirmar</button>

			<p className="redirect">
			Já tem conta?{" "}
			<span onClick={() => navigate("/signin")}>Entrar</span>
			</p>
		</AuthBox>
		</AuthContainer>
	);
}
