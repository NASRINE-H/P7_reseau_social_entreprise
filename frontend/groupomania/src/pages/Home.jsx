import React, { useEffect, useState } from 'react';
import AllPost from '../components/post/AllPost';
import Logo from '../components/Logo';

const Home = (props) => {
      const [AllPostState, setAllPostState] = useState([0]);
      useEffect(() => {
            let user = JSON.parse(localStorage.getItem('user'));
            fetch('http://localhost:3000/api/post', {
                  headers: {
                        Authorization: 'bearer ' + user.token,
                  },
            })
                  .then((response) => {
                        if (response.ok) {
                              return response.json();
                        }
                        throw new Error('Something went wrong');
                  })
                  .then((data) => {
                        setAllPostState(data);
                  })
                  .catch((error) => {
                        console.log('request failed:', error);
                  });
      }, []);
      return (
            <div className="home">
                  <Logo state={props.state} setState={props.setState}  />
                  <AllPost AllPostData={AllPostState} />
            </div>
      );
};

export default Home;
