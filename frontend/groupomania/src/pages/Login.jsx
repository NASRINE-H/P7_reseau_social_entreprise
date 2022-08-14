import React from 'react';
import Logo from '../components/Logo';
import LoginForm from '../components/loginSignup/LoginForm';

const Login = (props) => {
      return (
            <div className="content-login">
                  <Logo state={props.state} setState={props.setState} />
                  <LoginForm state={props.state} setState={props.setState} />
            </div>
      );
};

export default Login;
