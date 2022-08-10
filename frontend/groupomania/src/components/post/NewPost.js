import React, { useState } from 'react';

const NewPost = ({ addPost }) => {
      const [file, setFile] = useState();
      const [fileName, setFileName] = useState('');

      // let inputs = document.querySelectorAll('.inputfile');
      // Array.prototype.forEach.call(inputs, function (input) {
      //       let label = input.nextElementSibling,
      //             labelVal = label.innerHTML;

      //       input.addEventListener('change', function (e) {
      //             let fileName = '';
      //             if (this.files && this.files.length > 1)
      //                   fileName = (
      //                         this.getAttribute('data-multiple-caption') || ''
      //                   ).replace('{count}', this.files.length);

      //             if (fileName)
      //                   label.querySelector('span').innerHTML = fileName;
      //             else label.innerHTML = labelVal;
      //       });
      //       input.addEventListener('focus', function () {
      //             input.classList.add('has-focus');
      //       });
      //       input.addEventListener('blur', function () {
      //             input.classList.remove('has-focus');
      //       });
      // });

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
                        if (
                              response.status === 200 ||
                              response.status === 201
                        ) {
                              //vider le champs
                              document.querySelector('#post-content').value =
                                    '';
                              document.querySelector('#post-titre').value = '';
                              document.querySelector('#file').value = '';
                              return response.json();
                        }
                        throw new Error(
                              'Something went wrong:',
                              response.json()
                        );
                  })
                  .then((data) => {
                        console.log('request succes, Response:', data);
                        addPost(data.post);
                        setFileName();
                        setFile();
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
                        </div>{' '}
                        <div>
                              <label for="file">Choose a file</label>
                              <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    class="inputfile"
                                    // data-multiple-caption="{count} files selected"
                                    // multiple
                                    onChange={saveFile}
                              />
                        </div>{' '}
                        <div>
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
