<script>
	import { contextual } from "$lib/actions";
	import { shortcutStore } from "$lib/stores";
	import Button from "$site/components/Button.svelte";
</script>

<div
	use:contextual={{
		id: "main",
		shortcuts: [
			{
				key: " ",
				ctrlKey: true,
				name: "Alert",
				description: "Alerts ahhh",
				callback: () => alert("ahhh"),
			},
		],
	}}
	class="container"
>
	<h1>Don’t worry about accessibility ever again</h1>

	<Button color="lavendar">lavendar</Button>
	<Button color="rose">rose</Button>
	<Button color="apricot">apricot</Button>
	<Button color="tan">tan</Button>

	<pre>
		{JSON.stringify($shortcutStore, null, 2)}
	</pre>
</div>

<style lang="scss">
	@import "variables";
</style>
