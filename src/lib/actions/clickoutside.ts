/**
 * Adds a click handler that only fires whenever the click is not the element passed in.
 *
 * **Example usage:**
 * ```svelte
 * <script>
 *   let modalOpen = true;
 * </script>
 *
 * <div use:clickoutside on:clickoutside={() => (modalOpen = false)} />
 *   <!-- ^ this element or it's children won't trigger the callback when clicked -->
 * </div>
 * ```
 *
 */
const clickoutside = (node: HTMLElement): SvelteActionReturnType => {
	function handleClick(event: MouseEvent) {
		const target = event.target as EventTarget & HTMLElement;
		if (node && !node.contains(target) && !event.defaultPrevented) {
			node.dispatchEvent(
				new CustomEvent("clickoutside", {
					detail: event.target,
				})
			);
		}
	}

	window.addEventListener("click", handleClick, true);

	return {
		destroy() {
			window.removeEventListener("click", handleClick, true);
		},
	};
};

export default clickoutside;
