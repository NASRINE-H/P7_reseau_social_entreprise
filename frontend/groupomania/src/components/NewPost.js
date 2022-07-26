import React from 'react';

const NewPost = ({ addPost }) => {
      const CreateNewPost = (e) => {
            e.preventDefault();
            let post = {
                  titre: document.getElementById('post-titre').value,
                  content: document.getElementById('post-content').value,
            };
            //let image={
            //multer

            const body = new FormData();
            body.append('post', JSON.stringify(post));
            // body.append('image', image);

            const options = {
                  method: 'POST',
                  body: body,
                  headers: {
                        Authorization:
                              'bearer ' +
                              JSON.parse(localStorage.getItem('user')).token,
                  },
            };

            // delete options.headers['Content-Type'];

            fetch('http://localhost:3000/api/post', options)
                  .then((response) => {
                        return response.json();
                  })

                  .then((data) => {
                        console.log('request succes, Response:', data);
                        addPost(data.post);
                        // Fait quelque chose
                        // qui doit récupéré par Home pour refaire un fetch getAll
                  })

                  .catch((error) => {
                        console.log('request failed:', error);
                  });
      };
      return (
            <div className="creat-post">
                  <form className="form">
                        <div className="input-post">
                              <label>titre</label>
                              <input
                                    id="post-titre"
                                    type="text"
                                    name="titre"
                                    required
                              />
                        </div>
                        <div className="input-post">
                              <label>content</label>
                              <input
                                    id="post-content"
                                    type="text"
                                    name="content"
                                    required
                              />
                        </div>
                        <div className="input-post">
                              <label>attachment</label>
                              <input
                                    id="post-attachement"
                                    type=""
                                    name="content"
                                    required
                              />
                        </div>
                        <div className="input-post">
                              <button
                                    type="submit"
                                    className="btn-create"
                                    onClick={CreateNewPost}
                              >
                                    creer un post
                              </button>
                        </div>
                  </form>
            </div>
      );
};

export default NewPost;
