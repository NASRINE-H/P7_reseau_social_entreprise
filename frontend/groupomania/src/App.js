import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';

import Home from './pages/Home';
import './styles/index.css';
import './App.css';

const App = () => {
      let userConnected = localStorage.getItem('user');
      console.log(userConnected);
      return (
            <div className="content">
                  <BrowserRouter>
                        <Routes>
                              {!userConnected && (
                                    <Route path="/" element={<Login />} />
                              )}
                              ||
                              {userConnected && (
                                    <Route path="/" element={<Home />} />
                              )}
                              <Route path="*" element={<Login />} />
                              <Route path="/Home" element={<Home />} />
                              <Route path="/Profile" element={<Profile />} />
                        </Routes>
                  </BrowserRouter>
            </div>
      );
};

export default App;
