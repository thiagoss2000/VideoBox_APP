import { useEffect, useState } from "react"
import api from "../api"
import styled from "styled-components"
import ReactPlayer from "react-player"

export default function Folders() {
    const [folders, setFolders] = useState([])
    const [selectedFolder, setSelectedFolder] = useState(null) // pasta selecionada
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    setError("Token não encontrado. Faça login novamente.")
                    setLoading(false)
                    return
                }

                const res = await api.get("/folders/list", {
                    headers: {
                        token: `Bearer ${token}`,
                    },
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

        fetchFolders()
    }, [])

    if (loading) return <p style={{ textAlign: "center" }}>Carregando pastas...</p>
    if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>
    if (folders.length === 0) return <p style={{ textAlign: "center" }}>Nenhuma pasta encontrada.</p>

    return (
        <>
            <FoldersContainer>
                {folders.map((folder, index) => (
                    <FolderCard
                        key={index}
                        onClick={() => setSelectedFolder(folder)}
                    >
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
                    </FolderCard>
                ))}
            </FoldersContainer>

            {/* Se uma pasta estiver selecionada, mostrar vídeos */}
            {selectedFolder && selectedFolder.videos && selectedFolder.videos.length > 0 && (
                <VideosContainer>
                    <h2>Vídeos em "{selectedFolder.name}"</h2>
                    <VideoList>
                        {selectedFolder.videos.map((video, idx) => (
                            <VideoCard key={idx}>
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
        </>
    )
}

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
    
    &:hover {
        transform: scale(1.03);
    }

    h3 {
        margin: 0 0 8px 0;
        font-size: 1.1rem;
    }

    p {
        margin: 4px 0;
        font-size: 0.9rem;
        color: #c0e8ff;
        word-break: break-word;
    }
`

const VideosContainer = styled.div`
    padding: 16px;
`

const VideoList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`

const VideoCard = styled.div`
    background-color: #202020;
    color: #fff;
    border-radius: 8px;
    width: 240px;
    overflow: hidden;

    .thumbnail img {
        width: 100%;
        aspect-ratio: 16/9;
        object-fit: cover;
    }

    .info {
        padding: 8px;
        h4 {
            margin: 0 0 4px 0;
            font-size: 0.95rem;
        }
        p {
            margin: 0;
            font-size: 0.85rem;
            color: #c0e8ff;
        }
    }
`
