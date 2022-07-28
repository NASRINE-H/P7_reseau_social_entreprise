import React, { useState, useEffect } from 'react';

const Comment = ({ comment, deleteComment }) => {
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
                  <p>
                        User: "{comment.userId}" commented: "{comment.content}"
                  </p>
                  <button onClick={deleteCmnt}>X</button>
            </div>
      );
};
export default Comment;
