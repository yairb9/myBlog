const Post = require("../models/Post");

let posts = [];

const getAllPosts = (req, res) => {
  res.json(posts);
};

const createPost = (req, res) => {
  const { id, title, content } = req.body;
  const newPost = new Post(id, title, content);
  posts.push(newPost);
  res.status(201).json(newPost);
};

const updatePost = (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const postToUpdate = posts.find((post) => post.id === id);
  if (!postToUpdate) {
    res.status(404).send("Post not found");
  } else {
    postToUpdate.title = title;
    postToUpdate.content = content;
    res.json(postToUpdate);
  }
};

const deletePost = (req, res) => {
  const id = req.params.id;
  posts = posts.filter((post) => post.id !== id);
  res.send("Post deleted successfully");
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};
