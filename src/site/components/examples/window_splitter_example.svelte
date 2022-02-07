<script lang="ts">
	import { WindowSplitter } from "svaria";
	import IconGripLines from "~icons/uil/grip-horizontal-line";

	let container: HTMLDivElement;
	let value = 50;
	let minValue = 20;
	let maxValue = 80;
</script>

<table>
	<td>
		<label>
			Current ({value.toFixed(0)}%)
			<input type="range" min={minValue} max={maxValue} bind:value />
		</label>
	</td>
	<td>
		<label>
			Min value ({minValue.toFixed(0)}%)
			<input type="range" min={0} max={100} bind:value={minValue} />
		</label>
	</td>
	<td>
		<label>
			max value ({maxValue.toFixed(0)}%)
			<input type="range" min={0} max={100} bind:value={maxValue} />
		</label>
	</td>
</table>

<div class="example grid w-full h-lg my-10" bind:this={container} style:grid-template-columns="{value}% 1rem auto">
	<div
		id="example-primary-pane"
		class="rounded-lg shadow-card relative flex items-center justify-center overflow-auto bg-red-200"
	>
		<h2>Primary content</h2>
	</div>
	<WindowSplitter
		primaryPaneId="example-primary-pane"
		label="Demo splitter"
		bind:value
		{minValue}
		{maxValue}
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
		<h2>Secondary content</h2>
	</div>
</div>

<style lang="scss">
	.example {
		will-change: grid-template-columns;

		:global(.svaria__window-splitter) {
			display: flex;
			justify-content: center;
			width: 100%;
			height: 100%;
			cursor: col-resize;
		}
	}

	#example-primary-pane {
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
