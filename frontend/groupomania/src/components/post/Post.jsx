import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PhotoDelete from '@material-ui/icons/Delete';
import PhotoUndo from '@material-ui/icons/Undo';
import PhotoApply from '@material-ui/icons/Done';
import PhotoEdit from '@material-ui/icons/Edit';
import ShowAllComment from '../comments/ShowAllComment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// import { useParams, useEffect, useState } from 'react';
const Post = ({ post, deletePost, updatePost }) => {
      const [postCommentList, setCommentList] = useState([]);
      const [mode, setMode] = useState('printMode');
      const [file, setFile] = useState();
      const [user, setUser] = useState({});
      const [preview, setPreview] = useState(post.attachement);

      useEffect(() => {
            setUser(JSON.parse(localStorage.getItem('user')));
            //            let datecreate = (post.createdAt);
            //            console.log('post:' + datecreate);
            setCommentList(post.comments);
      }, [post]);
      //permet d'activer le mode modifier
      const activeEdit = () => {
            setMode('editMode');
      };
      //permet d'activer le mode afficher du poste
      const activePrint = () => {
            setPreview(post.attachement);
            setMode('printMode');
      };

      //permet de faire la requete delete du poste
      const delPost = (e) => {
            // e.preventDefault();
            fetch('http://localhost:3000/api/post/' + post.id, {
                  method: 'DELETE',
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
                  .then(() => {
                        deletePost(post.id);
                  })
                  .catch((error) => {
                        console.log('delete post request failed:', error);
                  });
      };
      //permet de changer le state sur changement du fichier image
      const changeFile = (e) => {
            e.preventDefault();
            setFile(e.target.files[0]);
            if (!e.target.files[0]) {
                  console.log('file empty!!!!');
                  setPreview(post.attachement);
                  return;
            }

            const objectUrl = URL.createObjectURL(e.target.files[0]);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
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
                              console.log('Not Authorized!! Error 403');
                        } else return result.json();
                  })
                  .then((data) => {
                        if (data.post) {
                              updatePost(data.post);
                              setMode('printMode');
                        }
                  })
                  .catch((error) => {
                        console.log('request failed:', error);
                  });
      };

      const addComment = (comment) => {
            setCommentList([comment, ...postCommentList]);
            setMode('printMode');
      }; //pour supprimer le post

      const deleteComment = (id) => {
            setCommentList(postCommentList.filter((Cmnt) => Cmnt.id !== id));
            setMode('printMode');
      };

      const submit = () => {
            confirmAlert({
                  customUI: ({ onClose }) => {
                        return (
                              <div className="custom-ui">
                                    <h1>Vous êtes sure?</h1>
                                    <p>
                                          Voulez vous supprimer ce post
                                          définitivement?
                                    </p>
                                    <button onClick={onClose}>Non</button>
                                    <button
                                          onClick={() => {
                                                delPost();
                                                onClose();
                                          }}
                                    >
                                          Oui, supprimer!
                                    </button>
                              </div>
                        );
                  },
            });
      };
      return (
            <div>
                  <div className="post-Page">
                        {mode === 'printMode' && (
                              <div id="post-div">
                                    <h2 id="post-user">
                                          {/* postId: {post.id}, */}
                                          {post.user.username} à{' '}
                                          {post.createdAt}
                                    </h2>
                                    <h2 id="title"> {post.titre} </h2>
                                    <p id="content"> {post.content} </p>
                                    {post.attachement && (
                                          <img
                                                id="postImg"
                                                src={post.attachement}
                                                alt=""
                                          />
                                    )}
                                    {(user.userId === post.userId ||
                                          user.isAdmin) && (
                                          <div className="btn-suppmodif">
                                                <button
                                                      id="supprimer"
                                                      type="button"
                                                      onClick={submit}
                                                >
                                                      supprimer
                                                </button>

                                                <button
                                                      id="modifier"
                                                      type="button"
                                                      onClick={activeEdit}
                                                >
                                                      modifier
                                                </button>
                                                {/* <label htmlFor="icon-delete">
                                                      <IconButton
                                                            color="primary"
                                                            aria-label="delete post"
                                                            component="span"
                                                            id="supprimer"
                                                            onClick={delPost}
                                                      >
                                                            <PhotoDelete />
                                                      </IconButton>
                                                </label>
                                                <label htmlFor="icon-undo">
                                                      <IconButton
                                                            color="primary"
                                                            aria-label="undo update"
                                                            component="span"
                                                            id="modifier"
                                                            onClick={activeEdit}
                                                      >
                                                            <PhotoEdit />
                                                      </IconButton>
                                                </label> */}
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
                                    <h2 id="title1">
                                          Titre:
                                          <input
                                                id="post-titre-edit"
                                                type="text"
                                                defaultValue={post.titre} /// il faut ajouter un onChange
                                                required
                                          />
                                    </h2>
                                    <p id="content1">
                                          Contenu:
                                          <input
                                                id="post-content-edit"
                                                type="text"
                                                defaultValue={post.content}
                                                required
                                          />
                                    </p>
                                    <img id="postImg" src={preview} alt="" />
                                    <div>
                                          <label htmlFor="icon-delete">
                                                <IconButton
                                                      color="primary"
                                                      aria-label="delete post"
                                                      component="span"
                                                      onClick={delPost}
                                                >
                                                      <PhotoDelete />
                                                </IconButton>
                                          </label>
                                          <label htmlFor="icon-undo">
                                                <IconButton
                                                      color="primary"
                                                      aria-label="undo update"
                                                      component="span"
                                                      onClick={activePrint}
                                                >
                                                      <PhotoUndo />
                                                </IconButton>
                                          </label>

                                          <input
                                                accept="image/*"
                                                id="icon-button-file"
                                                type="file"
                                                onChange={changeFile}
                                                style={{ display: 'none' }}
                                          />
                                          <label htmlFor="icon-button-file">
                                                <IconButton
                                                      color="primary"
                                                      aria-label="upload picture"
                                                      component="span"
                                                >
                                                      <PhotoCamera />
                                                </IconButton>
                                          </label>
                                          <label htmlFor="icon-apply">
                                                <IconButton
                                                      color="primary"
                                                      aria-label="apply edits"
                                                      component="span"
                                                      onClick={editPost}
                                                >
                                                      <PhotoApply />
                                                </IconButton>
                                          </label>
                                    </div>
                              </div>
                        )}
                  </div>
                  <ShowAllComment
                        commentData={postCommentList}
                        key={`AllCommentFor-${post.id}`}
                        postid={post.id}
                        addComment={addComment}
                        deleteComment={deleteComment}
                  />
            </div>
      );
      // };
};

export default Post;
