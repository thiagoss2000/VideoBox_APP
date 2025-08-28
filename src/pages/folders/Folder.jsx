import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useData } from "../../context/MainContext"

import { fetchFolders, createFolder, renameFolder, deleteFolder, deleteVideo, renameVideoTag } from "../../api/foldersApi"

import { AddButton, FoldersContainer, VideosContainer } from "../../components/folders/styles"
import FolderList from "../../components/folders/FolderList"
import VideoList from "../../components/folders/VideoList"
import { ModalNewFolder, ModalRenameFolder, ModalDeleteFolder } from "../../components/folders/FolderModals"

export default function FoldersPage() {
    const { folders, setFolders } = useData()
    const [selectedFolder, setSelectedFolder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [modalNewOpen, setModalNewOpen] = useState(false)
    const [modalRenameOpen, setModalRenameOpen] = useState(false)
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false)

    const [newFolderName, setNewFolderName] = useState("")
    const [renameFolderName, setRenameFolderName] = useState("")
    const [folderToEdit, setFolderToEdit] = useState(null)
    const [activeEdit, setActiveEdit] = useState(false)

    const navigate = useNavigate()

    const fetchFoldersData = async () => {
        try {
        const token = localStorage.getItem("token")
        const res = await fetchFolders(token)
        setFolders(res.data[0]?.folders || [])
        } catch {
        setError("Erro ao carregar pastas.")
        } finally {
        setLoading(false)
        }
    }

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
    if (folders.length === 0) return <p style={{ textAlign: "center" }}>Nenhuma pasta encontrada.</p>

    return (
        <>
        <AddButton onClick={() => setModalNewOpen(true)}>+ Nova Pasta</AddButton>
        <AddButton onClick={() => setActiveEdit(!activeEdit)}>{activeEdit ? "Voltar" : "Editar"}</AddButton>

        <FoldersContainer>
            <FolderList
            activeEdit = {activeEdit}
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
            />
        </FoldersContainer>

        {selectedFolder?.videos?.length > 0 && (
            <VideosContainer>
            <VideoList
                activeEdit = {activeEdit}
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
        </>
    )
}
