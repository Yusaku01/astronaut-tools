import { defineCollection } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";

// Use Starlight's official docs schema to ensure default fields (e.g. head) are set.
export const collections = {
	docs: defineCollection({ schema: docsSchema() }),
};
