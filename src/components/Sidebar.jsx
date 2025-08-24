import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { BsHouse, BsFolder2, BsCalendar3, BsPalette2, BsPlayBtn } from "react-icons/bs";
import { FaRegNoteSticky } from "react-icons/fa6";

export default function Sidebar({ collapsed }) {
  const menuItems = [
    { label: "Início", icon: <BsHouse className="side_icon" />, path: "/" },
    { label: "Pastas", icon: <BsFolder2 className="side_icon" />, path: "/folders" },
    { label: "Cronogramas", icon: <BsCalendar3 className="side_icon" />, path: "/schedules" },
    { label: "Notas", icon: <FaRegNoteSticky className="side_icon" />, path: "/notes" },
    { label: "Preferências", icon: <BsPalette2 className="side_icon" />, path: "/preferences" },
    { label: "Player", icon: <BsPlayBtn className="side_icon" />, path: "/player" },
  ];

  return (
    <StyledSidebar>
      {menuItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            `${isActive ? "side_selected" : ""} ${collapsed ? "side_collapsed" : ""}`
          }
        >
          {item.icon}
          <span className="label">{item.label}</span>
        </NavLink>
      ))}
    </StyledSidebar>
  );
}

const StyledSidebar = styled.nav`
  background-color: #282626;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: max-content;

  a {
    width: 200px;
    height: 40px;
    display: flex;
    align-items: center;
    color: #B4E0FF;
    font-size: 1rem;
    text-decoration: none;
    padding: 0 10px;
    margin-bottom: 4px;
    border-radius: 4px;
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