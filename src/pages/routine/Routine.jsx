import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa"
import { useData } from "../../context/MainContext"
import { RoutineContainer, Daily, VideoCard } from "./styles";

export default function Routine() {
    const { folders, fetchFoldersData } = useData()
    const [foldersToday, setFoldersToday] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        fetchFoldersData()
        const today = new Date();
        const weekday = today.toLocaleDateString("pt-BR", { weekday: "long" });

        if (folders && folders.length > 0) {
        // normaliza para minúsculas
        const filtered = folders.filter((f) =>
            f.daysOfWeek?.some(
            (d) => d.toLowerCase() === weekday.toLowerCase()
            )
        );
        setFoldersToday(filtered);
        }
    }, [folders]);

    const handlePlayVideo = (video, folderName) => {
        Navigate("/player", {
        state: {
            videoId: video.videoId,
            title: video.title,
            folderName,
            order: video._id,
        },
        })
    }

    return (
        <RoutineContainer>
            <Daily>
                <h4>Pendente</h4>
                <div className="line"></div>
                {foldersToday.map((folder, idx) => (
                    <div key={idx} className="folderName">
                        <h4>{folder.name}</h4>
                    </div>
                ))}

                {foldersToday.map((folder, idx) => {
                    const video = folder?.videos[0]
                    return (
                    <VideoCard key={idx}>
                        <div className="thumbnail">
                            <img src={video.thumbnails?.medium?.url || ""} alt={video.title} />
                        </div>
                        <div className="info">
                            <p>
                                {video.videoTag ? video.videoTag : video.title}
                            </p>
                        </div>
                        <div className="playButton" onClick={() => handlePlayVideo(video, folder.name)}>
                            <FaPlay className="playIcon" />
                        </div>
                    </VideoCard>
                )})}
            </Daily>
        </RoutineContainer>
    );
}
