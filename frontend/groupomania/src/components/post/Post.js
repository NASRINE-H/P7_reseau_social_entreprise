import React, { useState, useEffect } from 'react';

// import { useParams, useEffect, useState } from 'react';
const Post = ({ post, deletePost, updatePost }) => {
      const [mode, setMode] = useState('printMode');
      const [file, setFile] = useState();
      const [user, setUser] = useState({});
      useEffect(() => {
            setUser(JSON.parse(localStorage.getItem('user')));
      }, []);
      //permet d'activer le mode modifier
      const activeEdit = () => {
            setMode('editMode');
      };
      //permet d'activer le mode afficher du poste
      const activePrint = () => {
            setMode('printMode');
      };
      //permet de faire la requete delete du poste
      const delPost = (e) => {
            e.preventDefault();

            fetch('http://localhost:3000/api/post/' + post.id, {
                  method: 'DELETE',
                  headers: {
                        Authorization: 'bearer ' + user.token,
                  },
            }).then((result) => {
                  if (result.status === 200 || result.status === 201) {
                        deletePost(post.id);
                        console.log('supprimer avec succes');
                  } else {
                        setMode('errorMode');
                  }
            });
      };
      //permet de changer le state sur changement du fichier image
      const changeFile = (e) => {
            e.preventDefault();
            setFile(e.target.files[0]);
      };
      //permet de faire la requete PUT pour modifier le poste
      const editPost = (e) => {
            e.preventDefault();

            // récupérer les informations des inputs
            let postedit = {
                  titre: document.getElementById('post-titre-edit').value,
                  content: document.getElementById('post-content-edit').value,
            };

            const body = new FormData();
            body.append('post', JSON.stringify(postedit));
            body.append('image', file);

            fetch('http://localhost:3000/api/post/' + post.id, {
                  method: 'PUT',
                  headers: {
                        Authorization: 'bearer ' + user.token,
                  },
                  body: body,
            })
                  .then((result) => {
                        if (result.status === 403) {
                              console.log('setting error mode');
                              setMode('errorMode');
                        } else return result.json();
                  })
                  .then((data) => {
                        if (data.post) {
                              console.log(
                                    'modifié avec succes, nouveau post:',
                                    data.post
                              );
                              updatePost(data.post);
                              setMode('printMode');
                        }
                  })
                  .catch((error) => {
                        console.log('request failed:', error);
                  });
      };

      return (
            <div className="post-Page">
                  {mode === 'printMode' && (
                        <div id="post-div">
                              <h2 id="post-user">
                                    {/* postId: {post.id}, */}
                                    {post.user.username}
                              </h2>
                              <h2 id="title"> Titre: {post.titre} </h2>
                              <p id="content"> content: {post.content} </p>
                              {post.attachement && (
                                    <img
                                          id="postImg"
                                          src={post.attachement}
                                          alt=""
                                    />
                              )}
                              {(user.userId === post.userId ||
                                    user.isAdmin) && (
                                    <div>
                                          <button
                                                id="supprimer"
                                                onClick={delPost}
                                          >
                                                supprimer
                                          </button>
                                          <button
                                                id="modifier"
                                                onClick={activeEdit}
                                          >
                                                modifier
                                          </button>
                                    </div>
                              )}
                        </div>
                  )}
                  {mode === 'editMode' && (
                        <div id="post-div">
                              <h2 id="post-user">
                                    {/* postId: {post.id}, */}
                                    {post.user.username}
                              </h2>
                              <h2 id="title">
                                    Titre:
                                    <input
                                          id="post-titre-edit"
                                          type="text"
                                          defaultValue={post.titre} /// il faut ajouter un onChange
                                          required
                                    />
                              </h2>
                              <p id="content">
                                    content:
                                    <input
                                          id="post-content-edit"
                                          type="text"
                                          defaultValue={post.content}
                                          required
                                    />
                              </p>
                              <img id="postImg" src={post.attachement} alt="" />
                              <div>
                                    <button onClick={delPost}>
                                          {' '}
                                          supprimer{' '}
                                    </button>
                                    <button onClick={activePrint}>
                                          Annuler
                                    </button>
                                    <input
                                          type="file"
                                          name="modifier l'image"
                                          onChange={changeFile}
                                    />
                                    <button onClick={editPost}>
                                          {' '}
                                          Sauvegarder{' '}
                                    </button>
                              </div>
                        </div>
                  )}
            </div>
      );
      // };
};

export default Post;
