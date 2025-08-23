import { useState } from "react";
import styled from "styled-components";
import { BsHouse, BsFolder2, BsCalendar3, BsPalette2, BsPlayBtn } from "react-icons/bs";
import { FaRegNoteSticky } from "react-icons/fa6";

export default function Sidebar({collapsed}) {
    const [selected, setSelected] = useState("Início");

    const menuItems = [
        { label: "Início", icon: <BsHouse className="side_icon" /> },
        { label: "Pastas", icon: <BsFolder2 className="side_icon" /> },
        { label: "Cronogramas", icon: <BsCalendar3 className="side_icon" /> },
        { label: "Notas", icon: <FaRegNoteSticky className="side_icon" /> },
        { label: "Preferências", icon: <BsPalette2 className="side_icon" /> },
        { label: "Player", icon: <BsPlayBtn className="side_icon" /> },
    ];

    return (
        <Styled_Sidebar>
        {menuItems.map((item) => (
            <button
            key={item.label}
            
            className={`
                ${selected === item.label ? "side_selected" : ""} 
                ${collapsed ? "side_collapsed" : ""}
            `}
            onClick={() => setSelected(item.label)}
            >
            {item.icon}
            <span className="label">{item.label}</span>
            </button>
        ))}
        </Styled_Sidebar>
    );
}

const Styled_Sidebar = styled.nav`
    background-color: #282626;
    height: 100%;
    width: max-content;
    display: flex;
    flex-direction: column;

    button {
        width: 200px;
        height: 40px;
        display: flex;
        align-items: center;
        color: #B4E0FF;
        font-size: 1rem;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .side_icon {
        margin-inline: 10px;
    }

    .side_selected {
        background: linear-gradient(135deg, #282626, #8E8787);
        background-color: #72727283;
        cursor: default;
    }

    .side_collapsed {
        width: max-content;
    }
    .side_collapsed .label {
        display: none;
    }
`;
