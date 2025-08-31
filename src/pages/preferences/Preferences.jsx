import { useEffect, useState } from "react";
import { getPreferences, updatePreferences } from "../../api/preferences";
import { PreferencesContainer, InterestThemes, BlockChannels, ModalOverlay, ModalContent, Buttons, ModalButton } from "./styles";

export default function Preferences() {
	const [preferences, setPreferences] = useState(null);
	const [newTheme, setNewTheme] = useState("");
	const [themeToRemove, setThemeToRemove] = useState(null); // tema selecionado para excluir
	const [showModal, setShowModal] = useState(false);

	const fetchPreferences = async () => {
		try {
		const token = localStorage.getItem("token");
		const res = await getPreferences(token);
		setPreferences(res.data);
		} catch (err) {
		console.error("Erro ao buscar preferências:", err);
		}
	};

	useEffect(() => {
		fetchPreferences();
	}, []);

	// Adicionar novo tema
	const handleAddTheme = async () => {
		if (!newTheme.trim()) return;
		try {
		const token = localStorage.getItem("token");
		await updatePreferences(token, {
			add: { themeVideo: [newTheme] },
		});
		setNewTheme("");
		fetchPreferences();
		} catch (err) {
		console.error("Erro ao adicionar tema:", err);
		}
	};

	// Abrir modal para confirmar exclusão
	const handleOpenModal = (theme) => {
		setThemeToRemove(theme);
		setShowModal(true);
	};

	// Confirmar exclusão
	const handleConfirmRemove = async () => {
		try {
		const token = localStorage.getItem("token");
		await updatePreferences(token, {
			remove: { themeVideo: [themeToRemove] },
		});
		setThemeToRemove(null);
		setShowModal(false);
		fetchPreferences();
		} catch (err) {
		console.error("Erro ao remover tema:", err);
		}
	};

	return (
		<PreferencesContainer>
		<InterestThemes>
			<h4>Temas de Interesse:</h4>
			<div className="interestSearch">
			<input
				type="text"
				placeholder="Adicionar tema de interesse..."
				value={newTheme}
				onChange={(e) => setNewTheme(e.target.value)}
			/>
			<button onClick={handleAddTheme}>Adicionar</button>
			</div>

			<div className="themesList">
			{preferences?.themeVideo?.map((t, i) => (
				<div key={i} className="themeItem">
				<span>{t}</span>
				<button onClick={() => handleOpenModal(t)}>X</button>
				</div>
			))}
			</div>
		</InterestThemes>

		<BlockChannels>
			<h4>Canais bloqueados</h4>
		</BlockChannels>

		{/* Modal de confirmação */}
		{showModal && (
			<ModalOverlay>
			<ModalContent>
				<h3>Excluir Tema</h3>
				<p>Tem certeza que deseja remover "{themeToRemove}"?</p>
				<Buttons>
				<ModalButton onClick={handleConfirmRemove} className="confirm">Sim</ModalButton>
				<ModalButton onClick={() => setShowModal(false)} className="cancel">Cancelar</ModalButton>
				</Buttons>
			</ModalContent>
			</ModalOverlay>
		)}
		</PreferencesContainer>
	);
}
