import React, { useEffect, useState } from 'react';
import Post from '../components/Post';

const Home = () => {
      const [postState, setPostState] = useState([0]);
      useEffect(() => {
            let user = JSON.parse(localStorage.getItem('user'));
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
                        setPostState(data);
                  });
      }, []);
      return (
            <div>
                  <Post postData={postState} />
            </div>
      );
};

export default Home;
