<script lang="ts">
	import { Modal } from "svaria";
	import Button from "../button.svelte";

	let visible = false;
</script>

<Button id="demo-modal-trigger" on:click={() => (visible = true)}>Open modal</Button>

{#if visible}
	<div class="fixed h-screen w-full top-0 left-0 bg-blue-900 bg-opacity-50 z-50 flex items-center justify-center px-4">
		<Modal
			id="demo-modal"
			labelId="demo-modal-title"
			descriptionId="demo-modal-description"
			focusOnOpenId="demo-modal-title"
			focusOnCloseId="demo-modal-trigger"
			on:close={() => (visible = false)}
			class="bg-white rounded-xl w-full max-w-md p-8"
		>
			<h1 id="demo-modal-title" tabindex="0">Epic modal</h1>
			<p id="demo-modal-description">Wow! Modals! So cool! 😎</p>
		</Modal>
	</div>
{/if}
