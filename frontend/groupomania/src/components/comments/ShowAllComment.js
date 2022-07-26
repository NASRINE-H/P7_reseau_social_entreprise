import React, { useEffect, useState } from 'react';
import NewComment from '../comments/NewComment';
import Comment from './Comment';
const ShowAllComment = ({ commentData }) => {
      const [commentList, setCommentList] = useState([]);

      useEffect(() => {
            setCommentList(commentData);
      }, [commentData]);
      //pour eviter le rechargement de la page quand on fait supprimer d'aun post
      const addCmnt = (Cmnt) => {
            setCommentList([Cmnt, ...commentList]);
      };
      //  //pour supprimer le post
      // const deleteCmnt = (id) => {
      //       setCommentList(commentList.filter((Cmnt) => Cmnt.id !== id));
      // };

      return (
            <div>
                  <NewComment addCmnt={addCmnt} />
                  {commentList.map((comment) => {
                        return (
                              <Comment
                                    key={'comment-' + comment.id}
                                    commentData={comment}
                              />
                        );
                  })}
            </div>
      );
};

export default ShowAllComment;
