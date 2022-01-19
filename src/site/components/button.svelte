<script lang="ts">
	// export let color: "lavendar" | "tan" | "apricot" | "rose";
	export let iconPosition: "left" | "right" = "left";
</script>

{#if $$props.href}
	<a href={$$props.href} on:click class="icon-{iconPosition}" {...$$restProps}>
		<slot />
	</a>
{:else}
	<button on:click class="icon-{iconPosition}" {...$$restProps}>
		<slot />
	</button>
{/if}

<style lang="scss">
	@import "variables";

	button,
	a {
		display: inline-flex;
		padding: 0.6875rem 1.25rem;
		border: 0;
		font-family: $sans-primary;
		font-weight: 700;
		font-size: 1rem;
		color: $sand;
		background: $navy;
		transform: translate(var(--left), var(--top));
		cursor: pointer;
		text-decoration: none;
		transition: transform 150ms cubic-bezier(0, 0, 0.27, 2.54), background 150ms ease;

		&:focus {
			outline: none;
		}

		&:hover {
			background: $navy-light;
		}

		&:active,
		&:focus-visible {
			transform: scale(95%);
			background: $navy-light;
		}

		> :global(svg) {
			width: 1.5em;
			height: 1.5em;
		}

		&.icon-left > :global(svg) {
			margin-right: 0.75rem;
		}

		&.icon-right > :global(svg) {
			margin-left: 0.75rem;
		}
	}
</style>
