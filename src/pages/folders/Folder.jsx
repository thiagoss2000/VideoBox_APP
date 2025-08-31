import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useData } from "../../context/MainContext"

import { createFolder, renameFolder, deleteFolder, deleteVideo, renameVideoTag, patchFolderDays } from "../../api/foldersApi"

import { AddButton, FoldersContainer, VideosContainer } from "../../components/folders/styles"
import FolderList from "../../components/folders/FolderList"
import VideoList from "../../components/folders/VideoList"
import { ModalNewFolder, ModalRenameFolder, ModalDeleteFolder, ModalDaysOfWeek } from "../../components/folders/FolderModals"

export default function FoldersPage() {
    const { folders, setFolders, error, loading, fetchFoldersData} = useData()
    const [selectedFolder, setSelectedFolder] = useState(null)

    const [modalNewOpen, setModalNewOpen] = useState(false)
    const [modalRenameOpen, setModalRenameOpen] = useState(false)
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false)

    const [newFolderName, setNewFolderName] = useState("")
    const [renameFolderName, setRenameFolderName] = useState("")
    const [folderToEdit, setFolderToEdit] = useState(null)
    const [activeEdit, setActiveEdit] = useState(false)

    const [modalDaysOpen, setModalDaysOpen] = useState(false);
    const [folderForDays, setFolderForDays] = useState(null);

    const navigate = useNavigate()


    useEffect(() => {
        fetchFoldersData()
    }, [])

    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) return
        try {
        const token = localStorage.getItem("token")
        await createFolder(newFolderName, token)
        setNewFolderName("")
        setModalNewOpen(false)
        fetchFoldersData()
        } catch {
        alert("Erro ao criar pasta")
        }
    }

    const handleRenameFolder = async () => {
        if (!renameFolderName.trim() || !folderToEdit) return
        try {
        const token = localStorage.getItem("token")
        await renameFolder(folderToEdit.name, renameFolderName, token)
        setRenameFolderName("")
        setFolderToEdit(null)
        setModalRenameOpen(false)
        fetchFoldersData()
        } catch {
        alert("Erro ao renomear pasta")
        }
    }

    const handleDeleteFolder = async () => {
        if (!folderToEdit) return
        try {
        const token = localStorage.getItem("token")
        await deleteFolder(folderToEdit.name, token)
        setFolderToEdit(null)
        setModalDeleteOpen(false)
        fetchFoldersData()
        } catch {
        alert("Erro ao excluir pasta")
        }
    }

    // Função para abrir o modal de dias
    const handleOpenDaysModal = (folder) => {
        setFolderForDays(folder);
        setModalDaysOpen(true);
    };

    // Função para salvar os dias selecionados
    const handleSaveDays = async (folderName, daysOfWeek) => {
        try {
            const token = localStorage.getItem("token");
            await patchFolderDays(folderName, daysOfWeek, token);

            // Atualiza estado local
            const updatedFolders = folders.map(f =>
            f.name === folderName ? { ...f, daysOfWeek } : f
            );
            setFolders(updatedFolders);

            // Fecha modal
            setModalDaysOpen(false);
        } catch (err) {
            console.error("Erro ao atualizar dias:", err);
        }
    };

    const handleDeleteVideo = async (video, folderName) => {
    if (!window.confirm(`Deseja realmente excluir o vídeo "${video.title}" da pasta "${folderName}"?`)) {
        return; // cancela a exclusão se o usuário não confirmar
    }
    try {
        const token = localStorage.getItem("token")
        await deleteVideo(folderName, video.videoId, token)

        // Atualiza estado local
        const updatedFolders = folders.map(f => {
        if (f.name === folderName) {
            return {
            ...f,
            videos: f.videos.filter(v => v.videoId !== video.videoId)
            }
        }
        return f
        });
        setFolders(updatedFolders);

        if (selectedFolder?.name === folderName) {
        setSelectedFolder({
            ...selectedFolder,
            videos: selectedFolder.videos.filter(v => v.videoId !== video.videoId)
        });
        }
    } catch {
        alert("Erro ao excluir vídeo")
    }
    }

    const handleRenameVideo = async (video, folderName) => {
    const newTag = prompt("Digite a nova tag para o vídeo:", video.videoTag || "")
    if (!newTag) return

    try {
        const token = localStorage.getItem("token")
        await renameVideoTag(folderName, video.videoId, newTag, token)

        // Atualiza estado local
        const updatedFolders = folders.map(f => {
        if (f.name === folderName) {
            return {
            ...f,
            videos: f.videos.map(v => 
                v.videoId === video.videoId ? { ...v, videoTag: newTag } : v
            )
            }
        }
        return f
        });
        setFolders(updatedFolders);

        if (selectedFolder?.name === folderName) {
        setSelectedFolder({
            ...selectedFolder,
            videos: selectedFolder.videos.map(v =>
            v.videoId === video.videoId ? { ...v, videoTag: newTag } : v
            )
        });
        }
    } catch {
        alert("Erro ao renomear vídeo")
    }
    }


    const handlePlayVideo = (video, folderName) => {
        navigate("/player", {
        state: {
            videoId: video.videoId,
            title: video.title,
            folderName,
            order: video._id,
        },
        })
    }

    if (loading) return <p style={{ textAlign: "center" }}>Carregando pastas...</p>
    if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>

    return (
        <>
        <AddButton onClick={() => setModalNewOpen(true)}>+ Nova Pasta</AddButton>
        {folders.length > 0 && (
        <AddButton onClick={() => setActiveEdit(!activeEdit)}>
            {activeEdit ? "Voltar" : "Editar"}
        </AddButton>
        )}

        {folders.length === 0 ? (
        <p style={{ textAlign: "center" }}>Nenhuma pasta encontrada.</p>
        ) : (
        <FoldersContainer>
            <FolderList
            activeEdit={activeEdit}
            folders={folders}
            folderName={selectedFolder?.name}
            onSelect={setSelectedFolder}
            onRename={(folder) => {
                setFolderToEdit(folder)
                setRenameFolderName(folder.name)
                setModalRenameOpen(true)
            }}
            onDelete={(folder) => {
                setFolderToEdit(folder)
                setModalDeleteOpen(true)
            }}
            onEditDays={handleOpenDaysModal}
            />
        </FoldersContainer>
        )}

        {selectedFolder?.videos?.length > 0 && (
        <VideosContainer>
            <VideoList
            activeEdit={activeEdit}
            videos={selectedFolder.videos}
            folderName={selectedFolder.name}
            onPlay={handlePlayVideo}
            onDelete={handleDeleteVideo}
            onRename={handleRenameVideo}
            />
        </VideosContainer>
        )}

        <ModalNewFolder
            open={modalNewOpen}
            onClose={() => setModalNewOpen(false)}
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onSave={handleCreateFolder}
        />

        <ModalRenameFolder
            open={modalRenameOpen}
            onClose={() => setModalRenameOpen(false)}
            value={renameFolderName}
            onChange={(e) => setRenameFolderName(e.target.value)}
            onSave={handleRenameFolder}
        />

        <ModalDeleteFolder
            open={modalDeleteOpen}
            onClose={() => setModalDeleteOpen(false)}
            folderName={folderToEdit?.name}
            onDelete={handleDeleteFolder}
        />

        <ModalDaysOfWeek
            open={modalDaysOpen}
            folder={folderForDays}
            onClose={() => setModalDaysOpen(false)}
            onSave={handleSaveDays}
        />

        </>
    )
}
