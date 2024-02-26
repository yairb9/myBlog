import React, { useState, useEffect } from "react";
import NewPostForm from "../src/components/NewPostForm";
import PostList from "../src/components/PostList";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const deletePost = (id) => {
    fetch(`http://localhost:4000/posts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  const editPost = (id, updatedPost) => {
    fetch(`http://localhost:4000/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(
          posts.map((post) => (post.id === id ? { ...post, ...data } : post))
        );
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  return (
    <div className="App">
      <h1>My Blog</h1>
      <NewPostForm setPosts={setPosts} posts={posts} />
      <PostList posts={posts} onDeletePost={deletePost} onEditPost={editPost} />
    </div>
  );
}

export default App;
