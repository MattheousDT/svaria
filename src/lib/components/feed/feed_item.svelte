<script lang="ts">
	import { contextual } from "svaria";

	import type { IShortcut } from "svaria/@types/shortcuts";
	import { createEventDispatcher } from "svelte";

	/** An element ID selector that points to a piece of text which gives an appropriate label to current item */
	export let labelId: string;
	/** An element ID selector that points to one or more pieces of text which gives an appropriate description to current item */
	export let descriptionId: string = null;
	/** The current index of the element in the feed */
	export let index: number;
	/** The total amount of items in the feed */
	export let itemCount: number;

	let dispatch = createEventDispatcher();

	let shortcuts: IShortcut[] = [
		{
			key: "PageDown",
			callback: (e) => {
				const next = e.target.closest("[role='feed']")?.querySelector(`[aria-posinset="${index + 2}"]`) as HTMLElement;
				if (next) {
					next.focus();
				}

				dispatch("next");
			},
		},
		{
			key: "PageUp",
			callback: (e) => {
				const prev = e.target.closest("[role='feed']")?.querySelector(`[aria-posinset="${index}"]`) as HTMLElement;
				if (prev) {
					prev.focus();
				}

				dispatch("previous");
			},
		},
	];
</script>

<article
	{...$$restProps}
	use:contextual={{ id: labelId, shortcuts }}
	tabindex={0}
	aria-labelledby={labelId}
	aria-describedby={descriptionId}
	aria-posinset={index + 1}
	aria-setsize={itemCount}
>
	<slot />
</article>
