<script>
	import { clickoutside, keycombo } from "$lib/actions";

	import { Alert, Menubar, MenuItem } from "$lib/components";
	import Button from "$site/components/button.svelte";

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
	<Button color="rose" on:click={() => (alertVisible = !alertVisible)}>Toggle alert</Button>
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
			<Button {...props} color="lavendar" on:click={() => alert("Hello")}>Say Hello</Button>
		</MenuItem>
		<MenuItem let:props>
			<Button {...props} color="apricot" on:click={() => alert("Hola")}>Say Hola</Button>
		</MenuItem>
		<MenuItem let:props>
			<Button {...props} color="rose" on:click={() => alert("안녕")}>Say 안녕</Button>
		</MenuItem>
	</Menubar>
</div>

<style lang="scss">
	@import "variables";
</style>
