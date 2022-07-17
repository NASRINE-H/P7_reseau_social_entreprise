import React from 'react';

const Post = ({ postData }) => {
      const outStruct = postData
            .sort((a, b) => {
                  if (a.id < b.id) return 1;
                  if (a.id > b.id) return -1;
                  return 0;
            })
            .map((post) => {
                  return (
                        <div>
                              <h1>titre:{post.titre}</h1>
                              <h2>
                                    postId:{post.id}, userId:{post.userId}
                              </h2>
                              <p>content: {post.content}</p>
                        </div>
                  );
            });
      return <div>{outStruct}</div>;
};

export default Post;
