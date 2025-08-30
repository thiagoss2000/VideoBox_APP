import styled from "styled-components";

export const TextBox = styled.nav`
    margin: auto;
    margin-top: 30px;
    width: 85%;
    height: calc(100% - 260px);
    background-color: #373737;

    h4 {
        width: 80%;
        margin-inline: auto;
        text-align: center;
        color: #ffffffc0;
        padding-top: 10px;
    }
    .line {
        background-color: #C0C0C0;
        width: 90%;
        height: 1px;
        margin-inline: auto;
        margin-top: 15px;
    }
    .note {
        width: 95%;
        margin-inline: auto;
        margin-top: 30px;
    }
    .note p {
        color: #ffffffc0;
        padding-left: 20px;
        padding-top: 5px;
        cursor: pointer;
    }
    .note h5 {
        color: #ffffff84
    }
`

export const NotesContainer = styled.nav`
    display: flex;
	flex-wrap: wrap;
	gap: 16px;
	padding-inline: 16px;
    padding-top: 20px;
    padding-bottom: 30px;
    border-bottom: solid 1px black;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`

export const NotesCard = styled.div`
	background-color: #282626;
	color: #c0e8ff;
	border-radius: 8px;
	padding: 16px;
	width: 180px;
	height: 160px;
	min-height: 100px;
	
	transition: transform 0.2s;

	h4 { 
        padding-top: 10px;
		font-size: 0.9rem; 
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
        text-align: center;
	}

	.noteIcon {
		font-size: 6rem;
		margin-inline: calc(50% - 3rem);
		color: #1B4EAE;
		filter: drop-shadow(3px 3px 6px rgba(115, 197, 255, 0.39));
		&:hover { transform: scale(1.03); }
		cursor: pointer;
	}
`


export const NewNoteBox = styled.div`
    display: flex;
    gap: 8px;
    margin: 20px auto;
    width: 90%;

    input {
        flex: 1;
        padding: 6px 10px;
        border-radius: 6px;
        border: none;
    }
    button {
        background: #1B4EAE;
        color: white;
        padding: 6px 12px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        &:hover { opacity: 0.9; }
    }
`

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ModalBox = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    width: 400px;
    max-width: 90%;

    h3 { margin-bottom: 12px; }
    textarea {
        width: 100%;
        height: 120px;
        padding: 8px;
        border-radius: 6px;
    }
    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 12px;
    }
    button {
        padding: 6px 12px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }
    button:last-child {
        background: #1B4EAE;
        color: white;
    }
`