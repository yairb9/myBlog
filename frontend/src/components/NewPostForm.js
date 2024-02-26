import React, { useState } from "react";

function NewPostForm({ setPosts, posts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

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
