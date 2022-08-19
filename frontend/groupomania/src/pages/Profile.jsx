import React from 'react';
import User from '../components/User';
import Logo from '../components/Logo';

const Profile = (props) => {
      return (
            <div className="container-user">
                  <Logo state={props.state} setState={props.setState} />
                  <User setState={props.setState} />
            </div>
      );
};

export default Profile;
