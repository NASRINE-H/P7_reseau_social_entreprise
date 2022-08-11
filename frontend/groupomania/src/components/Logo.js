import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = (State) => {
      let navigate = useNavigate();
      const [currentState, setcurrentState] = useState(State);
      const logout = () => {
            localStorage.removeItem('user');
            activeState();
            navigate('/', {
                  replace: true,
            });
      };
      const NavProfile = () => {
            navigate('/Profile', {
                  replace: true,
            });
      };
      const activeState = () => {
            if (localStorage.getItem('user')) {
                  setcurrentState('On');
                  NavProfile();
            } else setcurrentState('Off');
      };
      return (
            <div className="logo">
                  <img
                        src="./logo-black.svg"
                        alt="logo groupomania"
                        className="group-logo"
                  />
                  <button
                        className="LogoButton"
                        name="logout"
                        onClick={logout}
                        disabled={currentState === 'Off'}
                  >
                        Se déconnecter
                  </button>
                  <button
                        className="LogoButton"
                        name="profil"
                        onClick={activeState}
                        disabled={currentState === 'Off'}
                  >
                        Profile
                  </button>
            </div>
      );
};

export default Logo;
