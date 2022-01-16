import type { IShortcut } from "$lib/stores/shortcuts";
import { shortcutStore } from "$lib/stores/shortcuts";

const contextualShortcuts = (
	node: HTMLElement,
	options: { id: string; shortcuts: IShortcut[] }
): SvelteActionReturnType => {
	function focusIn() {
		shortcutStore.update((x) => ({
			...x,
			contextual: [...x.contextual, ...options.shortcuts.map((y) => ({ ...y, origin: options.id }))],
		}));
	}

	function focusOut() {
		shortcutStore.update((x) => ({
			...x,
			contextual: x.contextual.filter((y) => y.origin !== options.id),
		}));
	}

	node.addEventListener("focusin", focusIn);
	node.addEventListener("focusout", focusOut);

	return {
		destroy: () => {
			node.removeEventListener("focusin", focusIn);
			node.removeEventListener("focusout", focusOut);
		},
	};
};

export default contextualShortcuts;
