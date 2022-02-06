<script lang="ts">
	import { WindowSplitter } from "svaria";
	import IconClipboard from "~icons/uil/clipboard";
	import IconGripLines from "~icons/uil/grip-horizontal-line";
	import Button from "./button.svelte";

	export let value = 50;
	let container: HTMLDivElement;
	let code: HTMLDivElement;

	let copyToClipboard = async () => {
		await navigator.clipboard.writeText(code.innerText.slice("Copy to clipboard".length));
	};
</script>

<div class="example grid w-full h-lg my-10" bind:this={container} style:grid-template-columns="{value}% 1rem auto">
	<div
		id="code-pane"
		bind:this={code}
		class="rounded-lg shadow-card relative flex items-center justify-center overflow-auto"
	>
		<Button on:click={copyToClipboard} size="sm" theme="secondary" class="absolute top-4 right-4">
			<IconClipboard />
			Copy to clipboard
		</Button>
		<slot />
	</div>
	<WindowSplitter
		primaryPaneId="code-pane"
		label="Demo splitter"
		bind:value
		minValue={30}
		maxValue={70}
		containerEl={container}
	>
		<span class="flex h-full w-4 justify-center items-center">
			<IconGripLines class="transform rotate-90" />
		</span>
	</WindowSplitter>
	<div
		id="preview-pane"
		class="rounded-lg shadow-card relative flex items-center justify-center overflow-auto bg-white"
	>
		<slot name="preview" />
	</div>
</div>

<style lang="scss">
	.example {
		will-change: grid-template-columns;
		@media screen and (min-width: 1800px) {
			margin-left: -7.5rem;
			margin-right: -7.5rem;
			width: calc(100% + 15rem);
		}

		:global(.svaria__window-splitter) {
			display: flex;
			justify-content: center;
			width: 100%;
			height: 100%;
			cursor: col-resize;
		}
	}

	#code-pane {
		// font-size: 0.875rem;
		> :global(pre) {
			width: 100%;
			height: 100%;
			margin: 0;

			> :global(code) {
				height: 100%;
			}
		}
	}
</style>
