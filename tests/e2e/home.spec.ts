import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders the hero and area picker", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Find the cheapest electricity hours near you.",
    );
    await expect(page.getByLabel("Your price area")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /use my location|detecting/i }),
    ).toBeVisible();
  });

  test("shows the empty-state prompt when no area is selected", async ({
    page,
  }) => {
    await page.goto("/");

    // Geolocation is denied by default in fresh Playwright contexts, so the
    // auto-request resolves to "denied" and the manual prompt appears.
    await expect(
      page.getByText("Pick an area to see today's electricity prices."),
    ).toBeVisible({ timeout: 10_000 });
  });

  test("header shows PowerSmart logo and About link", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: /PowerSmart/ }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "About" })).toBeVisible();
  });
});
