import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewPostForm from "./NewPostForm";
import "@testing-library/jest-dom";

const mockSetPosts = jest.fn();

describe("NewPostForm", () => {
  test("submits with valid data", async () => {
    render(<NewPostForm setPosts={mockSetPosts} posts={[]} />);
    const titleInput = await screen.findByPlaceholderText("Title");
    const contentInput = await screen.findByPlaceholderText("Content");
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentInput, { target: { value: "Test Content" } });
    fireEvent.click(screen.getByText("Add Post"));
    await waitFor(() => expect(mockSetPosts).toHaveBeenCalled());
  });

  test("NewPostForm shows error with empty fields", () => {
    render(<NewPostForm setPosts={mockSetPosts} posts={[]} />);
    fireEvent.click(screen.getByText("Add Post"));
    expect(
      screen.getByText("Both title and content are required.")
    ).toBeInTheDocument();
  });
});
