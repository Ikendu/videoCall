import { Route, Routes } from "react-router-dom";
import LifeScreen from "./screens/LifeScreen";
import "./App.css";
import Room from "./screens/Room";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route index element={<LifeScreen />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
