/// <reference types="vitest/config" />

import { getViteConfig } from "astro/config";
import { defineConfig } from "vitest/config";

// Use Astro's Vite config for Vitest so imports/aliases/plugins match.
export default defineConfig(
	getViteConfig({
		test: {
			environment: "jsdom",
			setupFiles: [],
			globals: true,
			include: ["**/*.{test,spec}.{js,ts,jsx,tsx}"],
			coverage: { enabled: false },
		},
	}),
);
