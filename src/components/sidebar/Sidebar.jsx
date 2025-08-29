import { NavLink } from "react-router-dom";
import { BsHouse, BsFolder2, BsCalendar3, BsPalette2, BsPlayBtn } from "react-icons/bs";
import { FaRegNoteSticky } from "react-icons/fa6";
import { StyledSidebar } from "./styles"

export default function Sidebar({ collapsed }) {
  const menuItems = [
    { label: "Início", icon: <BsHouse className="side_icon" />, path: "/" },
    { label: "Pastas", icon: <BsFolder2 className="side_icon" />, path: "/folders" },
    { label: "Cronogramas", icon: <BsCalendar3 className="side_icon" />, path: "/planner" },
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
