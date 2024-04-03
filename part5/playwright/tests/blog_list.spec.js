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

    const blog = {
      title: "created by playwright",
      author: "test author",
      url: "test-url",
    };

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, blog);

      await expect(
        page.getByText("created by playwright - test")
      ).toBeVisible();
    });
  });
});
