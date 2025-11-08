import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// Astro + Starlight configuration
export default defineConfig({
	integrations: [
		starlight({
			title: "Astronaut Tools",
			description: "Astro向けのUIコンポーネントと開発ツール集",
			sidebar: [
				{ label: "Introduction", link: "/" },
				{ label: "Getting Started", link: "/getting-started/" },
			],
			// Optional: You can further customize Starlight here.
		}),
	],
});
