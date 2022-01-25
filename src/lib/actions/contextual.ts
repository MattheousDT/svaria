import type { IShortcut } from "$lib/@types/shortcuts";
import shortcuts from "$lib/stores/shortcuts";

/**
 * Register events to the shortcut handler whenever the focus is within the scope of the element
 *
 * @example
 * ```svelte
 * <script>
 *   let videoShortcuts = [
 *     {
 *       name: "Skip ahead 10 seconds",
 *       key: "l",
 *       callback: () => skip(10),
 *     },
 *     {
 *       name: "Go back 10 seconds",
 *       key: "j",
 *       callback: () => prev(10),
 *     },
 *   ];
 * </script>
 *
 * <div use:contextual={{ id: "video-player", shortcuts: videoShortcuts }}>
 *   <!-- shortcuts will be registered when focus is within here -->
 * </div>
 * ```
 *
 * @param options An object that contains a unique identifier for the context and an array of shortcuts
 */
const contextualShortcuts = (
	node: HTMLElement,
	options: { id: string; shortcuts: IShortcut[] }
): SvelteActionReturnType => {
	function addShortcuts() {
		shortcuts.contextual.add(options.id, options.shortcuts);
	}

	function removeShortcuts() {
		shortcuts.contextual.remove(options.id);
	}

	node.addEventListener("focusin", addShortcuts);
	node.addEventListener("focusout", removeShortcuts);

	return {
		update: (newOptions: { id: string; shortcuts: IShortcut[] }) => {
			options = newOptions;
			removeShortcuts();
			addShortcuts();
		},
		destroy: () => {
			node.removeEventListener("focusin", addShortcuts);
			node.removeEventListener("focusout", removeShortcuts);
		},
	};
};

export default contextualShortcuts;
