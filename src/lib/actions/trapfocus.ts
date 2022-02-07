const trapfocus = (node: HTMLElement): SvelteActionReturnType => {
	const focusableEls: NodeListOf<HTMLElement> = node.querySelectorAll(
		'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex="0"]'
	);
	const firstFocusableEl = focusableEls[0];
	const lastFocusableEl = focusableEls[focusableEls.length - 1];

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key !== "Tab") {
			return;
		}

		if (e.shiftKey) {
			if (document.activeElement === firstFocusableEl) {
				lastFocusableEl.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastFocusableEl) {
				firstFocusableEl.focus();
				e.preventDefault();
			}
		}
	};

	node.addEventListener("keydown", handleKeyDown);

	return {
		destroy: () => {
			node.removeEventListener("keydown", handleKeyDown);
		},
	};
};

export default trapfocus;
