import { Route, Routes } from "react-router-dom";
import "./App.css";
import LifeChat from "./screens/LifeChat";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route index element={<LifeChat />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
