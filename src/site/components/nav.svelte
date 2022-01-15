<script lang="ts">
	import { Menubar } from "svaria/components";

	export let height = "5rem";
</script>

<nav style:height>
	<Menubar id="main-nav" label="Main Navigation">
		<!--  -->
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
</style>
