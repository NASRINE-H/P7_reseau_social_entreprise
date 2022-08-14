import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = (props) => {
      let navigate = useNavigate();
      const logout = () => {
            props.setState('Off');
            localStorage.removeItem('user');
            navigate('/', {
                  replace: true,
            });
      };

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
