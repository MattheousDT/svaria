<script lang="ts">
	import { WindowSplitter } from "svaria";
	import IconClipboard from "~icons/uil/clipboard-notes";
	import IconGripLines from "~icons/uil/grip-horizontal-line";
	import Button from "./button.svelte";
	import IconSvelte from "./icons/icon_svelte.svelte";

	export let value = 50;
	let container: HTMLDivElement;
	let code: HTMLDivElement;

	let copyToClipboard = async () => {
		await navigator.clipboard.writeText(code.innerText.slice("Copy to clipboard".length));
	};
</script>

<div
	class="example grid w-full h-full max-h-60vh mt-16"
	bind:this={container}
	style:grid-template-columns="{value}% 2rem auto"
>
	<div
		id="code-pane"
		bind:this={code}
		class="rounded-lg shadow-card relative flex items-center justify-center overflow-auto"
	>
		<slot />
	</div>
	<WindowSplitter
		primaryPaneId="code-pane"
		label="Demo splitter"
		bind:value
		minValue={30}
		maxValue={70}
		containerEl={container}
		class="text-grey focus:outline-none focus-visible:(bg-red text-white) rounded-lg"
	>
		<span class="flex h-full w-8 justify-center items-center">
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

<div class="flex justify-center mt-3 mb-16">
	<Button on:click={copyToClipboard} class="mr-4" theme="tertiary" let:iconClass>
		<IconClipboard class={iconClass} />
		Copy to clipboard
	</Button>
	<Button on:click={copyToClipboard} theme="tertiary" let:iconClass>
		<IconSvelte class={iconClass} />
		View in Svelte REPL
	</Button>
</div>

<style lang="scss">
	.example {
		will-change: grid-template-columns;
		grid-template-rows: 100%;

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
		> :global(.shiki) {
			width: 100%;
			height: 100%;
			margin: 0;
			border-radius: 0;

			> :global(code) {
				height: 100%;
			}
		}
	}

	#preview-pane > :global(span) {
		width: 100%;
		height: 100%;
		padding: 1rem;
	}
</style>
