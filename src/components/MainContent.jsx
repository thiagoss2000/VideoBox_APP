import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Folders from "./Folders";
// import Schedules from "./Schedules";
// import Notes from "./Notes";
// import Preferences from "./Preferences";
// import Player from "./Player";

export default function MainContent() {
  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/folders" element={<Folders />} />
        {/*<Route path="/schedules" element={<Schedules />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/player" element={<Player />} /> */}
      </Routes>
    </div>
  );
}