import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: "1", title: "Test Post", content: "This is a test" },
      ]),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

// Test if the App component correctly fetches and displays posts when it load
test("App loads and displays posts", async () => {
  render(<App />);
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  const postTitle = await screen.findByText("Test Post");
  expect(postTitle).toBeInTheDocument();
});
