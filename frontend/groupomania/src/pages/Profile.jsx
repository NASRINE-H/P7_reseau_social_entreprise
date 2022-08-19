import React from 'react';
import User from '../components/User';
import Logo from '../components/Logo';
//setState={props.setState}
const Profile = (props) => {
      return (
            <div className="container-user">
                  <Logo state={props.state} setState={props.setState} />

                  {/* setState pour envoyer l'utilisateur vers la page login quand 
                  il supprime son compte */}
                  {<User setState={props.setState} />}
            </div>
      );
};

export default Profile;
