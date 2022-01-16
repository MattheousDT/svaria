<script lang="ts">
	import { shortcuts } from "$lib/actions";
	import Nav from "$site/components/nav.svelte";
	import Shortcuts from "$site/components/shortcuts.svelte";

	let navHeight: string;
</script>

<svelte:body use:shortcuts />

<div id="app">
	<Nav bind:height={navHeight} />
	<div style:padding-top={navHeight}>
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
