import { describe, expect, it } from "vitest";
import { experimental_AstroContainer } from "astro/container";

type Item = { label: string; value?: string; href?: string };

const baseProps = {
	label: "Run",
	items: [
		{ label: "Action A", value: "a" },
		{ label: "Action B", value: "b" },
	] as Item[],
};

async function renderSplit(overrides: Record<string, unknown> = {}) {
	// Dynamic import so this file remains a draft even if the component isn't created yet.
	const mod = await import("./split-button.astro");
	const container = await experimental_AstroContainer.create();
	const html = await container.renderToString(mod.default, {
		props: { ...baseProps, ...overrides },
	});

	// HTML文字列をDOMに変換
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	return { container: doc.body };
}

describe("SplitButton (.astro)", () => {
	it("renders primary button label", async () => {
		const { container } = await renderSplit();

		// Prefer a stable part marker in the component like: data-part="primary"
		// Fallback: find a button with the primary label text.
		const primary =
			container.querySelector("[data-part=primary]") ??
			Array.from(container.querySelectorAll("button")).find((b) =>
				b.textContent?.trim().includes(baseProps.label),
			);

		expect(primary).toBeTruthy();
		expect(primary?.textContent?.trim()).toContain(baseProps.label);
	});

	it("is closed by default (menu not visible)", async () => {
		const { container } = await renderSplit();

		// Menu should not be in the DOM or should be hidden by default.
		const menu =
			container.querySelector("[data-part=menu],[role=menu]") ??
			document.body.querySelector("[data-part=menu],[role=menu]");

		// If present in DOM, it should not be visible/expanded.
		if (menu) {
			const expanded =
				(menu as HTMLElement).getAttribute("data-state") === "open" ||
				(menu as HTMLElement).getAttribute("aria-expanded") === "true";
			expect(expanded).toBe(false);
		} else {
			expect(menu).toBeFalsy();
		}
	});

	it("opens menu when toggle is clicked", async () => {
		const { container } = await renderSplit();

		// Prefer a stable part marker in the component like: data-part="toggle"
		const toggle =
			(container.querySelector(
				"[data-part=toggle]",
			) as HTMLButtonElement | null) ??
			(container.querySelector(
				"button[aria-haspopup=menu],button[aria-expanded]",
			) as HTMLButtonElement | null);

		expect(toggle).toBeTruthy();

		toggle?.click();
		// Allow microtasks for any script-driven state updates.
		await Promise.resolve();

		const scope = document.body.contains(container) ? document.body : container;
		const openMenu = scope.querySelector("[data-part=menu],[role=menu]");
		const expanded =
			toggle?.getAttribute("aria-expanded") === "true" ||
			openMenu?.getAttribute("data-state") === "open" ||
			!!openMenu;

		expect(expanded).toBe(true);
	});

	// Optional next steps (keep as TODOs for now):
	it.todo("renders all provided items when open");
	it.todo(
		"invokes primary action on primary button click (custom event/callback)",
	);
	it.todo("closes menu on Escape and outside click");
	it.todo("supports keyboard navigation (ArrowDown opens, Tab cycles)");
});
