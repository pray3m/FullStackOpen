const loginWith = async (page, username, password) => {
  await page.fill('[data-testid="username"]', username);
  await page.fill('[data-testid="password"]', password);
  await page.getByRole("button", { name: "login" }).click();
  await page.waitForTimeout(2000);
};

const createBlog = async (page, blog) => {
  await page.getByRole("button", { name: "new blog" }).click();
  await page.getByPlaceholder("title").fill(blog.title);
  await page.getByPlaceholder("author").fill(blog.author);
  await page.getByPlaceholder("url").fill(blog.url);
  await page.getByRole("button", { name: "create" }).click();
};

export { loginWith, createBlog };
