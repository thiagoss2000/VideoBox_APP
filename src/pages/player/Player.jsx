import { useLocation, useNavigate } from "react-router-dom"
import ReactPlayer from "react-player"
import { BsArrowLeft } from "react-icons/bs"
import { IoAdd } from "react-icons/io5"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useData } from "../../context/MainContext"
import { useState } from "react"
import { addVideoToFolder } from "../../api/foldersApi"
import { Centered, BackButton, ModalOverlay, ModalContent, FolderSelect, Buttons, ModalButton, CloseButton } from "./styles"

export default function Player() {
    const location = useLocation()
    const navigate = useNavigate()
    const videoId = location.state?.videoId
    const title = location.state?.title
    const currentFolder = location.state?.folderName
    const orderVideo = location.state?.order
    const { folders } = useData()
    const ItensFolder = folders?.find(folder => folder.name == currentFolder)
    const previousVideo = ItensFolder?.videos.find(video => video._id == (orderVideo -1))
    const nextVideo = ItensFolder?.videos.find(video => video._id == (orderVideo +1))

    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedFolder, setSelectedFolder] = useState("")

    if (!videoId) {
        return (
            <Centered>
                <p>Vídeo não encontrado.</p>
                <button onClick={() => navigate(-1)}>Voltar</button>
            </Centered>
        )
    }

    async function handleAddToFolder(folderName) {
    try {
        setLoading(true);
        const token = localStorage.getItem("token");
        await addVideoToFolder(folderName, videoId, token);
        alert(`Vídeo adicionado à pasta "${folderName}"`);
        setModalOpen(false);
    } catch (err) {
        const status = err.response?.status;
        if (status === 422) alert("Dados inválidos. Verifique o vídeo ou a pasta.");
        else if (status === 404) alert(`Pasta "${folderName}" não encontrada.`);
        else if (status === 409) alert(`O vídeo já está na pasta "${folderName}".`);
        else if (status === 500) alert("Erro interno do servidor. Tente novamente mais tarde.");
        else alert("Erro desconhecido ao adicionar vídeo à pasta.");
        console.error(err);
    } finally {
        setLoading(false);
    }
    }

    return (
        <Centered>
            <BackButton onClick={() => navigate(-1)}>
                <BsArrowLeft size={24} /> Voltar
            </BackButton>
            <div className="player">
                <ReactPlayer
                    src={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                />
                <div className="barPlayer">
                    <h3>{title}</h3>
                    { currentFolder ? 
                        <div className="folderOptions">
                            <button>
                                <IoAdd className="icon"/>Notas
                            </button>
                            <FaChevronLeft 
                                onClick={() =>
                                    previousVideo ?
                                    navigate("/player", { state: { videoId: previousVideo.videoId, title: previousVideo.title, folderName: currentFolder, order: previousVideo._id } })
                                    : 0
                                }
                                className="icon"
                            />
                            <h4>{orderVideo}/{ItensFolder.videos.length}</h4>
                            <FaChevronRight 
                                onClick={() =>
                                    nextVideo ?
                                    navigate("/player", { state: { videoId: nextVideo.videoId, title: nextVideo.title, folderName: currentFolder, order: nextVideo._id } })
                                    : 0
                                }
                                className="icon"
                            />
                        </div> :
                        <button onClick={() => setModalOpen(true)}>
                            <IoAdd className="icon"/>Pasta
                        </button> 
                    }
                </div>
                { currentFolder ? 
                    <p>{currentFolder}</p> :
                    <></>
                }
            </div>

            {/* Modal de seleção de pasta */}
            {modalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <h3>Adicionar à pasta</h3>
                        {folders.length === 0 ? (
                            <p>Você não possui pastas.</p>
                        ) : (
                            <FolderSelect
                                value={selectedFolder}
                                onChange={(e) => setSelectedFolder(e.target.value)}
                                disabled={loading}
                            >
                                <option value="" disabled>Selecione uma pasta</option>
                                {folders.map((f, idx) => (
                                    <option key={idx} value={f.name}>
                                        {f.name}
                                    </option>
                                ))}
                            </FolderSelect>
                        )}
                        <Buttons>
                            <ModalButton
                                onClick={() => handleAddToFolder(selectedFolder)}
                                disabled={!selectedFolder || loading}
                            >
                                Adicionar
                            </ModalButton>
                            <CloseButton onClick={() => setModalOpen(false)}>
                                Cancelar
                            </CloseButton>
                        </Buttons>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Centered>
    )
}

