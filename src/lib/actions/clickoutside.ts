type IClickOutsideActionOptions = (target: EventTarget & HTMLElement) => void;

/**
 * Adds a click handler that only fires whenever the click is not the element passed in.
 *
 * @example
 * ```svelte
 * <script>
 *   let modalOpen = true;
 * </script>
 *
 * <div use:clickoutside={() => (modalOpen = false)}>
 *   <!-- ^ this element or it's children won't trigger the callback when clicked -->
 * </div>
 * ```
 *
 * @param callback - Callback with the clicked element passed that will run after a valid click has occurred
 */
const clickoutside = (node: HTMLElement, callback: IClickOutsideActionOptions): SvelteActionReturnType => {
	function handleClick(event: MouseEvent) {
		const target = event.target as EventTarget & HTMLElement;
		if (node && !node.contains(target) && !event.defaultPrevented) {
			callback(target);
		}
	}

	window.addEventListener("click", handleClick, true);

	return {
		update: (newCallback: IClickOutsideActionOptions) => {
			callback = newCallback;
		},
		destroy() {
			window.removeEventListener("click", handleClick, true);
		},
	};
};

export default clickoutside;
