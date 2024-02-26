import React, { useState } from "react";

/**
 * Renders a list of blog posts, allowing each post to be edited or deleted.
 * Provides interactive UI elements for editing post titles and contents in-line,
 * and buttons for saving changes or deleting posts.
 *
 * @param {Object[]} posts - Array of post objects to display.
 * @param {Function} onDeletePost - Callback function to delete a post by its id.
 * @param {Function} onEditPost - Callback function to save edited post details.
 */
function PostList({ posts, onDeletePost, onEditPost }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  /**
   * Initiates editing mode for a selected post, setting its title and content
   * in the editable fields.
   *
   * @param {Object} post - The post object to be edited.
   */
  const handleEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  /**
   * Handles the save action for an edited post. Invokes the onEditPost callback
   * with the new title and content, then exits editing mode.
   *
   * @param {string} id - The id of the post being saved.
   */
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
