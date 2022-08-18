import React, { useEffect, useState } from 'react';
import NewComment from './NewComment';
import Comment from './Comment';
const ShowAllComment = ({ commentData, postid, addComment, deleteComment }) => {
      const [commentList, setCommentList] = useState([]);
      useEffect(() => {
            setCommentList(commentData);
      }, [commentData]);

      const addNewComment = (cmnt) => {
            addComment(cmnt);
      };
      const delComment = (id) => {
            setCommentList(commentList.filter((Cmnt) => Cmnt.id !== id));
            deleteComment(id);
      };

      return (
            <div className="div-comment">
                  <NewComment
                        key={`NewComment-${postid}`}
                        postid={postid}
                        addComment={addNewComment}
                  />
                  {commentData?.map((comment) => {
                        if (comment.id)
                              return (
                                    <div
                                          className="div-comment"
                                          key={`commentdiv-${comment.id}`}
                                    >
                                          <Comment
                                                key={`Comment-${comment.id}`}
                                                comment={comment}
                                                deleteComment={delComment}
                                          />
                                    </div>
                              );
                        else return null;
                  })}
            </div>
      );
};

export default ShowAllComment;
