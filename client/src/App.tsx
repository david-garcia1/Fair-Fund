import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home.tsx";
import Market from "./pages/market.tsx";

function App() {
  return (
    <BrowserRouter>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/market">Market</Link>
          </li>
        </ul>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
