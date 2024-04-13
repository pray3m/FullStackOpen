import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

// Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.

describe("Blog", () => {
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

  test("should display the blog's title and author", () => {
    render(<Blog blog={blog} user={blog.user} />);

    const title = screen.getByText(/test blog title/i);
    const author = screen.getByText(/test author/i);

    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();

    const urlElement = screen.queryByText(blog.url);
    const likesElement = screen.queryByText(/likes: \d+/i);
    expect(urlElement).toBeNull();
    expect(likesElement).toBeNull();
  });

  test("should display the blog's URL and number of likes when the view button is clicked", async () => {
    render(<Blog blog={blog} user={blog.user} />);

    const user = userEvent.setup();
    const viewButton = screen.getByRole("button", { name: /view/i });
    await user.click(viewButton);

    const urlElement = screen.getByRole("link");
    const likesElement = screen.getByText(/likes/i);
    expect(urlElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();
  });

  test("should call the event handler twice when the like button is clicked twice", async () => {
    const mockHandler = vi.fn();
    render(<Blog blog={blog} user={blog.user} updateLike={mockHandler} />);

    const viewButton = screen.getByRole("button", { name: /view/i });
    await userEvent.click(viewButton);

    const likeButton = screen.getByTestId("like-btn");
    await userEvent.click(likeButton);
    await userEvent.click(likeButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
