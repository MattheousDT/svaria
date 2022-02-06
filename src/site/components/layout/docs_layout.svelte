<script lang="ts">
	import Sidebar from "../sidebar.svelte";
</script>

<div class="flex flex-1 relative">
	<Sidebar />
	<div class="mx-auto flex flex-1 justify-center py-12">
		<div class="w-full max-w-[1028px] px-5 lg:px-8 markdown">
			<slot />
		</div>
		<slot name="sidebar" />
	</div>
</div>
