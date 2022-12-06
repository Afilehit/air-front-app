import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Main from "./pages/Main";
import BRules from "./pages/BRules";
import Flight from "./pages/Flight";
import Dexie from "dexie";

import { BruleContext } from './context/context';

function App() {
  const db = new Dexie("ReactDexie");

  db.version(4).stores({
    flights: "id, *data, date",
    filteredFlights: "id, *data"
  })
  db.open().catch((err) => {
      console.log(err.stack || err)
  })

  return (
    <div className="App bg-[#E9EEF2] text-black">
      <header className="App-header bg-[#DFE4EA]">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Routes>
          <Route path="/" element={<Main db={db}/>} />
          <Route path="/brules" element={<BRules/>} />
          <Route path="/flight/:id" element={<Flight db={db}/>} />
      </Routes>
    </div>
  );
}

export default App;
