<script lang="ts">
	import { Menubar, MenuItem } from "$lib/components";
	import Button from "./button.svelte";

	export let height = "5rem";
</script>

<nav style:height>
	<Menubar id="main-nav" label="Main Navigation">
		<!-- <MenuItem let:props>
			<Button color="lavendar" on:click={() => console.log("bruh")} {...props}>Test</Button>
		</MenuItem>
		<MenuItem let:props>
			<Button color="apricot" on:click={() => console.log("bruh2")} {...props}>Test</Button>
		</MenuItem>
		<MenuItem let:props>
			<Button color="rose" on:click={() => console.log("bruh3")} {...props}>Test</Button>
		</MenuItem> -->
	</Menubar>
</nav>

<style lang="scss">
	@import "variables";

	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		border-bottom: 2px solid $navy;
		background-color: $sand;
		z-index: 100;
	}

	:global(.svaria__menubar) {
		display: flex;
		align-items: center;
		height: 100%;
	}

	:global(.svaria__menuitem) {
		&:not(:last-child) {
			margin-right: 1rem;
		}
	}
</style>
