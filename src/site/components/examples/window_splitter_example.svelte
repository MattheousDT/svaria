<script lang="ts">
	import WindowSplitter from "$lib/components/window_splitter.svelte";

	let value = 33;
	let container: HTMLDivElement;
</script>

<div bind:this={container} style:grid-template-columns="{value}% 2rem auto">
	<aside>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel aliquam arcu. Sed congue vitae turpis quis
			fermentum. Sed vel condimentum justo. Quisque sit amet sollicitudin elit, porta scelerisque nisi. Etiam ultricies
			bibendum consectetur. Nam eu sollicitudin massa. Sed vel dui sit amet lectus porttitor facilisis. Vestibulum eget
			nunc massa. Nulla tempus cursus diam ac sodales. Sed tortor dui, condimentum vitae euismod eget, aliquet vitae
			elit. Curabitur facilisis nunc et leo commodo suscipit. Aenean condimentum, diam vel pharetra dictum, magna eros
			lacinia justo, quis ultrices libero lectus at felis. Duis pellentesque urna sed tincidunt blandit.
		</p>
	</aside>
	<WindowSplitter
		primaryPaneElId="primary-pane"
		label="Demo splitter"
		bind:value
		minValue={0}
		maxValue={100}
		containerEl={container}
	>
		<span class="line" />
	</WindowSplitter>
	<main id="primary-pane">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel aliquam arcu. Sed congue vitae turpis quis
			fermentum. Sed vel condimentum justo. Quisque sit amet sollicitudin elit, porta scelerisque nisi. Etiam ultricies
			bibendum consectetur. Nam eu sollicitudin massa. Sed vel dui sit amet lectus porttitor facilisis. Vestibulum eget
			nunc massa. Nulla tempus cursus diam ac sodales. Sed tortor dui, condimentum vitae euismod eget, aliquet vitae
			elit. Curabitur facilisis nunc et leo commodo suscipit. Aenean condimentum, diam vel pharetra dictum, magna eros
			lacinia justo, quis ultrices libero lectus at felis. Duis pellentesque urna sed tincidunt blandit. In feugiat ex
			in sapien auctor, vitae egestas eros lobortis. Praesent imperdiet magna neque, sed lobortis nisi gravida sed.
			Integer sit amet urna ligula. Nulla ut quam vulputate, ultrices nulla sed, volutpat sem. Nulla nec ornare nulla.
			Donec vehicula ac diam ut molestie. Vestibulum augue nisl, cursus vitae ligula ac, luctus elementum augue. Fusce
			cursus, justo vitae laoreet sollicitudin, tortor elit condimentum tortor, ac laoreet diam ipsum luctus felis.
			Donec vel tincidunt mi, vel porttitor eros. Maecenas condimentum imperdiet risus, ac iaculis nibh consequat ac.
			Fusce quam velit, pellentesque gravida semper sed, facilisis ac massa. Ut tristique congue tortor ac dignissim.
			Integer nec mauris quis velit sodales dapibus.
		</p>
	</main>
</div>

<style lang="scss">
	@import "./variables";

	div {
		display: grid;
		width: 100%;

		:global(.svaria__window-splitter) {
			display: flex;
			justify-content: center;
			width: 100%;
			height: 100%;
			cursor: col-resize;
		}
	}

	span {
		display: block;
		height: 100%;
		width: 2px;
		background: $navy;
	}

	main,
	aside {
		&:focus {
			background: red;
		}
	}
</style>
