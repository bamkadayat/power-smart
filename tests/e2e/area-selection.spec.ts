import { test, expect, type Page } from "@playwright/test";

const mockPricesEndpoint = async (page: Page) => {
  await page.route("**/api/prices*", async (route) => {
    const url = new URL(route.request().url());
    const area = url.searchParams.get("area") ?? "NO1";
    const date = url.searchParams.get("date") ?? "2026-05-20";

    const prices = Array.from({ length: 24 }, (_, hour) => ({
      NOK_per_kWh: 0.5 + hour * 0.05,
      EUR_per_kWh: 0.05,
      EXR: 10,
      time_start: `${date}T${String(hour).padStart(2, "0")}:00:00+02:00`,
      time_end: `${date}T${String((hour + 1) % 24).padStart(2, "0")}:00:00+02:00`,
    }));

    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ area, date, prices }),
    });
  });
};

const pickArea = async (page: Page, area: string) => {
  await page.getByRole("combobox", { name: "Your price area" }).click();
  await page.getByRole("option", { name: new RegExp(area) }).click();
};

test.describe("Area selection", () => {
  test.beforeEach(async ({ page }) => {
    await mockPricesEndpoint(page);
  });

  test("selecting NO5 shows today's prices, recommendations, and tomorrow", async ({
    page,
  }) => {
    await page.goto("/");

    await pickArea(page, "NO5");

    await expect(
      page.getByRole("heading", { level: 2, name: /NO5 · Bergen/ }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 2, name: "Run heavy loads here" }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 2, name: "Tomorrow" }),
    ).toBeVisible();
  });

  test("area persists across reload via localStorage", async ({ page }) => {
    await page.goto("/");

    await pickArea(page, "NO3");
    await expect(
      page.getByRole("heading", { level: 2, name: /NO3 · Trondheim/ }),
    ).toBeVisible();

    await page.reload();

    await expect(
      page.getByRole("heading", { level: 2, name: /NO3 · Trondheim/ }),
    ).toBeVisible();
  });

  test("area pill in header reflects the active selection", async ({ page }) => {
    await page.goto("/");

    await pickArea(page, "NO5");

    await expect(page.getByRole("link", { name: /NO5/ })).toBeVisible();
  });
});
