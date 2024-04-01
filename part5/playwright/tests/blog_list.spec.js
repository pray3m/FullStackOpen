const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Prem Gautam",
        username: "pray3m",
        password: "password",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const locator = page.getByTestId("login-form");
    await expect(locator).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Login to the Blogger" })
    ).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.fill('[data-testid="username"]', "pray3m");
      await page.fill('[data-testid="password"]', "password");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("Prem Gautam is logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.fill('[data-testid="username"]', "pray3m");
      await page.fill('[data-testid="password"]', "wrong");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("something went wrong")).toBeVisible();
    });
  });
});
