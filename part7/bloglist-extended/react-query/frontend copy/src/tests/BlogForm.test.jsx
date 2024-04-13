import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";

describe("Blog Form", () => {
  // Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is created.

  test("should call the event handler with the right details when a new blog is created", async () => {
    const mockCreateBlog = vi.fn();
    render(<BlogForm createBlog={mockCreateBlog} />);

    const userInputs = {
      title: screen.getByPlaceholderText(/title/i),
      author: screen.getByPlaceholderText(/author/i),
      url: screen.getByPlaceholderText(/url/i),
    };

    const newBlog = {
      title: "A new blog title",
      author: "Test Author",
      url: "http://example.com/new-blog",
    };

    await userEvent.type(userInputs.title, newBlog.title);
    await userEvent.type(userInputs.author, newBlog.author);
    await userEvent.type(userInputs.url, newBlog.url);

    const submitButton = screen.getByDisplayValue(/create/);
    await userEvent.click(submitButton);

    expect(mockCreateBlog).toHaveBeenCalledWith(newBlog);
  });
});
