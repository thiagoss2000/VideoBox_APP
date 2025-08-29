import { Routes, Route } from "react-router-dom";
import { MainProvider } from "../../context/MainContext";
import Home from "../../pages/home/Home";

import Player from "../../pages/player/Player";
import FoldersPage from "../../pages/folders/Folder";
import Routine from "../../pages/routine/Routine";

export default function MainContent() {
  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      <MainProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/folders" element={<FoldersPage />} />
          <Route path="/planner" element={<Routine />} />
          {/* <Route path="/notes" element={<Notes />} />
          <Route path="/preferences" element={<Preferences />} />*/}
          <Route path="/player" element={<Player />} /> 
        </Routes>
      </MainProvider>
    </div>
  );
}