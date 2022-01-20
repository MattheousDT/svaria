import { IShortcut, shortcuts } from "$lib/stores/shortcuts";
import { get } from "svelte/store";

/**
 * Global + contextual keyboard shortcut handler. This action should ideally be used at the highest level, e.g. `<svelte:body>`
 *
 * @example
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
 * <svelte:body use:shortcut={initialShortcuts} />
 * ```
 *
 * @param globalShortcuts An optional list of global shortcuts to add when initialised.
 * This value can be updated at a later stage if required or programatically updated using the shortcuts store.
 */
const shortcut = (node: HTMLElement, globalShortcuts?: IShortcut[]): SvelteActionReturnType => {
	function handleKeyDown(
		e: KeyboardEvent & {
			target: EventTarget & HTMLElement;
		}
	) {
		const store = get(shortcuts);

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
		shortcuts.global.add(globalShortcuts.map((y) => ({ ...y, origin: node.id || node.localName })));
	}

	function removeShortcuts() {
		shortcuts.global.remove(node.id || node.localName);
	}

	addShortcuts();

	return {
		update: (newShortcuts: IShortcut[]) => {
			removeShortcuts();
			if (newShortcuts) {
				globalShortcuts = newShortcuts;
				addShortcuts();
			}
		},
		destroy: () => {
			if (globalShortcuts) {
				removeShortcuts();
			}
			node.removeEventListener("keydown", handleKeyDown);
		},
	};
};

export default shortcut;
