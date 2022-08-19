import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = (props) => {
      // Permet de switcher entre mode 'Login' et mode 'Signup'
      const [mode, setMode] = useState('login');

      // Permet d'activer ou non un message d'erreur lors de la connection
      const [formError, setFormError] = useState('200');
      let navigate = useNavigate();

      // permet d'activer le mode Signup
      const activeSignup = () => {
            setMode('signup');
            setFormError('200');
      };
      // permet d'activer le mode login
      const activeLogin = () => {
            setMode('login');
            setFormError('200');
      };

      // Connecter un utilisateur existant
      const login = (e) => {
            e.preventDefault();
            let user = {
                  email: document.getElementById('login-email').value,
                  password: document.getElementById('login-pass').value,
            };

            if (user.email === '') {
                  setFormError('403');
                  console.log('403');
            } else if (user.password === '') {
                  setFormError('404');
                  console.log('404');
            } else {
                  fetch('http://localhost:3000/api/auth/login', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                  })
                        .then((response) => {
                              console.log(
                                    'response.status ===' + response.status
                              );
                              if (response.ok) {
                                    return response.json();
                              } else if (response.status === 400)
                                    setFormError('400');
                              else if (response.status === 401)
                                    setFormError('401');
                              else if (response.status === 402)
                                    setFormError('402');
                              else if (response.status === 500)
                                    setFormError('500');
                              throw new Error('Une erreur est apparue');
                        })
                        .then((data) => {
                              localStorage.setItem(
                                    'user',
                                    JSON.stringify(data)
                              );
                              setFormError('200');
                              navigate('/Home', {
                                    replace: true,
                              });
                              props.setState('On');
                        })
                        .catch((error) => {
                              console.log('login request failed:', error);
                        });
            }
      };

      // Créer un nouvel utilisateur
      const signup = (e) => {
            e.preventDefault();
            let user = {
                  email: document.getElementById('signup-email').value,
                  password: document.getElementById('signup-pass').value,
                  username: document.getElementById('signup-username').value,
            };
            if (user.username === '') {
                  setFormError('401');
            } else if (user.email === '') {
                  setFormError('403');
            } else if (user.password === '') {
                  setFormError('402');
            } else {
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
                              } else if (response.status === 400)
                                    setFormError('400');
                              else if (response.status === 404)
                                    setFormError('404');
                              else if (response.status === 405)
                                    setFormError('405');
                              else if (response.status === 500)
                                    setFormError('500');
                              else if (response.status === 600)
                                    setFormError('600');

                              throw new Error('Une erreur est apparue');
                        })
                        .then((data) => {
                              console.log(
                                    'Signup request succes, Response:',
                                    data
                              );
                              localStorage.setItem(
                                    'user',
                                    JSON.stringify(data)
                              );
                              setFormError('200');
                              navigate('/Home', {
                                    replace: true,
                              });
                              props.setState('On');
                        })

                        .catch((error) => {
                              console.log('Signup request failed:', error);
                        });
            }
      };

      return (
            <div className="login-page">
                  {mode === 'login' && (
                        <div className="login">
                              <h1>
                                    Bienvenue sur le réseau social Groupomania
                              </h1>
                              <div className="Loginform">
                                    <form className="form-container">
                                          <div className="input-container">
                                                <label className="label-email">
                                                      Email
                                                      <input
                                                            id="login-email"
                                                            type="text"
                                                            name="email"
                                                            required
                                                      />
                                                </label>
                                          </div>
                                          <div className="input-container">
                                                <label className="label-password">
                                                      Mot de passe
                                                      <input
                                                            id="login-pass"
                                                            type="password"
                                                            name="pass"
                                                            required
                                                      />
                                                </label>
                                          </div>
                                          {formError === '400' && (
                                                <label className="textError">
                                                      Vérifier que vous avez
                                                      entré les bonnes valeurs
                                                </label>
                                          )}
                                          {formError === '401' && (
                                                <label className="textError">
                                                      Utilisateur inconnu
                                                </label>
                                          )}
                                          {formError === '402' && (
                                                <label className="textError">
                                                      Mot de passe incorrect
                                                </label>
                                          )}
                                          {formError === '403' && (
                                                <label className="textError">
                                                      Email vide
                                                </label>
                                          )}
                                          {formError === '404' && (
                                                <label className="textError">
                                                      Mot de passe vide
                                                </label>
                                          )}
                                          {formError === '500' && (
                                                <label className="textError">
                                                      action non authorisée
                                                </label>
                                          )}
                                    </form>
                              </div>
                              <div className="button-container">
                                    <button
                                          type="submit"
                                          className="btn-loginsignup"
                                          onClick={login}
                                    >
                                          Se connecter
                                    </button>
                              </div>
                              <button
                                    className="btn-loginsignup1"
                                    onClick={activeSignup}
                              >
                                    S'inscrire
                              </button>
                        </div>
                  )}
                  {mode === 'signup' && (
                        <div className="signup">
                              <h1>
                                    Bienvenue sur le réseau social Groupomania
                              </h1>
                              <div className="Signupform">
                                    <form>
                                          <div className="input-container">
                                                <label className="label-username">
                                                      Utilisateur
                                                      <input
                                                            id="signup-username"
                                                            type="text"
                                                            name="uname"
                                                            required
                                                      />
                                                </label>
                                          </div>
                                          <div className="input-container">
                                                <label
                                                      className="label-email"
                                                      htmlFor=""
                                                >
                                                      Email
                                                      <input
                                                            id="signup-email"
                                                            type="email"
                                                            name="email"
                                                            required
                                                      />
                                                </label>
                                          </div>
                                          <div className="input-container">
                                                <label className="label-password">
                                                      Mot de passe
                                                      <input
                                                            id="signup-pass"
                                                            type="password"
                                                            name="pass"
                                                            required
                                                      />
                                                </label>
                                          </div>
                                          {formError === '400' && (
                                                <label className="textError">
                                                      Vérifier que votre mot de
                                                      passe contient:
                                                      <p>
                                                            <br />
                                                            minimum 8 caractères
                                                            <br />
                                                            Au moins une lettre
                                                            magiscule
                                                            <br />
                                                            Au moins une lettre
                                                            miniscule
                                                            <br />
                                                            ne contient pas
                                                            d'espace
                                                      </p>
                                                </label>
                                          )}
                                          {formError === '401' && (
                                                <label className="textError">
                                                      Utilisateur vide
                                                </label>
                                          )}
                                          {formError === '402' && (
                                                <label className="textError">
                                                      Mot de passe vide
                                                </label>
                                          )}
                                          {formError === '403' && (
                                                <label className="textError">
                                                      Email vide
                                                </label>
                                          )}
                                          {(formError === '404' ||
                                                formError === '405') && (
                                                <label className="textError">
                                                      Email déjà existant
                                                </label>
                                          )}
                                          {(formError === '500' ||
                                                formError === '600') && (
                                                <label className="textError">
                                                      action non authorisée
                                                </label>
                                          )}
                                    </form>
                              </div>
                              <div className="button-container">
                                    <button
                                          type="submit"
                                          className="btn-loginsignup"
                                          onClick={signup}
                                    >
                                          S'inscrire
                                    </button>
                              </div>
                              <button
                                    className="btn-loginsignup1"
                                    onClick={activeLogin}
                              >
                                    Se connecter
                              </button>
                        </div>
                  )}
            </div>
      );
};

export default LoginForm;
