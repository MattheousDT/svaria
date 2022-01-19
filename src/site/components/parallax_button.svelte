<script lang="ts">
	import { spring } from "svelte/motion";

	export let color: "lavendar" | "tan" | "apricot" | "rose";
	export let iconPosition: "left" | "right" = "left";

	let top = spring(0, {
		damping: 0.5,
		stiffness: 0.2,
	});
	let left = spring(0, {
		damping: 1,
	});

	function handleMouseMove(
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLElement;
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

{#if $$props.href}
	<a
		href={$$props.href}
		on:click
		on:mousemove={handleMouseMove}
		on:mouseleave={reset}
		class="offset offset--{color} icon-{iconPosition}"
		style="--left: {$left}px; --top: {$top}px"
		{...$$restProps}
	>
		<slot />
	</a>
{:else}
	<button
		on:click
		on:mousemove={handleMouseMove}
		on:mouseleave={reset}
		class="offset offset--{color} icon-{iconPosition}"
		style="--left: {$left}px; --top: {$top}px"
		{...$$restProps}
	>
		<slot />
	</button>
{/if}

<style lang="scss">
	@import "variables";

	button,
	a {
		padding: 0.875rem 2rem;
		font-family: $sans-primary;
		font-weight: 500;
		font-size: 1.25rem;
		color: $navy;
		display: inline-flex;
		border: 0;
		background: transparent;
		transform: translate(var(--left), var(--top));
		cursor: pointer;
		text-decoration: none;

		&::after {
			content: "";
			position: absolute;
			pointer-events: none;
			width: 100%;
			height: 100%;
			top: var(--top);
			left: var(--left);
			border: 2px solid $navy;
			transition: transform 150ms cubic-bezier(0, 0, 0.27, 2.54);
		}

		&:focus {
			outline: none;
		}

		&:active::after,
		&:focus-visible {
			transform: scale(95%);
		}

		> :global(svg) {
			width: 1.5em;
			height: 1.5em;
			margin-left: -0.5rem;
			margin-right: 0.75rem;
		}

		&.icon-right > :global(svg) {
			margin-right: -0.5rem;
			margin-left: 0.75rem;
		}
	}
</style>
