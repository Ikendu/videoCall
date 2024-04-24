import { Route, Routes } from "react-router-dom";
import LifeScreen from "./screens/LifeScreen";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route index element={<LifeScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
