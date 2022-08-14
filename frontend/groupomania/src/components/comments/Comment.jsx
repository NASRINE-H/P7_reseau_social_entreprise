import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoDelete from '@material-ui/icons/Delete';

const Comment = ({ comment, deleteComment }) => {
      const [username, setUserName] = useState('Undef');
      const [currentUser, setUser] = useState({});
      useEffect(() => {
            let usr = JSON.parse(localStorage.getItem('user'))
            setUser(usr);
            if (comment.user)
                  setUserName(comment.user.username);
            else 
                  setUserName(usr.username);
            
      }, [comment]);

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
                        }
                  })
                  .catch((error) => {
                        console.log('request failed:', error);
                  });
      };

      return (
            <div className="cmnt">
                  <h1 className="user-cmnt">
                  {username}:
                  </h1>

                  <p className="cmnt-content">{comment.content}</p>
                  {(currentUser.userId === comment.userId ||
                        currentUser.isAdmin) && (
                              
                                    <label htmlFor="icon-delete">
                                          <IconButton
                                                color="primary"
                                                aria-label="upload picture"
                                                component="span"
                                                onClick={deleteCmnt}>
                                                <PhotoDelete />
                                          </IconButton>
                                    </label>
                              
                        )}

            </div>
      );
};
export default Comment;
