import React, { useEffect, useState } from 'react';
import Post from './Post';
import NewPost from '../components/NewPost';
import ShowAllComment from '../components/comments/ShowAllComment';

const AllPost = ({ AllPostData }) => {
      const [postList, setPostList] = useState([]);

      useEffect(() => {
            setPostList(AllPostData);
      }, [AllPostData]);
      //pour eviter le rechargement de la page quand on fait supprimer d'aun post
      const addPost = (post) => {
            setPostList([post, ...postList]);
      }; //pour supprimer le post
      const deletePost = (id) => {
            setPostList(postList.filter((post) => post.id !== id));
      };
      const updatePost = (post) => {
            let postFound = postList.find((p) => p.id === post.id);
            Object.assign(postFound, post);
            setPostList(postList);
      };

      return (
            <div>
                  <NewPost addPost={addPost} />
                  {postList.map((post) => {
                        return (
                              <div>
                                    <Post
                                          deletePost={deletePost}
                                          key={`post-${post.id}`}
                                          post={post}
                                          updatePost={updatePost}
                                    />
                                    <ShowAllComment
                                          commentData={post.comments}
                                          key={`comment-${post.id}`}
                                    />
                              </div>
                        );
                  })}
            </div>
      );
};

export default AllPost;
