import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PhotoDelete from '@material-ui/icons/Delete';
import PhotoUndo from '@material-ui/icons/Undo';
import PhotoApply from '@material-ui/icons/Done';
import ShowAllComment from '../comments/ShowAllComment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Post = ({ post, deletePost, updatePost }) => {
      const [postCommentList, setCommentList] = useState([]);
      const [mode, setMode] = useState('printMode');
      const [file, setFile] = useState();
      const [user, setUser] = useState({});
      const [preview, setPreview] = useState(post.attachement);

      //permet d'afficher les button supprimer et modifier
      useEffect(() => {
            setUser(JSON.parse(localStorage.getItem('user')));
            setCommentList(post.comments);
      }, [post]);

      //permet de retourner  le mode afficher du poste
      const activePrint = () => {
            setPreview(post.attachement);
            setMode('printMode');
      };

      //permet d'activer le mode modifier
      const activeEdit = () => {
            setMode('editMode');
      };

      //permet de faire la requete delete du poste
      const delPost = (e) => {
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
                        throw new Error('Une erreur est apparue');
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

      //permet d'ajouter un commentaire
      const addComment = (comment) => {
            setCommentList([comment, ...postCommentList]);
            setMode('printMode');
      };

      //pour supprimer le commentaire
      const deleteComment = (id) => {
            setCommentList(postCommentList.filter((Cmnt) => Cmnt.id !== id));
            setMode('printMode');
      };

      //pour faire l'alerte de la suppression
      const confirmDelete = () => {
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
                              <div className="post-div" id="post-div">
                                    <h2 id="post-user">
                                          {post.user.username} le "
                                          {new Date(
                                                post.createdAt
                                          ).toLocaleString()}
                                          "
                                    </h2>
                                    <h3 id="title"> {post.titre} </h3>
                                    <p id="content"> {post.content} </p>
                                    <div id="ImgContainer">
                                          {post.attachement && (
                                                <img
                                                      id="postImg"
                                                      src={post.attachement}
                                                      alt={post.attachement}
                                                />
                                          )}
                                    </div>
                                    {(user.userId === post.userId ||
                                          user.isAdmin) && (
                                          <div className="btn-suppmodif">
                                                <button
                                                      id={`supprimer-${post.id}`}
                                                      className="supprimer"
                                                      type="button"
                                                      onClick={confirmDelete}
                                                >
                                                      supprimer
                                                </button>

                                                <button
                                                      id={`modifier-${post.id}`}
                                                      className="modifier"
                                                      type="button"
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
                                    <h2 id="post-user">{post.user.username}</h2>
                                    <h3 id="title1">
                                          <label forhtml="post-titre-edit">
                                                Titre:
                                                <input
                                                      id="post-titre-edit"
                                                      type="text"
                                                      defaultValue={post.titre}
                                                      required
                                                />
                                          </label>
                                    </h3>
                                    <p id="content1">
                                          <label forhtml="post-content-edit">
                                                Contenu:
                                                <input
                                                      id="post-content-edit"
                                                      type="text"
                                                      defaultValue={
                                                            post.content
                                                      }
                                                      required
                                                />
                                          </label>
                                    </p>
                                    <img
                                          id="postImg"
                                          src={preview}
                                          alt="preview"
                                    />
                                    <div>
                                          <label htmlFor="icon-delete">
                                                <IconButton
                                                      color="primary"
                                                      aria-label="delete post"
                                                      component="span"
                                                      onClick={confirmDelete}
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
};

export default Post;
