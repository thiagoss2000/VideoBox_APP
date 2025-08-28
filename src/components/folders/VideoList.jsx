import { ImCancelCircle } from "react-icons/im"
import { FaPlay } from "react-icons/fa"
import { VideoList as VideoListStyled, VideoCard } from "./styles"

export default function VideoList({ activeEdit, videos, folderName, onPlay, onDelete, onRename }) {
  return (
    <VideoListStyled>
      {videos.map((video, idx) => (
        <VideoCard key={idx}>
          <div className="thumbnail">
            <img src={video.thumbnails?.medium?.url || ""} alt={video.title} />
          </div>
          <div className="info">
            <p onClick={() => activeEdit ? onRename(video, folderName) : onPlay(video, folderName)}>
                {video.videoTag ? video.videoTag : video.title}
            </p>
          </div>
          {activeEdit ? 
            <ImCancelCircle
                className="deleteIcon"
                onClick={() => onDelete(video, folderName)}
            />
          : <></>}
          <div className="playButton" onClick={() => onPlay(video, folderName)}>
            <FaPlay className="playIcon" />
          </div>
        </VideoCard>
      ))}
    </VideoListStyled>
  )
}