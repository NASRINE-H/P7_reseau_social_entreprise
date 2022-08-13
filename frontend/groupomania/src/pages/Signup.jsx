import React from "react";
import Logo from "../components/Logo";
import LoginSignupSwitch from "../components/loginSignup/LoginSignupSwitch";
import SignupForm from "../components/loginSignup/SignUpForm"
const Signup = () => {
  return (
    <div>
      <Logo />
      <LoginSignupSwitch />
      <SignupForm />
    </div>
  );
};

export default Signup;
