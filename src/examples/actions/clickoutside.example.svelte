<script lang="ts">
	import { clickoutside } from "svaria";

	let text: string;
</script>

<div class="w-full h-full flex items-center justify-center">
	<div
		class="py-4 px-6 rounded-xl bg-red-100"
		on:click={() => (text = "Clicked inside!")}
		use:clickoutside={() => (text = "Clicked outside!")}
	>
		{text ?? "Waiting for clicks..."}
	</div>
</div>
