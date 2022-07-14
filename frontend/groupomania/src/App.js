import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import './styles/index.css';
import './App.css';

const App = () => {
      return (
            <div className="content">
                  <BrowserRouter>
                        <Routes>
                              <Route path="/" element={<Login />} />

                              {/*path = "*" fonctionne si jamais l'url ne corespond a rien */}
                              <Route path="*" element={<Login />} />
                              <Route path="/Home" element={<Home />} />
                        </Routes>
                  </BrowserRouter>
            </div>
      );
};

export default App;
