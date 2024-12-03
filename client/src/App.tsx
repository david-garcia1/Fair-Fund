import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import Navbar from "./Components/Navbar";
import MarketPage from "./pages/market";
import Login from './Components/loginComponent';
import Register from "./Components/Register";
import ProtectedRoute from "./Components/AuthContext/ProtectedRoute";
import Footer from "./Components/Footer";
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
        <Footer />
      </Router>
  )
}


export default App;
