<script>
	import Button from "$site/components/button.svelte";
	import { Feed, FeedItem } from "svaria";
	import { onMount } from "svelte";

	let loading = false;
	let page = 0;
	let items = [];

	let fetchItems = async () => {
		loading = true;

		fetch(`https://api.winget.run/v2/packages?page=${page}`)
			.then((e) => e.json())
			.then((e) => {
				items = items.concat(e.Packages);
				page += 1;
			})
			.catch(console.error)
			.finally(() => (loading = false));
	};

	onMount(() => fetchItems());
</script>

<div class="w-full h-full">
	<h3 class="font-heading text-3xl text-blue-900" id="feed-label">Winget Packages</h3>
	<Feed isLoading={loading} feedLabelId="feed-label">
		{#each items as item, i}
			<FeedItem labelId={item.Id} descriptionId="{item.Id}-desc" itemCount={items.length} index={i}>
				<div class="my-4">
					<h4 id={item.Id} class="text-xl font-bold text-blue-900">{item.Latest.Name}</h4>
					{#if item.Latest.Description}
						<p id="{item.Id}-desc" class="text-grey">{item.Latest.Description}</p>
					{/if}
				</div>
			</FeedItem>
		{/each}
	</Feed>

	<Button class="my-4" on:click={() => fetchItems()}>Fetch more items</Button>
</div>
