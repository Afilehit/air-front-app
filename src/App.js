import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Main from "./pages/Main";
import BRules from "./pages/BRules";
import Flight from "./pages/Flight";

import { BruleContext } from './context/context';

function App() {

  return (
    <div className="App bg-[#E9EEF2] text-black">
      <header className="App-header bg-[#DFE4EA]">
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
