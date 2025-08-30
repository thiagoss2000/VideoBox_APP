import styled from "styled-components"

export const AddButton = styled.button`
	margin: 16px;
	padding: 8px 16px;
	background-color: #7ED8FF;
	border: none;
	border-radius: 4px;
	color: #282626;
	font-weight: bold;
	cursor: pointer;
`

export const FoldersContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	padding-inline: 16px;
	padding-bottom: 30px;
    border-bottom: solid 1px black;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`

export const FolderCard = styled.div`
	background-color: #282626;
	color: #c0e8ff;
	border-radius: 8px;
	padding: 16px;
	width: 180px;
	height: 180px;
	min-height: 100px;
	
	transition: transform 0.2s;
	position: relative;

	

	h4 { 
		margin: 0 0 8px 0; 
		font-size: 0.9rem; 
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
	}
	p { 
		font-size: 0.9rem; 
		word-break: break-word; 
		width: 100%;
		text-align: center;
	}

	.folderIcon {
		font-size: 6rem;
		margin-inline: calc(50% - 3rem);
		color: #1B4EAE;
		filter: drop-shadow(3px 3px 6px rgba(115, 197, 255, 0.39));
		&:hover { transform: scale(1.03); }
		cursor: pointer;
	}
	.deleteIcon {
		position: absolute;
		top: 5px;
		right: 5px;
		cursor: pointer;
		color: #B41417;
	}
	.editIcon {
		position: absolute;
		right: 5px;
		top: 115px;
		cursor: pointer;
		color: #7ED8FF;
	}
`


export const VideosContainer = styled.div` padding: 16px; `
export const VideoList = styled.div` display: flex; flex-wrap: wrap; gap: 16px; `
export const VideoCard = styled.div`
	background-color: #202020;
	color: #fff;
	border-radius: 8px;
	width: 240px;
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
		cursor: pointer; 
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
		top: 20px;
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

	.deleteIcon {
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
		color: #B41417;
	}
`

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
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

export const Input = styled.input`
	padding: 8px;
	border-radius: 4px;
	border: none;
	font-size: 1rem;
`

export const Buttons = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 8px;
`

export const ModalButton = styled.button`
	padding: 8px 12px;
	border-radius: 4px;
	border: none;
	background-color: #7ED8FF;
	color: #282626;
	cursor: pointer;
`
export const DaysContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 10px 0;
`;

export const Day = styled.div`
	margin: 5px;
	padding: 8px 12px;
	border-radius: 5px;
	cursor: pointer;
	border: ${({ selected }) => (selected ? "2px solid #7ED8FF" : "2px solid transparent")};
	background-color: ${({ selected }) => (selected ? "#202c3c" : "#333")};
	color: #fff;
	font-size: 0.9rem;
`;