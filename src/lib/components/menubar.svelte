<script lang="ts">
	import contextual from "$lib/actions/contextual";
	import type { IShortcut } from "$lib/stores/shortcuts";

	export let id: string;
	export let label: string;

	let shortcuts: IShortcut[] = [
		{
			name: "Select item / Open submenu",
			key: [" ", "Enter"],
			callback: () => alert("Select/Open"),
		},
	];
</script>

<ul
	{id}
	aria-label={label}
	role="menubar"
	use:contextual={{
		id: "svaria-menubar",
		shortcuts,
	}}
	{...$$restProps}
>
	<slot />
</ul>
