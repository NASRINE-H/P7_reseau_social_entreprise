import React, { useState } from 'react';

// import { useParams, useEffect, useState } from 'react';
const Post = ({ post, deletePost, updatePost }) => {
      const [mode, setMode] = useState('printMode');
      const activeEdit = () => {
            setMode('editMode');
      };
      const activePrint = () => {
            setMode('printMode');
      };
      const delPost = (e) => {
            e.preventDefault();

            let user = JSON.parse(localStorage.getItem('user'));
            fetch('http://localhost:3000/api/post/' + post.id, {
                  method: 'DELETE',
                  headers: {
                        Authorization: 'bearer ' + user.token,
                  },
            }).then(() => {
                  deletePost(post.id);
                  console.log('supprimer avec succes');
            });
      };

      const editPost = (e) => {
            e.preventDefault();

            // récupérer les informations des inputs
            let postedit = {
                  titre: document.getElementById('post-titre-edit').value,
                  content: document.getElementById('post-content-edit').value,
            };

            const body = new FormData();
            body.append('post', JSON.stringify(postedit));
            let user = JSON.parse(localStorage.getItem('user'));

            fetch('http://localhost:3000/api/post/' + post.id, {
                  method: 'PUT',
                  headers: {
                        Authorization: 'bearer ' + user.token,
                  },
                  body: body,
            })
                  .then((result) => {
                        return result.json();
                  })
                  .then((data) => {
                        console.log('modifié avec succes');
                        updatePost(data.post);
                        setMode('printMode');
                  });
      };

      return (
            <div className="post-Page">
                  {mode === 'printMode' && (
                        <div>
                              <h1> titre: {post.titre} </h1>
                              <h2>
                                    postId: {post.id}, userId: {post.userId}
                              </h2>
                              <p> content: {post.content} </p>

                              <button onClick={delPost}>supprimer</button>
                              <button onClick={activeEdit}>modifier</button>
                        </div>
                  )}
                  {mode === 'editMode' && (
                        <div>
                              <h1>
                                    titre:
                                    <input
                                          id="post-titre-edit"
                                          type="text"
                                          defaultValue={post.titre} /// il faut ajouter un onChange
                                          required
                                    />
                              </h1>

                              <h2>
                                    postId: {post.id}, userId: {post.userId}
                              </h2>
                              <p>
                                    content:
                                    <input
                                          id="post-content-edit"
                                          type="text"
                                          defaultValue={post.content}
                                          required
                                    />
                              </p>
                              <button onClick={delPost}>supprimer</button>
                              <button onClick={activePrint}>Annuler</button>
                              <button onClick={editPost}>Sauvegarder</button>
                        </div>
                  )}
            </div>
      );
      // };
};

export default Post;
