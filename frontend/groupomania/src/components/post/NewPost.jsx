import React, { useState, useEffect } from 'react';

const NewPost = ({ addPost }) => {
      const [selectedFile, setSelectedFile] = useState();
      const [preview, setPreview] = useState();

      // create a preview as a side effect, whenever selected file is changed
      useEffect(() => {
            if (!selectedFile) {
                  setPreview(undefined);
                  return;
            }

            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);

            // free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl);
      }, [selectedFile]);

      const onSelectFile = (e) => {
            if (!e.target.files || e.target.files.length === 0) {
                  setSelectedFile(undefined);
                  return;
            }

            // I've kept this example simple by using the first image instead of multiple
            setSelectedFile(e.target.files[0]);
      };

      const CreateNewPost = (e) => {
            e.preventDefault();
            let post = {
                  titre: document.getElementById('post-titre').value,
                  content: document.getElementById('post-content').value,
            };

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
                                    'Something went wrong:',
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

      const clearPreview = (e) => {
            setSelectedFile(undefined);
            onSelectFile(e);
      };
      return (
            <div className="creat-post">
                  <form className="form">
                        <div className="input-post">
                              <label id="label-post">
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
                              <label id="label-post">
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
                                          // data-multiple-caption="{count} files selected"
                                          // multiple
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
                              <div id="post-div">
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
