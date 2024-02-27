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
  const [sortOrder, setSortOrder] = useState("desc");

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

  /**
   * Toggles the sorting order of posts between ascending and descending.
   */
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  /**
   * Sorts posts by their ID in either ascending or descending order based on sortOrder.
   */
  const sortedPosts = posts.sort((a, b) => {
    return sortOrder === "desc" ? b.id - a.id : a.id - b.id;
  });

  return (
    <div className="PostList">
      <div className="sortContainer">
        <button onClick={toggleSortOrder} className="sortButton">
          Sort {sortOrder === "desc" ? "⬆️" : "⬇️"}
        </button>
      </div>

      {sortedPosts.map((post) => (
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
              <div style={{ textAlign: "right", fontSize: "0.75rem" }}>
                {new Date(parseInt(post.id)).toLocaleString()}
              </div>
              <p>{post.content}</p>
              <button onClick={() => handleEdit(post)}>Edit</button>
              <button
                data-testid={`delete-${post.id}`}
                onClick={() => onDeletePost(post.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;
