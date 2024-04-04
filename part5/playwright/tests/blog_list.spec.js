const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog, ensureLoggedIn } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Prem Gautam",
        username: "pray3m",
        password: "password",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await page.goto("/");

    const locator = page.getByTestId("login-form");
    await expect(locator).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Login to the Blogger" })
    ).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "pray3m", "password");
      await expect(page.getByText("Prem Gautam is logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.fill('[data-testid="username"]', "pray3m");
      await page.fill('[data-testid="password"]', "wrong");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("something went wrong")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "pray3m", "password");
    });

    test("a new blog can be created", async ({ page }) => {
      const blog = {
        title: "created by playwright",
        author: "test author",
        url: "test-url",
      };
      await createBlog(page, blog);

      await expect(
        page.getByText("created by playwright - test")
      ).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      const blog = {
        title: "new blog",
        author: "test author",
        url: "test-url",
      };
      await createBlog(page, blog);

      await page.getByRole("button", { name: "view" }).click();
      await page.getByTestId("like-btn").click();
      await expect(page.getByText("Likes : 1")).toBeVisible();
    });

    test("a blog can be deleted by the user who added it", async ({ page }) => {
      const blog = {
        title: "new blog",
        author: "test author",
        url: "test-url",
      };

      await createBlog(page, blog);
      await page.getByRole("button", { name: "view" }).click();

      await page.on("dialog", async (dialog) => {
        expect(dialog.message()).toContain(
          "Remove blog new blog by test author"
        );
        await dialog.accept();
      });
      await page.getByRole("button", { name: "remove" }).click();

      await expect(page.getByText("new blog - test")).not.toBeVisible();
    });

    // Make a test that ensures that only the user who added the blog sees the blog's delete button.
    test("only the user who added the blog can delete it", async ({
      page,
      request,
    }) => {
      await request.post("/api/users", {
        data: {
          name: "Another user",
          username: "newuser",
          password: "sekret",
        },
      });

      const blog = {
        title: "new blog",
        author: "test author",
        url: "test-url",
      };

      await createBlog(page, blog);
      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();

      await page.click("button:has-text('logout')");

      await loginWith(page, "newuser", "sekret");
      await page.getByRole("button", { name: "view" }).click();

      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible();
    });

    // Do a test that ensures that the blogs are arranged in the order according to the likes, the blog with the most likes first.
    test.only("blogs are arranged in the order according to the likes", async ({
      page,
      request,
    }) => {
      const blogs = [
        { title: "Blog 1", author: "Author 1", url: "url1", likes: 5 },
        { title: "Blog 2", author: "Author 2", url: "url2", likes: 15 },
        { title: "Blog 3", author: "Author 3", url: "url3", likes: 10 },
      ];

      const token = await page
        .evaluate(() => localStorage.getItem("loggedUser"))
        .then((userString) => userString && JSON.parse(userString).token);

      for (const blog of blogs) {
        await request.post("/api/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: blog,
        });
      }

      await page.reload();
      await page.waitForTimeout(3000);

      const blogTitles = await page.evaluate(() =>
        Array.from(document.querySelectorAll("#blog-title")).map((el) => {
          const titleText = el.textContent.trim();
          return titleText.split(" - ")[0] || titleText; // handle titles with/without author info
        })
      );

      expect(blogTitles.length).toBe(blogs.length);

      const sortedBlogTitles = blogs
        .sort((a, b) => b.likes - a.likes)
        .map((b) => b.title);
      expect(blogTitles).toEqual(sortedBlogTitles);
    });
  });
});
