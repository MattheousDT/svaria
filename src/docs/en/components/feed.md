---
id: feed
pretitle: Components
title: Feed
description: A feed is a section of a page that automatically loads new sections of content as the user scrolls. The sections of content in a feed are presented in article elements. So, a feed can be thought of as a dynamic list of articles that often appears to scroll infinitely.
slug: /components/feed
aria: https://www.w3.org/TR/wai-aria-practices-1.1/#feed
github: https://github.com/MattheousDT/svaria/tree/master/src/lib/components/feed
---

<script>
  import FeedExample from "$site/components/examples/feed_example.svelte";
  import Example from "$site/components/example.svelte";
</script>

## Example

This example uses the [wingetdotrun api](https://winget.run/) to get a list of packages available from winget.

<Example value={66}>

<span slot="preview">
  <FeedExample />
</span>

```svelte
<script>
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

<h3 id="feed-label">Winget Packages</h3>
<Feed isLoading={loading} feedLabelId="feed-label">
  {#each items as item, i}
    <FeedItem
      labelId={item.Id}
      descriptionId="{item.Id}-desc"
      itemCount={items.length}
      index={i}
    >
      <div>
        <h4 id={item.Id}>{item.Latest.Name}</h4>
        {#if item.Latest.Description}
          <p id="{item.Id}-desc">{item.Latest.Description}</p>
        {/if}
      </div>
    </FeedItem>
  {/each}
</Feed>

<button on:click={() => fetchItems()}>Fetch more items</Button>
```

</Example>

## Keyboard Shortcuts

| Key        | Dispatched Event | Description                     |
| ---------- | ---------------- | ------------------------------- |
| `PageDown` | `on:next`        | Move focus to next article.     |
| `PageUp`   | `on:previous`    | Move focus to previous article. |

## Feed Props

| Name          | Type      | Required | Description                                                                                        |
| ------------- | --------- | -------- | -------------------------------------------------------------------------------------------------- |
| `feedLabelId` | `string`  | `true`   | An element ID selector that points to a piece of text which gives an appropriate label to the feed |
| `isLoading`   | `boolean` | `true`   | Set to true if new elements are about to be loaded                                                 |

## FeedItem Props

| Name            | Type     | Required | Description                                                                                                             |
| --------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `labelId`       | `string` | `true`   | An element ID selector that points to a piece of text which gives an appropriate label to current item                  |
| `descriptionId` | `string` | `false`  | An element ID selector that points to one or more pieces of text which gives an appropriate description to current item |
| `index`         | `number` | `true`   | The current index of the element in the feed                                                                            |
| `itemCount`     | `number` | `true`   | The total amount of items in the feed                                                                                   |
