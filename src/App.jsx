import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react"; 

export default function App() {
    const [collapsed, setCollapsed] = useState(false);
	
	return (
		<Styled_app>
		
		<Router>
		<Routes>
			<Route path="/*" element={<>
				<Header setCollapsed={setCollapsed} collapsed={collapsed}/>
				<div className="page">
					<Sidebar collapsed={collapsed}/>
					<MainContent />
				</div>
			</>} />
			<Route path="/login" element={<Login />} />
		</Routes>
		</Router>
		
		</Styled_app>
	);
}


const Styled_app = styled.nav`
	width: 100%;
	height: 100%;
	.page {
		height: 100%;
		padding-top: 60px;
		display: flex;
	}
`;
