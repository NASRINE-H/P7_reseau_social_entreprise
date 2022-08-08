import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { validEmail, validPassword } from './regex.js';

const LoginForm = () => {
      const [mode, setMode] = useState('login');
      let navigate = useNavigate();
      const activeSignup = () => {
            setMode('signup');
      };
      const activeLogin = () => {
            setMode('login');
      };
      /* const validEmail = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
      );
      const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [emailErr, setEmailErr] = useState(false);
      const [pwdError, setPwdError] = useState(false);
      const validate = () => {
            if (!validEmail.test(email)) {
                  setEmailErr(true);
            }
            if (!validPassword.test(password)) {
                  setPwdError(true);
            }
      };*/

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
                        if (response.ok) {
                              return response.json();
                        }
                        throw new Error('Something went wrong');
                  })
                  .then((data) => {
                        localStorage.setItem('user', JSON.stringify(data));
                        navigate('/Home', {
                              replace: true,
                        });
                  })
                  .catch((error) => {
                        console.log('login request failed:', error);
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
                        if (response.ok) {
                              return response.json();
                        }
                        throw new Error('Something went wrong');
                  })
                  .then((data) => {
                        console.log('Signup request succes, Response:', data);
                        localStorage.setItem('user', JSON.stringify(data));
                        navigate('/Home', {
                              replace: true,
                        });
                  })

                  .catch((error) => {
                        console.log('Signup request failed:', error);
                  });
      };

      return (
            <div className="login-page">
                  {mode === 'login' && (
                        <div className="login">
                              <h1>
                                    bienvenue sur le reseau sociale groupomania
                              </h1>
                              <div className="Loginform">
                                    <form>
                                          <div className="input-container">
                                                <label> email </label>
                                                <input
                                                      id="login-email"
                                                      type="text"
                                                      name="email"
                                                      required
                                                />
                                          </div>
                                          <div className="input-container">
                                                <label> Password </label>
                                                <input
                                                      id="login-pass"
                                                      type="password"
                                                      name="pass"
                                                      required
                                                />
                                          </div>
                                    </form>
                              </div>
                              <div className="button-container">
                                    <button
                                          className="btn-loginsignup"
                                          onClick={login}
                                    >
                                          se connecter
                                    </button>
                              </div>

                              <button
                                    className="btn-loginsignup"
                                    onClick={activeSignup}
                              >
                                    S 'inscrire
                              </button>
                        </div>
                  )}
                  {mode === 'signup' && (
                        <div className="signup">
                              <h1>
                                    bienvenue sur le reseau socilae groupomania
                              </h1>
                              <div className="Signupform">
                                    <form>
                                          <div className="input-container">
                                                <label> username </label>
                                                <input
                                                      id="signup-username"
                                                      type="text"
                                                      name="uname"
                                                      required
                                                />
                                          </div>
                                          <div className="input-container">
                                                <label> email </label>
                                                <input
                                                      id="signup-email"
                                                      type="text"
                                                      name="email"
                                                      // value={email}
                                                      // onChange={(e) =>
                                                      //       setEmail(
                                                      //             e.target.value
                                                      //       )}
                                                      required
                                                />
                                          </div>
                                          <div className="input-container">
                                                <label> Password </label>
                                                <input
                                                      id="signup-pass"
                                                      type="password"
                                                      name="pass"
                                                      // value={password}
                                                      // onChange={(e) =>
                                                      //       setPassword(
                                                      //             e.target.value
                                                      //       )
                                                      // }
                                                      required
                                                />
                                          </div>
                                    </form>
                              </div>
                              <div className="button-container">
                                    <button
                                          id="btn-loginsignup"
                                          onClick={signup}
                                    >
                                          s'inscrire
                                          {/* {emailErr && <p>Your email is invalid</p>}
                                    {pwdError && (
                                          <p>Your password is invalid</p>
                                    )} */}
                                    </button>
                              </div>
                              <button
                                    className="btn-loginsignup"
                                    onClick={activeLogin}
                              >
                                    Se connecter
                              </button>
                        </div>
                  )}
            </div>
      );
};
//<Login/>

export default LoginForm;
