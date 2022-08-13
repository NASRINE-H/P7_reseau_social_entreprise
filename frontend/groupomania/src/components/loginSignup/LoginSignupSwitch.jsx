import React from "react";
import { NavLink } from "react-router-dom";

const LoginSignupSwitch = () => {
  return (
    <div className="navigation">
      <ul>
        <NavLink to="/">
          <li> login </li>{" "}
        </NavLink>{" "}
        <NavLink to="/signup">
          <li> signup </li>{" "}
        </NavLink>{" "}
      </ul>{" "}
    </div>
  );
};

export default LoginSignupSwitch;
