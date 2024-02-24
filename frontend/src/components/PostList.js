import React, { useState } from "react";

function PostList({ posts, onDeletePost, onEditPost }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const handleEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleSave = (id) => {
    onEditPost(id, { title: editTitle, content: editContent });
    setEditingId(null);
  };

  return (
    <div className="PostList">
      {posts.map((post) => (
        <div key={post.id} className="post">
          {editingId === post.id ? (
            <div>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={() => handleSave(post.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button onClick={() => handleEdit(post)}>Edit</button>
              <button onClick={() => onDeletePost(post.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;
