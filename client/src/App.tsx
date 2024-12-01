import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "/client/src/Pages/home.tsx";
import Navbar from "./Components/Navbar.tsx";
import MarketPage from "./Pages/market.tsx";
import Login from './Components/loginComponent';
import Register from "./Components/Register.tsx";
import ProtectedRoute from "./Components/AuthContext/ProtectedRoute.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = () => {
  return (  
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          />
          <Route path='/market'
          element={
            <ProtectedRoute>
              <MarketPage />
            </ProtectedRoute>
          }
          />
        </Routes>
      </Router>
  )
}


export default App;
