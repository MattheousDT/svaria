<script>
	import { clickoutside, keycombo } from "$lib/actions";
	import { Alert, Menubar, MenuItem } from "$lib/components";
	import WindowSplitterExample from "$site/components/examples/window_splitter_example.svelte";
	import ParallaxButton from "$site/components/parallax_button.svelte";

	const konamiCode = [
		"ArrowUp",
		"ArrowUp",
		"ArrowDown",
		"ArrowDown",
		"ArrowLeft",
		"ArrowRight",
		"ArrowLeft",
		"ArrowRight",
		"b",
		"a",
	];

	let alertVisible = false;
</script>

<svelte:body use:keycombo={{ sequence: konamiCode }} on:keycombo={() => alert("Konami code!")} />

<div class="container">
	<h1>Svaria Demo</h1>

	<p>Press <kbd>/</kbd> for contextual shortcuts</p>

	<h2>Components</h2>

	<h3>Alert</h3>
	<ParallaxButton color="rose" on:click={() => (alertVisible = !alertVisible)}>Toggle alert</ParallaxButton>
	{#if alertVisible}
		<Alert let:props>
			<h2 use:clickoutside on:clickoutside={(e) => console.log(e.detail)} {...props}>
				Hej, hello, ciao, こんにちは, 안녕
			</h2>
		</Alert>
	{/if}

	<h3>Menubar + MenuItem</h3>
	<Menubar id="main-nav" label="Main Navigation">
		<MenuItem let:props>
			<ParallaxButton {...props} color="lavendar" on:click={() => alert("Hello")}>Say Hello</ParallaxButton>
		</MenuItem>
		<MenuItem let:props>
			<ParallaxButton {...props} color="apricot" on:click={() => alert("Hola")}>Say Hola</ParallaxButton>
		</MenuItem>
		<MenuItem let:props>
			<ParallaxButton {...props} color="rose" on:click={() => alert("안녕")}>Say 안녕</ParallaxButton>
		</MenuItem>
	</Menubar>

	<h3>Window splitter</h3>
	<WindowSplitterExample />
</div>

<style lang="scss">
	@import "variables";
</style>
