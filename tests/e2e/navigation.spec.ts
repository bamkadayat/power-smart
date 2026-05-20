import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("About link routes to /about with the expected content", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "About" }).click();

    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Find the cheapest electricity hours in Norway.",
    );
    await expect(page.getByRole("heading", { name: "Privacy" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "About the prices" }),
    ).toBeVisible();
  });

  test("unknown URL renders the branded 404 page", async ({ page }) => {
    const response = await page.goto("/this-does-not-exist");

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Back to PowerSmart" }).click();
    await expect(page).toHaveURL("/");
  });

  test("skip-to-content link is the first Tab target", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to main content" }),
    ).toBeFocused();
  });
});
