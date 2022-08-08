import React from 'react';

const NewComment = ({ postid, addComment }) => {
      const createNewComment = (e) => {
            e.preventDefault();
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
                              console.log('comment request succes');
                              return response.json();
                        }
                        throw new Error('Something went wrong');
                  })
                  .then((data) => {
                        console.log('request succes, Response Data: ', data);
                        addComment(data.comment);
                  })
                  .catch((error) => {
                        console.log('request failed:', error);
                  });
      };
      return (
            <div className="creat-comment">
                  <form className="form">
                        <div className="input-comment">
                              <input
                                    id={'comment-content' + postid}
                                    type="text"
                                    name="content"
                                    required
                              />
                              <div className="input-comment">
                                    <button
                                          type="submit"
                                          className="btn-comment"
                                          onClick={createNewComment}
                                    >
                                          commenter{' '}
                                    </button>{' '}
                              </div>{' '}
                        </div>{' '}
                  </form>{' '}
            </div>
      );
};

export default NewComment;
