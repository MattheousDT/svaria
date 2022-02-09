<script>
	import Button from "$site/components/button.svelte";
	import { Alert } from "svaria";

	let alertVisible = false;
</script>

<div>
	<Button on:click={() => (alertVisible = !alertVisible)}>Toggle alert</Button>

	{#if alertVisible}
		<Alert let:props>
			<h6 {...props}>Hej, hello, ciao, こんにちは, 안녕</h6>
		</Alert>
	{/if}
</div>

<style>
	div {
		text-align: center;
	}
</style>
