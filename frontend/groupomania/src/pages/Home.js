import React, { useEffect } from 'react';

const Home = () => {
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
                        console.log('request succes, Response:', data);
                  });
      }, []);
      return <div></div>;
};

export default Home;
