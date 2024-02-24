import React, { useState } from "react";
import NewPostForm from "../src/components/NewPostForm";
import PostList from "../src/components/PostList";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const editPost = (id, updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post))
    );
  };

  return (
    <div className="App">
      <h1>My Blog</h1>
      <NewPostForm onAddPost={addPost} />
      <PostList posts={posts} onDeletePost={deletePost} onEditPost={editPost} />
    </div>
  );
}

export default App;
