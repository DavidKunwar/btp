import Analysis from "./pages/analysis";
import Home from "./pages/home";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </div>
  );
}

export default App;
