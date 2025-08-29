import styled from "styled-components";

export const RoutineContainer = styled.nav`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
export const Daily = styled.nav`
    width: 400px;
    height: 90%;
    background-color: #939393;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #AEAEAE;
    h4 {
        padding: 2px;
        font-weight: lighter;
    }
    .line { width: 80%; height: 1px; background-color: #AEAEAE; margin-bottom: 10px; }
    .folderName {
        margin: 5px;
        padding: 10px;
        width: 90%;
        height: 30px;
        background: linear-gradient(135deg, #D3BDC1, #6D6264);
        background-color: #6D6264;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 2px;
        color: #E8E8E8;
    }
`
export const VideoCard = styled.div`
    margin-top: 10px;
    background-color: #202020;
    color: #fff;
    border-radius: 8px;
    width: 90%;
    overflow: hidden;
    position: relative;

    .thumbnail img {
        margin-top: 2.5%;
        margin-inline: 2.5%;
        width: 95%;
        aspect-ratio: 16/9;
        object-fit: cover;
    }

    .info {
        padding: 8px;
        p { 
        margin: 0 0 4px 0; 
        font-size: 0.8rem; 
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #7ED8FF;
        }
    }

    .playButton {
        width: 40%;
        aspect-ratio: 1/1;
        position: absolute;
        top: calc(10% + 8px);
        right: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 40%;
        cursor: pointer;
    }
    .playIcon {
        font-size: 2rem;
        color: #819ba5d5;
        cursor: pointer;
    }
`