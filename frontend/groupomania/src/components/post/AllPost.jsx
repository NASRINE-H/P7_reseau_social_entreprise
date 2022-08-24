import React, { useEffect, useState } from 'react';
import Post from './Post';
import NewPost from './NewPost';

const AllPost = ({ AllPostData }) => {
      const [postList, setPostList] = useState([]);

      useEffect(() => {
            if (AllPostData) setPostList(AllPostData);
      }, [AllPostData]);

      const addPost = (post) => {
            setPostList([post, ...postList]);
            //pour eviter le rechargement de la page quand on fait supprimer d'aun post
      }; //pour supprimer le post sans raffrichir la page
      const deletePost = (id) => {
            setPostList(postList.filter((post) => post.id !== id));
      };
      //permet de modifier le post sans raffrichir la page
      const updatePost = (post) => {
            let postFound = postList.find((p) => p.id === post.id);
            Object.assign(postFound, post);
            setPostList(postList);
      };

      return (
            <div className="allPost">
                  <NewPost addPost={addPost} />
                  {postList?.map((post) => {
                        if (post.id)
                              return (
                                    <div key={`div-${post.id}`}>
                                          <Post
                                                deletePost={deletePost}
                                                key={`post-${post.id}`}
                                                post={post}
                                                updatePost={updatePost}
                                          />
                                    </div>
                              );
                        else return null;
                  })}
            </div>
      );
};

export default AllPost;
