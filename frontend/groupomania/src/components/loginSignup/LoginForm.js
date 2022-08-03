import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
      const [mode, setMode] = useState('login');
      let navigate = useNavigate();
      const activeSignup = () => {
            setMode('signup');
      };
      const activeLogin = () => {
            setMode('login');
      };

      const login = (e) => {
            e.preventDefault();
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
                  .then((response) => {
                        console.log('Response:', response);
                        return response.json();
                  })

                  .then((data) => {
                        console.log('request succes, Response:', data);
                        localStorage.setItem('user', JSON.stringify(data));
                        navigate('/Home', {
                              replace: true,
                        });
                  })

                  .catch((error) => {
                        console.log('request failed:', error);
                  });
      };

      const signup = (e) => {
            e.preventDefault();
            let user = {
                  email: document.getElementById('signup-email').value,
                  password: document.getElementById('signup-pass').value,
                  username: document.getElementById('signup-username').value,
            };
            fetch('http://localhost:3000/api/auth/signup', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(user),
            })
                  .then((response) => {
                        console.log('Response:', response);
                        return response.json();
                  })

                  .then((data) => {
                        console.log('request succes, Response:', data);
                  })

                  .catch((error) => {
                        console.log('request failed:', error);
                  });
      };

      return (
            <div className="login-page">
                  {' '}
                  {mode === 'login' && (
                        <div className="login">
                              <h1>
                                    {' '}
                                    bienvenue sur le reseau sociale groupomania{' '}
                              </h1>{' '}
                              <div className="Loginform">
                                    <form>
                                          <div className="input-container">
                                                <label> email </label>{' '}
                                                <input
                                                      id="login-email"
                                                      type="text"
                                                      name="email"
                                                      required
                                                />
                                          </div>{' '}
                                          <div className="input-container">
                                                <label> Password </label>{' '}
                                                <input
                                                      id="login-pass"
                                                      type="password"
                                                      name="pass"
                                                      required
                                                />
                                          </div>{' '}
                                    </form>{' '}
                              </div>{' '}
                              <div className="button-container">
                                    <button onClick={login}>
                                          se connecter{' '}
                                    </button>{' '}
                              </div>{' '}
                              <button onClick={activeSignup}>
                                    {' '}
                                    S 'inscrire
                              </button>{' '}
                        </div>
                  )}{' '}
                  {mode === 'signup' && (
                        <div className="signup">
                              <h1>
                                    {' '}
                                    bienvenue sur le reseau socilae groupomania{' '}
                              </h1>{' '}
                              <div className="Signupform">
                                    <form>
                                          <div className="input-container">
                                                <label> username </label>{' '}
                                                <input
                                                      id="signup-username"
                                                      type="text"
                                                      name="uname"
                                                      required
                                                />
                                          </div>{' '}
                                          <div className="input-container">
                                                <label> email </label>{' '}
                                                <input
                                                      id="signup-email"
                                                      type="text"
                                                      name="email"
                                                      required
                                                />
                                          </div>{' '}
                                          <div className="input-container">
                                                <label> Password </label>{' '}
                                                <input
                                                      id="signup-pass"
                                                      type="password"
                                                      name="pass"
                                                      required
                                                />
                                          </div>{' '}
                                    </form>{' '}
                              </div>{' '}
                              <div className="button-container">
                                    <button id="button-conx" onClick={signup}>
                                          s'inscrire{' '}
                                    </button>{' '}
                              </div>{' '}
                              <button onClick={activeLogin}>
                                    Se connecter{' '}
                              </button>{' '}
                        </div>
                  )}{' '}
            </div>
      );
};
//<Login/>

export default LoginForm;
