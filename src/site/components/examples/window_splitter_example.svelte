<script lang="ts">
	import WindowSplitter from "$lib/components/window_splitter.svelte";

	let value = 30;
	let minValue = 20;
	let maxValue = 40;
	let container: HTMLDivElement;
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

<div bind:this={container} style:grid-template-columns="{value}% 2rem auto">
	<aside>Sidebar</aside>
	<WindowSplitter
		primaryPaneElId="primary-pane"
		label="Demo splitter"
		bind:value
		{minValue}
		{maxValue}
		containerEl={container}
	>
		<span class="line" />
	</WindowSplitter>
	<main id="primary-pane">Main panel</main>
</div>

<style lang="scss">
	@import "./variables";

	div {
		display: grid;
		width: 100%;
		height: 400px;
		overflow: hidden;
		margin-top: 1rem;
		border: 2px solid $navy;

		:global(.svaria__window-splitter) {
			display: flex;
			justify-content: center;
			width: 100%;
			height: 100%;
			cursor: col-resize;
		}
	}

	input {
		display: block;
	}

	span {
		display: block;
		height: 100%;
		width: 2px;
		background: $navy;
	}

	aside {
		background: $lavendar;
	}
	main {
		background: $rose;
	}

	main,
	aside {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
	}
</style>
