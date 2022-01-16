import { svariaShortcuts } from "$lib/stores/shortcuts";
import type { IShortcut } from "$lib/stores/shortcuts";
import { get } from "svelte/store";

/**
 * Global + contextual keyboard shortcut handler. This action should ideally be used at the highest level, e.g. `<svelte:body>`
 *
 * **Example usage:**
 * ```svelte
 * <script>
 *   let initialShortcuts = [
 *     {
 *       name: "Hello World!",
 *       description: "Alerts a greeting",
 *       key: "/",
 *       callback: () => alert("Hello World!"),
 *     },
 *   ];
 * </script>
 *
 * <svelte:body use:shortcuts={initialShortcuts} />
 * ```
 *
 * @param shortcuts An optional list of global shortcuts to add when initialised. This value can be updated at a later stage if required.
 */
const shortcuts = (node: HTMLElement, shortcuts?: IShortcut[]): SvelteActionReturnType => {
	function handleKeyDown(
		e: KeyboardEvent & {
			target: EventTarget & HTMLElement;
		}
	) {
		const store = get(svariaShortcuts);

		const match = Object.values(store)
			.flat()
			.find(
				(x) =>
					(typeof x.key === "string" ? x.key === e.key : x.key.indexOf(e.key) !== -1) &&
					!!x.ctrlKey === e.ctrlKey &&
					!!x.altKey === e.altKey &&
					!!x.metaKey === e.metaKey &&
					!!x.shiftKey === e.shiftKey
			);

		if (match) {
			e.preventDefault();
			match.callback(e);
		}
	}

	node.addEventListener("keydown", handleKeyDown);

	function addShortcuts() {
		svariaShortcuts.update((x) => ({
			...x,
			global: [...x.global, ...shortcuts.map((y) => ({ ...y, origin: node.id || node.localName }))],
		}));
	}

	function removeShortcuts() {
		svariaShortcuts.update((x) => ({
			...x,
			global: x.global.filter((y) => y.origin !== (node.id || node.localName)),
		}));
	}

	addShortcuts();

	return {
		update: (newShortcuts: IShortcut[]) => {
			removeShortcuts();
			if (newShortcuts) {
				shortcuts = newShortcuts;
				addShortcuts();
			}
		},
		destroy: () => {
			if (shortcuts) {
				removeShortcuts();
			}
			node.removeEventListener("keydown", handleKeyDown);
		},
	};
};

export default shortcuts;
