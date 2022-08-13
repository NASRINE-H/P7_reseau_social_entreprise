import React, { useState, useEffect } from 'react';

const Comment = ({ comment, deleteComment }) => {
      useEffect(() => {}, []);
      //pour supprimer le commentaire
      const deleteCmnt = (e) => {
            e.preventDefault();
            let user = JSON.parse(localStorage.getItem('user'));
            fetch('http://localhost:3000/api/comment/' + comment.id, {
                  method: 'DELETE',
                  headers: {
                        Authorization: 'bearer ' + user.token,
                  },
            })
                  .then((result) => {
                        if (result.status === 200 || result.status === 201) {
                              deleteComment(comment.id);
                              console.log(
                                    'commentaire a été supprimé avec succes'
                              );
                        }
                  })
                  .catch((error) => {
                        console.log('request failed:', error);
                  });
      };

      return (
            <div>
                  <div className="cmnt">
                        <p className="user-cmnt">
                              {comment.user.username}: <br></br>
                        </p>

                        <p className="cmnt-content">{comment.content}</p>
                  </div>{' '}
                  <button type="button" id="sup-cmnt" onClick={deleteCmnt}>
                        {' '}
                        supprimer{' '}
                  </button>{' '}
            </div>
      );
};
export default Comment;
