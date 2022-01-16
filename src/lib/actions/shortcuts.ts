import { shortcutStore } from "$lib/stores/shortcuts";
import { get } from "svelte/store";

const shortcuts = (node: HTMLElement): SvelteActionReturnType => {
	function handleKeyDown(
		e: KeyboardEvent & {
			target: EventTarget & HTMLElement;
		}
	) {
		const store = get(shortcutStore);

		const match = store.contextual.find(
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

	return {
		destroy: () => {
			node.removeEventListener("keydown", handleKeyDown);
		},
	};
};

export default shortcuts;
