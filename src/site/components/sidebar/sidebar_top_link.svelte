<script lang="ts">
	import { page } from "$app/stores";
	import Button from "$site/components/button.svelte";
	import clsx from "clsx";

	export let text: string;
	export let icon: any;
	export let link: string;
	export let color: string;

	$: selected = $page.url.pathname === link;
</script>

{#if selected}
	<span class="absolute -left-4 top-0 h-full w-1 bg-red" />
{/if}
<Button
	href={link}
	class={clsx("w-full text-left", selected && "text-red")}
	theme="tertiary"
	size="md"
	data-selected={selected}
	let:iconSizeClass
	let:iconPositionClass
>
	<div
		class={clsx(
			iconPositionClass,
			"rounded-lg w-8 h-8 flex items-center justify-center text-blue-900",
			`bg-${color}-300`
		)}
	>
		<svelte:component this={icon} class={clsx(iconSizeClass)} />
	</div>
	{text}
</Button>
