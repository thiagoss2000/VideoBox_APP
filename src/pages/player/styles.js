import styled from "styled-components"

export const Centered = styled.div`
    position: relative;
    padding-top: 30px;
    height: 100%;
    background-color: #181818;
    color: #fff;
    .player {
        margin-inline: auto;
        width: 80%;
        aspect-ratio: 16/9;
    }
    .barPlayer {
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .barPlayer h3 {
        color: #7ED8FF;
        font-weight: normal;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 70%;    
    }
    p {
        color: #7ED8FF;
        font-weight: lighter;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 70%;    
    }
    .barPlayer button {
        color: #7ED8FF;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }
    .icon {
        font-size: 1.6rem;
        cursor: pointer;
    }
    .folderOptions {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 250px;
        color: #7ED8FF;
    }
`

export const BackButton = styled.button`
    position: absolute;
    left: 20px;
    top: 20px;
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

// ----- Modal -----
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

export const ModalContent = styled.div`
    background: #282626;
    padding: 24px;
    border-radius: 8px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: #7ED8FF;
`

export const FolderSelect = styled.select`
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    background-color: #7ED8FF;
    color: #282626;
    font-size: 1rem;
    cursor: pointer;
    &:disabled {
        background-color: #555;
        cursor: not-allowed;
    }
`

export const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
`

export const ModalButton = styled.button`
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    background-color: #7ED8FF;
    color: #282626;
    cursor: pointer;
    &:disabled {
        background-color: #555;
        cursor: not-allowed;
    }
`

export const CloseButton = styled.button`
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    background-color: #444;
    color: #fff;
    cursor: pointer;
    margin-top: 12px;
`