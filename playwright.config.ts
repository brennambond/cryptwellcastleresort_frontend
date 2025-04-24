import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e", // ✅ Ensures it only runs files in /e2e
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  reporter: [["list"], ["html", { outputFolder: "playwright-report" }]],
});
