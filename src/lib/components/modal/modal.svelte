<script lang="ts">
	import type { IShortcut } from "$lib/@types/shortcuts";
	import clickoutside from "$lib/actions/clickoutside";
	import shortcuts from "$lib/stores/shortcuts";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";

	/** Unique identifier for this modal */
	export let id: string;
	/** An element ID selector that points to a piece of text which gives an appropriate label to the modal */
	export let labelId: string;
	/** An element ID selector that points to one or more pieces of text which gives an appropriate description of the modal's contents */
	export let descriptionId: string = null;
	/** An element ID selector that points to the element you'd like keyboard focus to switch to once the modal has opened. E.g. the first text input in a form */
	export let focusOnOpenId: string = null;
	/** An element ID selector that points to the element you'd like keyboard focus to switch to after the modal has closed.
	 *
	 * This is nessasary so that the focus isn't reset to the top of the page and that the user can continue navigating from where they left off.
	 */
	export let focusOnCloseId: string;

	let dispatch = createEventDispatcher();
	let modal: HTMLDivElement;

	let modalShortcuts: IShortcut[];
	$: modalShortcuts = [
		{
			name: "Close",
			description: "Closes the modal",
			key: "Escape",
			callback: () => dispatch("close"),
		},
	];

	onMount(() => {
		shortcuts.global.add(id, modalShortcuts);

		if (focusOnOpenId) {
			document.getElementById(focusOnOpenId);
		} else {
			modal.focus();
		}
	});

	onDestroy(() => {
		shortcuts.global.remove(id);

		if (focusOnCloseId) {
			document.getElementById(focusOnCloseId).focus();
		}
	});
</script>

<div
	{...$$restProps}
	{id}
	role="dialog"
	aria-labelledby={labelId}
	aria-describedby={descriptionId}
	aria-modal={true}
	class:svaria__modal={true}
	bind:this={modal}
	use:clickoutside={() => dispatch("close")}
>
	<slot />
</div>
