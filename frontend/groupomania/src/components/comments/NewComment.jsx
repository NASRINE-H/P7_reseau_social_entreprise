import React from 'react';

const NewComment = ({ postid, addComment }) => {
      // créer un nouveau commentaire
      const createNewComment = (e) => {
            e.preventDefault();
            let content = document.getElementById(
                  'comment-content' + postid
            ).value;
            let user = JSON.parse(localStorage.getItem('user'));
            if (content !== '' && user !== '') {
                  // créer la variable "comment" à poster dans le fetch
                  let comment = {
                        content: content,
                  };

                  fetch('http://localhost:3000/api/comment/' + postid, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                              Authorization: 'bearer ' + user.token,
                        },
                        body: JSON.stringify(comment),
                  })
                        .then((response) => {
                              if (response.ok) {
                                    return response.json();
                              }
                              throw new Error('Une erreur est apparue');
                        })
                        .then((data) => {
                              addComment(data.comment);
                              document.getElementById(
                                    'comment-content' + postid
                              ).value = '';
                        })
                        .catch((error) => {
                              console.log('request failed:', error);
                        });
            } else {
                  // contenu vide, ne rien faire
            }
      };
      return (
            <div className="creat-comment">
                  <form className="form">
                        <div className="input-comment">
                              <label htmlFor="comment-content" id="label-cmnt">
                                    <input
                                          id={'comment-content' + postid}
                                          type="text"
                                          name="content"
                                          required
                                    />
                              </label>
                              <div className="input-comment">
                                    <button
                                          type="button"
                                          id="btn-comment"
                                          onClick={createNewComment}
                                    >
                                          commenter
                                    </button>
                              </div>
                        </div>
                  </form>
            </div>
      );
};

export default NewComment;
