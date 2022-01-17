<script lang="ts">
	import { shortcuts } from "$lib/actions";
	import type { IShortcut } from "$lib/stores/shortcuts";
	import Nav from "$site/components/nav.svelte";
	import Shortcuts from "$site/components/shortcuts.svelte";
	import { shortcutsVisibility } from "$site/stores/prefs";

	let navHeight: string;

	let globalShortcuts: IShortcut[] = [
		{
			name: "Toggle shortcuts",
			description: "Show/hide the shortcuts list",
			key: "/",
			callback: () => shortcutsVisibility.update((x) => (x = !x)),
		},
	];
</script>

<svelte:body use:shortcuts={globalShortcuts} />

<div id="app">
	<!-- <Nav bind:height={navHeight} /> -->
	<div>
		<slot />
	</div>

	<Shortcuts />
</div>

<style lang="scss" global>
	@import "global";
	@import "variables";

	#svelte {
		background-color: $sand;
		min-height: 100vh;
	}
</style>
