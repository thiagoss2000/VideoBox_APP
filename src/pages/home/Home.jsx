import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTimeline } from "../../api/timelineApi";
import { AiOutlineSync } from "react-icons/ai";
import { Main, VideosContainer, VideoCard } from "./styles";

export default function Home() {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchTimeline = async (newList = false) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Token não encontrado. Faça login novamente.");
            setLoading(false);
            return;
        }

        try {
        setLoading(true);
        const res = await getTimeline(token, newList); // chama o serviço
        setVideos(res.data.searchVideos || []);
        setError("");
        } catch (err) {
        setError("Erro ao carregar vídeos.");
        console.error(err)
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimeline();
    }, []);

    if (loading) return <p style={{ textAlign: "center" }}>Carregando vídeos...</p>;
    if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
    if (videos.length === 0) return <p style={{ textAlign: "center" }}>Nenhum vídeo encontrado.</p>;

    return (
        <Main>
        <h4 className="nameContainer">
            <AiOutlineSync
            className="icon"
            onClick={() => fetchTimeline(true)}
            />
            Recomendações
        </h4>
        <VideosContainer>
            {videos.map((video, idx) => (
            <VideoCard
                key={idx}
                onClick={() =>
                navigate("/player", { state: { videoId: video.videoId, title: video.title } })
                }
            >
                <div className="thumbnail">
                <img src={video.thumbnails?.high?.url || ""} alt={video.title} />
                </div>
                <div className="info">
                <h4>{video.title}</h4>
                <p>{video.channelTitle}</p>
                </div>
            </VideoCard>
            ))}
        </VideosContainer>
        </Main>
    );
}