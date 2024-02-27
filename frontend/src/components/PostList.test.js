import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostList from "./PostList";
import "@testing-library/jest-dom";

const mockPosts = [{ id: "1", title: "Test Post", content: "This is a test" }];
const mockDelete = jest.fn();
const mockEdit = jest.fn();

test("PostList allows post deletion", () => {
  render(
    <PostList
      posts={mockPosts}
      onDeletePost={mockDelete}
      onEditPost={mockEdit}
    />
  );
  fireEvent.click(screen.getByTestId(`delete-${mockPosts[0].id}`));
  expect(mockDelete).toHaveBeenCalledWith("1");
});

test("PostList allows post editing", () => {
  render(
    <PostList
      posts={mockPosts}
      onDeletePost={mockDelete}
      onEditPost={mockEdit}
    />
  );
  fireEvent.click(screen.getByText("Edit"));
  fireEvent.click(screen.getByText("Save"));
  expect(mockEdit).toHaveBeenCalled();
});
