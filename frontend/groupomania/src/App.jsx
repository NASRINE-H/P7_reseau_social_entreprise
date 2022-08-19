import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';

import Home from './pages/Home';
import './styles/index.css';
import './App.css';

const App = () => {
      const [state, setStateApp] = useState(
            localStorage.getItem('user') ? 'On' : 'Off'
      );

      return (
            <div className="content">
                  <BrowserRouter>
                        {state === 'Off' && (
                              <Routes>
                                    <Route
                                          path="*"
                                          element={
                                                <Login
                                                      state={state}
                                                      setState={setStateApp}
                                                />
                                          }
                                    />
                              </Routes>
                        )}
                        {state === 'On' && (
                              <Routes>
                                    <Route
                                          path="/"
                                          element={
                                                <Home
                                                      state={state}
                                                      setState={setStateApp}
                                                />
                                          }
                                    />
                                    <Route
                                          path="/Login"
                                          element={
                                                <Login
                                                      state={state}
                                                      setState={setStateApp}
                                                />
                                          }
                                    />
                                    <Route
                                          path="/Home"
                                          element={
                                                <Home
                                                      state={state}
                                                      setState={setStateApp}
                                                />
                                          }
                                    />
                                    <Route
                                          path="/Profile"
                                          element={
                                                <Profile
                                                      state={state}
                                                      setState={setStateApp}
                                                />
                                          }
                                    />
                                    <Route
                                          path="*"
                                          element={
                                                <Login
                                                      state={state}
                                                      setState={setStateApp}
                                                />
                                          }
                                    />
                              </Routes>
                        )}
                  </BrowserRouter>
            </div>
      );
};

export default App;