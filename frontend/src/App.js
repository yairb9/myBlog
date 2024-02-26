import React, { useState, useEffect } from "react";
import NewPostForm from "../src/components/NewPostForm";
import PostList from "../src/components/PostList";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  /**
   * Fetches all posts from the backend and updates the state.
   * This function is called on component mount via useEffect.
   */
  const getAllPosts = () => {
    fetch("http://localhost:4000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  };

  /**
   * Deletes a post by its ID. Upon successful deletion, the post is removed from the state.
   *
   * @param {string} id - The ID of the post to be deleted.
   */
  const deletePost = (id) => {
    fetch(`http://localhost:4000/posts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const filteredPosts = posts.filter((post) => post.id !== id);
        setPosts(filteredPosts);
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  /**
   * Updates the content of an existing post. The updated post data is sent to the backend,
   * and upon success, the state is updated.
   *
   * @param {string} id - The ID of the post to be updated.
   * @param {Object} updatedPost - The new content for the post. Should contain any fields that need to be updated.
   */
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
        const updatedPosts = posts.map((post) =>
          post.id === id ? { ...post, ...data } : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  useEffect(getAllPosts, []);

  return (
    <div className="App">
      <h1>My Blog</h1>
      <NewPostForm setPosts={setPosts} posts={posts} />
      <PostList posts={posts} onDeletePost={deletePost} onEditPost={editPost} />
    </div>
  );
}

export default App;
