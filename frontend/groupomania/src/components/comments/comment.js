import React, { useState, useEffect } from 'react';

const Comment = ({ commentData }) => {
      const [comment, setComment] = useState({});
      useEffect(() => {
            setComment(commentData);
      }, [commentData]);
      //   const activeEmpty = () => {
      //         setMode('EmptyComment');
      //   };
      //   const activeComment = () => {
      //         setMode('Commenting');
      //   };
      //   if (cmnt && mode == 'EmptyComment') activeComment();
      //   else activeEmpty();
      // console.log('postid:', postid, ' cmnt:', cmnt);
      return (
            <p>
                  User: {comment.userId}
                  commented: " {comment.content}" on this post
            </p>
      );
      /**
                    <div className="post-Page">
                  <div>
                        {' '}
                        {cmnt.map((comment, index) => {
                              <p key={index}>
                                    User: {comment.userId}
                                    commented: " {comment.content}" on this post{' '}
                              </p>;
                        })}
                  </div>
            </div> */
};
export default Comment;
