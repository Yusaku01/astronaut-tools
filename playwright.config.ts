import { defineConfig, devices } from "@playwright/test";

// Run E2E tests against Astro's preview server for production-like behavior.
// Build first: `pnpm build`, then run: `pnpm test:e2e`.
export default defineConfig({
	testDir: "tests",
	reporter: [["list"]],
	use: {
		baseURL: "http://localhost:4321/",
		trace: "on-first-retry",
	},
	projects: [
		{ name: "chromium", use: { ...devices["Desktop Chrome"] } },
		{ name: "firefox", use: { ...devices["Desktop Firefox"] } },
		{ name: "webkit", use: { ...devices["Desktop Safari"] } },
	],
	webServer: {
		command: "pnpm preview",
		url: "http://localhost:4321/",
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
});
