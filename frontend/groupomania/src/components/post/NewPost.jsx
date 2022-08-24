import React, { useState, useEffect } from 'react';

const NewPost = ({ addPost }) => {
      const [selectedFile, setSelectedFile] = useState();
      const [preview, setPreview] = useState();

      //useEffect pour afficher l'image chaque fois que le fichier sélectionné est modifié
      useEffect(() => {
            if (!selectedFile) {
                  setPreview(undefined);
                  return;
            }

            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);

            // libère de la mémoire dès que ce composant est démonté
            return () => URL.revokeObjectURL(objectUrl);
      }, [selectedFile]);

      //pour choisir une image
      const onSelectFile = (e) => {
            if (!e.target.files || e.target.files.length === 0) {
                  setSelectedFile(undefined);
                  return;
            }
            setSelectedFile(e.target.files[0]);
      };

      const CreateNewPost = (e) => {
            e.preventDefault();
            let post = {
                  titre: document.getElementById('post-titre').value,
                  content: document.getElementById('post-content').value,
            };
            //pour creer un body (post + image)
            if (post.titre !== '') {
                  const body = new FormData();
                  body.append('post', JSON.stringify(post));
                  body.append('image', selectedFile);

                  const options = {
                        method: 'POST',
                        body: body,
                        headers: {
                              Authorization:
                                    'bearer ' +
                                    JSON.parse(localStorage.getItem('user'))
                                          .token,
                        },
                  };

                  fetch('http://localhost:3000/api/post', options)
                        .then((response) => {
                              if (
                                    response.status === 200 ||
                                    response.status === 201
                              ) {
                                    //vider le champs
                                    document.querySelector(
                                          '#post-content'
                                    ).value = '';
                                    document.querySelector(
                                          '#post-titre'
                                    ).value = '';
                                    document.querySelector('#file').value = '';
                                    return response.json();
                              }
                              throw new Error(
                                    'Une erreur est apparue:',
                                    response.json()
                              );
                        })
                        .then((data) => {
                              addPost(data.post);
                              setSelectedFile(undefined);
                        })

                        .catch((error) => {
                              console.log('request failed:', error);
                        });
            } else {
                  console.log('contenu vide');
            }
      };
      //pour annuler de ne pas créer le poste
      const clearPreview = (e) => {
            setSelectedFile(undefined);
            onSelectFile(e);
      };
      return (
            <div className="creat-post">
                  <form className="form">
                        <div className="input-post">
                              <label forhtml="post-titre" id="label-post">
                                    titre
                                    <input
                                          id="post-titre"
                                          type="text"
                                          name="titre"
                                          required
                                    />
                              </label>
                        </div>
                        <div className="input-post">
                              <label forhtml="post-content" id="label-post">
                                    content
                                    <input
                                          id="post-content"
                                          type="text"
                                          name="content"
                                          required
                                    />
                              </label>
                        </div>

                        <div id="fileButtonDiv">
                              <label htmlFor="file" id="fileButton">
                                    inserer une image
                                    <input
                                          type="file"
                                          name="file"
                                          id="file"
                                          className="inputfile"
                                          onChange={onSelectFile}
                                    />
                              </label>
                        </div>
                        {!selectedFile && (
                              <button
                                    type="button"
                                    className="btn-poster"
                                    onClick={CreateNewPost}
                              >
                                    poster
                              </button>
                        )}
                        {selectedFile && (
                              <div className="post-div" id="post-div">
                                    <h1>Le post va être posté comme ça:</h1>

                                    <h2 id="title">
                                          {
                                                document.getElementById(
                                                      'post-titre'
                                                ).value
                                          }
                                    </h2>
                                    <p id="content">
                                          {
                                                document.getElementById(
                                                      'post-content'
                                                ).value
                                          }
                                    </p>
                                    {selectedFile && (
                                          <div id="ImgContainer">
                                                <img
                                                      src={preview}
                                                      alt={selectedFile.name}
                                                      id="postImg"
                                                />
                                                <div>
                                                      <button
                                                            type="button"
                                                            className="LogoButton2"
                                                            onClick={
                                                                  clearPreview
                                                            }
                                                      >
                                                            annuler
                                                      </button>
                                                      <button
                                                            type="button"
                                                            className="LogoButton2"
                                                            onClick={
                                                                  CreateNewPost
                                                            }
                                                      >
                                                            poster
                                                      </button>
                                                </div>
                                          </div>
                                    )}
                              </div>
                        )}
                  </form>
            </div>
      );
};

export default NewPost;
