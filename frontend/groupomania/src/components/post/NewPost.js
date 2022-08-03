import React, { useState } from 'react';

const NewPost = ({ addPost }) => {
      const [file, setFile] = useState();
      const [fileName, setFileName] = useState('');

      const saveFile = (e) => {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
      };

      const CreateNewPost = (e) => {
            e.preventDefault();
            let post = {
                  titre: document.getElementById('post-titre').value,
                  content: document.getElementById('post-content').value,
            };

            const body = new FormData();
            body.append('post', JSON.stringify(post));
            body.append('image', file);

            const options = {
                  method: 'POST',
                  body: body,
                  headers: {
                        Authorization:
                              'bearer ' +
                              JSON.parse(localStorage.getItem('user')).token,
                  },
            };

            fetch('http://localhost:3000/api/post', options)
                  .then((response) => {
                        return response.json();
                  })

                  .then((data) => {
                        console.log('request succes, Response:', data);
                        addPost(data.post);
                  })

                  .catch((error) => {
                        console.log('request failed:', error);
                  });
      };

      return (
            <div className="creat-post">
                  <form className="form">
                        <div className="input-post">
                              <label> Titre </label>{' '}
                              <input
                                    id="post-titre"
                                    type="text"
                                    name="titre"
                                    required
                              />
                        </div>{' '}
                        <div className="input-post">
                              <label> Content </label>{' '}
                              <input
                                    id="post-content"
                                    type="text"
                                    name="content"
                                    required
                              />
                        </div>
                        <input type="file" onChange={saveFile} />{' '}
                        <div className="input-post">
                              <button
                                    type="submit"
                                    className="btn-create"
                                    onClick={CreateNewPost}
                              >
                                    créer un post{' '}
                              </button>{' '}
                        </div>{' '}
                  </form>{' '}
            </div>
      );
};

export default NewPost;
