import { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import api from "../api"
import styled from "styled-components"

export default function MainContent() {
    const [videos, setVideos] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTimeline = async () => {
        try {
            const token = localStorage.getItem("token")
            if (!token) {
            setError("Token não encontrado. Faça login novamente.")
            setLoading(false)
            return
            }

            const res = await api.get("/timeline", {
            headers: {
                token: `Bearer ${token}`,
            },
            })

            if (res.status === 200) {
            setVideos(res.data.recommendations || [])
            }
        } catch (err) {
            setError("Erro ao carregar vídeos.")
        } finally {
            setLoading(false)
        }
        }

        fetchTimeline()
    }, [])

    if (loading) 
        return <p style={{ textAlign: "center" }}>Carregando vídeos...</p>
    if (error) 
        return <p style={{ textAlign: "center", color: "red" }}>{error}</p>
    if (videos.length === 0) 
        return <p style={{ textAlign: "center" }}>Nenhum vídeo encontrado.</p>
        
    return (
        <Main>
        {videos.map((video) => (
            <div className="video_recommends">
                <div className="video">
                    <ReactPlayer
                        src={`https://www.youtube.com/watch?v=${video.videoId}`}
                        controls
                        width="100%"
                        height="100%"
                    />
                </div>
                <h3>{video.title}</h3>
                <p>{video.channelTitle}</p>
            </div>
        ))}
        </Main>
    )
}

const Main = styled.nav`
    display: flex;
    flex-wrap: nowrap;          /* não quebrar linha */
    gap: 12px;                  /* espaçamento entre itens (opcional) */
    overflow-x: auto;           /* rolagem horizontal */
    overflow-y: hidden;         /*evita barra vertical */
    -webkit-overflow-scrolling: touch; /* inércia no iOS */
    scroll-snap-type: x proximity;     /* snap suave (opcional) */
    padding: 8px;               /* espaço interno opcional */
    border-radius: 8px;
    height: max-content;
    max-width: 88%;
    margin-inline: auto;
    margin-top: 20px;
    .video_recommends {
        width: 540px;
        height: 380px;
        background-color: #282626;
        display: flex;
        flex-direction: column;
        color: #7ED8FF;
    }
    .video {
        width: 500px;
        aspect-ratio: 16/9;
    }

`