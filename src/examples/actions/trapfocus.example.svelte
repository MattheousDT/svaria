<script lang="ts">
	import Button from "$site/components/button.svelte";
	import { trapfocus } from "svaria";
</script>

<Button theme="tertiary" class="w-full text-center mb-2">Outside button 1</Button>

<div class="my-5" use:trapfocus>
	<Button theme="tertiary" class="w-full text-center mb-2">Inside button 1</Button>
	<Button theme="tertiary" class="w-full text-center mb-2">Inside button 2</Button>
	<Button theme="tertiary" class="w-full text-center mb-2">Inside button 3</Button>
</div>

<Button theme="tertiary" class="w-full text-center mb-2">Outside button 2</Button>
