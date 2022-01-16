interface IKeycomboOptions {
	/** Array of {@link KeyboardEvent.key} in the order you want them to be captured */
	sequence: string[];
	/** Callback to run after the sequence has completed */
	callback: () => void;
}

/**
 * Action to run a function after a sequence of keys has been entered in the correct order
 *
 * **Example usage:**
 * ```svelte
 * <script>
 *   const konamiCode = [
 *     "ArrowUp",
 *     "ArrowUp",
 *     "ArrowDown",
 *     "ArrowDown",
 *     "ArrowLeft",
 *     "ArrowRight",
 *     "ArrowLeft",
 *     "ArrowRight",
 *     "b",
 *     "a",
 *   ];
 * </script>
 *
 * <svelte:body use:keycombo={{ sequence: konamiCode, callback: () => alert("Konami code!") }} />
 * ```
 *
 * @param options Sequence of keys and callback to run after the sequence has been entered
 */
const keycombo = (node: HTMLElement, options: IKeycomboOptions): SvelteActionReturnType => {
	let pos = 0;

	function handleKeyDown(e: KeyboardEvent) {
		const requiredKey = options.sequence[pos];

		if (e.key === requiredKey) {
			pos++;

			if (pos === options.sequence.length) {
				options.callback();
				pos = 0;
			}
		} else {
			pos = 0;
		}
	}

	// add keydown event listener
	node.addEventListener("keydown", handleKeyDown);

	return {
		update: (newOptions: IKeycomboOptions) => {
			options = newOptions;
		},
		destroy: () => {
			node.removeEventListener("keydown", handleKeyDown);
		},
	};
};

export default keycombo;
