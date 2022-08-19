import React from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

const User = (props) => {
      let user = JSON.parse(localStorage.getItem('user'));

      fetch('http://localhost:3000/api/auth/' + user.userId, {})
            .then((response) => {
                  if (response.ok) {
                        return response.json();
                  }
                  throw new Error('Une erreur est apparue');
            })
            .then((data) => {
                  document.querySelector('#profile-username').value =
                        data.username;
                  document.querySelector('#profile-email').value = data.email;
            })
            .catch((error) => {
                  console.log('request failed:', error);
            }); //

      //

      let navigate = useNavigate();

      const logout = (e) => {
            localStorage.removeItem('user');
            props.setState('Off');
            navigate('/Login', {
                  replace: true,
            });
      };

      const NavHome = () => {
            navigate('/Home', {
                  replace: true,
            });
      };

      const deleteUser = (e) => {
            let user = JSON.parse(localStorage.getItem('user'));
            fetch('http://localhost:3000/api/auth/' + user.userId, {
                  method: 'DELETE',
                  headers: {
                        Authorization: 'bearer ' + user.token,
                  },
            })
                  .then((response) => {
                        if (response.ok) {
                              logout();
                              return response.ok;
                        }
                        throw new Error('Une erreur est apparue');
                  })
                  .catch((error) => {
                        console.log('request failed:', error);
                        logout();
                  });
      };
      const submit = () => {
            confirmAlert({
                  customUI: ({ onClose }) => {
                        return (
                              <div className="custom-ui">
                                    <h1>Vous êtes sure?</h1>
                                    <p>
                                          Voulez vous supprimer votre profile
                                          définitivement?
                                    </p>
                                    <button onClick={onClose}>Non</button>
                                    <button
                                          onClick={() => {
                                                deleteUser();
                                                onClose();
                                          }}
                                    >
                                          Oui, supprimer!
                                    </button>
                              </div>
                        );
                  },
            });
      };

      return (
            <div className="user-profil">
                  <h1> voici votre profile </h1>

                  <div className="profile">
                        <div className="profile-form">
                              <form>
                                    <div className="input-container">
                                          <label forhtml="profile-username">
                                                username
                                                <input
                                                      id="profile-username"
                                                      type="text"
                                                      name="uname"
                                                      required
                                                />
                                          </label>
                                    </div>
                                    <div className="input-container">
                                          <label forhtml="profile-email">
                                                email
                                                <input
                                                      id="profile-email"
                                                      type="text"
                                                      name="email"
                                                      required
                                                />
                                          </label>
                                    </div>
                              </form>
                        </div>
                        <div className="btn-supp-home">
                              <button className="LogoButton1" onClick={submit}>
                                    supprimer
                              </button>
                              <button
                                    className="LogoButton1"
                                    name="home"
                                    onClick={NavHome}
                              >
                                    Home
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default User;
