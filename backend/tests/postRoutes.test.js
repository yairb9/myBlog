const request = require("supertest");
const app = require("../src/app");

describe("API endpoints", () => {
  let testPostId;

  // Test for creating a new post
  test("POST /posts should create a new post", async () => {
    const newPost = { title: "New Test Title", content: "New test content" };
    const response = await request(app)
      .post("/posts")
      .send(newPost)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toEqual(newPost.title);
    expect(response.body.content).toEqual(newPost.content);
    testPostId = response.body.id; // Dynamically capture the post ID for use in subsequent tests
  });

  // Test for getting all posts
  test("GET /posts should return all posts", async () => {
    const response = await request(app)
      .get("/posts")
      .expect("Content-Type", /json/)
      .expect(200);

    // This test confirms the post created previously exists
    const postExists = response.body.some((post) => post.id === testPostId);
    expect(postExists).toBe(true);
  });

  // Test for updating an existing post
  test("PUT /posts/:id should update the post", async () => {
    const updatedPost = { title: "Updated Title", content: "Updated content" };
    await request(app)
      .put(`/posts/${testPostId}`)
      .send(updatedPost)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toEqual(testPostId);
        expect(response.body.title).toEqual(updatedPost.title);
        expect(response.body.content).toEqual(updatedPost.content);
      });
  });

  // Test for deleting an existing post
  test("DELETE /posts/:id should delete the post", async () => {
    await request(app)
      .delete(`/posts/${testPostId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ message: "Post deleted successfully" });
      });
  });
});
