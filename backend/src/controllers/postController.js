const Post = require("../models/Post");

const posts = [
  {
    id: "1709028953",
    title: "Exploring the Depths of Generative AI",
    content:
      "Generative AI is transforming how we create and innovate, from art to code. Let's dive into its capabilities and potential.",
  },
  {
    id: "1684825970",
    title: "The Future of Creativity with AI",
    content:
      "How generative AI models like GPT and DALL·E are redefining artistic creation and opening new avenues for creators.",
  },
  {
    id: "1698232190",
    title: "AI Ethics: Navigating the New Frontier",
    content:
      "With great power comes great responsibility. Discussing the ethical considerations of generative AI and its impact on society.",
  },
];

/**
 * Sends all posts as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllPosts = (req, res) => {
  res.json(posts);
};

/**
 * Creates a new post and adds it to the posts array. Responds with the
 * newly created post.
 *
 * @param {Object} req - The request object, containing `title` and `content` in the body.
 * @param {Object} res - The response object.
 */
const createPost = (req, res) => {
  const { title, content } = req.body;
  const id = Date.now();
  const newPost = new Post(id, title, content);
  posts.push(newPost);
  res.status(201).json(newPost);
};

/**
 * Updates an existing post with new title and content. If the post
 * is not found, responds with a 404 Not Found.
 *
 * @param {Object} req - The request object, containing `title` and `content` in the body and `id` in the URL params.
 * @param {Object} res - The response object.
 */
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

/**
 * Deletes a post by ID. If the post is found and deleted, responds with
 * a success message. Otherwise, responds with a 404 Not Found.
 *
 * @param {Object} req - The request object, containing `id` in the URL params.
 * @param {Object} res - The response object.
 */
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
