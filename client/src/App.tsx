import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.tsx";
import Market from "./pages/market.tsx";
import Login from './Components/loginComponent';
import Register from "./Components/Register.tsx";
import { AuthProvider } from './Components/AuthContext/AuthContext.tsx';
import ProtectedRoute from "./Components/AuthContext/ProtectedRoute.tsx";


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
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
    </AuthProvider>
  )
}


export default App;
