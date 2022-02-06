<script>
	import { Alert, Menubar, MenuItem, clickoutside, keycombo } from "svaria";
	import WindowSplitterExample from "$site/components/examples/window_splitter_example.svelte";
	import Feed from "$lib/components/feed/feed.svelte";
	import FeedItem from "$lib/components/feed/feed_item.svelte";
	import { fly } from "svelte/transition";

	const konamiCode = [
		"ArrowUp",
		"ArrowUp",
		"ArrowDown",
		"ArrowDown",
		"ArrowLeft",
		"ArrowRight",
		"ArrowLeft",
		"ArrowRight",
		"b",
		"a",
	];

	let alertVisible = false;
</script>

<svelte:body use:keycombo={{ sequence: konamiCode, callback: () => alert("Konami code!") }} />

<div class="container">
	<h1>Svaria Demo</h1>

	<p>Press <kbd>/</kbd> for contextual shortcuts</p>

	<h2>Components</h2>

	<h3>Alert</h3>
	<!-- <ParallaxButton color="rose" on:click={() => (alertVisible = !alertVisible)}>Toggle alert</ParallaxButton> -->
	{#if alertVisible}
		<Alert let:props>
			<h2 use:clickoutside={(e) => console.log(e)} {...props}>Hej, hello, ciao, こんにちは, 안녕</h2>
		</Alert>
	{/if}

	<h3 id="feed-label">Feed</h3>
	{#if alertVisible}
		<Feed isLoading={false} feedLabelId="feed-label">
			{#each konamiCode as item, i}
				<div in:fly={{ x: 50, delay: i * 500 }}>
					<FeedItem labelId="feed-item-{i}" itemCount={konamiCode.length} index={i}>
						<p id="feed-item-{i}">{item}</p>
					</FeedItem>
				</div>
			{/each}
		</Feed>
	{/if}

	<h3>Menubar + MenuItem</h3>
	<Menubar id="main-nav" label="Main Navigation">
		<MenuItem first let:props>
			<!-- <ParallaxButton {...props} color="lavendar" on:click={() => console.log("Hello")}>Say Hello</ParallaxButton> -->
		</MenuItem>
		<MenuItem let:props>
			<!-- <ParallaxButton {...props} color="apricot" on:click={() => console.log("Hola")}>Alert Hola</ParallaxButton> -->
		</MenuItem>
		<MenuItem let:props>
			<!-- <ParallaxButton {...props} color="rose" on:click={() => console.log("안녕")}>Say 안녕</ParallaxButton> -->
		</MenuItem>
	</Menubar>

	<h3>Window splitter</h3>
	<WindowSplitterExample />
</div>
