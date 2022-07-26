import React, { useEffect, useState } from 'react';
import AllPost from '../components/AllPost';
import Logo from '../components/Logo';

const Home = () => {
      const [AllPostState, setAllPostState] = useState([0]);
      useEffect(() => {
            let user = JSON.parse(localStorage.getItem('user'));
            //afficher tous les post
            fetch('http://localhost:3000/api/post', {
                  headers: {
                        Authorization: 'bearer ' + user.token,
                  },
            })
                  .then((response) => {
                        console.log('Response:', response);
                        return response.json();
                  })
                  .then((data) => {
                        // on appelle setPost pour mettre data dans la state 'postState'
                        setAllPostState(data);
                  });
      }, []);
      return (
            <div>
                  <Logo />
                  <AllPost AllPostData={AllPostState} />
            </div>
      );
};

export default Home;
