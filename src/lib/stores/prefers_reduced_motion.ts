import { readable } from "svelte/store";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const getInitialMotionPreference = () => {
	if (typeof window === "undefined") return false;
	return window.matchMedia(REDUCED_MOTION_QUERY).matches;
};

/**
 * Readable store that returns true/false dependant on user preferences.
 *
 * This can be used to turn off certain animations that could be motion-sick inducing for those who need it
 *
 * **Example usage:**
 * ```svelte
 * <div transition:fly={{ y: $prefersReducedMotion ? 0 : 20 }}>
 *   <!-- This div will only fade out now instead of flying for users who prefer reduced motion -->
 * </div>
 * ```
 */
const prefersReducedMotion = readable(getInitialMotionPreference(), (set) => {
	if (typeof window === "undefined") return;

	function setReducedMotion(event: MediaQueryListEvent) {
		set(event.matches);
	}

	const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
	mediaQueryList.addEventListener("change", setReducedMotion);

	return () => {
		mediaQueryList.removeEventListener("change", setReducedMotion);
	};
});

export default prefersReducedMotion;
