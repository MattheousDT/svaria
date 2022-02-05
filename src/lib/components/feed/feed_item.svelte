<script lang="ts">
	import { contextual } from "svaria";

	import type { IShortcut } from "svaria/@types/shortcuts";
	import { createEventDispatcher } from "svelte";

	export let labelId: string;
	export let descriptionId: string = null;
	export let index: number;
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
