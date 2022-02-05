<script lang="ts">
	import { WindowSplitter } from "svaria";
	import IconClipboard from "~icons/la/clipboard";
	import IconGripLines from "~icons/la/grip-lines-vertical";
	import Button from "./button.svelte";

	let value = 50;
	let container: HTMLDivElement;
	let code: HTMLDivElement;

	let copyToClipboard = async () => {
		await navigator.clipboard.writeText(code.innerText.slice("Copy to clipboard".length));
	};
</script>

<div class="example" bind:this={container} style:grid-template-columns="{value}% 1rem auto">
	<div id="code-pane" bind:this={code}>
		<Button on:click={copyToClipboard} size="sm" theme="tertiary">
			<IconClipboard />
			Copy to clipboard
		</Button>
		<slot />
	</div>
	<WindowSplitter
		primaryPaneId="code-pane"
		label="Demo splitter"
		bind:value
		minValue={33}
		maxValue={66}
		containerEl={container}
	>
		<span class="line">
			<IconGripLines />
		</span>
	</WindowSplitter>
	<div id="preview-pane">
		<slot name="preview" />
	</div>
</div>

<style lang="scss">
	@import "./variables";

	.example {
		display: grid;
		width: 100%;
		height: 30rem;
		overflow: hidden;
		border: 2px solid $navy;
		margin: 2.5rem 0;

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

	.line {
		display: flex;
		height: 100%;
		width: 1rem;
		background: $apricot;
		justify-content: center;
		align-items: center;
		color: $navy;
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

		:global(button) {
			position: absolute;
			top: 1rem;
			right: 1rem;
		}
	}

	#preview-pane {
		background: white;
	}

	#preview-pane,
	#code-pane {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: auto;
	}
</style>
