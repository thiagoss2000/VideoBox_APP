import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { Style_header } from "./styles"

export default function Header({setCollapsed, collapsed}) {
	const [hide_element, setHide_element] = useState(true);
	
	const navigate = useNavigate();
	const username = localStorage.getItem("username");

	const handleLogout = () => {
		const confirmLogout = window.confirm("Deseja realmente sair?");
		if (confirmLogout) {
			localStorage.removeItem("token");
			navigate("/login", { replace: true });
		}
	};

	return (
		<Style_header>
		<div className="left menu">
			<BsList className='icon' onClick={() => setCollapsed(!collapsed)}/>
			<h1 className="text-xl font-bold">VideoBox</h1>
		</div>
		<input placeholder="Pesquisar"></input>
		<button className='user' onClick={() => setHide_element(!hide_element)}>
			<AiOutlineUser className="icon" />
		</button>
		<div className={`user_settings ${hide_element ? "hide_element" : ""}`}>
			<div className='parting part_up'>
			<h3>{username}</h3>
			<button className='logout' onClick={handleLogout}><TbLogout />Sair</button>
			</div>
			<div className='parting'></div>
			<div className='parting'></div>
			<div className='parting'></div>
		</div>
		</Style_header>
	);
}
