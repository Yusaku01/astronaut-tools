import { describe, expect, it } from "vitest";
import { experimental_AstroContainer } from "astro/container";

const baseProps = {
	title: "Card Title",
	variant: "elevated" as const,
	tone: "neutral" as const,
};

async function renderCard(overrides: Record<string, unknown> = {}) {
	const mod = await import("./card.astro");
	const container = await experimental_AstroContainer.create();
	const html = await container.renderToString(mod.default, {
		props: { ...baseProps, ...overrides },
	});

	// HTML文字列をDOMに変換
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	return { container: doc.body };
}

describe("Card (.astro)", () => {
	it("renders default article wrapper and classes", async () => {
		const { container } = await renderCard();

		const root = container.querySelector(".ui-card") as HTMLElement | null;
		expect(root).toBeTruthy();
		expect(root?.tagName).toBe("ARTICLE");
		expect(root?.className).toContain("ui-card--elevated");
		expect(root?.className).toContain("ui-card--tone");
		expect(root?.className).toContain("ui-card--tone-neutral");

		const titleEl = container.querySelector(".ui-card__title");
		expect(titleEl?.textContent?.trim()).toBe(baseProps.title);
	});

	it("renders as anchor when href is provided", async () => {
		const href = "/docs/example";
		const { container } = await renderCard({ href });

		const root = container.querySelector(".ui-card") as HTMLElement | null;
		expect(root).toBeTruthy();
		expect(root?.tagName).toBe("A");
		expect((root as HTMLAnchorElement).getAttribute("href")).toBe(href);
		// aria-label mirrors title when provided
		expect(root?.getAttribute("aria-label")).toBe(baseProps.title);
	});

	it("respects `as` when not a link", async () => {
		const { container } = await renderCard({ as: "section", href: undefined });

		const root = container.querySelector(".ui-card") as HTMLElement | null;
		expect(root).toBeTruthy();
		expect(root?.tagName).toBe("SECTION");
	});
});
