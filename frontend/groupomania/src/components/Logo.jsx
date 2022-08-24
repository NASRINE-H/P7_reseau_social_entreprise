import React from 'react';
import { useNavigate } from 'react-router-dom';

//on reste sur la meme page
const Logo = (props) => {
      let navigate = useNavigate();
      //fuction de se deconnecter
      const logout = () => {
            props.setState('Off');
            localStorage.removeItem('user');
            navigate('/', {
                  replace: true,
            });
      };
      //
      const navProfile = () => {
            if (localStorage.getItem('user')) {
                  navigate('/Profile', {
                        replace: true,
                  });
            }
      };
      return (
            <div className="logo">
                  <img
                        src="./logo-black.svg"
                        alt="logo groupomania"
                        className="group-logo"
                  />
                  {props.state === 'On' && (
                        <div className="div-btn">
                              <button
                                    className="LogoButton1"
                                    name="logout"
                                    onClick={logout}
                              >
                                    Se déconnecter
                              </button>
                              <button
                                    className="LogoButton1"
                                    name="profil"
                                    onClick={navProfile}
                              >
                                    Profile
                              </button>
                        </div>
                  )}
            </div>
      );
};

export default Logo;
