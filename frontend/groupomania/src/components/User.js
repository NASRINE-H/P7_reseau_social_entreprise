import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const User = () => {
      let navigate = useNavigate();
      const [mode, setMode] = useState('printMode');
      //permet d'activer le mode modifier
      const activeEdit = () => {
            setMode('editMode');
      };
      //permet d'activer le mode afficher du poste
      const activePrint = () => {
            setMode('printMode');
      };

      const logout = (e) => {
            localStorage.removeItem('user');
            navigate('/', {
                  replace: true,
            });
      };

      const NavHome = () => {
            navigate('/Home', {
                  replace: true,
            });
      };

      const deleteUser = (e) => {
            e.preventDefault();
            let user = JSON.parse(localStorage.getItem('user'));
            fetch('http://localhost:3000/api/auth/' + user.userId, {
                  method: 'DELETE',
                  headers: {
                        Authorization: 'bearer ' + user.token,
                  },
            })
                  .then((response) => {
                        if (response.ok) {
                              console.log('profile supprimé avec succes');
                              logout();
                              return response.ok;
                        }
                        throw new Error('Something went wrong');
                  })
                  .catch((error) => {
                        console.log('request failed:', error);
                        logout();
                  });
      };

      const editProfile = (e) => {
            e.preventDefault();

            let userEdit = {
                  email: document.getElementById('signup-email').value,
                  password: document.getElementById('signup-pass').value,
                  username: document.getElementById('signup-username').value,
            };
            console.log(userEdit);

            // Regex

            // fetch

            // then response OK
            activePrint();

            //catch Err
      };

      return (
            <div>
                  <Logo />
                  <button className="Button-home" name="home" onClick={NavHome}>
                        home
                  </button>
                  <h1> voici votre profile </h1>
                  {mode === 'printMode' && (
                        <div className="profile">
                              <div className="profile-form">
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
                                                      required
                                                />
                                          </div>
                                    </form>
                              </div>
                              <div className="button-container">
                                    <button onClick={activeEdit}>
                                          modifier
                                    </button>
                              </div>
                              <div>
                                    <button onClick={deleteUser}>
                                          supprimer
                                    </button>
                              </div>
                        </div>
                  )}
                  {mode === 'editMode' && (
                        <div className="profile">
                              <div className="profile-form">
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
                                                      required
                                                />
                                          </div>
                                          <div className="input-container">
                                                <label> Password </label>
                                                <input
                                                      id="signup-pass"
                                                      type="password"
                                                      name="pass"
                                                      required
                                                />
                                          </div>
                                    </form>
                              </div>
                              <div className="button-container">
                                    <button onClick={activePrint}>
                                          Annuler
                                    </button>
                              </div>
                              <div className="button-container">
                                    <button onClick={editProfile}>
                                          Sauvegarder
                                    </button>
                              </div>
                              <div>
                                    <button onClick={deleteUser}>
                                          supprimer
                                    </button>
                              </div>
                        </div>
                  )}
            </div>
      );
};

export default User;
