import React from 'react';

const NewComment = ({ addCmnt, postid }) => {
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
                        return response.json();
                  })

                  .then((data) => {
                        console.log('request succes, Response Data: ', data);
                        addCmnt(data.comment);
                  })
                  .catch((error) => {
                        console.log('request failed:', error);
                  });
      };
      return (
            <div className="creat-comment">
                  <form className="form">
                        <div className="input-commentt">
                              <label> commentaire: </label>
                              <input
                                    id={'comment-content' + postid}
                                    type="text"
                                    name="content"
                                    required
                              />
                              <div className="input-comment">
                                    <button
                                          type="submit"
                                          className="btn-create"
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
