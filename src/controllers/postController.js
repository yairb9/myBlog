const Post = require("../models/Post");

let posts = [];

const getAllPosts = (req, res) => {
  res.json(posts);
};

const createPost = (req, res) => {
  const { title, content } = req.body;
  const id = Date.now();
  const newPost = new Post(id, title, content);
  posts.push(newPost);
  res.status(201).json(newPost);
};

const updatePost = (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.title = title;
    post.content = content;
    res.status(200).json(post);
  } else {
    res.status(404).send("Post not found");
  }
};

const deletePost = (req, res) => {
  const id = Number(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex > -1) {
    posts.splice(postIndex, 1);
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    res.status(404).send("Post not found");
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};
