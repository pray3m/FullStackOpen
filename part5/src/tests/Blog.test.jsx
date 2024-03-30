import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

// Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.

describe("Blog component", () => {
  const blog = {
    title: "Test Blog Title",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 10,
    user: {
      name: "Test User",
      username: "testuser",
    },
  };

  beforeEach(() => {
    render(<Blog blog={blog} user={blog.user} />);
  });

  test("should display the blog's title and author", () => {
    const title = screen.getByText(/test blog title/i);
    const author = screen.getByText(/test author/i);

    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();

    const urlElement = screen.queryByText(blog.url);
    const likesElement = screen.queryByText(/likes: \d+/i);
    expect(urlElement).toBeNull();
    expect(likesElement).toBeNull();
  });
});
