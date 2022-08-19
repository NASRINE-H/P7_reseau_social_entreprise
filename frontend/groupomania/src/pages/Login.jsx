import React from 'react';
import Logo from '../components/Logo';
import LoginForm from '../components/loginSignup/LoginForm';

const Login = (props) => {
      return (
            <div className="content-login">
                  {/* le props pour aficher les boutton profil et se deconnecter  */}
                  <Logo state={props.state} setState={props.setState} />
                  {/* on a mis les states pour pouvoire aficher les bouttons profile et se
                   deconnecter quand   l'utilisateure sera connecté  */}
                  <LoginForm state={props.state} setState={props.setState} />
            </div>
      );
};

export default Login;
