<script lang="ts">
	export let iconPosition: "left" | "right" | "both" = "left";
	export let size: "sm" | "md" | "lg" = "md";
	export let theme: "primary" | "secondary" | "tertiary" = "primary";
</script>

{#if $$props.href}
	<a href={$$props.href} on:click class="icon-{iconPosition} size-{size} theme-{theme}" {...$$restProps}>
		<slot />
	</a>
{:else}
	<button on:click class="icon-{iconPosition} size-{size} theme-{theme}" {...$$restProps}>
		<slot />
	</button>
{/if}

<style lang="scss">
	@import "variables";

	button,
	a {
		display: inline-flex;
		border: 2px solid transparent;
		font-family: $sans-primary;
		transform: translate(var(--left), var(--top));
		cursor: pointer;
		text-decoration: none;
		transition: transform 150ms cubic-bezier(0, 0, 0.27, 2.54), background 150ms ease;

		&.size {
			&-sm {
				padding: 0.5rem 0.75rem;
				font-weight: 500;
				font-size: 0.875rem;
			}
			&-md {
				padding: 0.6875rem 1.25rem;
				font-weight: 700;
				font-size: 1rem;
			}
			&-lg {
			}
		}

		&.theme {
			&-primary {
				color: $sand;
				background: $navy;

				&:hover {
					background: $navy-light;
				}

				&:active,
				&:focus-visible {
					background: $navy-light;
				}
			}
			&-secondary {
				background: transparent;
				color: $navy;
				border-color: $navy;

				&:hover {
					background: rgba($navy, 0.1);
				}

				&:active,
				&:focus-visible {
					background: rgba($navy, 0.1);
				}
			}
			&-tertiary {
				background: transparent;
				color: $sand;
				border-color: $sand;
				&:hover {
					background: rgba(white, 0.2);
				}

				&:active,
				&:focus-visible {
					background: rgba(white, 0.2);
				}
			}
		}

		&:focus {
			outline: none;
		}

		&:active,
		&:focus-visible {
			transform: scale(95%);
		}

		> :global(svg) {
			width: 1.5em;
			height: 1.5em;
		}

		&.icon-left > :global(svg),
		&.icon-both > :global(svg:first-of-type) {
			margin-right: 0.75rem;
		}

		&.icon-right > :global(svg),
		&.icon-both > :global(svg:last-of-type) {
			margin-left: 0.75rem;
		}
	}
</style>
