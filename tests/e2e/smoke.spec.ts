import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    (window as typeof window & { __KHOPHISNOW_E2E__?: boolean }).__KHOPHISNOW_E2E__ = true;
  });
});

const routes = [
  { path: "/", marker: /KhophiSnow|systems like a developer|WaskiZone/i },
  { path: "/waskizone", marker: /Practical software|WaskiZone/i },
  { path: "/writeups", marker: /Writeups|Search index/i },
  { path: "/security-notes", marker: /Security notes|sample findings/i },
  { path: "/case-files/edumanage", marker: /EduManage|Architecture/i },
  { path: "/truth-or-dare", marker: /DareDeck|Start game/i },
  { path: "/waskizone/services/backend-api-engineering", marker: /Backend API Engineering|Request this service/i },
  { path: "/waskizone/contact", marker: /Proposal intake|Start with intent/i },
  { path: "/waskizone/policy", marker: /Authorized security|Security policy/i },
];

async function waitForLoaders(page: import("@playwright/test").Page) {
  await page.locator("[data-testid=portfolio-loader], [data-testid=atmosphere-loader]").evaluateAll((elements) => {
    for (const element of elements) {
      (element as HTMLElement).style.display = "none";
      (element as HTMLElement).style.visibility = "hidden";
      element.setAttribute("data-e2e-hidden", "true");
    }
  });
  await expect.poll(async () => page.locator("[data-testid=portfolio-loader], [data-testid=atmosphere-loader]").evaluateAll((elements) => elements.filter((element) => {
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" && rect.width > 1 && rect.height > 1;
  }).length), { timeout: 9_000 }).toBe(0);
}

async function expectNoVisibleHorizontalOverflow(page: import("@playwright/test").Page) {
  const offenders = await page.evaluate(() => {
    const zoom = Number.parseFloat(window.getComputedStyle(document.body).zoom || "1") || 1;
    const allowedRight = window.innerWidth / zoom;
    return Array.from(document.body.querySelectorAll<HTMLElement>("*"))
      .filter((element) => {
        const style = window.getComputedStyle(element);
        if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) return false;
        if (element.closest("[data-testid=portfolio-loader], [data-testid=atmosphere-loader]")) return false;
        if (element.closest(".overflow-x-auto, .snap-x")) return false;
        if (["fixed", "absolute"].includes(style.position) && !element.matches("main, section, header, footer, article")) return false;
        const rect = element.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) return false;
        return rect.left < -4 || rect.right > allowedRight + 4;
      })
      .slice(0, 5)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}.${Array.from(element.classList).slice(0, 4).join(".")} left=${Math.round(rect.left)} right=${Math.round(rect.right)} allowed=${Math.round(allowedRight)}`;
      });
  });
  expect(offenders, "visible elements should stay inside the compensated zoom viewport").toEqual([]);
}

test.describe("public routes", () => {
  for (const route of routes) {
    test(`${route.path} renders cleanly`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "domcontentloaded" });
      await waitForLoaders(page);
      await expect(page.locator("body")).toContainText(route.marker);
      await expect(page.locator("main")).toBeVisible();
      await expectNoVisibleHorizontalOverflow(page);
    });
  }
});

test("writeup library search filters results and keeps navigation source", async ({ page }) => {
  await page.goto("/writeups", { waitUntil: "domcontentloaded" });
  await waitForLoaders(page);
  await page.getByPlaceholder("Search writeups, tags, topics").fill("RBAC");
  const firstWriteup = page.locator('a[href*="/writeups/"]').first();
  await expect(firstWriteup).toBeVisible();
  await expect(firstWriteup).toHaveAttribute("href", /from=library/);
  await page.goto(await firstWriteup.getAttribute("href") || "");
  await expect(page.getByRole("link", { name: /back to writeup library/i })).toBeVisible();
});

test("home writeup links preserve homepage return source", async ({ page }) => {
  await page.goto("/#writeups", { waitUntil: "domcontentloaded" });
  await waitForLoaders(page);
  const homeWriteup = page.locator('a[href*="/writeups/"][href*="from=home"]').first();
  await expect(homeWriteup).toBeVisible();
  const href = await homeWriteup.getAttribute("href");
  expect(href).toMatch(/from=home/);
  await page.goto(href || "", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("link", { name: /back to homepage writeups/i })).toBeVisible();
});

test("WaskiZone configurator links back to the configurator source", async ({ page }) => {
  await page.goto("/waskizone#configure", { waitUntil: "domcontentloaded" });
  await waitForLoaders(page);
  await page.getByRole("button", { name: /API/i }).click();
  const readService = page.getByRole("link", { name: /read service/i });
  await expect(readService).toHaveAttribute("href", /from=configure/);
  await readService.click();
  await expect(page.getByRole("link", { name: /back to service configurator/i })).toBeVisible();
});

test("proposal intake offers mail-ready inquiry paths", async ({ page }) => {
  await page.goto("/waskizone/contact", { waitUntil: "domcontentloaded" });
  await waitForLoaders(page);
  await expect(page.getByRole("link", { name: /website/i })).toHaveAttribute("href", /^mailto:/);
  await expect(page.getByRole("link", { name: /security review/i })).toHaveAttribute("href", /^mailto:/);
});


test("DareDeck starts a local game session", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.removeItem("khophi-truth-or-dare:v1");
  });
  await page.goto("/truth-or-dare?stage=setup", { waitUntil: "domcontentloaded" });
  await expect(page.getByText(/Set up the session/i)).toBeVisible();
  await expect(page.getByTestId("truth-dare-app")).toHaveAttribute("data-hydrated", "true");
  await page.getByTestId("truth-dare-start-session").click();
  await expect(page.getByText(/Current turn/i)).toBeVisible();
  await page.getByTestId("truth-dare-draw-question").click();
  await expect(page.getByRole("button", { name: /Completed/i })).toBeVisible();
});


test("DareDeck lets the group fail a truth and deducts points", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.removeItem("khophi-truth-or-dare:v1");
  });
  await page.goto("/truth-or-dare?stage=setup", { waitUntil: "domcontentloaded" });
  await page.getByTestId("truth-dare-start-session").click();
  await page.getByRole("button", { name: /^Truth$/ }).click();
  await expect(page.getByText(/Result decided by the group/i)).toBeVisible();
  await page.getByRole("button", { name: /^Failed$/ }).click();
  await expect(page.getByText(/KhophiSnow -5/i)).toBeVisible();
});
