const request = require("supertest");
const app = require("../src/app");
const Post = require("../src/models/Post");

let postId;

describe("POST /posts", () => {
  it("should create a new post", async () => {
    const response = await request(app).post("/posts").send({
      id: "1",
      title: "Test Post",
      content: "This is a test post",
    });
    expect(response.status).toBe(201);
    expect(response.body.id).toBe("1");
    expect(response.body.title).toBe("Test Post");
    expect(response.body.content).toBe("This is a test post");
    postId = response.body.id;
  });
});

describe("GET /posts", () => {
  it("should get all posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});

describe("PUT /posts/:id", () => {
  it("should update an existing post", async () => {
    const response = await request(app).put(`/posts/${postId}`).send({
      title: "Updated Test Post",
      content: "This is an updated test post",
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Test Post");
    expect(response.body.content).toBe("This is an updated test post");
  });
});

describe("DELETE /posts/:id", () => {
  it("should delete a post", async () => {
    const response = await request(app).delete(`/posts/${postId}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe("Post deleted successfully");
  });
});
