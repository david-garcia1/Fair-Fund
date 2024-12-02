import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../client/src/Pages/home";
import Navbar from "./Components/Navbar.tsx";
import MarketPage from "../../client/src/Pages/market.tsx";
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
          <Route path="/"
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
