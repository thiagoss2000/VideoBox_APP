import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPreferences, updatePreferences } from "../../api/preferences";

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
          <ModalBox>
            <p>Tem certeza que deseja remover <strong>{themeToRemove}</strong>?</p>
            <div className="actions">
              <button onClick={handleConfirmRemove} className="confirm">Sim</button>
              <button onClick={() => setShowModal(false)} className="cancel">Cancelar</button>
            </div>
          </ModalBox>
        </ModalOverlay>
      )}
    </PreferencesContainer>
  );
}

const PreferencesContainer = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #c0c0c0;
  h4 {
    position: absolute;
    top: -30px;
  }
`;

const InterestThemes = styled.nav`
  width: 55%;
  height: 85%;
  border: solid 1px black;
  padding: 10px;
  position: relative;

  .interestSearch {
    display: flex;
    gap: 8px;
    margin-bottom: 15px;
  }

  .themesList {
    margin-top: 10px;
  }

  .themeItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
    margin-top: 5px;
    background: #373737;
    color: #fff;
    border-radius: 6px;
  }

  button {
    background: #1b4eae;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
`;

const BlockChannels = styled.nav`
  width: 30%;
  height: 85%;
  border: solid 1px black;
  padding: 10px;
  position: relative;
`;

/* Modal estilizado */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: #1e1e1e;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
  color: #fff;
  text-align: center;

  .actions {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
  }

  .confirm {
    background: #d9534f;
    color: white;
  }
  .cancel {
    background: #5bc0de;
    color: white;
  }

  button {
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
  }
`;
