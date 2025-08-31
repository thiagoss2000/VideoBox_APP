import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import MainContent from "./components/main/MainContent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react"; 
import Signup from "./pages/login/Signup";
import Signin from "./pages/login/Signin";

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
			<Route path="/signin" element={<Signin />} />
			<Route path="/signup" element={<Signup />} />
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
