import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import styled from "styled-components";
import { useState } from "react"; 

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <Styled_app>
      
      <Header setCollapsed={setCollapsed} collapsed={collapsed}/>

      
      <div className="page">
        <Sidebar className="sidebar" collapsed={collapsed}/>
        <MainContent />
      </div>
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
