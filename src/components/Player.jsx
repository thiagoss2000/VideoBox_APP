import { useLocation, useNavigate } from "react-router-dom"
import ReactPlayer from "react-player"
import styled from "styled-components"
import { BsArrowLeft } from "react-icons/bs"

export default function Player() {
    const location = useLocation()
    const navigate = useNavigate()
    const videoId = location.state?.videoId

    if (!videoId) {
        return (
            <Centered>
                <p>Vídeo não encontrado.</p>
                <button onClick={() => navigate(-1)}>Voltar</button>
            </Centered>
        )
    }

    return (
        <Centered>
            <BackButton onClick={() => navigate(-1)}>
                <BsArrowLeft size={24} /> Voltar
            </BackButton>
            <ReactPlayer
                src={`https://www.youtube.com/watch?v=${videoId}`}
                controls
                width="80%"
                height="80%"
            />
        </Centered>
    )
}

const Centered = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #181818;
    color: #fff;
`

const BackButton = styled.button`
    background: none;
    border: none;
    color: #7ED8FF;
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin-bottom: 16px;
    cursor: pointer;

    svg {
        margin-right: 8px;
    }
`
