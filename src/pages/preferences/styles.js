import styled from "styled-components";

export const PreferencesContainer = styled.nav`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #c0c0c0;
    h4 {
        position: absolute;
        top: -30px;
    }
`;

export const InterestThemes = styled.nav`
    width: 55%;
    height: 85%;
    border: solid 1px black;
    padding: 10px;
    position: relative;

    .interestSearch {
        display: flex;
        gap: 8px;
        margin-bottom: 15px;
    }

    .themesList {
        margin-top: 10px;
    }

    .themeItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px;
        margin-top: 5px;
        background: #373737;
        color: #fff;
        border-radius: 6px;
    }

    button {
        background: #1b4eae;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 4px 8px;
        cursor: pointer;
        &:hover {
        opacity: 0.9;
        }
    }
`;

export const BlockChannels = styled.nav`
    width: 30%;
    height: 85%;
    border: solid 1px black;
    padding: 10px;
    position: relative;
`;

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
