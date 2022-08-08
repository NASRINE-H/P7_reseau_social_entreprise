import React, { useEffect, useState } from 'react';
import NewComment from '../comments/NewComment';
import Comment from './Comment';
const ShowAllComment = ({ commentData, postid, addComment }) => {
      const [commentList, setCommentList] = useState([]);
      useEffect(() => {
            setCommentList(commentData);
      }, [commentData]);

      const deleteComment = (id) => {
            setCommentList(commentList.filter((Cmnt) => Cmnt.id !== id));
      };

      const addNewComment = (cmnt) => {
            console.log(commentData);
            setCommentList(commentData, ...cmnt);
            console.log(commentData);
            addComment(cmnt);
            console.log(commentData);
      };
      return (
            <div>
                  <NewComment
                        key={`NewComment-${postid}`}
                        postid={postid}
                        addComment={addNewComment}
                  />
                  {commentList?.map((comment) => {
                        if (comment.id)
                              return (
                                    <div key={`commentdiv-${comment.id}`}>
                                          <Comment
                                                key={`Comment-${comment.id}`}
                                                comment={comment}
                                                deleteComment={deleteComment}
                                          />
                                    </div>
                              );
                        else return null;
                  })}
            </div>
      );
};

export default ShowAllComment;
