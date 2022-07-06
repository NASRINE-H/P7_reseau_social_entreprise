import React, { useState } from 'react';

const LoginForm = () => {
      const [mode, setMode] = useState('login');
      const activeSignup = () => {
            setMode('signup');
      };
      const activeLogin = () => {
            setMode('login');
      };
      const login = () => {
            let user = {
                  email: document.getElementById('login-email').value,
                  password: document.getElementById('login-pass').value,
            };
            fetch('http://localhost:3000/api/auth/login', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(user),
            })
                  .then((response) => response.json())
                  .then((data) => console.log('request succes:', data))
                  .catch((error) => {
                        console.log('request failed:', error);
                  });
      };
      return (
            <div className="login-page">
                  {mode === 'login' && (
                        <div className="login">
                              <h1> Login </h1>
                              <div className="Loginform">
                                    <form>
                                          <div className="input-container">
                                                <label>email </label>
                                                <input
                                                      id="login-email"
                                                      type="text"
                                                      name="email"
                                                      required
                                                />
                                          </div>
                                          <div className="input-container">
                                                <label>Password </label>
                                                <input
                                                      id="login-pass"
                                                      type="password"
                                                      name="pass"
                                                      required
                                                />
                                          </div>
                                          <div className="button-container">
                                                <button onClick={login}>
                                                      login
                                                </button>
                                          </div>
                                    </form>
                              </div>
                              <button onClick={activeSignup}>S'inscrire</button>
                        </div>
                  )}
                  {mode === 'signup' && (
                        <div className="signup">
                              <h1> Signup </h1>
                              <div className="Signupform">
                                    <form>
                                          <div className="input-container">
                                                <label>Username </label>
                                                <input
                                                      type="text"
                                                      name="uname"
                                                      required
                                                />
                                          </div>
                                          <div className="input-container">
                                                <label>email </label>
                                                <input
                                                      type="text"
                                                      name="email"
                                                      required
                                                />
                                          </div>
                                          <div className="input-container">
                                                <label>Password </label>
                                                <input
                                                      type="password"
                                                      name="pass"
                                                      required
                                                />
                                          </div>
                                          <div className="button-container">
                                                <input
                                                      type="submit"
                                                      value={'signup'}
                                                />
                                          </div>
                                    </form>
                              </div>
                              <button onClick={activeLogin}>
                                    Se connecter
                              </button>
                        </div>
                  )}
            </div>
      );
};
//<Login/>

export default LoginForm;
