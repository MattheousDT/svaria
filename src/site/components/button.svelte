<script lang="ts">
	import clsx from "clsx";

	export let iconPosition: "left" | "right" = "left";
	export let size: "sm" | "md" | "lg" = "md";
	export let theme: "primary" | "secondary" | "tertiary" = "primary";

	let baseButtonClasses =
		"inline-flex items-center rounded-lg border-2 focus:outline-none transition-colors font-semibold truncate";

	$: themeClasses =
		theme === "primary"
			? "border-transparent text-white bg-red"
			: theme === "secondary"
			? "border-red text-red bg-transparent"
			: "border-transparent text-grey bg-transparent hover:bg-grey-200";

	$: sizeClasses =
		size === "sm"
			? // Small
			  "py-1.5 px-3 font-bold text-sm"
			: size === "lg"
			? // Large
			  "py-4 px-5 font-bold"
			: // Regular
			  "py-3 px-4 font-bold text-sm";

	$: finalButtonClasses = clsx(baseButtonClasses, themeClasses, sizeClasses, $$props.class);

	$: iconSizeClass = size === "sm" ? "1rem" : size === "lg" ? "1.5rem" : "1.25rem";
	$: iconPositionClass = iconPosition === "left" ? "mr-2.5" : "ml-2.5";
	$: iconClass = clsx(iconSizeClass, iconPositionClass, "pointer-events-none");
</script>

{#if $$props.href}
	<a {...$$restProps} href={$$props.href} on:click class={finalButtonClasses}>
		<slot {iconClass} />
	</a>
{:else}
	<button {...$$restProps} on:click class={finalButtonClasses}>
		<slot {iconClass} {iconSizeClass} {iconPositionClass} />
	</button>
{/if}
