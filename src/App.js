import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import BRules from "./pages/BRules";
import Flight from "./pages/Flight";

function App() {

  return (
    <div className="App bg-[#23103B] text-white">
      <header className="App-header bg-[#280C4B]">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/brules" element={<BRules/>} />
        <Route path="/flight/:id" element={<Flight/>} />
      </Routes>
    </div>
  );
}

export default App;
