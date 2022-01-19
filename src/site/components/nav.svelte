<script lang="ts">
	import { Menubar, MenuItem } from "$lib/components";
	import { LINKS } from "$site/util/constants";
	import Button from "./button.svelte";

	export let height = "5rem";
</script>

<nav style:height>
	<div class="nav-container">
		<a title="Homepage" href="/">
			<h1>svaria</h1>
		</a>

		<Menubar id="main-nav" label="Main Navigation">
			<MenuItem let:props>
				<Button href={LINKS.documentation} {...props}>Documentation</Button>
			</MenuItem>
		</Menubar>
	</div>
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

	h1 {
		margin: 0 !important;
		font-size: 3rem;
	}

	a {
		text-decoration: none;
	}

	.nav-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		max-width: 1920px;
		margin: 0 auto;
		padding: 0 1rem;
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
