<script lang="ts">
	import { contextual } from "$lib/actions";
	import type { IShortcut } from "$lib/stores/shortcuts";
	import { createEventDispatcher } from "svelte";

	export let primaryPaneElId: string;
	export let label: string = null;
	export let labelElId: string = null;
	export let direction: "horizontal" | "vertical" = "vertical";
	export let value: number;
	export let minValue: number;
	export let maxValue: number;
	export let containerEl: HTMLElement;

	let splitterEl: HTMLSpanElement;

	$: if (!label && !labelElId)
		throw Error("A label or label element id reference must be passed to the WindowSplitter component");

	function handleMousemove(e: MouseEvent) {
		if (!(e.buttons & 1)) return; // mouse not down

		const { left, top, width, height } = containerEl.getBoundingClientRect();

		if (direction === "vertical") {
			value = ((e.clientX - splitterEl.getBoundingClientRect().width / 2 - left) / width) * maxValue;
		} else {
			value = ((e.clientY - splitterEl.getBoundingClientRect().height / 2 - top) / height) * maxValue;
		}
	}

	function handleMousedown(e: MouseEvent) {
		e.preventDefault();

		function handleMouseup() {
			document.removeEventListener("mouseup", handleMouseup);
			document.removeEventListener("mousemove", handleMousemove);
		}

		document.addEventListener("mouseup", handleMouseup);
		document.addEventListener("mousemove", handleMousemove);
	}

	let dispatch = createEventDispatcher();

	let shortcuts: IShortcut[] = [
		...(direction === "vertical"
			? [
					{
						name: "Move left",
						description: "Moves a vertical splitter to the left.",
						key: "ArrowLeft",
						callback: () => {
							value--;
							dispatch("move_left");
						},
					},
					{
						name: "Move right",
						description: "Moves a vertical splitter to the right.",
						key: "ArrowRight",
						callback: () => {
							value++;
							dispatch("move_right");
						},
					},
			  ]
			: [
					{
						name: "Move up",
						description: "Moves a horizontal splitter up.",
						key: "ArrowUp",
						callback: () => {
							value--;
							dispatch("move_up");
						},
					},
					{
						name: "Move down",
						description: "Moves a horizontal splitter down.",
						key: "ArrowDown",
						callback: () => {
							value++;
							dispatch("move_down");
						},
					},
			  ]),
		{
			name: "Maximize primary window",
			description:
				"Moves splitter to the position that gives the primary pane its smallest allowed size. This may completely collapse the primary pane.",
			key: "Home",
			callback: () => {
				value = minValue;
				dispatch("maximize_primary");
			},
		},
		{
			name: "Minimize primary window",
			description:
				"Moves splitter to the position that gives the primary pane its largest allowed size. This may completely collapse the secondary pane.",
			key: "End",
			callback: () => {
				value = maxValue;
				dispatch("minimize_primary");
			},
		},
		// ...(panes.length > 0
		// 	? [
		// 			{
		// 				name: "Cycle panes",
		// 				description: "Cycle through window panes",
		// 				key: "F6",
		// 				callback: () => {
		// 					let indexToFocus: number;

		// 					for (let i = 0; i < panes.length; i++) {
		// 						if (document.activeElement === panes[i]) {
		// 							indexToFocus = i + 1;
		// 							break;
		// 						}
		// 					}

		// 					panes[!indexToFocus || indexToFocus > panes.length - 1 ? 0 : indexToFocus].focus();

		// 					dispatch("cycle_panes");
		// 				},
		// 			},
		// 	  ]
		// 	: []),
	];
</script>

<span
	{...$$restProps}
	use:contextual={{ id: primaryPaneElId, shortcuts }}
	bind:this={splitterEl}
	on:mousedown={handleMousedown}
	class={["svaria__window-splitter", $$props.class].filter((x) => !!x).join(" ")}
	role="separator"
	aria-controls={primaryPaneElId}
	aria-label={label}
	aria-labelledby={labelElId}
	aria-valuenow={value}
	aria-valuemin={minValue}
	aria-valuemax={maxValue}
	tabindex={0}
>
	<slot />
</span>
