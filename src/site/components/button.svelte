<script lang="ts">
	import { spring } from "svelte/motion";

	export let color: "lavendar" | "tan" | "apricot" | "rose";

	let top = spring(0, {
		damping: 0.5,
		stiffness: 0.2,
	});
	let left = spring(0, {
		damping: 1,
	});

	function handleMouseMove(
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;

		top.set(y / 8);
		left.set(x / 8);
	}

	function reset() {
		top.set(0);
		left.set(0);
	}
</script>

<button
	on:mousemove={handleMouseMove}
	on:mouseleave={reset}
	class="offset offset--{color}"
	style="--left: {$left}px; --top: {$top}px"
>
	<slot />
</button>

<style lang="scss">
	@import "variables";

	button {
		padding: 0.875rem 2rem;
		font-family: "Space Grotesk", sans-serif;
		font-weight: 500;
		font-size: 1.25rem;
		color: $navy;
		display: inline-flex;
		border: 0;
		margin: 1rem;
		background: transparent;
		transform: translate(var(--left), var(--top));
		cursor: pointer;

		&::after {
			content: "";
			position: absolute;
			pointer-events: none;
			width: 100%;
			height: 100%;
			top: var(--top);
			left: var(--left);
			border: 2px solid $navy;
			transition: transform 250ms ease;
		}

		&:focus {
			outline: none;
		}

		&:active::after,
		&:focus-visible {
			transform: scale(95%);
		}
	}
</style>
