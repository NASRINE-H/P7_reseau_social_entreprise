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
      return (
            <div className="logo">
                  <img src="./logo-black.svg" alt="logo groupomania" />
                  <button className="logout" name="logout" onClick={logout}>
                        Logout
                  </button>
            </div>
      );
};

export default Logo;
