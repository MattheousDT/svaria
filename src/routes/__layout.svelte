<script lang="ts">
	import { shortcut } from "$lib/actions";
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

<svelte:body use:shortcut={globalShortcuts} />

<Nav bind:height={navHeight} />
<main style:padding-top={navHeight}>
	<slot />
</main>
<footer>Made with ❤ in Belfast</footer>
<Shortcuts />

<style lang="scss" global>
	@import "global";
	@import "variables";

	#svelte {
		background-color: $sand;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
	}

	footer {
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
