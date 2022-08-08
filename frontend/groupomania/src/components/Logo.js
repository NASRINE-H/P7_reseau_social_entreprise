import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
      let navigate = useNavigate();
      const logout = (e) => {
            localStorage.removeItem('user');
            navigate('/', {
                  replace: true,
            });
      };
      const NavProfile = () => {
            navigate('/Profile', {
                  replace: true,
            });
      };
      /* const NavHome = () => {
            navigate('/', {
                  replace: true,
            });
      };*/
      return (
            <div className="logo">
                  <img
                        src="./logo-black.svg"
                        alt="logo groupomania"
                        className="group-logo"
                  />
                  {/* <button className="LogoButton" name="home" onClick={NavHome}>
                        home
                  </button> */}
                  <button className="LogoButton" name="logout" onClick={logout}>
                        Logout
                  </button>
                  <button
                        className="LogoButton"
                        name="profil"
                        onClick={NavProfile}
                  >
                        Profile
                  </button>
            </div>
      );
};

export default Logo;
