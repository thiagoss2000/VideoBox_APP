import { useEffect, useState } from "react"
import api from "../api"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

export default function Folders() {
    const [folders, setFolders] = useState([])
    const [selectedFolder, setSelectedFolder] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [modalNewOpen, setModalNewOpen] = useState(false)
    const [modalRenameOpen, setModalRenameOpen] = useState(false)
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
    const [newFolderName, setNewFolderName] = useState("")
    const [renameFolderName, setRenameFolderName] = useState("")
    const [folderToEdit, setFolderToEdit] = useState(null)
    const navigate = useNavigate()

    const fetchFolders = async () => {
        try {
            const token = localStorage.getItem("token")
            if (!token) throw new Error("Token não encontrado")

            const res = await api.get("/folders/list", {
                headers: { token: `Bearer ${token}` },
            })

            if (res.status === 200 && res.data.length > 0) {
                setFolders(res.data[0].folders || [])
            } else {
                setFolders([])
            }
        } catch (err) {
            setError("Erro ao carregar pastas.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFolders()
    }, [])

    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) return
        try {
            const token = localStorage.getItem("token")
            await api.post(
                "/folders/new",
                { folderName: newFolderName },
                { headers: { token: `Bearer ${token}` } }
            )
            setNewFolderName("")
            setModalNewOpen(false)
            fetchFolders()
        } catch {
            alert("Erro ao criar pasta")
        }
    }

    const handleRenameFolder = async () => {
        if (!renameFolderName.trim() || !folderToEdit) return
        try {
            const token = localStorage.getItem("token")
            await api.patch(
                "/folders/name",
                { folderName: folderToEdit.name, newFolderName: renameFolderName },
                { headers: { token: `Bearer ${token}` } }
            )
            setRenameFolderName("")
            setFolderToEdit(null)
            setModalRenameOpen(false)
            fetchFolders()
        } catch {
            alert("Erro ao renomear pasta")
        }
    }

    const handleDeleteFolder = async () => {
        if (!folderToEdit) return
        try {
            const token = localStorage.getItem("token")
            await api.delete(
                "/folders/rem",
                { headers: { token: `Bearer ${token}` },
                    data: { folderName: folderToEdit.name }
                }
            )
            setFolderToEdit(null)
            setModalDeleteOpen(false)
            fetchFolders()
        } catch {
            alert("Erro ao excluir pasta")
        }
    }

    if (loading) return <p style={{ textAlign: "center" }}>Carregando pastas...</p>
    if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>
    if (folders.length === 0) return <p style={{ textAlign: "center" }}>Nenhuma pasta encontrada.</p>

    return (
        <>
            <AddButton onClick={() => setModalNewOpen(true)}>+ Nova Pasta</AddButton>

            <FoldersContainer>
                {folders.map((folder, index) => (
                    <FolderCard key={index}>
                        <div onClick={() => setSelectedFolder(folder)}>
                            <h3>{folder.name}</h3>
                            {folder.createdAt && (
                                <p>Criada em: {new Date(folder.createdAt).toLocaleDateString()}</p>
                            )}
                            {folder.videos && folder.videos.length > 0 && (
                                <p>Videos: {folder.videos.length}</p>
                            )}
                            {folder.notes && folder.notes.trim() !== "" && (
                                <p>Notas: {folder.notes.substring(0, 100)}...</p>
                            )}
                        </div>

                        <FolderActions>
                            <ActionButton
                                onClick={() => {
                                    setFolderToEdit(folder)
                                    setRenameFolderName(folder.name)
                                    setModalRenameOpen(true)
                                }}
                            >
                                Renomear
                            </ActionButton>
                            <ActionButton
                                onClick={() => {
                                    setFolderToEdit(folder)
                                    setModalDeleteOpen(true)
                                }}
                            >
                                Excluir
                            </ActionButton>
                        </FolderActions>
                    </FolderCard>
                ))}
            </FoldersContainer>

            {selectedFolder && selectedFolder.videos && selectedFolder.videos.length > 0 && (
                <VideosContainer>
                    <h2>Vídeos em "{selectedFolder.name}"</h2>
                    <VideoList>
                        {selectedFolder.videos.map((video, idx) => (
                            <VideoCard
                                key={idx}
                                onClick={() =>
                                    navigate("/player", { state: { videoId: video.videoId } })
                                }
                            >
                                <div className="thumbnail">
                                    <img src={video.thumbnails?.medium?.url || ""} alt={video.title} />
                                </div>
                                <div className="info">
                                    <h4>{video.title}</h4>
                                    <p>{video.channelTitle}</p>
                                </div>
                            </VideoCard>
                        ))}
                    </VideoList>
                </VideosContainer>
            )}

            {/* Modal Nova Pasta */}
            {modalNewOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <h3>Criar nova pasta</h3>
                        <Input
                            type="text"
                            placeholder="Nome da pasta"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                        />
                        <Buttons>
                            <ModalButton onClick={handleCreateFolder}>Criar</ModalButton>
                            <ModalButton onClick={() => setModalNewOpen(false)}>Cancelar</ModalButton>
                        </Buttons>
                    </ModalContent>
                </ModalOverlay>
            )}

            {/* Modal Renomear Pasta */}
            {modalRenameOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <h3>Renomear pasta</h3>
                        <Input
                            type="text"
                            value={renameFolderName}
                            onChange={(e) => setRenameFolderName(e.target.value)}
                        />
                        <Buttons>
                            <ModalButton onClick={handleRenameFolder}>Salvar</ModalButton>
                            <ModalButton onClick={() => setModalRenameOpen(false)}>Cancelar</ModalButton>
                        </Buttons>
                    </ModalContent>
                </ModalOverlay>
            )}

            {/* Modal Excluir Pasta */}
            {modalDeleteOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <h3>Excluir pasta</h3>
                        <p>Tem certeza que deseja excluir a pasta "{folderToEdit?.name}"?</p>
                        <Buttons>
                            <ModalButton onClick={handleDeleteFolder}>Excluir</ModalButton>
                            <ModalButton onClick={() => setModalDeleteOpen(false)}>Cancelar</ModalButton>
                        </Buttons>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    )
}

// ----- Styled Components -----
const AddButton = styled.button`
    margin: 16px;
    padding: 8px 16px;
    background-color: #7ED8FF;
    border: none;
    border-radius: 4px;
    color: #282626;
    font-weight: bold;
    cursor: pointer;
`

const FoldersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px;
`

const FolderCard = styled.div`
    background-color: #282626;
    color: #7ED8FF;
    border-radius: 8px;
    padding: 16px;
    width: 250px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover { transform: scale(1.03); }

    h3 { margin: 0 0 8px 0; font-size: 1.1rem; }
    p { margin: 4px 0; font-size: 0.9rem; color: #c0e8ff; word-break: break-word; }
`

const FolderActions = styled.div`
    margin-top: 8px;
    display: flex;
    gap: 8px;
`

const ActionButton = styled.button`
    padding: 4px 8px;
    border-radius: 4px;
    border: none;
    background-color: #7ED8FF;
    color: #282626;
    cursor: pointer;
    font-size: 0.8rem;
`

const VideosContainer = styled.div` padding: 16px; `
const VideoList = styled.div` display: flex; flex-wrap: wrap; gap: 16px; `
const VideoCard = styled.div`
    background-color: #202020;
    color: #fff;
    border-radius: 8px;
    width: 240px;
    overflow: hidden;
    cursor: pointer;

    .thumbnail img {
        width: 100%;
        aspect-ratio: 16/9;
        object-fit: cover;
    }

    .info {
        padding: 8px;
        h4 { margin: 0 0 4px 0; font-size: 0.95rem; }
        p { margin: 0; font-size: 0.85rem; color: #c0e8ff; }
    }
`

// ----- Modal -----
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

const ModalContent = styled.div`
    background: #282626;
    padding: 24px;
    border-radius: 8px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: #7ED8FF;
`

const Input = styled.input`
    padding: 8px;
    border-radius: 4px;
    border: none;
    font-size: 1rem;
`

const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`

const ModalButton = styled.button`
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    background-color: #7ED8FF;
    color: #282626;
    cursor: pointer;
`
