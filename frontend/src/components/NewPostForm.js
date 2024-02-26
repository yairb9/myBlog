import React, { useState } from "react";

/**
 * Represents a form for creating a new blog post. This component allows users
 * to input a title and content for a new post and submit it. Validation is performed
 * to ensure that both title and content fields are filled before submission.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.setPosts - State setter function to update the list of posts.
 * @param {Object[]} props.posts - Current array of posts.
 */
function NewPostForm({ setPosts, posts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  /**
   * Sends a new post to the server and updates the local state with the new post.
   * Clears the form upon successful submission.
   *
   * @param {Object} post - The new post to be created with title and content properties.
   */
  const createPost = (post) => {
    fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([...posts, data]);
        setTitle("");
        setContent("");
        setError("");
      })
      .catch((error) => console.error("Error:", error));
  };

  /**
   * Handles the form submission event. Validates the input fields and calls
   * createPost to submit the new post.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }
    const post = { title, content };
    createPost(post);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Add Post</button>
    </form>
  );
}

export default NewPostForm;
