import React, { useEffect, useState } from 'react';
import NewComment from '../comments/NewComment';
import Comment from './Comment';
const ShowAllComment = ({ commentData, postid, addComment }) => {
      const [commentList, setCommentList] = useState([]);
      useEffect(() => {
            setCommentList(commentData);
      }, [commentData]);
      //pour eviter le rechargement de la page quand on fait supprimer d'aun post

      const deleteComment = (id) => {
            setCommentList(commentList.filter((Cmnt) => Cmnt.id !== id));
      };

      return (
            <div>
                  <NewComment
                        key={`NewComment-${postid}`}
                        postid={postid}
                        addComment={addComment}
                  />{' '}
                  {commentList?.map((comment) => {
                        if (comment.id)
                              return (
                                    <div key={`commentdiv-${comment.id}`}>
                                          <Comment
                                                key={`Comment-${comment.id}`}
                                                comment={comment}
                                                deleteComment={deleteComment}
                                          />{' '}
                                    </div>
                              );
                        else return null;
                  })}{' '}
            </div>
      );
};

export default ShowAllComment;
