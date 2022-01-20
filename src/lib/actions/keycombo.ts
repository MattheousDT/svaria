interface IKeycomboOptions {
	/** Array of {@link KeyboardEvent.key} in the order you want them to be captured */
	sequence: string[];
}

/**
 * Action to run a function after a sequence of keys has been entered in the correct order
 *
 * @example
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
 * <svelte:body use:keycombo={{ sequence: konamiCode }} on:keycombo={() => alert("Konami code!")} />
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
				node.dispatchEvent(new CustomEvent("keycombo"));
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
