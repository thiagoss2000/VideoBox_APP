import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { Style_header } from "./styles"
import { getSearch } from "../../api/timelineApi";

export default function Header({setCollapsed, collapsed}) {

	const [hide_element, setHide_element] = useState(true);
	const [searchText, setSearchText] = useState("");

	const navigate = useNavigate();
	const username = localStorage.getItem("username");

	const handleLogout = () => {
		const confirmLogout = window.confirm("Deseja realmente sair?");
		if (confirmLogout) {
			localStorage.removeItem("token");
			navigate("/login", { replace: true });
		}
	};

	const navHome = () => {
		navigate("/login", { replace: true });
	};

	const handleSearch = async () => {
		if (!searchText.trim()) return;
		try {
			const token = localStorage.getItem("token");
			if (!token) {
			alert("Token não encontrado. Faça login novamente.");
			return;
			}
			await getSearch(token, searchText);
			setSearchText("");
			navigate("/", { replace: true });
		} catch (err) {
			console.error("Erro na busca:", err);
			alert("Erro ao buscar vídeos");
		}
	};

	const handleEnter = (e) => {
		if (e.key === "Enter") handleSearch();
	};

	return (
		<Style_header>
		<div className="left menu">
			<BsList className='icon' onClick={() => setCollapsed(!collapsed)}/>
			<h1 
				className="text-xl font-bold"
				onClick={navHome}
			>VideoBox</h1>
		</div>
		<div className="searchBox">
			<input 
				placeholder="Pesquisar"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				onKeyDown={handleEnter}
			></input>
			<IoSearch className="searchIcon" onClick={handleSearch}/>
		</div>
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
