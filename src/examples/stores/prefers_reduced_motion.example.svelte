<script lang="ts">
	import { prefersReducedMotion } from "svaria";
	import { fly } from "svelte/transition";

	let visible = false;
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	Toggle visible
</label>

{#if visible}
	<p in:fly={{ y: $prefersReducedMotion ? 0 : 20 }}>
		{$prefersReducedMotion ? "Just fade in" : "Fly in!"}
	</p>
{/if}
