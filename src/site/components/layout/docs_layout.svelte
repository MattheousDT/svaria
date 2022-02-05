<script lang="ts">
	import Sidebar from "../sidebar.svelte";
</script>

<div class="docs">
	<Sidebar />
	<main class="container">
		<slot />
		<slot name="sidebar" />
	</main>
</div>

<style lang="scss">
	.docs {
		display: flex;
		position: relative;
	}
</style>
