import React, { useState } from 'react';

const NewComment = ({ postid, addComment }) => {
      //const [comment, setComment] = useState();
      const createNewComment = (e) => {
            e.preventDefault();
            let content= document.getElementById('comment-content' + postid)
                        .value;
            if(content !=='') {           
            let comment = {
                  content: document.getElementById('comment-content' + postid)
                        .value,
            };

            let user = JSON.parse(localStorage.getItem('user'));
            
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
                              document.querySelector('#btn-comment');
                              //   document.querySelector('#comment-content').value =
                              //         '';
                              return response.json();
                        }
                        throw new Error('Something went wrong');
                  })
                  .then((data) => {
                       addComment(data.comment);
                       document.getElementById('comment-content' + postid).value='';
                  })
                  .catch((error) => {
                        console.log('request failed:', error);
                  });
      }
      else
      {     
            console.log("contenu vide");

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
                              </label>{' '}
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
